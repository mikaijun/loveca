import { Tabs } from 'radix-ui'

import { ColorfulHeartManager } from '@components/features/heartCounter/ColorfulHeartManager'
import { MonochromeManager } from '@components/features/heartCounter/MonochromeHeartManager'
import './HeartManagerPage.css'

export const HeartManagerPage = () => {
  return (
    <Tabs.Root
      className="TabsRoot"
      defaultValue="tab1"
      style={{ maxWidth: '668px' }}
    >
      <Tabs.List aria-label="Manage your account" className="TabsList">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          ハート色別計算
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          ハート合計数
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="TabsContent"
        style={{
          padding: '8px',
        }}
        value="tab1"
      >
        <ColorfulHeartManager />
      </Tabs.Content>
      <Tabs.Content
        className="TabsContent"
        style={{
          padding: '8px',
        }}
        value="tab2"
      >
        <MonochromeManager />
      </Tabs.Content>
    </Tabs.Root>
  )
}
