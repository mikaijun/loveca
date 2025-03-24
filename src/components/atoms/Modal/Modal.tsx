import * as React from 'react'
import { Dialog } from 'radix-ui'
import { Cross2Icon } from '@radix-ui/react-icons'
import './Modal.css'

type ModalProps = {
  children: React.ReactNode
  trigger: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ children, trigger }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          {children}
          <Dialog.Close asChild>
            <button aria-label="Close" className="IconButton">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
