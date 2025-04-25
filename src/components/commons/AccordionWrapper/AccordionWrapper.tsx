import * as React from 'react'
import { Accordion } from 'radix-ui'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import './AccordionWrapper.css'

type AccordionWrapperProps = {
  children: React.ReactNode
}
export const AccordionWrapper: React.FC<AccordionWrapperProps> = ({
  children,
}) => (
  <Accordion.Root className="AccordionRoot" collapsible type="single">
    {children}
  </Accordion.Root>
)

export const AccordionTrigger: React.FC<{
  children: React.ReactNode
}> = ({ children }) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger className="AccordionTrigger">
      {children}
      <ChevronDownIcon aria-hidden className="AccordionChevron" />
    </Accordion.Trigger>
  </Accordion.Header>
)

export const AccordionContent: React.FC<{
  children: React.ReactNode
}> = ({ children }) => (
  <Accordion.Content className="AccordionContent">
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
)
