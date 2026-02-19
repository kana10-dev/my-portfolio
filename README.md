# kana10 | Portfolio

個人ポートフォリオサイト。
About / Works / Contact の3セクション構成で、純粋な HTML・CSS・JavaScript のみで実装。

**URL:** https://kana10-dev.github.io/my-portfolio/

---

## 機能

- Canvas パーティクルアニメーション（ヒーロー背景）
- タイピングエフェクト
- スクロールリビール（Intersection Observer）
- アクティブナビゲーション検出
- ワークカード 3D チルト（ホバー）
- Formspree によるコンタクトフォーム送信

## 技術スタック

HTML / CSS / JavaScript — フレームワーク・ライブラリなし

## ファイル構成

```
.
├── index.html   # マークアップ
├── style.css    # スタイル
├── main.js      # アニメーション・インタラクション
└── img/
    ├── work-1.png
    ├── work-2.png
    └── work-3.png
```

## ローカルで確認

```bash
# index.html をブラウザで直接開くだけで動作します
open index.html
```

## カスタマイズ

| 変更したい項目 | 場所 |
|---|---|
| テーマカラー | `style.css` の `--accent` |
| タイピングテキスト | `main.js` の `roles` 配列 |
| About 文・スキル | `index.html` の `#about` セクション |
| Works カード | `index.html` の `#works` セクション |
| コンタクト先 | `main.js` の `ENDPOINT`（Formspree）|

## License

MIT
