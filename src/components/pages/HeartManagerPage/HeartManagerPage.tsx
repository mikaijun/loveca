import { Tabs } from 'radix-ui'

import { MonochromeManager } from '@components/features/settings/MonochromeManager'
import { ColorfulManager } from '@templates/ColorfulManager'
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
          ハート合計数のみ
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="TabsContent"
        style={{
          padding: '8px',
        }}
        value="tab1"
      >
        <ColorfulManager />
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
