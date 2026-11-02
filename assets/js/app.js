/* ============================================================
   斑马放映室 · 交互逻辑
   卡片以「手上的一叠扑克牌」方式扇形展开，停在哪张哪张翻开
   ============================================================ */
(function () {
  "use strict";

  const S = window.SITE || { categories: [] };
  const $ = (sel, root) => (root || document).querySelector(sel);
  const CATS = S.categories || [];

  /* 浏览器认 webp 就用 webp（体积约为同名 jpg 的一半），否则退回 jpg */
  const WEBP_OK = (function () {
    try {
      return document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0;
    } catch (e) {
      return false;
    }
  })();
  function pic(src) {
    return WEBP_OK && /\.jpe?g$/i.test(src) ? src.replace(/\.jpe?g$/i, ".webp") : src;
  }

  const el = {
    catFan: $("#catFan"),
    catCount: $("#catCount"),
    catPrev: $("#catPrev"),
    catNext: $("#catNext"),
    videoFan: $("#videoFan"),
    videoCount: $("#videoCount"),
    videoPrev: $("#videoPrev"),
    videoNext: $("#videoNext"),
    viewCats: $("#viewCats"),
    viewVideos: $("#viewVideos"),
    catTitle: $("#catTitle"),
    catMeta: $("#catMeta"),
    backBtn: $("#backBtn"),
    statText: $("#statText"),
    empty: $("#emptyState"),
    emptyBack: $("#emptyBack"),
    glow: $("#glow"),
    toast: $("#toast"),
    player: $("#player"),
    video: $("#pVideo"),
    pTitle: $("#pTitle"),
    pMeta: $("#pMeta"),
    pNetdisk: $("#pNetdisk"),
    pClose: $("#pClose"),
    pState: $("#pState"),
    pStateTitle: $("#pStateTitle"),
    pStateText: $("#pStateText"),
    pStateLink: $("#pStateLink"),
    pSpinner: $("#pSpinner"),
    pBigPlay: $("#pBigPlay"),
    stage: $("#pStage"),
    cPlay: $("#cPlay"),
    cTrack: $("#cTrack"),
    cFill: $("#cFill"),
    cKnob: $("#cKnob"),
    cTime: $("#cTime"),
    cMute: $("#cMute"),
    cFull: $("#cFull")
  };

  /* cFocus / vFocus 记的是「全部牌里的序号」（dataset.idx），不是页内下标 */
  const state = { view: "cats", cat: 0, query: "", cFocus: -1, vFocus: -1 };

  /* ── 小工具 ─────────────────────────────── */
  const pad = (n) => (n < 10 ? "0" + n : "" + n);

  function mmss(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return pad(m) + ":" + pad(s);
  }

  function durText(d) {
    const m = /^(\d+):(\d+)$/.exec(String(d || "").trim());
    if (!m) return d || "";
    return parseInt(m[1], 10) + " 分 " + m[2] + " 秒";
  }

  function totalText(videos) {
    let min = 0;
    videos.forEach((v) => {
      const m = /^(\d+):(\d+)$/.exec(String(v.duration || "").trim());
      if (m) min += parseInt(m[1], 10) + parseInt(m[2], 10) / 60;
    });
    min = Math.round(min);
    const h = Math.floor(min / 60);
    const mm = min % 60;
    if (!min) return "";
    return h ? "共 " + h + " 小时 " + pad(mm) + " 分" : "共 " + mm + " 分钟";
  }

  let toastTimer = 0;
  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("is-on"), 2200);
  }

  /* ============================================================
     扇形卡组
     ------------------------------------------------------------
     几何模型：所有牌绕一个远在下方的手心旋转。
       第 i 张牌角度 a = (i - 中位) * 每张角度
       位置   x = R·sin(a)   y = R·(1-cos(a))
     停留某张时，左右两侧的牌沿弧线往两边让开一点。
     ============================================================ */
  function makeFan(fanEl, opts) {
    const o = opts || {};
    const ratio = o.ratio || 1.4;        // 牌的高宽比
    const countEl = o.countEl || null;
    const prevBtn = o.prevBtn || null;
    const nextBtn = o.nextBtn || null;
    const unit = o.unit || "张";
    const onPick = o.onPick || function () {};
    const onChange = o.onChange || null;

    let all = [];                        // 全部牌
    let shown = [];                      // 当前这一把
    let page = 0;
    let per = 10;
    let focus = -1;                      // 当前停留的牌（页内下标）

    const geo = { R: 900, dyMax: 0, maxAngle: 26, cw: 190, n: 0, partDeg: 3.2, k: 1 };

    /* 拖动状态：dragX 是整把牌跟着手指挪的那点位移 */
    let drag = null;
    let dragX = 0;
    let tapBlockUntil = 0;   /* 刚拖完的这一小会儿，浏览器补的 click 不算点击 */

    /* 一屏放几张：窄屏少放几张，牌才不会小到看不清；
       平板竖屏和横屏可用宽度差很多，分开判断 */
    function perPage() {
      const w = fanEl.clientWidth || 1200;
      const h = fanEl.clientHeight || 420;
      const portrait = h > w * 0.85;
      /* 手机横屏：扇形容器只有三百来像素高，牌一多就只能靠整体缩小塞进来，
         叠得密密麻麻。少放几张、卡片按高度定尺，上下才留得出呼吸 */
      if (h <= 400 && w > h) return w >= 760 ? 5 : 4;
      if (w < 560) return 4;
      if (w < 760) return 5;
      /* 平板竖屏：同样宽度下能摊的牌比横屏少得多 */
      if (portrait && w < 1180) return 5;
      if (w < 900) return 6;
      if (w < 1200) return 7;
      return 10;
    }
    const pageCount = () => Math.max(1, Math.ceil(all.length / per));

    /* 量尺寸 → 算半径、卡宽、整体缩放 */
    function measure() {
      const W0 = fanEl.clientWidth || 1200;
      const H = fanEl.clientHeight || 420;
      /* 手机横屏：矮而宽，不能用平板那套留白和角度，否则牌会被压小、挤成一撮 */
      const phoneLand = H <= 400 && W0 > H;
      /* 左右留白，别让最外侧的牌顶到屏幕边 */
      const inset = phoneLand ? 22 : W0 > 1000 ? 88 : W0 > 640 ? 40 : 14;
      const W = Math.max(300, W0 - inset * 2);
      const n = Math.max(1, shown.length);

      /* 总张开的角：牌越多摊得越开 */
      let maxAngle = n < 2 ? 0 : n >= 8 ? 26 : n >= 4 ? 21 : 15;

      /* 先按宽度定卡宽，保证整把牌塞得下（叠一半） */
      let cw = (W - 30) / (1 + 0.5 * (n - 1));
      /* 张数少的时候（平板/手机档）牌可以更大，不必守着 208 */
      const cap = n <= 6 ? 236 : 208;
      /* 竖向还有富余时，允许叠得更紧一点、把牌放大 */
      const roomy = Math.min(cap, (H - 40) * 0.78 / ratio);
      if (n > 2 && roomy > cw) {
        cw = Math.min(roomy, (W - 30) / (1 + 0.34 * (n - 1)));
      }
      cw = Math.max(96, Math.min(cap, cw));
      /* 手机横屏：卡高不能吃掉整个屏高，否则一旋转、一抬升就顶出上下边。
         视频卡更宽（ratio 小）、旋转后上下角张得更开，要再收一档 */
      if (phoneLand) cw = Math.min(cw, ((H - 26) * (ratio < 1.2 ? 0.62 : 0.7)) / ratio);

      /* 总张开的角：手机横屏牌多、屏矮，摊太开会顶到上下边 */
      if (phoneLand && maxAngle) maxAngle = n <= 4 ? 15 : 16;
      const ch = cw * ratio;

      /* 竖屏平板：屏幕很高，弧摊得更开一点，否则整把牌像贴在中间一条 */
      if (!phoneLand && maxAngle && H > ch * 1.5) maxAngle = Math.min(29, maxAngle + 4);

      let R, dyMax, partDeg;
      if (n < 2 || !maxAngle) {
        R = cw * 1.4;
        dyMax = 0;
        partDeg = 0;
      } else {
        const fit = (deg) => {
          const rad = (deg * Math.PI) / 180;
          const bbox = cw * Math.cos(rad) + ch * Math.sin(rad);
          return Math.max((W - bbox) / (2 * Math.sin(rad)), cw * 1.4);
        };
        /* 先按完全散开的角度算一版半径 */
        R = fit(maxAngle + 4.5);
        /* 停留时两侧让开的角（按像素等价换算，窄屏角度要大得多）。
           上限跟着「每张相隔多少度」走：让位角一旦超过间隔，左右就换位错开 */
        const stepA = n > 1 ? (2 * maxAngle) / (n - 1) : 0;
        const partWant = ((cw * 0.34) / R) * 57.2958;
        const partMax = phoneLand ? Math.min(5.5, stepA * 0.55) : Math.min(9, stepA * 0.7);
        partDeg = Math.max(2.6, Math.min(partMax, partWant));
        /* 把让开的角度也预先留进宽度里，否则一停留最外侧的牌就顶出屏幕 */
        R = fit(maxAngle + partDeg + 1.5);
        /* 手机横屏宽度富余，半径容易被宽度撑得太大，牌会拉成稀稀一排、没了叠牌感；
           按「每张露出 2/3 卡宽」给半径封顶 */
        if (phoneLand && n > 1) {
          const stepRad = ((2 * maxAngle) / (n - 1)) * Math.PI / 180;
          const rCap = (0.66 * cw) / Math.max(0.03, Math.sin(stepRad));
          R = Math.max(cw * 1.45, Math.min(R, rCap));
        }
        const rad = (maxAngle * Math.PI) / 180;
        dyMax = R * (1 - Math.cos(rad));
      }

      fanEl.style.setProperty("--cw", cw.toFixed(1) + "px");
      fanEl.style.setProperty("--ch", ch.toFixed(1) + "px");

      /* 竖向放不下就整把等比缩小 */
      const needH = ch + dyMax + 24;
      const k = needH > H ? Math.max(0.45, H / needH) : 1;
      geo.k = k;
      dragX = 0;
      applyFanTransform();

      geo.R = R; geo.dyMax = dyMax; geo.maxAngle = maxAngle; geo.cw = cw; geo.n = n;
      geo.partDeg = partDeg;
      geo.phoneLand = phoneLand;
    }

    /* 整把牌的外层变换：等比缩放 + 拖动时的跟手位移 */
    function applyFanTransform() {
      const t = [];
      if (dragX) t.push("translate3d(" + dragX.toFixed(1) + "px,0,0)");
      const k = geo.k || 1;
      if (k < 0.99) t.push("scale(" + k.toFixed(3) + ")");
      fanEl.style.transform = t.join(" ");
    }

    /* 把每张牌摆到扇形上的对应位置 */
    function place() {
      const { R, dyMax, maxAngle, n } = geo;
      const stepA = n > 1 ? (2 * maxAngle) / (n - 1) : 0;
      const mid = (n - 1) / 2;

      shown.forEach((card, i) => {
        const base = (i - mid) * stepA;
        let ang = base;
        let rot = base;
        let lift = 0;
        let sc = 1;

        if (focus >= 0 && n > 1) {
          if (i === focus) {
            /* 停住的这张：扶正、抬起来 */
            rot = base * 0.4;
            if (geo.phoneLand) {
              /* 手机横屏没有竖向余量，抬 0.44 个卡高会顶出屏幕，
                 改成「几乎不抬 + 略微放大」，靠白边和阴影强调 */
              lift = -(geo.cw * ratio * 0.06);
              sc = 1.07;
            } else {
              /* 往上抽出来，而不是只抬一点：窄屏上平着抬会整张压住旁边的牌 */
              lift = -(geo.cw * ratio * 0.44);
              sc = 1.05;
            }
          } else {
            /* 其余的：整半边平移让开，彼此间距不变，只在中间裂开一道缝.
               用像素换算角度：半径 R 小的窄屏，3.2° 只有二十几像素，等于没让开 */
            const dir = i < focus ? -1 : 1;
            ang = base + dir * (geo.partDeg || 3.2);
            rot = ang;
          }
        }

        const a = (ang * Math.PI) / 180;
        const dx = R * Math.sin(a);
        const dy = R * (1 - Math.cos(a)) - dyMax / 2;

        card.style.transform =
          "translate(-50%,-50%) translate(" + dx.toFixed(1) + "px," + (dy + lift).toFixed(1) + "px)" +
          " rotate(" + rot.toFixed(2) + "deg) scale(" + sc + ")";
        card.style.zIndex = String(i === focus ? 300 : 10 + i);
        card.classList.toggle("is-focus", i === focus);
        /* 右侧的牌被中间那张压住左半边，角标翻到右边才看得见 */
        card.classList.toggle("badge-end", focus >= 0 && i > focus);
      });

      fanEl.classList.toggle("is-open", focus >= 0);
    }

    function paintCount() {
      const total = all.length;
      if (countEl) {
        if (pageCount() < 2) {
          countEl.textContent = total + " " + unit;
        } else {
          const a = page * per + 1;
          const b = Math.min(total, page * per + per);
          countEl.textContent = a + "–" + b + " / " + total + " " + unit;
        }
      }
      const multi = pageCount() > 1;
      if (prevBtn) prevBtn.hidden = !multi;
      if (nextBtn) nextBtn.hidden = !multi;
    }

    function renderPage(keepIdx) {
      const start = page * per;
      shown = all.slice(start, start + per);
      /* 翻页时顺手擦掉上一屏残留的选中样式，免得 hidden 的旧卡还挂着 is-focus */
      all.forEach((c) => { c.hidden = true; c.classList.remove("is-focus", "badge-end"); });
      shown.forEach((c) => { c.hidden = false; });
      /* 默认停在这一屏中间那张；给了 keepIdx 就尽量停在原来那张
         （屏幕尺寸变化 / ResizeObserver 回灌时不能把用户的选中态冲掉） */
      const keep = typeof keepIdx === "number" && keepIdx >= 0 ? keepIdx - start : -1;
      focus = keep >= 0 && keep < shown.length ? keep : midFocus();
      measure();

      /* 首次/换页时先关掉过渡，让它直接出现在扇形位置上 */
      fanEl.classList.add("no-anim");
      place();
      void fanEl.offsetHeight;
      requestAnimationFrame(() => fanEl.classList.remove("no-anim"));

      paintCount();
      notify();
    }

    function midFocus() {
      return shown.length ? Math.floor((shown.length - 1) / 2) : -1;
    }

    /* 停在哪张 —— 换算成「全部牌」里的序号，-1 表示还没停 */
    function globalFocus() {
      const c = shown[focus];
      return c ? Number(c.dataset.idx) : -1;
    }

    function notify() {
      if (onChange) onChange(globalFocus());
    }

    function setFocus(i) {
      if (i < 0 || i >= shown.length || i === focus) return;
      focus = i;
      place();
      tick();
      notify();
    }

    /* 直接停到某一张（可能要先翻到它所在的页）—— 复原上次位置用 */
    function selectIdx(gi) {
      gi = Number(gi);
      if (!(gi >= 0) || gi >= all.length) return false;
      const p = Math.floor(gi / per);
      if (p !== page) {
        page = p;
        renderPage(gi);
      } else {
        setFocus(gi - page * per);
      }
      return true;
    }

    /* 翻页；edge 指定落在新一屏的哪张（默认中间那张） */
    function goPage(p, edge) {
      const total = pageCount();
      page = ((p % total) + total) % total;
      renderPage();
      if (edge === "first" && shown.length) setFocus(0);
      else if (edge === "last" && shown.length) setFocus(shown.length - 1);
      else tick();
    }

    /* 手指划过一张牌大约要移动多少像素 */
    function stepPx() {
      return Math.max(46, (geo.cw || 190) * 0.42);
    }

    /* 鼠标划过：翻到哪张 */
    fanEl.addEventListener("pointerover", (e) => {
      if (e.pointerType === "touch" || drag) return;
      const card = e.target.closest(".fcard");
      if (!card) return;
      const i = shown.indexOf(card);
      if (i >= 0) setFocus(i);
    });

    /* 点击：没翻开就先翻开，已经翻开就进去 */
    fanEl.addEventListener("click", (e) => {
      /* 刚拖完手抬起时浏览器还会补一个 click，别当成点击 */
      if (Date.now() < tapBlockUntil) {
        e.preventDefault();
        return;
      }
      const card = e.target.closest(".fcard");
      if (!card) return;
      const i = shown.indexOf(card);
      if (i < 0) return;
      if (i !== focus) {
        setFocus(i);
        return;
      }
      onPick(Number(card.dataset.idx), card);
    });

    fanEl.addEventListener("dragstart", (e) => e.preventDefault());

    /* ── 手指 / 鼠标拖动：牌跟着手走 ─────────────
       手指往左划 → 视线往右翻；一次划一张牌的距离（stepPx）就切一张。
       两个边界处继续划会翻到上一屏 / 下一屏。 */
    fanEl.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (drag) return;
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, f0: focus, dx: 0, moved: false };
      try { fanEl.setPointerCapture(e.pointerId); } catch (err) {}
    });

    fanEl.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0;
      const dy = e.clientY - drag.y0;

      if (!drag.moved) {
        /* 先判方向：竖着划、或者还没超过抖动阈值，都不算拖动 */
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
        drag.moved = true;
        fanEl.classList.add("is-dragging");
      }

      drag.dx = dx;
      const step = stepPx();
      const max = shown.length - 1;
      const p = drag.f0 - dx / step;            /* 连续位置：拖多远走多远 */
      const pc = Math.max(0, Math.min(max, p));
      const near = Math.round(pc);

      if (near !== focus) {
        focus = near;
        place();
        tick();
      }

      /* 剩下的零头让整把牌跟手一点，到两端时带阻尼 */
      const over = p < 0 ? p : p > max ? p - max : 0;
      const rem = (pc - near) * step + Math.max(-step * 0.5, Math.min(step * 0.5, over * step * 0.35));
      dragX = rem * 0.75;
      applyFanTransform();
    });

    function endDrag(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      const d = drag;
      drag = null;
      fanEl.classList.remove("is-dragging");
      dragX = 0;
      applyFanTransform();

      try { fanEl.releasePointerCapture(d.id); } catch (err) {}

      if (!d.moved) return;
      tapBlockUntil = Date.now() + 260;

      const step = stepPx();
      const p = d.f0 - d.dx / step;
      const max = shown.length - 1;

      /* 已经划到这一屏的尽头还继续划：翻到下一屏 / 上一屏
         （到头了就不再绕回去，只让牌弹回原位） */
      if (p > max + 0.55 && page < pageCount() - 1) {
        goPage(page + 1, "first");
        return;
      }
      if (p < -0.55 && page > 0) {
        goPage(page - 1, "last");
        return;
      }
      notify();
    }

    fanEl.addEventListener("pointerup", endDrag);
    fanEl.addEventListener("pointercancel", endDrag);
    fanEl.addEventListener("lostpointercapture", () => { if (drag) endDrag(); });

    /* 键盘 */
    fanEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocus(Math.min(shown.length - 1, (focus < 0 ? -1 : focus) + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocus(Math.max(0, (focus < 0 ? shown.length : focus) - 1));
      } else if ((e.key === "Enter" || e.key === " ") && shown[focus]) {
        e.preventDefault();
        onPick(Number(shown[focus].dataset.idx), shown[focus]);
      }
    });

    /* 滚轮：一张一张翻 */
    let wlock = 0;
    fanEl.addEventListener(
      "wheel",
      (e) => {
        const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (!d) return;
        e.preventDefault();
        const now = Date.now();
        if (now - wlock < 110) return;
        wlock = now;
        setFocus(Math.max(0, Math.min(shown.length - 1, focus + (d > 0 ? 1 : -1))));
      },
      { passive: false }
    );

    if (prevBtn) prevBtn.addEventListener("click", () => goPage(page - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goPage(page + 1));

    /* 尺寸变了重新摆（保持当前选中那张，别弹回中间） */
    let raf = 0;
    if (window.ResizeObserver) {
      new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const cur = globalFocus();
          const p = perPage();
          if (p !== per) {
            per = p;
            page = cur >= 0 ? Math.floor(cur / per) : 0;
          }
          renderPage(cur);
        });
      }).observe(fanEl);
    } else {
      window.addEventListener("resize", () => renderPage(globalFocus()));
    }

    return {
      setItems(nodes) {
        all = nodes;
        per = perPage();
        page = 0;
        renderPage();
      },
      setFocus,
      getFocus: globalFocus,
      selectIdx,
      refocus() {
        renderPage(globalFocus());
      }
    };
  }

  /* ── 两个卡组 ───────────────────────────── */
  const catFan = makeFan(el.catFan, {
    ratio: 1.4,
    unit: "个目录",
    countEl: el.catCount,
    prevBtn: el.catPrev,
    nextBtn: el.catNext,
    onPick: (idx) => enterCategory(idx),
    onChange: (gi) => { state.cFocus = gi; persist(); }
  });

  const videoFan = makeFan(el.videoFan, {
    ratio: 1.04,
    unit: "集",
    countEl: el.videoCount,
    prevBtn: el.videoPrev,
    nextBtn: el.videoNext,
    onPick: (idx) => openPlayer(state.cat, idx),
    onChange: (gi) => { state.vFocus = gi; persist(); }
  });

  /* ── 记住停在哪一张 ─────────────────────── */
  /* 安卓 Chrome 在跳去网盘那一下会把本页整页回收，回来时是「重新加载」：
     内存里的选中态全没了，只剩 URL 上的 #/目录名，所以只能回到该目录的默认中间那张。
     iOS Safari 不丢页面，所以一直正常。
     办法：把「哪个目录、停在第几集」写进 sessionStorage（同一标签页有效，关掉即清），
     页面重载时照原样复原。iOS 上这段等于没跑，行为不变。 */
  const SKEY = "bm.fan.v1";
  const WKEY = "bm.welcomed2";

  function persist() {
    try {
      sessionStorage.setItem(
        SKEY,
        JSON.stringify({
          view: state.view,
          cat: state.cat,
          cFocus: state.cFocus,
          /* 在目录页时不记视频选中态：重新进目录应该回到该目录的默认那张 */
          vFocus: state.view === "videos" ? state.vFocus : null
        })
      );
    } catch (e) {}
  }

  function restore() {
    try {
      const s = JSON.parse(sessionStorage.getItem(SKEY) || "null");
      return s && typeof s === "object" ? s : null;
    } catch (e) {
      return null;
    }
  }

  /* ── 渲染：目录 ─────────────────────────── */
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function matchCat(cat) {
    const q = state.query.trim().toLowerCase();
    if (!q) return true;
    if (cat.name.toLowerCase().includes(q)) return true;
    return (cat.videos || []).some((v) => String(v.title).toLowerCase().includes(q));
  }

  function filteredCats() {
    return CATS.map((c, idx) => ({ c, idx })).filter((o) => matchCat(o.c));
  }

  function filteredVideos(cat) {
    if (!cat) return [];
    const q = state.query.trim().toLowerCase();
    return (cat.videos || [])
      .map((v, idx) => ({ v, idx }))
      .filter((o) => !q || String(o.v.title).toLowerCase().includes(q));
  }

  function renderCats() {
    const list = filteredCats();
    el.catFan.innerHTML = "";

    list.forEach(({ c, idx }, i) => {
      const card = document.createElement("article");
      card.className = "fcard";
      card.setAttribute("role", "option");
      card.dataset.idx = String(idx);
      card.style.setProperty("--accent", c.accent || "#FF6B57");
      card.innerHTML =
        '<div class="fcard-face">' +
        '<div class="fcard-art">' +
        '<img alt="" src="' + esc(pic(c.cover)) + '" width="560" height="787" decoding="async"' + (i < 6 ? "" : ' loading="lazy"') + ">" +
        '<span class="fcard-veil"></span>' +
        (c.no ? '<span class="fcard-no">' + esc(c.no) + "</span>" : "") +
        '<span class="fcard-label"><b>' + esc(c.name) + "</b><i>" + (c.videos || []).length + " 集</i></span>" +
        "</div>" +
        "</div>";
      el.catFan.appendChild(card);
    });

    catFan.setItems(Array.prototype.slice.call(el.catFan.children));
    el.empty.hidden = list.length > 0;
  }

  function renderVideos(cat) {
    const list = filteredVideos(cat);
    el.videoFan.innerHTML = "";

    list.forEach(({ v, idx }) => {
      const card = document.createElement("article");
      card.className = "fcard";
      card.setAttribute("role", "option");
      card.dataset.idx = String(idx);
      card.innerHTML =
        '<div class="fcard-face">' +
        '<div class="fcard-art fcard-art-v' + (v.thumb ? "" : " is-fallback") + '">' +
        '<img alt="" src="' + esc(pic(v.thumb || cat.cover)) + '" width="480" height="270" decoding="async" loading="lazy">' +
        '<span class="fcard-play"><svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M8 5.5v13c0 1.1 1.2 1.8 2.1 1.2l9.4-6.5c.8-.6.8-1.8 0-2.4L10.1 4.3C9.2 3.7 8 4.4 8 5.5Z" fill="currentColor"/></svg></span>' +
        (v.duration ? '<span class="fcard-dur">' + esc(v.duration) + "</span>" : "") +
        '<span class="fcard-no">' + pad(v.ep || idx + 1) + "</span>" +
        "</div>" +
        '<div class="fcard-meta"><b>' + esc(v.title) + "</b><i>" +
        (durText(v.duration) || v.size || "") +
        "</i></div>" +
        "</div>";
      el.videoFan.appendChild(card);
    });

    videoFan.setItems(Array.prototype.slice.call(el.videoFan.children));
    el.empty.hidden = list.length > 0 || !state.query;
  }

  /* ── 视图切换 ───────────────────────────── */
  function setView(name) {
    state.view = name;
    el.viewCats.classList.toggle("is-active", name === "cats");
    el.viewVideos.classList.toggle("is-active", name === "videos");
    document.body.classList.toggle("in-videos", name === "videos");
  }

  function enterCategory(idx, focusIdx) {
    const cat = CATS[idx];
    if (!cat) return;
    state.cat = idx;
    if (el.catTitle) el.catTitle.textContent = cat.name;
    document.body.style.setProperty("--accent", cat.accent || "#FF6B57");
    setView("videos");
    renderVideos(cat);
    /* 复原上次停的那一集（没有就停在默认的中间那张） */
    if (focusIdx != null && focusIdx >= 0) videoFan.selectIdx(focusIdx);
    el.videoFan.focus({ preventScroll: true });
    try {
      history.replaceState(null, "", "#/" + cat.id);
    } catch (err) {}
    persist();
  }

  function backToCats() {
    setView("cats");
    document.body.style.removeProperty("--accent");
    videoFan.refocus();
    el.catFan.focus({ preventScroll: true });
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (err) {}
    persist();
  }

  /* ── 播放器 ─────────────────────────────── */
  const v = el.video;
  let current = { cat: 0, vid: 0 };

  /* 尽量让播放页铺满整个屏幕。iPhone 不支持元素全屏，但 overlay 本来就是 100vh，视觉上一样 */
  function requestFull(node) {
    const fn = node.requestFullscreen || node.webkitRequestFullscreen || node.msRequestFullscreen;
    if (!fn) return;
    try {
      const r = fn.call(node);
      if (r && r.catch) r.catch(function () {});
    } catch (e) {}
  }

  function openNetdisk(url) {
    if (!url) return;
    const w = window.open(url, "_blank", "noopener");
    if (w) toast("已打开百度网盘播放页 · 播放器右下角可全屏");
    else toast("浏览器拦了新窗口，允许弹出窗口后再点一次");
  }

  function showState(kind, title, text, link) {
    el.pState.hidden = kind === "off";
    el.pSpinner.hidden = kind !== "loading";
    el.pStateTitle.textContent = title || "";
    el.pStateText.textContent = text || "";
    if (link) {
      el.pStateLink.href = link;
      el.pStateLink.hidden = false;
    } else {
      el.pStateLink.hidden = true;
    }
    const bad = kind === "error" || kind === "nosrc";
    el.pState.classList.toggle("is-error", bad);
    if (bad) el.pBigPlay.classList.add("is-hidden");
  }

  function openPlayer(catIdx, vidIdx) {
    const cat = CATS[catIdx];
    if (!cat) return;
    const vid = cat.videos[vidIdx];
    if (!vid) return;

    /* 没有站内片源：直接跳到百度网盘播放页，中间不再有「点击播放」那一屏 */
    if (!vid.src) {
      if (vid.netdisk) openNetdisk(vid.netdisk);
      else toast("这一集还没有片源");
      return;
    }

    current = { cat: catIdx, vid: vidIdx };

    el.pTitle.textContent = vid.title;
    el.pMeta.textContent = cat.name + " · 第 " + (vid.ep || vidIdx + 1) + " 集 · " +
      (durText(vid.duration) || vid.size || "");

    if (vid.netdisk) {
      el.pNetdisk.href = vid.netdisk;
      el.pNetdisk.hidden = false;
    } else {
      el.pNetdisk.hidden = true;
    }

    /* 进播放页就直接铺满屏幕（iPhone 不支持元素全屏，靠 overlay 本身占满视口） */
    const src = vid.src;

    el.player.classList.add("is-on");
    el.player.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    requestFull(el.player);
    try {
      history.replaceState(null, "", "#/" + cat.id + "/" + (vidIdx + 1));
    } catch (err) {}

    el.cFill.style.width = "0%";
    el.cKnob.style.left = "0%";
    el.cTime.textContent = "00:00 / 00:00";
    el.pBigPlay.classList.remove("is-hidden");

    const poster = pic(vid.thumb || cat.cover || "");
    /* 只有真实（横版）缩略图才当海报用，避免竖版封面被压成窄条 */
    if (vid.thumb) v.poster = pic(vid.thumb);
    else v.removeAttribute("poster");
    el.player.style.setProperty("--amb", poster ? 'url("' + poster + '")' : "none");

    showState("loading", "正在缓冲…", "");
    v.src = src;
    v.load();

    const p = v.play();
    if (p && p.catch) p.catch(() => showState("off"));

    setTimeout(() => {
      if (v.readyState < 2 && !v.error) showState("loading", "还在加载…", "网速慢的话再等等");
    }, 6000);
  }

  function closePlayer() {
    el.player.classList.remove("is-on");
    el.player.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    v.pause();
    v.removeAttribute("src");
    v.load();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    const cat = CATS[current.cat];
    if (cat) {
      try {
        history.replaceState(null, "", "#/" + cat.id);
      } catch (err) {}
    }
  }

  /* 播放器事件 */
  v.addEventListener("loadedmetadata", () => {
    showState("off");
    el.cTime.textContent = "00:00 / " + mmss(v.duration);
  });
  v.addEventListener("waiting", () => showState("loading", "正在缓冲…", ""));
  v.addEventListener("canplay", () => showState("off"));
  v.addEventListener("playing", () => {
    showState("off");
    el.pBigPlay.classList.add("is-hidden");
    el.cPlay.classList.add("is-playing");
  });
  v.addEventListener("pause", () => {
    el.pBigPlay.classList.remove("is-hidden");
    el.cPlay.classList.remove("is-playing");
  });
  v.addEventListener("timeupdate", () => {
    const d = v.duration || 0;
    const pct = d ? (v.currentTime / d) * 100 : 0;
    el.cFill.style.width = pct + "%";
    el.cKnob.style.left = pct + "%";
    el.cTime.textContent = mmss(v.currentTime) + " / " + mmss(d);
  });
  v.addEventListener("error", () => {
    const vid = CATS[current.cat] && CATS[current.cat].videos[current.vid];
    const link = (vid && vid.netdisk) || "";
    showState(
      "error",
      "这条直链播不了",
      "百度网盘的分享页不能直接播，需要的是直链（dlink / 对象存储地址）。链接也可能已经过期。",
      link
    );
  });

  v.addEventListener("click", () => (v.paused ? v.play() : v.pause()));
  el.pBigPlay.addEventListener("click", (e) => {
    e.stopPropagation();
    v.play();
  });
  el.pClose.addEventListener("click", closePlayer);
  el.stage.addEventListener("dblclick", toggleFull);

  el.cPlay.addEventListener("click", () => (v.paused ? v.play() : v.pause()));
  el.cMute.addEventListener("click", () => {
    v.muted = !v.muted;
    el.cMute.classList.toggle("is-off", v.muted);
  });
  el.cFull.addEventListener("click", toggleFull);

  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (el.stage.requestFullscreen) el.stage.requestFullscreen().catch(() => {});
  }

  /* 进度条拖动 */
  function seekFromEvent(e) {
    const r = el.cTrack.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    if (isFinite(v.duration)) v.currentTime = ratio * v.duration;
    el.cFill.style.width = ratio * 100 + "%";
    el.cKnob.style.left = ratio * 100 + "%";
  }

  let seeking = false;
  el.cTrack.addEventListener("pointerdown", (e) => {
    seeking = true;
    el.cTrack.setPointerCapture(e.pointerId);
    seekFromEvent(e);
  });
  el.cTrack.addEventListener("pointermove", (e) => {
    if (seeking) seekFromEvent(e);
  });
  el.cTrack.addEventListener("pointerup", () => (seeking = false));
  el.cTrack.addEventListener("pointercancel", () => (seeking = false));

  el.backBtn.addEventListener("click", backToCats);

  el.emptyBack.addEventListener("click", () => {
    state.query = "";
    setView("cats");
    renderCats();
  });

  /* ── 光标光斑 ───────────────────────────── */
  let glowRaf = 0;
  window.addEventListener("pointermove", (e) => {
    if (glowRaf) return;
    glowRaf = requestAnimationFrame(() => {
      glowRaf = 0;
      el.glow.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)";
    });
  });

  /* ── 全局键盘 ───────────────────────────── */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (el.player.classList.contains("is-on")) closePlayer();
      else if (state.view === "videos") backToCats();
      return;
    }
    if (!el.player.classList.contains("is-on")) return;
    if (e.key === " ") {
      e.preventDefault();
      v.paused ? v.play() : v.pause();
    } else if (e.key === "ArrowLeft") {
      v.currentTime = Math.max(0, v.currentTime - 10);
    } else if (e.key === "ArrowRight") {
      v.currentTime = Math.min(v.duration || 0, v.currentTime + 10);
    }
  });

  /* ── 禁缩放 ─────────────────────────────── */
  /* viewport 里已经 user-scalable=no，但 iOS Safari 从 10 起会忽略它，
     所以再补一道手势拦截：只拦「多于一根手指」的触摸，单指拖动卡片不受影响 */
  function lockZoom() {
    var stop = function (e) { e.preventDefault(); };

    /* 双指捏合（iOS 专有 gesture 事件） */
    ["gesturestart", "gesturechange", "gestureend"].forEach(function (t) {
      document.addEventListener(t, stop, { passive: false });
    });

    /* 多指 touchmove —— Safari 的 pinch 走这条路 */
    document.addEventListener(
      "touchmove",
      function (e) {
        if (e.touches && e.touches.length > 1) e.preventDefault();
      },
      { passive: false }
    );
  }

  /* ── 切卡的一声「哒」 ───────────────────── */
  /* 每换一张牌响一下。用几个 <audio> 轮着播，可以叠着响；
     每次都微调音高和音量，连划十几张也不会像机关枪。 */
  const tickPool = (function () {
    const SIZE = 4;
    const pool = [];
    let idx = 0;
    let armed = false;   /* 浏览器要求先有用户手势才能出声 */

    for (let i = 0; i < SIZE; i++) {
      const a = new Audio("assets/audio/tick.mp3");
      a.preload = "auto";
      a.volume = 0.3;
      pool.push(a);
    }

    /* 第一次触摸 / 按键之后才允许响：开屏复原位置时不该「哒」一声 */
    const arm = () => { armed = true; };
    ["pointerdown", "keydown", "touchstart"].forEach((t) => {
      window.addEventListener(t, arm, { passive: true, once: true });
    });

    return function play() {
      if (!armed) return;
      let a = null;
      for (let i = 0; i < SIZE; i++) {
        const c = pool[(idx + i) % SIZE];
        if (c.paused || c.ended) {
          a = c;
          idx = (idx + i + 1) % SIZE;
          break;
        }
      }
      if (!a) { a = pool[idx]; idx = (idx + 1) % SIZE; }
      try {
        a.volume = 0.26 + Math.random() * 0.1;
        a.playbackRate = 0.94 + Math.random() * 0.12;
        a.currentTime = 0;
        const p = a.play();
        if (p && p.catch) p.catch(() => {});
      } catch (err) {}
    };
  })();

  function tick() {
    tickPool();
  }

  /* 手机竖屏被「把手机横过来」挡住时，画面是看不见的，先用一个探针问一下 */
  function rotateGated() {
    var g = document.getElementById("rotateGate");
    return !!g && getComputedStyle(g).display !== "none";
  }

  /* ── 开屏欢迎语 ─────────────────────────── */
  /* 只在「目录页第一次加载完」放一次；从下级目录返回不重放 */
  function playWelcome() {
    var a;
    try {
      a = new Audio("assets/audio/welcome-girl.mp3");
    } catch (err) {
      return;
    }
    a.preload = "auto";
    a.volume = 0.75;

    function once() {
      var p = a.play();
      if (!p || !p.catch) return Promise.resolve(true);
      return p.then(function () { return true; }).catch(function () { return false; });
    }

    function kickLater() {
      /* 浏览器还没有用户手势，等第一次点击 / 按键补播 */
      var KICKS = ["pointerdown", "keydown", "touchstart"];
      function kick() {
        a.play().catch(function () {});
        KICKS.forEach(function (t) { window.removeEventListener(t, kick); });
      }
      KICKS.forEach(function (t) { window.addEventListener(t, kick, { passive: true }); });
    }

    function fire() {
      once().then(function (ok) {
        if (!ok) kickLater();
      });
    }

    /* 时长 ~3.9s（小女孩邀请），等扇形落位再起，别跟飞入动画抢注意力 */
    setTimeout(function () {
      /* 竖屏还挡着就别念了——用户正看着「请横过来」，听到招呼只会莫名其妙。
         等真的横过来（或窗口够宽了）再打招呼 */
      if (rotateGated()) {
        function waitTurn() {
          if (rotateGated()) return;
          window.removeEventListener("orientationchange", waitTurn);
          window.removeEventListener("resize", waitTurn);
          setTimeout(fire, 240);
        }
        window.addEventListener("orientationchange", waitTurn);
        window.addEventListener("resize", waitTurn);
        return;
      }
      fire();
    }, 360);
  }

  /* 同一标签页只打一次招呼：安卓那边从网盘回来会重载，不该再念一遍 */
  function welcomeOnce() {
    try {
      if (sessionStorage.getItem(WKEY)) return;
      sessionStorage.setItem(WKEY, "1");
    } catch (err) {}
    playWelcome();
  }

  /* ── 启动 ───────────────────────────────── */
  (function init() {
    lockZoom();

    /* 先取上次的位置 —— 必须在任何重新渲染把新状态写回之前读出来 */
    const saved = restore();

    renderCats();
    setView("cats");

    /* 目录卡的位置总是先复原 —— 之后就算直接进了某一集，
       「返回上一级」时看到的还是当初点的那张目录卡 */
    if (saved && saved.cFocus >= 0) catFan.selectIdx(saved.cFocus);

    /* 支持直链：#/animals 进目录，#/animals/3 直接播第 3 集 */
    const m = /^#\/?([\w-]+)(?:\/(\d+))?$/.exec(location.hash || "");
    const hashIdx = m ? CATS.findIndex((c) => c.id === m[1]) : -1;

    if (hashIdx >= 0) {
      /* 有 hash：以 URL 里的目录为准（安卓从网盘回来重载走的就是这里），
         同一个目录才复原上次停的那一集 */
      const sameCat = saved && saved.cat === hashIdx;
      /* 直链指向的是另一个目录：返回上一级时该看到这张，而不是上次那张 */
      if (!sameCat) catFan.selectIdx(hashIdx);
      setTimeout(() => {
        enterCategory(hashIdx, sameCat ? saved.vFocus : null);
      }, 60);
      return; /* 深链直接进了目录，这次不算「停在目录页」 */
    }

    if (saved && saved.view === "videos" && CATS[saved.cat]) {
      /* 没 hash 但上次停在某一集：页面被回收后重载，照原样回去 */
      setTimeout(() => {
        enterCategory(saved.cat, saved.vFocus);
      }, 60);
      return;
    }

    /* 停在目录页：位置已在上头复原，这里只管打招呼 */
    welcomeOnce();
  })();
})();
