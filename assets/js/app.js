/* ============================================================
   斑马放映室 · 交互逻辑
   卡片以「手上的一叠扑克牌」方式扇形展开，停在哪张哪张翻开
   ============================================================ */
(function () {
  "use strict";

  const S = window.SITE || { categories: [] };
  const $ = (sel, root) => (root || document).querySelector(sel);
  const CATS = S.categories || [];

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

  const state = { view: "cats", cat: 0, query: "" };

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

    let all = [];                        // 全部牌
    let shown = [];                      // 当前这一把
    let page = 0;
    let per = 10;
    let focus = -1;                      // 当前停留的牌（页内下标）

    const geo = { R: 900, dyMax: 0, maxAngle: 26, cw: 190, n: 0, partDeg: 3.2 };

    /* 一屏放几张：窄屏少放几张，牌才不会小到看不清；
       平板竖屏和横屏可用宽度差很多，分开判断 */
    function perPage() {
      const w = fanEl.clientWidth || 1200;
      const h = fanEl.clientHeight || 420;
      const portrait = h > w * 0.85;
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
      /* 左右留白，别让最外侧的牌顶到屏幕边 */
      const inset = W0 > 1000 ? 88 : W0 > 640 ? 40 : 14;
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
      const ch = cw * ratio;

      /* 竖屏平板：屏幕很高，弧摊得更开一点，否则整把牌像贴在中间一条 */
      if (maxAngle && H > ch * 1.5) maxAngle = Math.min(29, maxAngle + 4);

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
        /* 停留时两侧让开的角（按像素等价换算，窄屏角度要大得多） */
        partDeg = Math.max(2.6, Math.min(9, ((cw * 0.34) / R) * 57.2958));
        /* 把让开的角度也预先留进宽度里，否则一停留最外侧的牌就顶出屏幕 */
        R = fit(maxAngle + partDeg + 1.5);
        const rad = (maxAngle * Math.PI) / 180;
        dyMax = R * (1 - Math.cos(rad));
      }

      fanEl.style.setProperty("--cw", cw.toFixed(1) + "px");
      fanEl.style.setProperty("--ch", ch.toFixed(1) + "px");

      /* 竖向放不下就整把等比缩小 */
      const needH = ch + dyMax + 24;
      const k = needH > H ? Math.max(0.45, H / needH) : 1;
      fanEl.style.transform = k < 0.99 ? "scale(" + k.toFixed(3) + ")" : "";

      geo.R = R; geo.dyMax = dyMax; geo.maxAngle = maxAngle; geo.cw = cw; geo.n = n;
      geo.partDeg = partDeg;
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
            /* 往上抽出来，而不是只抬一点：窄屏上平着抬会整张压住旁边的牌 */
            lift = -(geo.cw * ratio * 0.44);
            sc = 1.05;
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

    function renderPage() {
      const start = page * per;
      shown = all.slice(start, start + per);
      all.forEach((c) => { c.hidden = true; });
      shown.forEach((c) => { c.hidden = false; });
      focus = shown.length ? Math.floor((shown.length - 1) / 2) : -1;
      measure();

      /* 首次/换页时先关掉过渡，让它直接出现在扇形位置上 */
      fanEl.classList.add("no-anim");
      place();
      void fanEl.offsetHeight;
      requestAnimationFrame(() => fanEl.classList.remove("no-anim"));

      paintCount();
    }

    function setFocus(i) {
      if (i < 0 || i >= shown.length || i === focus) return;
      focus = i;
      place();
    }

    function goPage(p) {
      const total = pageCount();
      page = ((p % total) + total) % total;
      renderPage();
    }

    /* 鼠标划过：翻到哪张 */
    fanEl.addEventListener("pointerover", (e) => {
      if (e.pointerType === "touch") return;
      const card = e.target.closest(".fcard");
      if (!card) return;
      const i = shown.indexOf(card);
      if (i >= 0) setFocus(i);
    });

    /* 点击：没翻开就先翻开，已经翻开就进去 */
    fanEl.addEventListener("click", (e) => {
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

    /* 尺寸变了重新摆 */
    let raf = 0;
    if (window.ResizeObserver) {
      new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const p = perPage();
          if (p !== per) {
            per = p;
            page = 0;
          }
          renderPage();
        });
      }).observe(fanEl);
    } else {
      window.addEventListener("resize", () => renderPage());
    }

    return {
      setItems(nodes) {
        all = nodes;
        per = perPage();
        page = 0;
        renderPage();
      },
      setFocus,
      refocus() {
        renderPage();
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
    onPick: (idx) => enterCategory(idx)
  });

  const videoFan = makeFan(el.videoFan, {
    ratio: 1.04,
    unit: "集",
    countEl: el.videoCount,
    prevBtn: el.videoPrev,
    nextBtn: el.videoNext,
    onPick: (idx) => openPlayer(state.cat, idx)
  });

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
        '<img alt="" src="' + esc(c.cover) + '"' + (i < 6 ? "" : ' loading="lazy"') + ">" +
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
        '<img alt="" src="' + esc(v.thumb || cat.cover) + '" loading="lazy">' +
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

  function enterCategory(idx) {
    const cat = CATS[idx];
    if (!cat) return;
    state.cat = idx;
    if (el.catTitle) el.catTitle.textContent = cat.name;
    document.body.style.setProperty("--accent", cat.accent || "#FF6B57");
    setView("videos");
    renderVideos(cat);
    el.videoFan.focus({ preventScroll: true });
    try {
      history.replaceState(null, "", "#/" + cat.id);
    } catch (err) {}
  }

  function backToCats() {
    setView("cats");
    document.body.style.removeProperty("--accent");
    videoFan.refocus();
    el.catFan.focus({ preventScroll: true });
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch (err) {}
  }

  /* ── 播放器 ─────────────────────────────── */
  const v = el.video;
  let current = { cat: 0, vid: 0 };

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

    /* 只有网盘播放页、没有直链：直接开网盘自己的播放器，不在站内搭一个播不了的壳 */
    if (!vid.src && vid.netdisk) {
      const w = window.open(vid.netdisk, "_blank", "noopener");
      if (w) toast("已打开百度网盘播放页 · 打不开就先登录网盘账号");
      else toast("浏览器拦了新窗口，请允许弹出窗口再点一次");
      return;
    }

    const src = vid.src || S.demoFallback || "";

    el.player.classList.add("is-on");
    el.player.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    try {
      history.replaceState(null, "", "#/" + cat.id + "/" + (vidIdx + 1));
    } catch (err) {}

    el.cFill.style.width = "0%";
    el.cKnob.style.left = "0%";
    el.cTime.textContent = "00:00 / 00:00";
    el.pBigPlay.classList.remove("is-hidden");

    const poster = vid.thumb || cat.cover || "";
    /* 只有真实（横版）缩略图才当海报用，避免竖版封面被压成窄条 */
    if (vid.thumb) v.poster = vid.thumb;
    else v.removeAttribute("poster");
    el.player.style.setProperty("--amb", poster ? 'url("' + poster + '")' : "none");

    if (!src) {
      v.removeAttribute("src");
      v.load();
      showState(
        "nosrc",
        "这部还没挂视频源",
        "在 data.js 里给这条视频填上 src（直链）就能在这里播；也可以先去网盘看。",
        vid.netdisk || ""
      );
      return;
    }

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
  el.pBigPlay.addEventListener("click", () => v.play());
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

  /* ── 开屏欢迎语 ─────────────────────────── */
  /* 只在「目录页第一次加载完」放一次；从下级目录返回不重放 */
  function playWelcome() {
    var a;
    try {
      a = new Audio("assets/audio/welcome.mp3");
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

    /* 时长 ~3.3s，等扇形落位再起，别跟飞入动画抢注意力 */
    setTimeout(function () {
      once().then(function (ok) {
        if (ok) return;
        /* 浏览器还没有用户手势，等第一次点击 / 按键补播 */
        var KICKS = ["pointerdown", "keydown", "touchstart"];
        function kick() {
          a.play().catch(function () {});
          KICKS.forEach(function (t) { window.removeEventListener(t, kick); });
        }
        KICKS.forEach(function (t) { window.addEventListener(t, kick, { passive: true }); });
      });
    }, 360);
  }

  /* ── 启动 ───────────────────────────────── */
  (function init() {
    renderCats();
    setView("cats");

    /* 支持直链：#/animals 进目录，#/animals/3 直接播第 3 集 */
    const m = /^#\/?([\w-]+)(?:\/(\d+))?$/.exec(location.hash || "");
    const direct = m ? CATS.findIndex((c) => c.id === m[1]) : -1;
    if (direct >= 0) {
      const idx = direct;
      setTimeout(() => {
        enterCategory(idx);
        const ep = parseInt(m[2], 10);
        if (ep > 0) setTimeout(() => openPlayer(idx, ep - 1), 300);
      }, 60);
      return; /* 深链直接进了目录，这次不算「停在目录页」 */
    }

    /* 真正停在目录页：打招呼 */
    playWelcome();
  })();
})();
