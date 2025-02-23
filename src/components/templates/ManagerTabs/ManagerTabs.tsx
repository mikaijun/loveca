import { Tabs } from 'radix-ui'
import './ManagerTabs.css'
import { MonochromeManager } from '@organism/MonochromeManager'
import { ColorfulManager } from '@organism/ColorfulManager'

export const ManagerTabs = () => {
  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List aria-label="Manage your account" className="TabsList">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          ハート合計数のみ
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          ハート色別計算
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="tab1">
        <MonochromeManager />
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab2">
        <ColorfulManager />
      </Tabs.Content>
    </Tabs.Root>
  )
}
