import React from 'react'
import { useEffect, useContext, useRef } from 'react'
import ContextAccordion from './contexts/accordion'
import ContextAccordionItem from './contexts/item'
import { useIsFirstRender, useEventListener } from './hooks'
import { IHeadlessAccordionPanel } from './models/panel'

const HeadlessAccordionPanel = ({ as = `div`, ...props }: IHeadlessAccordionPanel) => {
  const As = as
  const { defaultActiveKey } = useContext(ContextAccordion)
  const { eventKey, open } = useContext(ContextAccordionItem)
  const ref = useRef<HTMLElement | null>(null)
  const firstRender = useIsFirstRender()

  useEffect(() => {
    if (ref && ref.current) {
      if (!firstRender) {
        if (open) {
          ref.current.style.cssText = `display: block; overflow: hidden; max-height: 0;`
          ref.current.style.maxHeight = `${ref.current.scrollHeight}px`
        } else {
          ref.current.style.maxHeight = `${ref.current.scrollHeight}px`
          const timeOut = setTimeout(() => {
            if (ref && ref.current) {
              ref.current.style.cssText = `overflow: hidden; max-height: 0;`
            }
          }, 1)
          return () => {
            clearTimeout(timeOut)
          }
        }
      }
    }
  }, [firstRender, ref, open])

  useEventListener(`transitionend`, () => {
    if (ref && ref.current) {
      if (!firstRender) {
        if (open) {
          ref.current.style.cssText = ``
        } else {
          ref.current.style.cssText = `display: none`
        }
      }
    }
  })

  return (
    <As
      ref={ref}
      className={`${props.className ?? ``}`}
      style={{
        ...props.style,
        display: `${firstRender && !defaultActiveKey.includes(eventKey) && `none`}`,
      }}
    >
      {props.children}
    </As>
  )
}

export default HeadlessAccordionPanel
