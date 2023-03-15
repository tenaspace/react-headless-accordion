import React from 'react'
import { useState } from 'react'
import HeadlessAccordionItem from './item'
import HeadlessAccordionButton from './button'
import HeadlessAccordionPanel from './panel'
import { IHeadlessAccordion } from './models/accordion'
import ContextAccordion from './contexts/accordion'

const HeadlessAccordion = ({
  as = `div`,
  multipleOpen = false,
  defaultActiveKey = [],
  className,
  children,
}: IHeadlessAccordion) => {
  const As = as
  const [active, setActive] = useState<IHeadlessAccordion[`defaultActiveKey`]>(defaultActiveKey)
  return (
    <ContextAccordion.Provider
      value={{
        multipleOpen,
        defaultActiveKey,
        active: active ?? [],
        setActive,
      }}
    >
      <As className={`${className ?? ``}`}>{children}</As>
    </ContextAccordion.Provider>
  )
}

export default Object.assign(HeadlessAccordion, {
  Item: HeadlessAccordionItem,
  Button: HeadlessAccordionButton,
  Panel: HeadlessAccordionPanel,
})
