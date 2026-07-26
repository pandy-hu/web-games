/* 全局分享/复制链接按钮（WorkBuddy）
 * 点按钮复制当前页面的公网链接，方便玩家分享到微信/QQ。
 * 线上访问直接返回当前地址；本地 file:// 打开时，自动拼回腾讯云公网地址。
 */
(function () {
  'use strict';

  // 站点主域名（部署在腾讯云 CloudBase 静态托管，国内可直连）
  var SITE_BASE = 'https://shangye-tengxunyun-d6cezf7ba95e3-1357094356.tcloudbaseapp.com/';

  function shareUrl() {
    var loc = window.location.href;
    if (loc.indexOf('file://') === 0) {
      var file = window.location.pathname.split('/').pop();
      return SITE_BASE + file;
    }
    return loc;
  }

  // ---- 样式 ----
  var css = document.createElement('style');
  css.textContent = [
    '#wb-share-fab{',
    '  position:fixed; right:12px; bottom:76px; z-index:9998;',
    '  display:flex; align-items:center; gap:4px;',
    '  padding:9px 13px; border:none; border-radius:999px;',
    '  background:linear-gradient(135deg,#7c4dff,#ff5e9c); color:#fff;',
    '  font-size:13px; font-weight:700; cursor:pointer;',
    '  box-shadow:0 6px 18px rgba(124,77,255,.45);',
    '  backdrop-filter:blur(4px); -webkit-tap-highlight-color:transparent;',
    '  font-family:inherit;',
    '}',
    '#wb-share-fab:active{ transform:scale(.94); }',
    '@media (max-width:480px){ #wb-share-fab{ bottom:70px; padding:8px 11px; font-size:12px; } }',
    '#wb-share-toast{',
    '  position:fixed; left:50%; bottom:140px; transform:translateX(-50%) translateY(10px);',
    '  z-index:9999; max-width:80vw;',
    '  background:rgba(20,20,40,.94); color:#fff;',
    '  padding:10px 16px; border-radius:12px; font-size:13px; font-weight:600;',
    '  box-shadow:0 8px 24px rgba(0,0,0,.35);',
    '  opacity:0; pointer-events:none; transition:opacity .2s, transform .2s;',
    '  font-family:inherit; text-align:center;',
    '}',
    '#wb-share-toast.show{ opacity:1; transform:translateX(-50%) translateY(0); }',
    '@media (prefers-color-scheme:light){ #wb-share-toast{ background:rgba(30,30,50,.95);} }'
  ].join('\n');
  document.head.appendChild(css);

  // ---- 按钮 ----
  var btn = document.createElement('button');
  btn.id = 'wb-share-fab';
  btn.innerHTML = '🔗<span>分享</span>';
  btn.setAttribute('aria-label', '复制分享链接');
  btn.setAttribute('type', 'button');
  document.body.appendChild(btn);

  // ---- 轻提示 ----
  var toast = document.createElement('div');
  toast.id = 'wb-share-toast';
  document.body.appendChild(toast);
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1800);
  }

  // ---- 复制 ----
  function copyLink() {
    var url = shareUrl();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        function () { showToast('链接已复制，去微信/QQ 发给朋友 ✅'); },
        function () { fallbackCopy(url); }
      );
    } else {
      fallbackCopy(url);
    }
  }
  function fallbackCopy(url) {
    try {
      var ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(ok ? '链接已复制，去微信/QQ 发给朋友 ✅' : '复制失败，请手动复制地址栏链接');
    } catch (e) {
      showToast('复制失败，请手动复制地址栏链接');
    }
  }

  btn.addEventListener('click', copyLink);
})();
