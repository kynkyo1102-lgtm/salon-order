(() => {
  const menuMarkup = `
    <div class="menu-backdrop" id="guideMenuBackdrop"></div>
    <nav class="site-menu" id="guideSiteMenu" aria-label="サイト全体の目次" aria-hidden="true">
      <div class="site-menu-head"><h2 class="site-menu-title">ページ一覧</h2><button class="menu-close" id="guideMenuClose" type="button" aria-label="メニューを閉じる">×</button></div>
      <ul class="site-menu-list">
        <li class="menu-main"><a href="./index.html">トップページ</a></li>
        <li class="menu-main"><a href="./check.html">ボーナス・タイトル診断</a></li>
        <li class="menu-group"><details><summary>新規登録の流れ</summary><ul>
          <li><a href="./guide-a-compare.html">登録方法を比較</a></li><li><a href="./guide-a-web.html">WEB登録の流れ</a></li><li><a href="./guide-a-paper.html">郵送登録の流れ</a></li><li><a href="./guide-a-cost.html">初回費用</a></li>
        </ul></details></li>
        <li class="menu-group"><details><summary>定期購入について</summary><ul>
          <li><a href="./guide-b-cost.html">毎月の商品購入</a></li><li><a href="./guide-b-schedule.html">お届けスケジュール</a></li><li><a href="./guide-b-payment.html">お支払方法</a></li><li><a href="./guide-b-deadline.html">締め日について</a></li><li><a href="./guide-b-stop.html">定期購入の停止</a></li><li><a href="./guide-b-bonus.html">6か月連続購入特典</a></li>
        </ul></details></li>
        <li class="menu-group"><details><summary>ボーナスプランについて</summary><ul>
          <li><a href="./guide-c-basic.html">基本条件</a></li><li><a href="./guide-c-bonus.html">ボーナスプラン一覧</a></li>
          <li><a href="./guide-c-bonus-first-start.html">ファーストスタートボーナス</a></li>
          <li><a href="./guide-c-bonus-5-active.html">5アクティブボーナス</a></li>
          <li><a href="./guide-c-bonus-10-active.html">10アクティブボーナス</a></li>
          <li><a href="./guide-c-bonus-basic-commission.html">ベーシックコミッション</a></li>
          <li><a href="./guide-c-bonus-mega-match.html">メガマッチボーナス</a></li>
          <li><a href="./guide-c-bonus-double-mega-match.html">ダブルメガマッチボーナス</a></li>
          <li><a href="./guide-c-bonus-leadership.html">リーダーシップボーナス</a></li>
          <li><a href="./guide-c-bonus-amf.html">AMFボーナス</a></li>
          <li><a href="./guide-c-bonus-cullinan-amf.html">クリナンAMFボーナス</a></li>
          <li><a href="./guide-c-title.html">タイトル昇格条件</a></li><li><a href="./guide-c-branch.html">ブランチ</a></li><li><a href="./check.html">ボーナス・タイトル診断</a></li>
        </ul></details></li>
        <li class="menu-group"><details><summary>その他手続き</summary><ul>
          <li><a href="./guide-d.html">各種手続き・申請</a></li><li><a href="./guide-d.html">その他の手続き</a></li>
        </ul></details></li>
        <li class="menu-group"><details><summary>こんなときどうする？</summary><ul>
          <li><a href="./guide-e.html">よくある困りごと</a></li>
        </ul></details></li>
        <li class="menu-main"><a href="./guide-list.html">記事一覧・キーワード検索</a></li>
      </ul>
    </nav>`;

  function init() {
    const header = document.querySelector('.header-container, .site-header-inner');
    if (!header || header.querySelector('#openMenu, .menu-button, .guide-menu-button')) return;
    const login = header.querySelector('.btn-login');
    if (!login) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-button guide-menu-button';
    button.id = 'guideOpenMenu';
    button.setAttribute('aria-label', 'メニューを開く');
    button.setAttribute('aria-controls', 'guideSiteMenu');
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = '<span class="hamburger" aria-hidden="true"><span></span><span></span><span></span></span>';
    login.insertAdjacentElement('afterend', button);

    document.body.insertAdjacentHTML('beforeend', menuMarkup);
    const menu = document.getElementById('guideSiteMenu');
    const backdrop = document.getElementById('guideMenuBackdrop');
    const close = document.getElementById('guideMenuClose');

    function openMenu() {
      menu.classList.add('is-open'); backdrop.classList.add('is-open');
      document.body.classList.add('menu-open'); menu.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-expanded', 'true'); close.focus();
    }
    function closeMenu() {
      menu.classList.remove('is-open'); backdrop.classList.remove('is-open');
      document.body.classList.remove('menu-open'); menu.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
    }
    button.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu(); button.focus();
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();