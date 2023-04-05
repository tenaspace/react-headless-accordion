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

interface ICommon {
  as?: ElementType
  className?: string | null
  style?: CSSProperties
}

export interface IContextHeadlessAccordion {
  multipleOpen: boolean
  defaultActiveKey: string[]
  active: IContextHeadlessAccordion[`defaultActiveKey`]
  setActive: (active: IContextHeadlessAccordion[`active`]) => void
}

const ContextAccordion = createContext<IContextHeadlessAccordion>({
  multipleOpen: false,
  defaultActiveKey: [],
  active: [],
  setActive: () => {},
})

export interface IHeadlessAccordion extends ICommon {
  multipleOpen?: IContextHeadlessAccordion[`multipleOpen`]
  defaultActiveKey?: IContextHeadlessAccordion[`defaultActiveKey`]
  children?: ReactNode
}

const Accordion = ({
  as = `div`,
  className = null,
  style = {},
  multipleOpen = false,
  defaultActiveKey = [],
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
      <As className={className} style={style}>
        {children}
      </As>
    </ContextAccordion.Provider>
  )
}

export interface IContextHeadlessAccordionItem {
  eventKey: string
  open: boolean
}

const ContextAccordionItem = createContext<IContextHeadlessAccordionItem>({
  eventKey: ``,
  open: false,
})

export interface IHeadlessAccordionItem extends ICommon {
  eventKey: IContextHeadlessAccordionItem[`eventKey`]
  id?: string
  children: ({ open }: { open?: IContextHeadlessAccordionItem[`open`] }) => ReactNode
}

const Item = ({ as = `div`, className = null, style = {}, eventKey, id, children }: IHeadlessAccordionItem) => {
  const As = as
  const { active } = useContext(ContextAccordion)
  const open: IContextHeadlessAccordionItem[`open`] = active ? active.includes(eventKey) : false
  return (
    <ContextAccordionItem.Provider value={{ eventKey, open }}>
      <As id={id} className={className} style={style}>
        {children({ open })}
      </As>
    </ContextAccordionItem.Provider>
  )
}

export interface IHeadlessAccordionButton extends ICommon {
  children?: ReactNode
}

const Button = ({ as = `div`, className = null, style = {}, children }: IHeadlessAccordionButton) => {
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
    <As className={className} style={style} onClick={() => handleOnClick(eventKey)}>
      {children}
    </As>
  )
}

export interface IHeadlessAccordionPanel extends ICommon {
  children?: ReactNode
}

const Panel = ({ as = `div`, className = null, style = {}, children }: IHeadlessAccordionPanel) => {
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
      className={className}
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
