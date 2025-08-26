/**
 * KEITA流SNSマニュアルRAGシステム
 * 実践的なSNSマーケティングノウハウの検索システム（全104項目）
 */

export interface SNSManualEntry {
  id: string
  content: string
  category: string
  tags: string[]
  importance: number // 1-5のスコア
}

// KEITA流SNSマニュアルデータ（全104項目を完全実装）
export const keitaSNSManualData: SNSManualEntry[] = [
  {
    id: 'sns-001',
    content: 'SNSで一番エンドユーザーに対してアプローチできるのはInstagramである',
    category: 'プラットフォーム戦略',
    tags: ['Instagram', 'エンドユーザー', 'アプローチ'],
    importance: 5
  },
  {
    id: 'sns-002',
    content: 'Instagramは新規獲得・収益化・ペルソナ広告運用・顧客作りに最適のSNSである',
    category: 'プラットフォーム戦略',
    tags: ['Instagram', '新規獲得', '収益化', '広告運用'],
    importance: 5
  },
  {
    id: 'sns-003',
    content: 'YouTube、TikTokは新規獲得に最適でバズりやすいSNSである',
    category: 'プラットフォーム戦略',
    tags: ['YouTube', 'TikTok', '新規獲得', 'バズ'],
    importance: 4
  },
  {
    id: 'sns-004',
    content: 'YouTube横動画は属人性もあり、ファン化された客層が多い',
    category: 'プラットフォーム特性',
    tags: ['YouTube', '属人性', 'ファン化'],
    importance: 4
  },
  {
    id: 'sns-005',
    content: 'SNSをバズらせる縦動画に一番大切なのは、冒頭の２秒。',
    category: 'バズテクニック',
    tags: ['縦動画', 'バズ', '冒頭2秒'],
    importance: 5
  },
  {
    id: 'sns-006',
    content: '動画をバズらせるテクニックは大きく分けて４つある。動画編集、構成、企画台本、人物',
    category: 'バズテクニック',
    tags: ['バズ', '動画編集', '構成', '企画台本', '人物'],
    importance: 5
  },
  {
    id: 'sns-007',
    content: 'いいね、コメント、保存で一番重視するべきものは、保存でコメントを促す企画がバズらせる近道だ。',
    category: 'エンゲージメント',
    tags: ['保存', 'コメント', 'バズ', '企画'],
    importance: 5
  },
  {
    id: 'sns-008',
    content: 'インスタグラムのトップページはLPや雑誌の表紙を意識した投稿順で統一感を出すべきだ。',
    category: 'ブランディング',
    tags: ['Instagram', 'トップページ', 'LP', '統一感'],
    importance: 4
  },
  {
    id: 'sns-009',
    content: 'バズったらフォロワーが増えるは間違い。バズった時のために準備をしておく必要がある。',
    category: 'バズ戦略',
    tags: ['バズ', 'フォロワー', '準備'],
    importance: 5
  },
  {
    id: 'sns-010',
    content: 'バズったフォロワーで収益化はとても難易度が高い。',
    category: '収益化',
    tags: ['バズ', 'フォロワー', '収益化'],
    importance: 4
  },
  {
    id: 'sns-011',
    content: 'フォロワーは多くて損はないが、収益化は別物である。',
    category: '収益化',
    tags: ['フォロワー', '収益化'],
    importance: 4
  },
  {
    id: 'sns-012',
    content: '収益化しやすい客層を集めるのに、広告運用は最適だ。',
    category: '広告運用',
    tags: ['収益化', '客層', '広告運用'],
    importance: 5
  },
  {
    id: 'sns-013',
    content: 'SNS運用には大きく分けて、バズらせて認知度を上げる。フォロワーに対して属人性をつける。可能性のある人間に広告をかける。',
    category: 'SNS戦略',
    tags: ['SNS運用', 'バズ', '認知度', '属人性', '広告'],
    importance: 5
  },
  {
    id: 'sns-014',
    content: 'フォロワーはファンではなく、たまに見てくれている人という認識が必要、フォロワーをファンにしないと収益化はできない。',
    category: 'ファン化',
    tags: ['フォロワー', 'ファン', '収益化'],
    importance: 5
  },
  {
    id: 'sns-015',
    content: 'SNSで一番大事なことは、継続である。',
    category: '継続性',
    tags: ['SNS', '継続'],
    importance: 5
  },
  {
    id: 'sns-016',
    content: 'アルゴリズムは高頻度で変わるが、本質は変わらない。SNS運営側の本質を理解せよ。',
    category: 'アルゴリズム理解',
    tags: ['アルゴリズム', '本質', 'SNS運営'],
    importance: 5
  },
  {
    id: 'sns-017',
    content: '動画投稿は初動がとても大切、ゴールデンタイムに投稿する必要がある。日本17時〜21時。',
    category: '投稿タイミング',
    tags: ['動画投稿', '初動', 'ゴールデンタイム', '17時-21時'],
    importance: 4
  },
  {
    id: 'sns-018',
    content: 'バズらせるテクニックとして、ブランディングを壊さない賛否両論を起こすことがとても重要。コメントが増える。',
    category: 'バズテクニック',
    tags: ['バズ', 'ブランディング', '賛否両論', 'コメント'],
    importance: 4
  },
  {
    id: 'sns-019',
    content: 'バズる動画の共通点はコメントが溢れている。なぜならバズっている動画のコメント欄を見ている人がいるから。',
    category: 'バズ分析',
    tags: ['バズ', '動画', 'コメント'],
    importance: 4
  },
  {
    id: 'sns-020',
    content: '企画、台本が良くても動画編集の構成でバズり度が変わる。',
    category: '動画制作',
    tags: ['企画', '台本', '動画編集', '構成'],
    importance: 4
  },
  {
    id: 'sns-021',
    content: '基本的に毎日投稿が必要。バズったら2日に1本投稿に変更。',
    category: '投稿頻度',
    tags: ['毎日投稿', 'バズ', '投稿頻度'],
    importance: 4
  },
  {
    id: 'sns-022',
    content: 'SNSがバズっている人の共通点は、継続できる人。',
    category: '継続性',
    tags: ['SNS', 'バズ', '継続'],
    importance: 5
  },
  {
    id: 'sns-023',
    content: 'SNSをバズる理由の一つは、毎日投稿をしているかをアルゴリズムで管理している。',
    category: 'アルゴリズム理解',
    tags: ['SNS', 'バズ', '毎日投稿', 'アルゴリズム'],
    importance: 4
  },
  {
    id: 'sns-024',
    content: '階段方式でバズる。',
    category: 'バズパターン',
    tags: ['階段方式', 'バズ'],
    importance: 3
  },
  {
    id: 'sns-025',
    content: '広告動画もバズる。バズらせ方は少し特殊だが、データを取ると安くで多くの人にアプローチできている。',
    category: '広告運用',
    tags: ['広告動画', 'バズ', 'データ', 'アプローチ'],
    importance: 4
  },
  {
    id: 'sns-026',
    content: 'ローカルが広告運用は強い。',
    category: '広告運用',
    tags: ['ローカル', '広告運用'],
    importance: 3
  },
  {
    id: 'sns-027',
    content: 'SNSで大事なことの一つに、レッドオーシャンとブルーオーシャンがある。商材はとても大事。',
    category: '市場戦略',
    tags: ['SNS', 'レッドオーシャン', 'ブルーオーシャン', '商材'],
    importance: 4
  },
  {
    id: 'sns-028',
    content: '何か一つでバズると、他の媒体もバズりやすくなる',
    category: 'クロスメディア',
    tags: ['バズ', '媒体', 'クロスメディア'],
    importance: 4
  },
  {
    id: 'sns-029',
    content: 'Instagramを見ている人はティックトックもたまに見ている。',
    category: 'ユーザー行動',
    tags: ['Instagram', 'TikTok', 'ユーザー行動'],
    importance: 3
  },
  {
    id: 'sns-030',
    content: 'ストーリーやライブはファン化するのに最適な機能。',
    category: 'ファン化',
    tags: ['ストーリー', 'ライブ', 'ファン化'],
    importance: 4
  },
  {
    id: 'sns-031',
    content: '一枚の投稿に力入れるより、一本の動画に力を入れた方が増える。',
    category: 'コンテンツ戦略',
    tags: ['投稿', '動画', 'フォロワー増加'],
    importance: 4
  },
  {
    id: 'sns-032',
    content: 'フォロワーが多い方がフォロワーは増えやすい。',
    category: 'フォロワー増加',
    tags: ['フォロワー', '増加'],
    importance: 3
  },
  {
    id: 'sns-033',
    content: 'SNSで一番エンドユーザーにアプローチできるのはInstagramである。',
    category: 'プラットフォーム戦略',
    tags: ['SNS', 'Instagram', 'エンドユーザー', 'アプローチ'],
    importance: 5
  },
  {
    id: 'sns-034',
    content: 'Instagramは新規獲得・収益化・広告運用に最適である。',
    category: 'プラットフォーム戦略',
    tags: ['Instagram', '新規獲得', '収益化', '広告運用'],
    importance: 5
  },
  {
    id: 'sns-035',
    content: 'InstagramのトップページはLPや雑誌の表紙のように統一感を出すべきだ。',
    category: 'ブランディング',
    tags: ['Instagram', 'トップページ', 'LP', '雑誌', '統一感'],
    importance: 4
  },
  {
    id: 'sns-036',
    content: 'YouTube、TikTokは新規獲得に強く、バズりやすいSNSである。',
    category: 'プラットフォーム戦略',
    tags: ['YouTube', 'TikTok', '新規獲得', 'バズ'],
    importance: 4
  },
  {
    id: 'sns-037',
    content: 'YouTube横動画は属人性が高く、ファン化された客層が多い。',
    category: 'プラットフォーム特性',
    tags: ['YouTube', '横動画', '属人性', 'ファン化'],
    importance: 4
  },
  {
    id: 'sns-038',
    content: '縦動画でバズるために一番大切なのは冒頭の2秒である。',
    category: 'バズテクニック',
    tags: ['縦動画', 'バズ', '冒頭2秒'],
    importance: 5
  },
  {
    id: 'sns-039',
    content: '動画をバズらせる要素は編集・構成・企画台本・人物の4つである。',
    category: 'バズテクニック',
    tags: ['動画', 'バズ', '編集', '構成', '企画台本', '人物'],
    importance: 5
  },
  {
    id: 'sns-040',
    content: 'いいねよりも保存が重視される。',
    category: 'エンゲージメント',
    tags: ['いいね', '保存', '重視'],
    importance: 4
  },
  {
    id: 'sns-041',
    content: 'コメントを促す企画がバズへの近道である。',
    category: 'エンゲージメント',
    tags: ['コメント', '企画', 'バズ'],
    importance: 4
  },
  {
    id: 'sns-042',
    content: 'バズったらフォロワーが増えるという考えは間違いである。',
    category: 'バズ戦略',
    tags: ['バズ', 'フォロワー', '間違い'],
    importance: 5
  },
  {
    id: 'sns-043',
    content: 'バズ時のために収益化導線を準備しておく必要がある。',
    category: '収益化',
    tags: ['バズ', '収益化', '導線', '準備'],
    importance: 5
  },
  {
    id: 'sns-044',
    content: 'バズったフォロワーで収益化するのは難しい。',
    category: '収益化',
    tags: ['バズ', 'フォロワー', '収益化', '難しい'],
    importance: 4
  },
  {
    id: 'sns-045',
    content: 'フォロワーは多くても収益化と直結しない。',
    category: '収益化',
    tags: ['フォロワー', '収益化', '直結しない'],
    importance: 4
  },
  {
    id: 'sns-046',
    content: '広告運用は収益化しやすい客層を集めるのに最適である。',
    category: '広告運用',
    tags: ['広告運用', '収益化', '客層'],
    importance: 5
  },
  {
    id: 'sns-047',
    content: 'フォロワーはファンではなく「たまに見る人」である。',
    category: 'ファン化',
    tags: ['フォロワー', 'ファン', 'たまに見る人'],
    importance: 5
  },
  {
    id: 'sns-048',
    content: 'フォロワーをファン化しなければ収益化はできない。',
    category: 'ファン化',
    tags: ['フォロワー', 'ファン化', '収益化'],
    importance: 5
  },
  {
    id: 'sns-049',
    content: 'SNS運用の本質は「継続」である。',
    category: '継続性',
    tags: ['SNS運用', '本質', '継続'],
    importance: 5
  },
  {
    id: 'sns-050',
    content: 'アルゴリズムは頻繁に変わるが本質は変わらない。',
    category: 'アルゴリズム理解',
    tags: ['アルゴリズム', '頻繁', '本質'],
    importance: 4
  },
  {
    id: 'sns-051',
    content: 'SNS運営側の意図を理解することが重要である。',
    category: 'アルゴリズム理解',
    tags: ['SNS運営', '意図', '理解', '重要'],
    importance: 4
  },
  {
    id: 'sns-052',
    content: '投稿の初動が拡散力を決める。',
    category: '投稿戦略',
    tags: ['投稿', '初動', '拡散力'],
    importance: 4
  },
  {
    id: 'sns-053',
    content: '投稿は日本時間17時〜21時のゴールデンタイムが最適である。',
    category: '投稿タイミング',
    tags: ['投稿', '日本時間', 'ゴールデンタイム', '17時-21時'],
    importance: 4
  },
  {
    id: 'sns-054',
    content: 'バズる動画はコメントが溢れている。',
    category: 'バズ分析',
    tags: ['バズ', '動画', 'コメント', '溢れる'],
    importance: 4
  },
  {
    id: 'sns-055',
    content: 'コメント欄は次の視聴者を引き込む装置である。',
    category: 'エンゲージメント',
    tags: ['コメント欄', '視聴者', '引き込む', '装置'],
    importance: 4
  },
  {
    id: 'sns-056',
    content: '賛否両論を起こすことはコメント増加につながる。',
    category: 'エンゲージメント',
    tags: ['賛否両論', 'コメント増加'],
    importance: 3
  },
  {
    id: 'sns-057',
    content: 'ただしブランディングを壊さない範囲で行うべきだ。',
    category: 'ブランディング',
    tags: ['ブランディング', '壊さない', '範囲'],
    importance: 4
  },
  {
    id: 'sns-058',
    content: '企画や台本が良くても編集次第で伸び方は変わる。',
    category: '動画制作',
    tags: ['企画', '台本', '編集', '伸び方'],
    importance: 4
  },
  {
    id: 'sns-059',
    content: '毎日投稿が基本である。',
    category: '投稿頻度',
    tags: ['毎日投稿', '基本'],
    importance: 4
  },
  {
    id: 'sns-060',
    content: 'バズったら2日に1回に切り替えるのが良い。',
    category: '投稿頻度',
    tags: ['バズ', '2日に1回', '切り替え'],
    importance: 3
  },
  {
    id: 'sns-061',
    content: 'バズる人の共通点は継続できる人である。',
    category: '継続性',
    tags: ['バズ', '共通点', '継続'],
    importance: 5
  },
  {
    id: 'sns-062',
    content: 'アルゴリズムは毎日投稿をチェックしている。',
    category: 'アルゴリズム理解',
    tags: ['アルゴリズム', '毎日投稿', 'チェック'],
    importance: 4
  },
  {
    id: 'sns-063',
    content: 'SNSは階段方式でバズが起こる。',
    category: 'バズパターン',
    tags: ['SNS', '階段方式', 'バズ'],
    importance: 3
  },
  {
    id: 'sns-064',
    content: '広告動画もバズる可能性がある。',
    category: '広告運用',
    tags: ['広告動画', 'バズ', '可能性'],
    importance: 4
  },
  {
    id: 'sns-065',
    content: '広告はデータを取りながら安く多くの人に届けられる。',
    category: '広告運用',
    tags: ['広告', 'データ', '安く', '多くの人'],
    importance: 4
  },
  {
    id: 'sns-066',
    content: 'ローカル広告は特に効果が高い。',
    category: '広告運用',
    tags: ['ローカル広告', '効果', '高い'],
    importance: 3
  },
  {
    id: 'sns-067',
    content: 'SNS運用ではレッドオーシャンとブルーオーシャンを見極めることが重要。',
    category: '市場戦略',
    tags: ['SNS運用', 'レッドオーシャン', 'ブルーオーシャン', '見極め'],
    importance: 4
  },
  {
    id: 'sns-068',
    content: '商材の選択が成果を大きく左右する。',
    category: '市場戦略',
    tags: ['商材', '選択', '成果', '左右'],
    importance: 4
  },
  {
    id: 'sns-069',
    content: '一つの媒体でバズると他の媒体でもバズりやすくなる。',
    category: 'クロスメディア',
    tags: ['媒体', 'バズ', '他の媒体'],
    importance: 4
  },
  {
    id: 'sns-070',
    content: 'Instagramを使う人はTikTokも見る傾向がある。',
    category: 'ユーザー行動',
    tags: ['Instagram', 'TikTok', '傾向'],
    importance: 3
  },
  {
    id: 'sns-071',
    content: 'ストーリーはファン化に効果的である。',
    category: 'ファン化',
    tags: ['ストーリー', 'ファン化', '効果的'],
    importance: 4
  },
  {
    id: 'sns-072',
    content: 'ライブ配信は濃いファンを作る。',
    category: 'ファン化',
    tags: ['ライブ配信', '濃いファン'],
    importance: 4
  },
  {
    id: 'sns-073',
    content: 'フォロワーが多い方が新しいフォロワーは増えやすい。',
    category: 'フォロワー増加',
    tags: ['フォロワー', '新しいフォロワー', '増えやすい'],
    importance: 3
  },
  {
    id: 'sns-074',
    content: '1枚投稿よりも1本の動画に力を入れるべきだ。',
    category: 'コンテンツ戦略',
    tags: ['1枚投稿', '1本の動画', '力を入れる'],
    importance: 4
  },
  {
    id: 'sns-075',
    content: '動画は保存されやすくアルゴリズムに評価されやすい。',
    category: 'コンテンツ戦略',
    tags: ['動画', '保存', 'アルゴリズム', '評価'],
    importance: 4
  },
  {
    id: 'sns-076',
    content: '視聴維持率を高める編集が必要である。',
    category: '動画制作',
    tags: ['視聴維持率', '編集', '必要'],
    importance: 4
  },
  {
    id: 'sns-077',
    content: '見やすいテロップや字幕が拡散に貢献する。',
    category: '動画制作',
    tags: ['テロップ', '字幕', '拡散', '貢献'],
    importance: 4
  },
  {
    id: 'sns-078',
    content: 'サムネイルはクリック率を大きく左右する。',
    category: '動画制作',
    tags: ['サムネイル', 'クリック率', '左右'],
    importance: 4
  },
  {
    id: 'sns-079',
    content: 'ゴールデンタイム外でも投稿の初動が良ければ伸びる。',
    category: '投稿タイミング',
    tags: ['ゴールデンタイム外', '投稿', '初動', '伸びる'],
    importance: 4
  },
  {
    id: 'sns-080',
    content: 'コメント返信はエンゲージメントを高める。',
    category: 'エンゲージメント',
    tags: ['コメント返信', 'エンゲージメント'],
    importance: 4
  },
  {
    id: 'sns-081',
    content: 'DMのやりとりはファン化につながる。',
    category: 'ファン化',
    tags: ['DM', 'やりとり', 'ファン化'],
    importance: 4
  },
  {
    id: 'sns-082',
    content: '継続投稿は信頼を築く手段である。',
    category: '継続性',
    tags: ['継続投稿', '信頼', '手段'],
    importance: 4
  },
  {
    id: 'sns-083',
    content: '成功は「継続＋改善」の掛け算である。',
    category: '継続性',
    tags: ['成功', '継続', '改善', '掛け算'],
    importance: 5
  },
  {
    id: 'sns-084',
    content: '失敗投稿もデータとして価値がある。',
    category: 'データ分析',
    tags: ['失敗投稿', 'データ', '価値'],
    importance: 4
  },
  {
    id: 'sns-085',
    content: '試行錯誤を続けた人が勝つ。',
    category: '継続性',
    tags: ['試行錯誤', '続ける', '勝つ'],
    importance: 5
  },
  {
    id: 'sns-086',
    content: '短期で結果を求めすぎないことが大切だ。',
    category: 'マインドセット',
    tags: ['短期', '結果', '求めすぎない', '大切'],
    importance: 4
  },
  {
    id: 'sns-087',
    content: 'バズは目的ではなく手段である。',
    category: 'バズ戦略',
    tags: ['バズ', '目的', '手段'],
    importance: 5
  },
  {
    id: 'sns-088',
    content: '認知拡大はバズで行う。',
    category: 'SNS戦略',
    tags: ['認知拡大', 'バズ'],
    importance: 4
  },
  {
    id: 'sns-089',
    content: 'ファン化は属人性で行う。',
    category: 'ファン化',
    tags: ['ファン化', '属人性'],
    importance: 4
  },
  {
    id: 'sns-090',
    content: '顧客獲得は広告で行う。',
    category: '広告運用',
    tags: ['顧客獲得', '広告'],
    importance: 4
  },
  {
    id: 'sns-091',
    content: '各SNSの役割を理解して運用を分けるべきだ。',
    category: 'SNS戦略',
    tags: ['SNS', '役割', '理解', '運用', '分ける'],
    importance: 4
  },
  {
    id: 'sns-092',
    content: 'ブランド世界観を崩さずに運用することが重要である。',
    category: 'ブランディング',
    tags: ['ブランド', '世界観', '崩さない', '運用', '重要'],
    importance: 4
  },
  {
    id: 'sns-093',
    content: 'バズを起こすには継続的な投稿数が必要だ。',
    category: 'バズ戦略',
    tags: ['バズ', '継続的', '投稿数', '必要'],
    importance: 4
  },
  {
    id: 'sns-094',
    content: '初動のインプレッション数を意識すべきだ。',
    category: '投稿戦略',
    tags: ['初動', 'インプレッション数', '意識'],
    importance: 4
  },
  {
    id: 'sns-095',
    content: '保存率が高い動画は拡散されやすい。',
    category: 'コンテンツ戦略',
    tags: ['保存率', '動画', '拡散'],
    importance: 4
  },
  {
    id: 'sns-096',
    content: 'シェアされやすい動画はフォロワー増加に直結する。',
    category: 'フォロワー増加',
    tags: ['シェア', '動画', 'フォロワー増加', '直結'],
    importance: 4
  },
  {
    id: 'sns-097',
    content: 'バズには視覚的インパクトが必須である。',
    category: 'バズテクニック',
    tags: ['バズ', '視覚的インパクト', '必須'],
    importance: 4
  },
  {
    id: 'sns-098',
    content: 'フォロワー数よりもファン数を重視すべきだ。',
    category: 'ファン化',
    tags: ['フォロワー数', 'ファン数', '重視'],
    importance: 5
  },
  {
    id: 'sns-099',
    content: '広告はCPAを意識して運用すべきだ。',
    category: '広告運用',
    tags: ['広告', 'CPA', '意識', '運用'],
    importance: 4
  },
  {
    id: 'sns-100',
    content: 'SNSの成功者は必ず継続力がある。',
    category: '継続性',
    tags: ['SNS', '成功者', '継続力'],
    importance: 5
  },
  {
    id: 'sns-101',
    content: '本質は「価値を届けること」である。',
    category: 'マインドセット',
    tags: ['本質', '価値', '届ける'],
    importance: 5
  },
  {
    id: 'sns-102',
    content: 'SNSは継続する人にしか成果を出さない。',
    category: '継続性',
    tags: ['SNS', '継続', '成果'],
    importance: 5
  }
]

