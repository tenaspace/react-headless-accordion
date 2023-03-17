import React, {
  createContext,
  CSSProperties,
  ElementType,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useIsFirstRender, useEventListener } from './hooks'

export interface IContextHeadlessAccordion {
  multipleOpen: boolean
  defaultActiveKey: number[]
  active: number[]
  setActive: (active: number[]) => void
}

const ContextAccordion = createContext<IContextHeadlessAccordion>({
  multipleOpen: false,
  defaultActiveKey: [],
  active: [],
  setActive: () => {},
})

export interface IHeadlessAccordion {
  as?: ElementType
  multipleOpen?: IContextHeadlessAccordion[`multipleOpen`]
  defaultActiveKey?: IContextHeadlessAccordion[`defaultActiveKey`]
  children?: ReactNode
}

const Accordion = ({ as = `div`, multipleOpen = false, defaultActiveKey = [], children }: IHeadlessAccordion) => {
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
      <As>{children}</As>
    </ContextAccordion.Provider>
  )
}

export interface IContextHeadlessAccordionItem {
  eventKey: number
  open: boolean
}

const ContextAccordionItem = createContext<IContextHeadlessAccordionItem>({
  eventKey: -1,
  open: false,
})

export interface IHeadlessAccordionItem {
  as?: ElementType
  eventKey: IContextHeadlessAccordionItem[`eventKey`]
  id?: string
  children: ({ open }: { open?: IContextHeadlessAccordionItem[`open`] }) => ReactNode
}

const Item = ({ as = `div`, eventKey, id, children }: IHeadlessAccordionItem) => {
  const As = as
  const { active } = useContext(ContextAccordion)
  const open: IContextHeadlessAccordionItem[`open`] = active ? active.includes(eventKey) : false
  return (
    <ContextAccordionItem.Provider value={{ eventKey, open }}>
      <As id={id}>{children({ open })}</As>
    </ContextAccordionItem.Provider>
  )
}

export interface IHeadlessAccordionButton {
  as?: ElementType
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

const Button = ({ as = `div`, style = {}, className = ``, children }: IHeadlessAccordionButton) => {
  const As = as
  const { multipleOpen, active, setActive } = useContext(ContextAccordion)
  const { eventKey } = useContext(ContextAccordionItem)
  const handleOnClick = (eventKey: IContextHeadlessAccordionItem[`eventKey`]) => {
    const listActive = [...active]
    const includes = listActive.includes(eventKey)
    if (multipleOpen) {
      setActive(includes ? listActive.filter((item) => item !== eventKey) : [...listActive, eventKey])
    } else {
      setActive(includes ? [] : [eventKey])
    }
  }
  return (
    <As style={style} className={`${className ?? ``}`} onClick={() => handleOnClick(eventKey)}>
      {children}
    </As>
  )
}

export interface IHeadlessAccordionPanel {
  as?: ElementType
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

const Panel = ({ as = `div`, style = {}, className = ``, children }: IHeadlessAccordionPanel) => {
  const As = as
  const { defaultActiveKey } = useContext(ContextAccordion)
  const { eventKey, open } = useContext(ContextAccordionItem)
  const ref = useRef<HTMLElement | null>(null)
  const firstRender = useIsFirstRender()

  useEffect(() => {
    if (ref && ref.current) {
      if (!firstRender) {
        if (open) {
          ref.current.style.display = `block`
          ref.current.style.overflow = `hidden`
          ref.current.style.maxHeight = `0`
          ref.current.style.maxHeight = `${ref.current.scrollHeight}px`
        } else {
          ref.current.style.maxHeight = `${ref.current.scrollHeight}px`
          const timeOut = setTimeout(() => {
            if (ref && ref.current) {
              ref.current.style.overflow = `hidden`
              ref.current.style.maxHeight = `0`
            }
          }, 1)
          return () => {
            clearTimeout(timeOut)
          }
        }
      }
    }
  }, [firstRender, ref, open])

  useEventListener(
    `transitionend`,
    () => {
      if (ref && ref.current) {
        if (!firstRender) {
          if (open) {
            ref.current.style.display = ``
          } else {
            ref.current.style.display = `none`
          }
          ref.current.style.overflow = ``
          ref.current.style.maxHeight = ``
        }
      }
    },
    ref,
  )

  return (
    <As
      ref={ref}
      style={{
        ...style,
        display: `${firstRender && !defaultActiveKey.includes(eventKey) ? `none` : null}`,
      }}
      className={`${className ?? ``}`}
    >
      {children}
    </As>
  )
}

export const HeadlessAccordion = Object.assign(Accordion, {
  Item,
  Button,
  Panel,
})
