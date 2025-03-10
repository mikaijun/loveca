import * as React from 'react'
import { Accordion } from 'radix-ui'
import './AccordionWrapper.css'

type AccordionWrapperProps = {
  children: React.ReactNode
}
export const AccordionWrapper: React.FC<AccordionWrapperProps> = ({
  children,
}) => (
  <Accordion.Root
    className="AccordionRoot"
    collapsible
    defaultValue="item-1"
    type="single"
  >
    {children}
  </Accordion.Root>
)
