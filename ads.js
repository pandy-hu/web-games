/* =====================================================================
 * ads.js —— 全站广告位 & 引流条（集中式，改这一个文件即可全局生效）
 * ---------------------------------------------------------------------
 * 用法：在每个游戏页 </body> 前加一行  <script src="ads.js"></script>
 * 然后在本文件的 WB_AD 配置里填入你的真实内容即可。
 *
 * 1) 顶部广告位：把 adTopHTML 换成你的 AdSense / 微信流量主 / 自定义代码
 * 2) 底部引流条：填公众号二维码图片地址 leadQR、按钮跳转 leadBtnURL
 *    用户点 ✕ 关闭后，localStorage 记住，不再出现（不扰民）。
 * ===================================================================== */
(function () {
  var C = window.WB_AD || {};
  var CSS = [
    '#wb-adtop,#wb-lead{position:fixed;left:0;right:0;z-index:99999;',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"PingFang SC","Microsoft YaHei",sans-serif;',
    'box-sizing:border-box}',
    '#wb-adtop{top:0;background:#fff;border-bottom:1px solid #ebedf2;display:flex;',
    'align-items:center;justify-content:center;gap:8px;padding:7px 38px 7px 12px;',
    'min-height:40px;font-size:12px;color:#7b8190;box-shadow:0 1px 5px rgba(0,0,0,.07);text-align:center}',
    '#wb-adtop .ad-label{background:#eef2ff;color:#4f46e5;border-radius:4px;padding:2px 7px;font-weight:700;font-size:11px;flex:none}',
    '#wb-adtop .ad-x,#wb-lead .ad-x{position:absolute;top:50%;transform:translateY(-50%);right:8px;',
    'width:24px;height:24px;border:none;background:#eef0f6;color:#7b8190;border-radius:50%;',
    'cursor:pointer;font-size:13px;line-height:1;display:flex;align-items:center;justify-content:center}',
    '#wb-lead{bottom:0;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;',
    'display:flex;align-items:center;gap:10px;padding:9px 44px 9px 12px;box-shadow:0 -2px 12px rgba(79,70,229,.28)}',
    '#wb-lead .lead-ico{font-size:20px;flex:none}',
    '#wb-lead .lead-qr{width:34px;height:34px;border-radius:7px;background:#fff;object-fit:cover;flex:none}',
    '#wb-lead .lead-txt{flex:1;min-width:0}',
    '#wb-lead .lead-txt b{display:block;font-size:13px;line-height:1.3}',
    '#wb-lead .lead-txt span{display:block;font-size:11px;opacity:.9;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#wb-lead .lead-btn{margin-left:auto;background:#fff;color:#4f46e5;border:none;border-radius:999px;',
    'padding:7px 15px;font-weight:800;font-size:12px;cursor:pointer;white-space:nowrap;text-decoration:none;flex:none}',
    '#wb-lead .ad-x{background:rgba(255,255,255,.22);color:#fff}',
    'body.wb-ad-on{padding-top:40px}',
    'body.wb-lead-on{padding-bottom:56px}',
    '@media(max-width:420px){#wb-lead .lead-txt span{display:none}}'
  ].join('');

  function injectCSS() {
    var s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function buildTop() {
    if (localStorage.getItem('wb_adtop_off') === '1') return;
    var bar = document.createElement('div');
    bar.id = 'wb-adtop';
    var placeholder = '<span class="ad-label">广告</span> 广告位示例 · 编辑 ads.js 的 adTopHTML 投放 AdSense / 流量主 / 自定义代码';
    bar.innerHTML = (C.adTopHTML || placeholder) + '<button class="ad-x" aria-label="关闭">✕</button>';
    document.body.appendChild(bar);
    document.body.classList.add('wb-ad-on');
    var x = bar.querySelector('.ad-x');
    if (x) x.onclick = function () {
      bar.remove(); document.body.classList.remove('wb-ad-on');
      localStorage.setItem('wb_adtop_off', '1');
    };
  }

  function buildLead() {
    if (localStorage.getItem('wb_lead_off') === '1') return;
    var bar = document.createElement('div');
    bar.id = 'wb-lead';
    var qr = C.leadQR ? '<img class="lead-qr" src="' + C.leadQR + '" alt="二维码">' : '';
    var btn = (C.leadBtnURL && C.leadBtnURL !== '#')
      ? '<a class="lead-btn" href="' + C.leadBtnURL + '" target="_blank" rel="noopener">' + (C.leadBtnText || '前往关注') + '</a>'
      : '';
    bar.innerHTML = '<span class="lead-ico">🎮</span>' + qr +
      '<div class="lead-txt"><b>' + (C.leadTitle || '更多好玩小游戏 & 福利') + '</b>' +
      '<span>' + (C.leadText || '关注我们，第一时间获取新游戏和独家攻略') + '</span></div>' +
      btn + '<button class="ad-x" aria-label="关闭">✕</button>';
    document.body.appendChild(bar);
    document.body.classList.add('wb-lead-on');
    var x = bar.querySelector('.ad-x');
    if (x) x.onclick = function () {
      bar.remove(); document.body.classList.remove('wb-lead-on');
      localStorage.setItem('wb_lead_off', '1');
    };
  }

  function init() {
    injectCSS();
    buildTop();
    buildLead();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===================== 你只需要改下面这块 ===================== */
window.WB_AD = {
  // ① 顶部广告位：留空显示占位示例；填入你的广告代码即可全局生效
  //    例：adTopHTML: '<ins class="adsbygoogle" ...></ins><script>...</script>'
  adTopHTML: '',

  // ② 底部引流条配置
  leadTitle: '🎮 游戏厅 · 福利社',
  leadText: '关注公众号，第一时间收到新游戏 & 独家攻略',
  leadQR: '',                       // 公众号/加群 二维码图片地址（留空则只显示文案）
  leadBtnText: '前往关注',
  leadBtnURL: '#'                  // 按钮跳转（公众号主页 / 加群链接 / 落地页等）
};
