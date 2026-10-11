(() => {
  const init = () => {
    const header = document.querySelector('.header-container, .site-header-inner');
    if (!header || header.querySelector('.guide-menu-wrap')) return;

    const login = header.querySelector('.btn-login');
    if (!login) return;

    const wrap = document.createElement('div');
    wrap.className = 'guide-menu-wrap';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'guide-menu-button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'guide-menu-panel');
    button.innerHTML = '<span class="guide-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span>メニュー</span>';

    const panel = document.createElement('nav');
    panel.className = 'guide-menu-panel';
    panel.id = 'guide-menu-panel';
    panel.setAttribute('aria-label', 'サイトメニュー');
    panel.hidden = true;
    panel.innerHTML = [
      '<a href="./ninaguide.html">ニナガイドトップ</a>',
      '<a href="./guide-a.html">新規登録</a>',
      '<a href="./guide-b.html">定期購入・商品</a>',
      '<a href="./guide-c.html">ボーナス・タイトル</a>',
      '<a href="./guide-list.html">記事一覧</a>',
      '<a href="./check.html">ボーナス・タイトル診断</a>'
    ].join('');

    wrap.append(button, panel);
    login.insertAdjacentElement('afterend', wrap);

    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    });
    document.addEventListener('click', event => {
      if (!wrap.contains(event.target)) {
        button.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        button.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        button.focus();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();