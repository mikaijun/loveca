import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from 'radix-ui'
import {
  AccordionContent,
  AccordionTrigger,
  AccordionWrapper,
} from './AccordionWrapper'

const meta: Meta<typeof AccordionWrapper> = {
  component: AccordionWrapper,
}

export default meta
type Story = StoryObj<typeof AccordionWrapper>

export const Default: Story = {
  args: {
    children: (
      <>
        <Accordion.Item className="AccordionItem" value="item-1">
          <AccordionTrigger>THEキャラCAFÉ×ラブライブ</AccordionTrigger>
          <AccordionContent>
            詳しくは、THEキャラCAFÉ　HP・X(旧Twitter)をご確認ください。
          </AccordionContent>
        </Accordion.Item>
        <Accordion.Item className="AccordionItem" value="item-2">
          <AccordionTrigger>月発売の新刊書籍のお知らせ</AccordionTrigger>
          <AccordionContent>
            まるごと1冊ニジガクのコンテンツを収録した特別増刊号！
            まるごと1冊ニジガクのコンテンツを収録した特別増刊号。「ラブライブ！虹ヶ咲学園スクールアイドル同好会
            完結編
            第1章」をキャストグラビア、座談会等にてたっぷり振り返る特別企画を掲載。さらに、アニメ化もされた人気スピンオフ「にじよん」の特別エピソードや、イラストノベルシリーズ「虹ヶ咲
            素顔のフォトエッセイ」の特別エピソードも掲載。
            ※電子版では「ラブライブ！オフィシャルカードゲーム」のPRカードは未収録となります。
          </AccordionContent>
        </Accordion.Item>
        <Accordion.Item className="AccordionItem" value="item-3">
          <AccordionTrigger>4月度シングル</AccordionTrigger>
          <Accordion.Content className="AccordionContent">
            <div className="AccordionContentText">
              新曲制作プロジェクト NIJIGAKU Monthly Songs♪4月度シングル
              中須かすみ(CV.相良茉優)「にじいろ☆ルミエール」を下記対象店舗でご購入いただいた方に特典をお渡しいたします。
              対象店舗と特典内容をご確認の上、ぜひ予約してゲットしてくださいね♪
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
}
