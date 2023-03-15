import { createContext } from 'react'
import { IContextHeadlessAccordionItem } from 'src/models/contexts/item'

const ContextAccordionItem = createContext<IContextHeadlessAccordionItem>({
  eventKey: -1,
  open: false,
})

export default ContextAccordionItem
