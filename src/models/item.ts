import { ElementType, ReactNode } from 'react'
import { IContextHeadlessAccordionItem } from './contexts/item'

export interface IHeadlessAccordionItem {
  as?: ElementType
  eventKey: IContextHeadlessAccordionItem[`eventKey`]
  id?: string
  className?: string
  children: ({ open }: { open: boolean }) => ReactNode
}
