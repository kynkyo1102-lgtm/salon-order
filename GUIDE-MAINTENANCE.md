# メンバーズガイド 保守メモ

## 対象範囲
メンバーズガイド: `ninaguide.html`、`guide-*.html`、関連CSS/JS、`check.html`、`ninaguide-salons.html` など。サロン本体の `index.html`、管理画面、営業時間、商品登録などは別管理。

## 修正場所
- トップのカテゴリとトップメニュー: `ninaguide.html` 内の `category-section`。トップメニューはこのカテゴリのリンクから自動生成。
- 記事ページの共通メニュー・ヘッダー・フッター: `guide-shared-chrome.js` の `groups`。**カテゴリ変更時はトップとこちらの両方を更新**。
- トップの見た目: `ninaguide.css`。トップ内には遷移アニメーション用の小さな追加styleもある。
- マイプラン共通の基本スタイル: `guide-myplan-common.css`。金額別・タイトル別のCSSより前に読み込む。変更時は両ページを確認。
- マイプラン金額別: `guide-myplan-income.html`（計算と描画）、`guide-myplan-income.css`（見た目）。
- マイプランタイトル別: `guide-myplan-title.html`（計算と描画）、`guide-myplan-title.css`（見た目）。
- 検索対象・キーワード: `guide-search.js`。新しいページを追加したら検索対象も確認。
- コンプライアンス: `guide-compliance.html` と `guide-compliance.css`。トップのカテゴリでは「その他」に属する。

## 保守時の確認
1. `node scripts/check-guide-links.js` でガイド関連HTML/JS/CSSの相対リンクとカテゴリ名をチェックする（読み取り専用）。
2. トップ・記事メニュー・検索・スマホ表示・戻るリンクを実機確認。
3. マイプランは1点/3点登録、金額別/タイトル別、図のタップ拡大と計算結果を確認。表示額にはファーストスタート・5アクティブ・10アクティブを含めない。
4. サロン関連ファイル、ミトコンドリアちゃん、人物アイコンは、使用状況の確認なしに削除しない。
5. 未使用CSSの一括削除やCSSの統合は、ブラウザで表示差分を検証してから実施。

## 現時点の制約
トップと記事ページのナビゲーション定義はまだ二重管理。リンクチェッカーは静的な相対パスのみ検査し、JavaScriptで組み立てるURL、外部リンク、実際のブラウザ描画や計算の正しさは保証しない。FAQは今後追加・調整予定。

- マイプラン共通のモデル生成: `guide-myplan-model-common.js`。金額別・タイトル別のHTML内スクリプトより前に読み込む。ここには `yen`・`pts`・`ranges`・`selected`・`candidates`・`generate` があり、**両ページの動作に影響するため慎重に変更する**。

## 2026-11-14 重複整理
マイプラン金額別・タイトル別に完全一致していた冒頭の基本CSS（約1,900文字）を `guide-myplan-common.css` に切り出した。残るCSSは順序依存の上書きがあり得るため未統合。JavaScript冒頭の完全一致部分約4,600文字を `guide-myplan-model-common.js` に切り出した。描画処理と残りの計算処理は未統合。ブラウザ上での計算結果・図の回帰テストは未実施。