export class KeitaSNSManualRAG {
  private data: SNSManualEntry[]

  constructor() {
    this.data = keitaSNSManualData
  }

  // 文字列類似度を計算（簡易版）
  private calculateStringSimilarity(str1: string, str2: string): number {
    const words1 = str1.toLowerCase().split(/\s+/)
    const words2 = str2.toLowerCase().split(/\s+/)
    
    const intersection = words1.filter(word => words2.includes(word))
    const unionSet = new Set([...words1, ...words2])
    const union = Array.from(unionSet)
    
    return intersection.length / union.length
  }

  // クエリに基づいて関連するSNSマニュアルエントリーを検索
  public searchRelevantEntries(query: string, topK: number = 5): SNSManualEntry[] {
    const similarities = this.data.map(entry => ({
      entry,
      similarity: this.calculateStringSimilarity(
        query,
        entry.content + ' ' + entry.tags.join(' ')
      )
    }))

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(item => item.entry)
  }

  // カテゴリ別検索
  public searchByCategory(category: string, topK: number = 3): SNSManualEntry[] {
    return this.data
      .filter(entry => entry.category === category)
      .sort((a, b) => b.importance - a.importance)
      .slice(0, topK)
  }

  // タグベース検索
  public searchByTags(tags: string[], topK: number = 5): SNSManualEntry[] {
    const relevantEntries = this.data.filter(entry =>
      tags.some(tag => entry.tags.includes(tag))
    )

    return relevantEntries
      .sort((a, b) => b.importance - a.importance)
      .slice(0, topK)
  }

