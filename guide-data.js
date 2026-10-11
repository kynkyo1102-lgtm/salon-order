/* ニナガイド共通記事データ
   記事を追加するときは、この配列に1件追加してください。
   tags は記事タイトル検索とキーワード検索の両方に使われます。
*/
window.NINA_GUIDE_ARTICLES = [
  {
    title: "登録方法を比較",
    href: "./guide-a-compare.html",
    category: "登録・入会",
    description: "WEB登録と郵送登録の費用・決済方法・手続きの違いを比較できます。",
    tags: ["登録", "新規登録", "登録方法", "WEB登録", "郵送登録", "初回費用"]
  },
  {
    title: "WEB登録の流れ",
    href: "./guide-a-web.html",
    category: "登録・入会",
    description: "WEBから会員登録するときの準備物から受付完了までの手順を確認できます。",
    tags: ["登録", "新規登録", "登録方法", "WEB登録", "必要書類", "決済"]
  },
  {
    title: "郵送登録の流れ",
    href: "./guide-a-paper.html",
    category: "登録・入会",
    description: "書面を使って会員登録する方法と、提出前に確認したいことを案内します。",
    tags: ["登録", "新規登録", "登録方法", "郵送登録", "必要書類", "支払い"]
  },
  {
    title: "初回費用",
    href: "./guide-a-cost.html",
    category: "登録・入会",
    description: "新規登録時に必要となる初回費用について確認できます。",
    tags: ["登録", "初回費用", "支払い", "決済"]
  },
  {
    title: "毎月の商品購入",
    href: "./guide-b-cost.html",
    category: "定期購入・商品",
    description: "毎月の商品購入・定期購入の基本を確認できます。",
    tags: ["定期購入", "商品購入", "支払い"]
  },
  {
    title: "お届けスケジュール",
    href: "./guide-b-schedule.html",
    category: "定期購入・商品",
    description: "定期購入商品の発送・お届け時期を確認できます。",
    tags: ["定期購入", "お届け", "配送", "届かない"]
  },
  {
    title: "お支払方法",
    href: "./guide-b-payment.html",
    category: "支払い",
    description: "商品購入に利用できる支払い方法について確認できます。",
    tags: ["支払い", "決済", "決済できない", "定期購入"]
  },
  {
    title: "締め日について",
    href: "./guide-b-deadline.html",
    category: "定期購入・商品",
    description: "定期購入の締め日や、購入・停止の手続きに関わる日程を確認できます。",
    tags: ["定期購入", "締め日", "停止", "変更"]
  },
  {
    title: "定期購入の停止",
    href: "./guide-b-stop.html",
    category: "定期購入・商品",
    description: "定期購入を停止したいときに確認する手順を案内します。",
    tags: ["定期購入", "停止", "各種手続き", "解約"]
  },
  {
    title: "6か月連続購入特典",
    href: "./guide-b-bonus.html",
    category: "定期購入・商品",
    description: "6か月連続購入特典の内容を確認できます。",
    tags: ["定期購入", "継続購入特典", "ボーナス"]
  },
  {
    title: "基本条件",
    href: "./guide-c-basic.html",
    category: "ボーナス・タイトル",
    description: "ボーナスプランに関わる基本条件を確認できます。",
    tags: ["ボーナス", "基本条件", "ボーナスプラン"]
  },
  {
    title: "ボーナス・タイトル診断",
    href: "./check.html",
    category: "ボーナス・タイトル",
    description: "条件を入力して、ボーナスやタイトルに関する内容を確認する診断ページです。",
    tags: ["ボーナス", "タイトル", "診断"],
    type: "tool"
  }
];

/* トップページで表示するキーワード。解約は意図的に表示しません。 */
window.NINA_GUIDE_KEYWORDS = [
  "登録", "WEB登録", "郵送登録", "初回費用", "配送", "届かない",
  "支払い", "決済できない", "停止", "ボーナス", "タイトル"
];

/* 今後の記事追加に備えたカテゴリ一覧 */
window.NINA_GUIDE_CATEGORIES = [
  "登録・入会", "定期購入・商品", "支払い",
  "ボーナス・タイトル", "手続き", "困ったとき"
];
