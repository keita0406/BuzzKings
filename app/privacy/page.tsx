export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center">プライバシーポリシー</h1>
      
      <div className="mb-8 text-sm text-gray-600 text-center">
        制定日：2020年4月1日<br />
        最終更新日：2024年12月1日
      </div>

      <div className="space-y-8">
        {/* 1. 基本方針 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">1. 基本方針</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Ace Dream LLC（以下「当社」といいます）は、SNSマーケティング事業、縫製工場運営事業、ブランド企画・運営事業、飲食店運営事業、美容サロン運営事業、コンサルティング事業を通じて、お客様の個人情報を取り扱っております。
            </p>
            <p>
              当社は、個人情報の重要性を認識し、個人情報の保護に関する法律及び関連法令等を遵守し、当社の事業活動において個人情報を適切に取り扱います。
            </p>
          </div>
        </section>

        {/* 2. 適用範囲 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">2. 適用範囲</h2>
          <p className="text-gray-700 leading-relaxed">
            本プライバシーポリシーは、当社が運営するウェブサイト「BUZZLAB」（https://buzzlab8.jp）及び関連するすべてのサービスにおいて適用されます。
          </p>
        </section>

        {/* 3. 個人情報の定義 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">3. 個人情報の定義</h2>
          <p className="text-gray-700 leading-relaxed">
            本プライバシーポリシーにおいて、個人情報とは、個人情報の保護に関する法律に規定する個人情報を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述により特定の個人を識別することができる情報及び他の情報と容易に照合することができ、それにより特定の個人を識別することができる情報（個人識別情報）を指します。
          </p>
        </section>

        {/* 4. 収集する個人情報 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">4. 収集する個人情報</h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-3">当社では、以下の個人情報を収集する場合があります：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>お名前</li>
              <li>メールアドレス</li>
              <li>電話番号</li>
              <li>会社名・団体名</li>
              <li>業種・職種</li>
              <li>SNSアカウント情報</li>
              <li>お問い合わせ内容</li>
              <li>サービス利用履歴</li>
              <li>アクセスログ情報（IPアドレス、ブラウザ情報等）</li>
              <li>Cookieによる情報</li>
            </ul>
          </div>
        </section>

        {/* 5. 個人情報の利用目的 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">5. 個人情報の利用目的</h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-3">当社では、収集した個人情報を以下の目的で利用いたします：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SNSマーケティングサービスの提供</li>
              <li>お問い合わせに対する回答・対応</li>
              <li>サービスに関する情報提供・案内</li>
              <li>カウンセリング・コンサルティングサービスの提供</li>
              <li>請求書発行・代金決済</li>
              <li>サービス品質向上のための分析</li>
              <li>新サービス・キャンペーンのご案内</li>
              <li>アフターサポート・フォローアップ</li>
              <li>統計データの作成（個人が特定されない形式）</li>
              <li>法令に基づく対応</li>
            </ul>
          </div>
        </section>

        {/* 6. 第三者提供 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">6. 第三者への提供</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              当社は、以下の場合を除いて、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供することはありません。
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
            </ul>
          </div>
        </section>

        {/* 7. 業務委託 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">7. 業務委託</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              当社では、サービス提供のため以下の業務を外部に委託する場合があります：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>メール配信サービス</li>
              <li>決済処理サービス</li>
              <li>クラウドサービス（データ保存・分析）</li>
              <li>SNS分析ツール</li>
              <li>カスタマーサポートシステム</li>
            </ul>
            <p>
              委託先に対しては、個人情報の適切な管理を求め、必要かつ適切な監督を行います。
            </p>
          </div>
        </section>

        {/* 8. Cookieの使用 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">8. Cookieの使用</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              当社ウェブサイトでは、サービス向上のためCookieを使用しています。Cookieの使用目的は以下のとおりです：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>ウェブサイトの利用状況分析</li>
              <li>ユーザビリティ向上</li>
              <li>広告配信の最適化</li>
              <li>セキュリティ確保</li>
            </ul>
            <p>
              Cookieの受け入れを希望されない場合は、ブラウザの設定により拒否することが可能です。ただし、一部のサービスがご利用いただけない場合があります。
            </p>
          </div>
        </section>

        {/* 9. Google Analytics */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">9. Google Analyticsの使用</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              当社ウェブサイトでは、Googleが提供するアクセス解析ツール「Google Analytics」を使用しています。Google Analyticsは、Cookieを使用してウェブサイトの利用状況を分析します。
            </p>
            <p>
              Google Analyticsで収集されるデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することができます。
            </p>
            <p>
              詳細については、Google Analyticsの利用規約及びGoogleのプライバシーポリシーをご確認ください。
            </p>
          </div>
        </section>

        {/* 10. 個人情報の管理 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">10. 個人情報の管理</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              当社は、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、以下のセキュリティ対策を実施しています：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL暗号化通信の使用</li>
              <li>アクセス権限の制限</li>
              <li>定期的なセキュリティ監査</li>
              <li>従業員への個人情報保護教育</li>
              <li>データバックアップの実施</li>
            </ul>
          </div>
        </section>

        {/* 11. 開示・訂正・削除 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">11. 個人情報の開示・訂正・削除</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              お客様は、当社の保有する自己の個人情報について、開示・訂正・削除・利用停止を求めることができます。
            </p>
            <p>
              ご請求の際は、本人確認のため以下の情報をお知らせください：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>お名前</li>
              <li>メールアドレス</li>
              <li>お問い合わせ内容</li>
            </ul>
            <p>
              なお、法令により保存が義務付けられている情報については、削除できない場合があります。
            </p>
          </div>
        </section>

        {/* 12. プライバシーポリシーの変更 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">12. プライバシーポリシーの変更</h2>
          <p className="text-gray-700 leading-relaxed">
            当社は、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更については、ウェブサイト上でお知らせいたします。最新版は当ウェブサイトに掲載いたします。
          </p>
        </section>

        {/* 13. お問い合わせ */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">13. お問い合わせ</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed mb-4">
              個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：
            </p>
            <div className="space-y-2 text-gray-800">
              <p><strong>会社名：</strong>Ace Dream LLC</p>
              <p><strong>代表者：</strong>盛 啓太</p>
              <p><strong>所在地：</strong>〒663-8166 兵庫県西宮市甲子園七番町9−18 H2Oビル２F</p>
              <p><strong>電話番号：</strong>080-4240-4803</p>
              <p><strong>メールアドレス：</strong>info@buzzlab.jp</p>
              <p><strong>受付時間：</strong>平日 9:00-18:00</p>
            </div>
          </div>
        </section>

        {/* 14. 法的根拠 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">14. 法的根拠</h2>
          <p className="text-gray-700 leading-relaxed">
            本プライバシーポリシーは、個人情報の保護に関する法律、電気通信事業法、特定電子メール法等の関係法令に基づいて策定されています。
          </p>
        </section>

        {/* 15. 国際的なデータ転送 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-300 pb-2">15. 国際的なデータ転送</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              当社では、サービス提供のため以下の海外サービスを利用する場合があります：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Analytics（アメリカ）</li>
              <li>メール配信サービス（アメリカ）</li>
              <li>クラウドストレージサービス（アメリカ）</li>
            </ul>
            <p>
              これらのサービスは、適切なプライバシー保護措置を講じている事業者を選定しており、お客様の個人情報は適切に保護されます。
            </p>
          </div>
        </section>

        {/* フッター */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Ace Dream LLC<br />
            最終更新日：2024年12月1日
          </p>
        </div>
      </div>
    </div>
  )
} 