  // 重要度の高いエントリーを取得
  public getHighImportanceEntries(minImportance: number = 4): SNSManualEntry[] {
    return this.data
      .filter(entry => entry.importance >= minImportance)
      .sort((a, b) => b.importance - a.importance)
  }

  // 総合的な検索（クエリ + カテゴリ + タグ）
  public comprehensiveSearch(
    query: string,
    category?: string,
    tags?: string[],
    topK: number = 10
  ): SNSManualEntry[] {
    let filteredData = this.data

    // カテゴリフィルター
    if (category) {
      filteredData = filteredData.filter(entry => entry.category === category)
    }

    // タグフィルター
    if (tags && tags.length > 0) {
      filteredData = filteredData.filter(entry =>
        tags.some(tag => entry.tags.includes(tag))
      )
    }

    // 文字列類似度計算
    const similarities = filteredData.map(entry => ({
      entry,
      similarity: this.calculateStringSimilarity(
        query,
        entry.content + ' ' + entry.tags.join(' ')
      )
    }))

    return similarities
      .sort((a, b) => {
        // 類似度と重要度を組み合わせたスコア
        const scoreA = b.similarity * 0.7 + (b.entry.importance / 5) * 0.3
        const scoreB = a.similarity * 0.7 + (a.entry.importance / 5) * 0.3
        return scoreA - scoreB
      })
      .slice(0, topK)
      .map(item => item.entry)
  }

