/* ============================================================
   斑马放映室 · 内容配置
   ------------------------------------------------------------
   本文件由 tools/build_data.py 根据网盘清单生成，一般不用手改。
   一个扇形最多摊 10 张牌（窄屏 5 张），超过会自动分「下一组」。

   目录字段：
     no / id / name / cover / accent   序号、锚点、名字、封面、主色
     videos                            这个目录里的片子

   一个视频的字段：
     title    片名（去掉序号）
     ep       第几集
     size     文件大小，没拿到时长时显示这个
     thumb    百度网盘的默认缩略图
     path     网盘里的完整路径
     netdisk  网盘独立播放页（play/video#/video?path=，path 必须百分号编码）

   ⚠ 网盘分享页链接不能直接喂给 <video>，src 要留空时才走网盘跳转。
   ============================================================ */

window.SITE = {
  brand: "斑马放映室",
  tagline: "扇形选片，点开就播",

  categories: [
    {
      no: "01",
      id: "body",
      name: "人体",
      cover: "assets/covers/cover-body.jpg",
      accent: "#FF8FB1",
      videos: [
        { title: "认识人体", ep: 1, size: "415.4 MB", thumb: "assets/thumbs/c00_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F1%E8%AE%A4%E8%AF%86%E4%BA%BA%E4%BD%93.mp4", path: "/斑马百科/0~4岁热学榜/01人体/1认识人体.mp4" },
        { title: "眼睛和耳朵", ep: 2, size: "430.2 MB", thumb: "assets/thumbs/c00_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F2%E7%9C%BC%E7%9D%9B%E5%92%8C%E8%80%B3%E6%9C%B5.mp4", path: "/斑马百科/0~4岁热学榜/01人体/2眼睛和耳朵.mp4" },
        { title: "鼻子和嘴", ep: 3, size: "380.1 MB", thumb: "assets/thumbs/c00_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F3%E9%BC%BB%E5%AD%90%E5%92%8C%E5%98%B4.mp4", path: "/斑马百科/0~4岁热学榜/01人体/3鼻子和嘴.mp4" },
        { title: "皮肤", ep: 4, size: "407.3 MB", thumb: "assets/thumbs/c00_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F4%E7%9A%AE%E8%82%A4.mp4", path: "/斑马百科/0~4岁热学榜/01人体/4皮肤.mp4" },
        { title: "肺", ep: 5, size: "423.2 MB", thumb: "assets/thumbs/c00_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F5%E8%82%BA.mp4", path: "/斑马百科/0~4岁热学榜/01人体/5肺.mp4" },
        { title: "心脏和血液", ep: 6, size: "545.5 MB", thumb: "assets/thumbs/c00_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F6%E5%BF%83%E8%84%8F%E5%92%8C%E8%A1%80%E6%B6%B2.mp4", path: "/斑马百科/0~4岁热学榜/01人体/6心脏和血液.mp4" },
        { title: "胃和肠", ep: 7, size: "444.8 MB", thumb: "assets/thumbs/c00_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F7%E8%83%83%E5%92%8C%E8%82%A0.mp4", path: "/斑马百科/0~4岁热学榜/01人体/7胃和肠.mp4" },
        { title: "肾脏和膀胱", ep: 8, size: "441.3 MB", thumb: "assets/thumbs/c00_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F8%E8%82%BE%E8%84%8F%E5%92%8C%E8%86%80%E8%83%B1.mp4", path: "/斑马百科/0~4岁热学榜/01人体/8肾脏和膀胱.mp4" },
        { title: "骨骼和肌肉", ep: 9, size: "351.5 MB", thumb: "assets/thumbs/c00_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F9%E9%AA%A8%E9%AA%BC%E5%92%8C%E8%82%8C%E8%82%89.mp4", path: "/斑马百科/0~4岁热学榜/01人体/9骨骼和肌肉.mp4" },
        { title: "脑", ep: 10, size: "356.3 MB", thumb: "assets/thumbs/c00_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F10%E8%84%91.mp4", path: "/斑马百科/0~4岁热学榜/01人体/10脑.mp4" },
        { title: "人体的免疫", ep: 11, size: "466.9 MB", thumb: "assets/thumbs/c00_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F11%E4%BA%BA%E4%BD%93%E7%9A%84%E5%85%8D%E7%96%AB.mp4", path: "/斑马百科/0~4岁热学榜/01人体/11人体的免疫.mp4" },
        { title: "人体的生长", ep: 12, size: "657.1 MB", thumb: "assets/thumbs/c00_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F01%E4%BA%BA%E4%BD%93%2F12%E4%BA%BA%E4%BD%93%E7%9A%84%E7%94%9F%E9%95%BF.mp4", path: "/斑马百科/0~4岁热学榜/01人体/12人体的生长.mp4" }
      ]
    },
    {
      no: "02",
      id: "dino",
      name: "恐龙",
      cover: "assets/covers/cover-dino.jpg",
      accent: "#6FBF5B",
      videos: [
        { title: "探秘恐龙世界", ep: 1, size: "404.4 MB", thumb: "assets/thumbs/c01_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F1.%E6%8E%A2%E7%A7%98%E6%81%90%E9%BE%99%E4%B8%96%E7%95%8C.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/1.探秘恐龙世界.mp4" },
        { title: "恐龙时代", ep: 2, size: "320.8 MB", thumb: "assets/thumbs/c01_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F2.%E6%81%90%E9%BE%99%E6%97%B6%E4%BB%A3.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/2.恐龙时代.mp4" },
        { title: "恐龙的外表", ep: 3, size: "328.8 MB", thumb: "assets/thumbs/c01_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F3.%E6%81%90%E9%BE%99%E7%9A%84%E5%A4%96%E8%A1%A8.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/3.恐龙的外表.mp4" },
        { title: "恐龙的食性", ep: 4, size: "264.1 MB", thumb: "assets/thumbs/c01_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F4.%E6%81%90%E9%BE%99%E7%9A%84%E9%A3%9F%E6%80%A7.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/4.恐龙的食性.mp4" },
        { title: "恐龙的运动", ep: 5, size: "380.6 MB", thumb: "assets/thumbs/c01_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F5.%E6%81%90%E9%BE%99%E7%9A%84%E8%BF%90%E5%8A%A8.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/5.恐龙的运动.mp4" },
        { title: "恐龙的攻击和防御", ep: 6, size: "357.7 MB", thumb: "assets/thumbs/c01_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F6.%E6%81%90%E9%BE%99%E7%9A%84%E6%94%BB%E5%87%BB%E5%92%8C%E9%98%B2%E5%BE%A1.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/6.恐龙的攻击和防御.mp4" },
        { title: "恐龙的繁衍", ep: 7, size: "293.8 MB", thumb: "assets/thumbs/c01_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F7.%E6%81%90%E9%BE%99%E7%9A%84%E7%B9%81%E8%A1%8D.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/7.恐龙的繁衍.mp4" },
        { title: "温和的巨龙", ep: 8, size: "385.5 MB", thumb: "assets/thumbs/c01_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F8.%E6%B8%A9%E5%92%8C%E7%9A%84%E5%B7%A8%E9%BE%99.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/8.温和的巨龙.mp4" },
        { title: "装甲高手", ep: 9, size: "399.6 MB", thumb: "assets/thumbs/c01_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F9.%E8%A3%85%E7%94%B2%E9%AB%98%E6%89%8B.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/9.装甲高手.mp4" },
        { title: "灵巧猎手", ep: 10, size: "361.9 MB", thumb: "assets/thumbs/c01_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F10.%E7%81%B5%E5%B7%A7%E7%8C%8E%E6%89%8B.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/10.灵巧猎手.mp4" },
        { title: "顶级霸主", ep: 11, size: "370.5 MB", thumb: "assets/thumbs/c01_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F11.%E9%A1%B6%E7%BA%A7%E9%9C%B8%E4%B8%BB.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/11.顶级霸主.mp4" },
        { title: "上天入海的爬行动物", ep: 12, size: "536.8 MB", thumb: "assets/thumbs/c01_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F02%E6%81%90%E9%BE%99%2F12.%E4%B8%8A%E5%A4%A9%E5%85%A5%E6%B5%B7%E7%9A%84%E7%88%AC%E8%A1%8C%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/02恐龙/12.上天入海的爬行动物.mp4" }
      ]
    },
    {
      no: "03",
      id: "food",
      name: "揭秘食物",
      cover: "assets/covers/cover-food.jpg",
      accent: "#F0983B",
      videos: [
        { title: "认识食物", ep: 1, size: "528.0 MB", thumb: "assets/thumbs/c02_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F1%E8%AE%A4%E8%AF%86%E9%A3%9F%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/1认识食物.mp4" },
        { title: "米饭与面食", ep: 2, size: "553.1 MB", thumb: "assets/thumbs/c02_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F2%E7%B1%B3%E9%A5%AD%E4%B8%8E%E9%9D%A2%E9%A3%9F.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/2米饭与面食.mp4" },
        { title: "肉类", ep: 3, size: "520.5 MB", thumb: "assets/thumbs/c02_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F3%E8%82%89%E7%B1%BB.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/3肉类.mp4" },
        { title: "蛋与奶", ep: 4, size: "431.7 MB", thumb: "assets/thumbs/c02_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F4%E8%9B%8B%E4%B8%8E%E5%A5%B6.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/4蛋与奶.mp4" },
        { title: "大豆与豆腐", ep: 5, size: "504.0 MB", thumb: "assets/thumbs/c02_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F5%E5%A4%A7%E8%B1%86%E4%B8%8E%E8%B1%86%E8%85%90.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/5大豆与豆腐.mp4" },
        { title: "蔬菜", ep: 6, size: "497.8 MB", thumb: "assets/thumbs/c02_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F6%E8%94%AC%E8%8F%9C.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/6蔬菜.mp4" },
        { title: "水果", ep: 7, size: "538.6 MB", thumb: "assets/thumbs/c02_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F7%E6%B0%B4%E6%9E%9C.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/7水果.mp4" },
        { title: "茶与酒", ep: 8, size: "497.2 MB", thumb: "assets/thumbs/c02_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F8%E8%8C%B6%E4%B8%8E%E9%85%92.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/8茶与酒.mp4" },
        { title: "咸与辣", ep: 9, size: "440.5 MB", thumb: "assets/thumbs/c02_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F9%E5%92%B8%E4%B8%8E%E8%BE%A3.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/9咸与辣.mp4" },
        { title: "酸与臭", ep: 10, size: "430.7 MB", thumb: "assets/thumbs/c02_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F10%E9%85%B8%E4%B8%8E%E8%87%AD.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/10酸与臭.mp4" },
        { title: "苦与甜", ep: 11, size: "461.5 MB", thumb: "assets/thumbs/c02_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F11%E8%8B%A6%E4%B8%8E%E7%94%9C.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/11苦与甜.mp4" },
        { title: "中餐与西餐", ep: 12, size: "542.4 MB", thumb: "assets/thumbs/c02_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F03%E6%8F%AD%E7%A7%98%E9%A3%9F%E7%89%A9%2F12%E4%B8%AD%E9%A4%90%E4%B8%8E%E8%A5%BF%E9%A4%90.mp4", path: "/斑马百科/0~4岁热学榜/03揭秘食物/12中餐与西餐.mp4" }
      ]
    },
    {
      no: "04",
      id: "vehicle",
      name: "交通工具",
      cover: "assets/covers/cover-vehicle.jpg",
      accent: "#4FB8E8",
      videos: [
        { title: "认识交通工具", ep: 1, size: "1.7 GB", thumb: "assets/thumbs/c03_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F1.%E8%AE%A4%E8%AF%86%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/1.认识交通工具.mp4" },
        { title: "自行车与摩托车", ep: 2, size: "1.8 GB", thumb: "assets/thumbs/c03_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F2.%E8%87%AA%E8%A1%8C%E8%BD%A6%E4%B8%8E%E6%91%A9%E6%89%98%E8%BD%A6.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/2.自行车与摩托车.mp4" },
        { title: "轿车与赛车", ep: 3, size: "1.3 GB", thumb: "assets/thumbs/c03_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F3.%E8%BD%BF%E8%BD%A6%E4%B8%8E%E8%B5%9B%E8%BD%A6.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/3.轿车与赛车.mp4" },
        { title: "挖掘机与起重机", ep: 4, size: "1.3 GB", thumb: "assets/thumbs/c03_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F4.%E6%8C%96%E6%8E%98%E6%9C%BA%E4%B8%8E%E8%B5%B7%E9%87%8D%E6%9C%BA.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/4.挖掘机与起重机.mp4" },
        { title: "消防车与救护车", ep: 5, size: "1.4 GB", thumb: "assets/thumbs/c03_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F5.%E6%B6%88%E9%98%B2%E8%BD%A6%E4%B8%8E%E6%95%91%E6%8A%A4%E8%BD%A6.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/5.消防车与救护车.mp4" },
        { title: "清扫车与垃圾车", ep: 6, size: "1.3 GB", thumb: "assets/thumbs/c03_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F6.%E6%B8%85%E6%89%AB%E8%BD%A6%E4%B8%8E%E5%9E%83%E5%9C%BE%E8%BD%A6.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/6.清扫车与垃圾车.mp4" },
        { title: "地铁与单轨", ep: 7, size: "1.4 GB", thumb: "assets/thumbs/c03_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F7.%E5%9C%B0%E9%93%81%E4%B8%8E%E5%8D%95%E8%BD%A8.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/7.地铁与单轨.mp4" },
        { title: "火车与动车组", ep: 8, size: "1.4 GB", thumb: "assets/thumbs/c03_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F8.%E7%81%AB%E8%BD%A6%E4%B8%8E%E5%8A%A8%E8%BD%A6%E7%BB%84.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/8.火车与动车组.mp4" },
        { title: "渡轮与破冰船", ep: 9, size: "1.3 GB", thumb: "assets/thumbs/c03_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F9.%E6%B8%A1%E8%BD%AE%E4%B8%8E%E7%A0%B4%E5%86%B0%E8%88%B9.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/9.渡轮与破冰船.mp4" },
        { title: "潜水器与潜水艇", ep: 10, size: "1.1 GB", thumb: "assets/thumbs/c03_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F10.%E6%BD%9C%E6%B0%B4%E5%99%A8%E4%B8%8E%E6%BD%9C%E6%B0%B4%E8%89%87.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/10.潜水器与潜水艇.mp4" },
        { title: "飞机与无人机", ep: 11, size: "1.6 GB", thumb: "assets/thumbs/c03_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F11.%E9%A3%9E%E6%9C%BA%E4%B8%8E%E6%97%A0%E4%BA%BA%E6%9C%BA.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/11.飞机与无人机.mp4" },
        { title: "航天飞机与深空探测器", ep: 12, size: "1.4 GB", thumb: "assets/thumbs/c03_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F04%E4%BA%A4%E9%80%9A%E5%B7%A5%E5%85%B7%2F12.%E8%88%AA%E5%A4%A9%E9%A3%9E%E6%9C%BA%E4%B8%8E%E6%B7%B1%E7%A9%BA%E6%8E%A2%E6%B5%8B%E5%99%A8.mp4", path: "/斑马百科/0~4岁热学榜/04交通工具/12.航天飞机与深空探测器.mp4" }
      ]
    },
    {
      no: "05",
      id: "insect",
      name: "昆虫",
      cover: "assets/covers/cover-insect.jpg",
      accent: "#A8C93F",
      videos: [
        { title: "（什么是昆虫）", ep: 1, size: "357.6 MB", thumb: "assets/thumbs/c04_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F1%EF%BC%88%E4%BB%80%E4%B9%88%E6%98%AF%E6%98%86%E8%99%AB%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/1（什么是昆虫）.mp4" },
        { title: "（昆虫的足）", ep: 2, size: "363.7 MB", thumb: "assets/thumbs/c04_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F2%EF%BC%88%E6%98%86%E8%99%AB%E7%9A%84%E8%B6%B3%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/2（昆虫的足）.mp4" },
        { title: "（昆虫的翅膀）", ep: 3, size: "280.2 MB", thumb: "assets/thumbs/c04_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F3%EF%BC%88%E6%98%86%E8%99%AB%E7%9A%84%E7%BF%85%E8%86%80%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/3（昆虫的翅膀）.mp4" },
        { title: "（昆虫的触角）", ep: 4, size: "323.3 MB", thumb: "assets/thumbs/c04_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F4%EF%BC%88%E6%98%86%E8%99%AB%E7%9A%84%E8%A7%A6%E8%A7%92%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/4（昆虫的触角）.mp4" },
        { title: "（昆虫的口器）", ep: 5, size: "258.7 MB", thumb: "assets/thumbs/c04_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F5%EF%BC%88%E6%98%86%E8%99%AB%E7%9A%84%E5%8F%A3%E5%99%A8%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/5（昆虫的口器）.mp4" },
        { title: "（昆虫的防御）", ep: 6, size: "303.8 MB", thumb: "assets/thumbs/c04_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F6%EF%BC%88%E6%98%86%E8%99%AB%E7%9A%84%E9%98%B2%E5%BE%A1%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/6（昆虫的防御）.mp4" },
        { title: "（昆虫的变态发育）", ep: 7, size: "237.8 MB", thumb: "assets/thumbs/c04_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F7%EF%BC%88%E6%98%86%E8%99%AB%E7%9A%84%E5%8F%98%E6%80%81%E5%8F%91%E8%82%B2%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/7（昆虫的变态发育）.mp4" },
        { title: "（夜行昆虫）", ep: 8, size: "221.8 MB", thumb: "assets/thumbs/c04_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F8%EF%BC%88%E5%A4%9C%E8%A1%8C%E6%98%86%E8%99%AB%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/8（夜行昆虫）.mp4" },
        { title: "（发声昆虫）", ep: 9, size: "347.9 MB", thumb: "assets/thumbs/c04_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F9%EF%BC%88%E5%8F%91%E5%A3%B0%E6%98%86%E8%99%AB%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/9（发声昆虫）.mp4" },
        { title: "（昆虫的拟态和伪装）", ep: 10, size: "349.1 MB", thumb: "assets/thumbs/c04_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F10%EF%BC%88%E6%98%86%E8%99%AB%E7%9A%84%E6%8B%9F%E6%80%81%E5%92%8C%E4%BC%AA%E8%A3%85%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/10（昆虫的拟态和伪装）.mp4" },
        { title: "（水生昆虫）", ep: 11, size: "380.8 MB", thumb: "assets/thumbs/c04_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F11%EF%BC%88%E6%B0%B4%E7%94%9F%E6%98%86%E8%99%AB%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/11（水生昆虫）.mp4" },
        { title: "（社会性昆虫）", ep: 12, size: "315.8 MB", thumb: "assets/thumbs/c04_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F05%E6%98%86%E8%99%AB%2F12%EF%BC%88%E7%A4%BE%E4%BC%9A%E6%80%A7%E6%98%86%E8%99%AB%EF%BC%89.mp4", path: "/斑马百科/0~4岁热学榜/05昆虫/12（社会性昆虫）.mp4" }
      ]
    },
    {
      no: "06",
      id: "plant",
      name: "植物",
      cover: "assets/covers/cover-plant.jpg",
      accent: "#3FB083",
      videos: [
        { title: "认识植物", ep: 1, size: "1.6 GB", thumb: "assets/thumbs/c05_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F1.%E8%AE%A4%E8%AF%86%E6%A4%8D%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/06植物/1.认识植物.mp4" },
        { title: "植物的根", ep: 2, size: "1.3 GB", thumb: "assets/thumbs/c05_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F2.%E6%A4%8D%E7%89%A9%E7%9A%84%E6%A0%B9.mp4", path: "/斑马百科/0~4岁热学榜/06植物/2.植物的根.mp4" },
        { title: "植物的茎", ep: 3, size: "1.4 GB", thumb: "assets/thumbs/c05_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F3.%E6%A4%8D%E7%89%A9%E7%9A%84%E8%8C%8E.mp4", path: "/斑马百科/0~4岁热学榜/06植物/3.植物的茎.mp4" },
        { title: "植物的叶", ep: 4, size: "1.3 GB", thumb: "assets/thumbs/c05_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F4.%E6%A4%8D%E7%89%A9%E7%9A%84%E5%8F%B6.mp4", path: "/斑马百科/0~4岁热学榜/06植物/4.植物的叶.mp4" },
        { title: "植物的花", ep: 5, size: "1.3 GB", thumb: "assets/thumbs/c05_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F5.%E6%A4%8D%E7%89%A9%E7%9A%84%E8%8A%B1.mp4", path: "/斑马百科/0~4岁热学榜/06植物/5.植物的花.mp4" },
        { title: "植物的果实", ep: 6, size: "1.4 GB", thumb: "assets/thumbs/c05_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F6.%E6%A4%8D%E7%89%A9%E7%9A%84%E6%9E%9C%E5%AE%9E.mp4", path: "/斑马百科/0~4岁热学榜/06植物/6.植物的果实.mp4" },
        { title: "植物的种子", ep: 7, size: "1.3 GB", thumb: "assets/thumbs/c05_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F7.%E6%A4%8D%E7%89%A9%E7%9A%84%E7%A7%8D%E5%AD%90.mp4", path: "/斑马百科/0~4岁热学榜/06植物/7.植物的种子.mp4" },
        { title: "植物的生长与繁殖", ep: 8, size: "1.3 GB", thumb: "assets/thumbs/c05_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F8.%E6%A4%8D%E7%89%A9%E7%9A%84%E7%94%9F%E9%95%BF%E4%B8%8E%E7%B9%81%E6%AE%96.mp4", path: "/斑马百科/0~4岁热学榜/06植物/8.植物的生长与繁殖.mp4" },
        { title: "食虫植物", ep: 9, size: "1.4 GB", thumb: "assets/thumbs/c05_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F9.%E9%A3%9F%E8%99%AB%E6%A4%8D%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/06植物/9.食虫植物.mp4" },
        { title: "坚强的植物", ep: 10, size: "1.3 GB", thumb: "assets/thumbs/c05_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F10.%E5%9D%9A%E5%BC%BA%E7%9A%84%E6%A4%8D%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/06植物/10.坚强的植物.mp4" },
        { title: "水生植物", ep: 11, size: "1.3 GB", thumb: "assets/thumbs/c05_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F11.%E6%B0%B4%E7%94%9F%E6%A4%8D%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/06植物/11.水生植物.mp4" },
        { title: "千姿百态的植物", ep: 12, size: "1.8 GB", thumb: "assets/thumbs/c05_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F06%E6%A4%8D%E7%89%A9%2F12.%E5%8D%83%E5%A7%BF%E7%99%BE%E6%80%81%E7%9A%84%E6%A4%8D%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/06植物/12.千姿百态的植物.mp4" }
      ]
    },
    {
      no: "07",
      id: "mammal",
      name: "哺乳动物",
      cover: "assets/covers/cover-mammal.jpg",
      accent: "#C98A5E",
      videos: [
        { title: "认识哺乳动物", ep: 1, size: "1.0 GB", thumb: "assets/thumbs/c06_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F1-%E8%AE%A4%E8%AF%86%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/1-认识哺乳动物.mp4" },
        { title: "哺乳动物的毛", ep: 2, size: "1005.2 MB", thumb: "assets/thumbs/c06_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F2-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E6%AF%9B.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/2-哺乳动物的毛.mp4" },
        { title: "哺乳动物的角和脚", ep: 3, size: "960.8 MB", thumb: "assets/thumbs/c06_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F3-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E8%A7%92%E5%92%8C%E8%84%9A.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/3-哺乳动物的角和脚.mp4" },
        { title: "哺乳动物的感官", ep: 4, size: "966.8 MB", thumb: "assets/thumbs/c06_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F4-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E6%84%9F%E5%AE%98.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/4-哺乳动物的感官.mp4" },
        { title: "哺乳动物的牙齿", ep: 5, size: "932.9 MB", thumb: "assets/thumbs/c06_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F5-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E7%89%99%E9%BD%BF.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/5-哺乳动物的牙齿.mp4" },
        { title: "哺乳动物的觅食和消化", ep: 6, size: "964.8 MB", thumb: "assets/thumbs/c06_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F6-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E8%A7%85%E9%A3%9F%E5%92%8C%E6%B6%88%E5%8C%96.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/6-哺乳动物的觅食和消化.mp4" },
        { title: "哺乳动物的防御手段", ep: 7, size: "965.9 MB", thumb: "assets/thumbs/c06_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F7-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E9%98%B2%E5%BE%A1%E6%89%8B%E6%AE%B5.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/7-哺乳动物的防御手段.mp4" },
        { title: "哺乳动物的保温措施", ep: 8, size: "956.0 MB", thumb: "assets/thumbs/c06_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F8-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E4%BF%9D%E6%B8%A9%E6%8E%AA%E6%96%BD.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/8-哺乳动物的保温措施.mp4" },
        { title: "哺乳动物的迁徙", ep: 9, size: "1.1 GB", thumb: "assets/thumbs/c06_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F9-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E8%BF%81%E5%BE%99.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/9-哺乳动物的迁徙.mp4" },
        { title: "哺乳动物的繁殖", ep: 10, size: "808.6 MB", thumb: "assets/thumbs/c06_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F10-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E7%B9%81%E6%AE%96.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/10-哺乳动物的繁殖.mp4" },
        { title: "哺乳动物的生活方式", ep: 11, size: "794.1 MB", thumb: "assets/thumbs/c06_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F11-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E7%94%9F%E6%B4%BB%E6%96%B9%E5%BC%8F.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/11-哺乳动物的生活方式.mp4" },
        { title: "哺乳动物的智慧和情感", ep: 12, size: "1023.8 MB", thumb: "assets/thumbs/c06_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F07%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%2F12-%E5%93%BA%E4%B9%B3%E5%8A%A8%E7%89%A9%E7%9A%84%E6%99%BA%E6%85%A7%E5%92%8C%E6%83%85%E6%84%9F.mp4", path: "/斑马百科/0~4岁热学榜/07哺乳动物/12-哺乳动物的智慧和情感.mp4" }
      ]
    },
    {
      no: "08",
      id: "bird",
      name: "鸟类",
      cover: "assets/covers/cover-bird.jpg",
      accent: "#E9734A",
      videos: [
        { title: "认识鸟类", ep: 1, size: "1.1 GB", thumb: "assets/thumbs/c07_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F1-%E8%AE%A4%E8%AF%86%E9%B8%9F%E7%B1%BB.MOV", path: "/斑马百科/0~4岁热学榜/08鸟类/1-认识鸟类.MOV" },
        { title: "鸟类的羽毛", ep: 2, size: "1.1 GB", thumb: "assets/thumbs/c07_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F2-%E9%B8%9F%E7%B1%BB%E7%9A%84%E7%BE%BD%E6%AF%9B.MOV", path: "/斑马百科/0~4岁热学榜/08鸟类/2-鸟类的羽毛.MOV" },
        { title: "鸟类的喙", ep: 3, size: "1.8 GB", thumb: "assets/thumbs/c07_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F3-%E9%B8%9F%E7%B1%BB%E7%9A%84%E5%96%99.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/3-鸟类的喙.MP4" },
        { title: "鸟类的飞行", ep: 4, size: "1.7 GB", thumb: "assets/thumbs/c07_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F4-%E9%B8%9F%E7%B1%BB%E7%9A%84%E9%A3%9E%E8%A1%8C.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/4-鸟类的飞行.MP4" },
        { title: "鸟类的迁徙", ep: 5, size: "1.7 GB", thumb: "assets/thumbs/c07_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F5-%E9%B8%9F%E7%B1%BB%E7%9A%84%E8%BF%81%E5%BE%99.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/5-鸟类的迁徙.MP4" },
        { title: "鸟类求偶与筑巢", ep: 6, size: "66.9 MB", thumb: "assets/thumbs/c07_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F6-%E9%B8%9F%E7%B1%BB%E6%B1%82%E5%81%B6%E4%B8%8E%E7%AD%91%E5%B7%A2.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/6-鸟类求偶与筑巢.MP4" },
        { title: "鸟类的繁育", ep: 7, size: "65.0 MB", thumb: "assets/thumbs/c07_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F7-%E9%B8%9F%E7%B1%BB%E7%9A%84%E7%B9%81%E8%82%B2.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/7-鸟类的繁育.MP4" },
        { title: "鸟类的叫声", ep: 8, size: "1.4 GB", thumb: "assets/thumbs/c07_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F8-%E9%B8%9F%E7%B1%BB%E7%9A%84%E5%8F%AB%E5%A3%B0.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/8-鸟类的叫声.MP4" },
        { title: "游禽", ep: 9, size: "1.9 GB", thumb: "assets/thumbs/c07_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F9-%E6%B8%B8%E7%A6%BD.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/9-游禽.MP4" },
        { title: "涉禽", ep: 10, size: "1.8 GB", thumb: "assets/thumbs/c07_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F10-%E6%B6%89%E7%A6%BD.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/10-涉禽.MP4" },
        { title: "走禽", ep: 11, size: "1.7 GB", thumb: "assets/thumbs/c07_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F11-%E8%B5%B0%E7%A6%BD.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/11-走禽.MP4" },
        { title: "猛禽", ep: 12, size: "2.0 GB", thumb: "assets/thumbs/c07_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F08%E9%B8%9F%E7%B1%BB%2F12-%E7%8C%9B%E7%A6%BD.MP4", path: "/斑马百科/0~4岁热学榜/08鸟类/12-猛禽.MP4" }
      ]
    },
    {
      no: "09",
      id: "ocean",
      name: "海洋动物",
      cover: "assets/covers/cover-ocean.jpg",
      accent: "#3FA9D9",
      videos: [
        { title: "认识海洋", ep: 1, size: "606.0 MB", thumb: "assets/thumbs/c08_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F1-%E8%AE%A4%E8%AF%86%E6%B5%B7%E6%B4%8B.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/1-认识海洋.mp4" },
        { title: "滩涂和礁石海岸动物", ep: 2, size: "481.8 MB", thumb: "assets/thumbs/c08_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F2-%E6%BB%A9%E6%B6%82%E5%92%8C%E7%A4%81%E7%9F%B3%E6%B5%B7%E5%B2%B8%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/2-滩涂和礁石海岸动物.mp4" },
        { title: "红树林与海草甸动物", ep: 3, size: "629.8 MB", thumb: "assets/thumbs/c08_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F3-%E7%BA%A2%E6%A0%91%E6%9E%97%E4%B8%8E%E6%B5%B7%E8%8D%89%E7%94%B8%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/3-红树林与海草甸动物.mp4" },
        { title: "珊瑚礁海洋动物", ep: 4, size: "695.7 MB", thumb: "assets/thumbs/c08_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F4-%E7%8F%8A%E7%91%9A%E7%A4%81%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/4-珊瑚礁海洋动物.mp4" },
        { title: "巨藻林海洋动物", ep: 5, size: "787.1 MB", thumb: "assets/thumbs/c08_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F5-%E5%B7%A8%E8%97%BB%E6%9E%97%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/5-巨藻林海洋动物.mp4" },
        { title: "远洋与极地浅海动物", ep: 6, size: "502.5 MB", thumb: "assets/thumbs/c08_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F6-%E8%BF%9C%E6%B4%8B%E4%B8%8E%E6%9E%81%E5%9C%B0%E6%B5%85%E6%B5%B7%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/6-远洋与极地浅海动物.mp4" },
        { title: "弱光层海洋动物", ep: 7, size: "412.4 MB", thumb: "assets/thumbs/c08_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F7-%E5%BC%B1%E5%85%89%E5%B1%82%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/7-弱光层海洋动物.mp4" },
        { title: "冷泉与热液海洋动物", ep: 8, size: "423.2 MB", thumb: "assets/thumbs/c08_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F8-%E5%86%B7%E6%B3%89%E4%B8%8E%E7%83%AD%E6%B6%B2%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/8-冷泉与热液海洋动物.mp4" },
        { title: "深海奇观", ep: 9, size: "369.4 MB", thumb: "assets/thumbs/c08_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F9-%E6%B7%B1%E6%B5%B7%E5%A5%87%E8%A7%82.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/9-深海奇观.mp4" },
        { title: "海洋动物的繁衍", ep: 10, size: "581.0 MB", thumb: "assets/thumbs/c08_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F10-%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%E7%9A%84%E7%B9%81%E8%A1%8D.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/10-海洋动物的繁衍.mp4" },
        { title: "海洋动物的生存之道", ep: 11, size: "581.3 MB", thumb: "assets/thumbs/c08_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F11-%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%E7%9A%84%E7%94%9F%E5%AD%98%E4%B9%8B%E9%81%93.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/11-海洋动物的生存之道.mp4" },
        { title: "神奇的海洋动物", ep: 12, size: "676.4 MB", thumb: "assets/thumbs/c08_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F09%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9%2F12-%E7%A5%9E%E5%A5%87%E7%9A%84%E6%B5%B7%E6%B4%8B%E5%8A%A8%E7%89%A9.mp4", path: "/斑马百科/0~4岁热学榜/09海洋动物/12-神奇的海洋动物.mp4" }
      ]
    },
    {
      no: "10",
      id: "space",
      name: "天文",
      cover: "assets/covers/cover-space.jpg",
      accent: "#7B6CF6",
      videos: [
        { title: "恒星与行星", ep: 1, size: "1.5 GB", thumb: "assets/thumbs/c09_001.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F1%E6%81%92%E6%98%9F%E4%B8%8E%E8%A1%8C%E6%98%9F.MP4", path: "/斑马百科/0~4岁热学榜/10天文/1恒星与行星.MP4" },
        { title: "太阳系", ep: 2, size: "1.2 GB", thumb: "assets/thumbs/c09_002.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F2%E5%A4%AA%E9%98%B3%E7%B3%BB.MP4", path: "/斑马百科/0~4岁热学榜/10天文/2太阳系.MP4" },
        { title: "太阳", ep: 3, size: "1.6 GB", thumb: "assets/thumbs/c09_003.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F3%E5%A4%AA%E9%98%B3.MP4", path: "/斑马百科/0~4岁热学榜/10天文/3太阳.MP4" },
        { title: "水星与金星", ep: 4, size: "1.4 GB", thumb: "assets/thumbs/c09_004.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F4%E6%B0%B4%E6%98%9F%E4%B8%8E%E9%87%91%E6%98%9F.MP4", path: "/斑马百科/0~4岁热学榜/10天文/4水星与金星.MP4" },
        { title: "地球", ep: 5, size: "1.2 GB", thumb: "assets/thumbs/c09_005.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F5%E5%9C%B0%E7%90%83.MP4", path: "/斑马百科/0~4岁热学榜/10天文/5地球.MP4" },
        { title: "火星", ep: 6, size: "1.4 GB", thumb: "assets/thumbs/c09_006.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F6%E7%81%AB%E6%98%9F.MP4", path: "/斑马百科/0~4岁热学榜/10天文/6火星.MP4" },
        { title: "木星与土星", ep: 7, size: "1.2 GB", thumb: "assets/thumbs/c09_007.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F7%E6%9C%A8%E6%98%9F%E4%B8%8E%E5%9C%9F%E6%98%9F.MP4", path: "/斑马百科/0~4岁热学榜/10天文/7木星与土星.MP4" },
        { title: "天王星与海王星", ep: 8, size: "1.1 GB", thumb: "assets/thumbs/c09_008.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F8%E5%A4%A9%E7%8E%8B%E6%98%9F%E4%B8%8E%E6%B5%B7%E7%8E%8B%E6%98%9F.MP4", path: "/斑马百科/0~4岁热学榜/10天文/8天王星与海王星.MP4" },
        { title: "矮行星小行星与彗星", ep: 9, size: "1.0 GB", thumb: "assets/thumbs/c09_009.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F9%E7%9F%AE%E8%A1%8C%E6%98%9F%E5%B0%8F%E8%A1%8C%E6%98%9F%E4%B8%8E%E5%BD%97%E6%98%9F.MP4", path: "/斑马百科/0~4岁热学榜/10天文/9矮行星小行星与彗星.MP4" },
        { title: "银河系", ep: 10, size: "1.5 GB", thumb: "assets/thumbs/c09_010.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F10%E9%93%B6%E6%B2%B3%E7%B3%BB.MP4", path: "/斑马百科/0~4岁热学榜/10天文/10银河系.MP4" },
        { title: "星云与星系", ep: 11, size: "1.5 GB", thumb: "assets/thumbs/c09_011.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F11%E6%98%9F%E4%BA%91%E4%B8%8E%E6%98%9F%E7%B3%BB.MP4", path: "/斑马百科/0~4岁热学榜/10天文/11星云与星系.MP4" },
        { title: "宇宙", ep: 12, size: "1.2 GB", thumb: "assets/thumbs/c09_012.jpg", netdisk: "https://pan.baidu.com/play/video#/video?path=%2F%E6%96%91%E9%A9%AC%E7%99%BE%E7%A7%91%2F0~4%E5%B2%81%E7%83%AD%E5%AD%A6%E6%A6%9C%2F10%E5%A4%A9%E6%96%87%2F12%E5%AE%87%E5%AE%99.MP4", path: "/斑马百科/0~4岁热学榜/10天文/12宇宙.MP4" }
      ]
    }
  ]
};