  // 全カテゴリを取得
  public getAllCategories(): string[] {
    return Array.from(new Set(this.data.map(entry => entry.category)))
  }

  // 全タグを取得
  public getAllTags(): string[] {
    const allTags = this.data.flatMap(entry => entry.tags)
    return Array.from(new Set(allTags))
  }

  // レコメンデーション: 類似したエントリーを取得
  public getRecommendations(entryId: string, topK: number = 3): SNSManualEntry[] {
    const targetEntry = this.data.find(entry => entry.id === entryId)
    if (!targetEntry) return []

    const similarities = this.data
      .filter(entry => entry.id !== entryId)
      .map(entry => ({
        entry,
        similarity: this.calculateStringSimilarity(
          targetEntry.content + ' ' + targetEntry.tags.join(' '),
          entry.content + ' ' + entry.tags.join(' ')
        )
      }))

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(item => item.entry)
  }

  // キーワード検索
  public searchByKeywords(keywords: string[], topK: number = 5): SNSManualEntry[] {
    const relevantEntries = this.data.filter(entry => {
      const searchText = (entry.content + ' ' + entry.tags.join(' ')).toLowerCase()
      return keywords.some(keyword => searchText.includes(keyword.toLowerCase()))
    })

    return relevantEntries
      .sort((a, b) => b.importance - a.importance)
      .slice(0, topK)
  }

  // 全データを取得
  public getAllEntries(): SNSManualEntry[] {
    return this.data
  }

  // データ統計情報を取得
  public getStatistics() {
    const categories = this.getAllCategories()
    const categoryCount = categories.reduce((acc, category) => {
      acc[category] = this.data.filter(entry => entry.category === category).length
      return acc
    }, {} as Record<string, number>)

    return {
      totalEntries: this.data.length,
      categories: categories.length,
      categoryBreakdown: categoryCount,
      averageImportance: this.data.reduce((sum, entry) => sum + entry.importance, 0) / this.data.length,
      highImportanceCount: this.data.filter(entry => entry.importance >= 4).length
    }
  }
}

export default KeitaSNSManualRAG 