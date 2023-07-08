import React, {
  CSSProperties,
  ElementType,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useEventListener } from './hooks'

interface IStyleAndClassName {
  className?: string | null
  style?: CSSProperties | null
}

interface ICommon extends IStyleAndClassName {
  as?: ElementType
}

type IEventKey = string

interface IContextAccordion {
  multipleOpen: boolean
  defaultActiveKey: IEventKey[]
  active: IEventKey[]
  setActive: (active: IEventKey[]) => void
  clicked: boolean
  setClicked: (clicked: boolean) => void
}

const ContextAccordion = createContext<IContextAccordion>({
  multipleOpen: false,
  defaultActiveKey: [],
  active: [],
  setActive: () => {},
  clicked: false,
  setClicked: () => {},
})

interface IAccordion extends ICommon {
  children?: ReactNode
  multipleOpen?: boolean
  defaultActiveKey?: IEventKey[]
}

const handleOpen = (eventKey: IEventKey, active: IEventKey[]) => {
  return active.length > 0 ? active.includes(eventKey) : false
}

const Accordion = ({
  children,
  as = `div`,
  className = null,
  style = null,
  multipleOpen = false,
  defaultActiveKey = [],
}: IAccordion) => {
  const As = as

  const [active, setActive] = useState(defaultActiveKey)
  const [clicked, setClicked] = useState(false)

  return (
    <ContextAccordion.Provider
      value={{
        multipleOpen,
        defaultActiveKey,
        active,
        setActive,
        clicked,
        setClicked,
      }}
    >
      <As className={className} style={style}>
        {children}
      </As>
    </ContextAccordion.Provider>
  )
}

interface IContextItem {
  eventKey: string
}

const ContextItem = createContext<IContextItem>({
  eventKey: ``,
})

interface IItem extends ICommon {
  children: ({ open }: { open?: boolean }) => ReactNode
  eventKey: IEventKey
  id?: string
}

const Item = ({ children, as = `div`, className = null, style = null, eventKey, id }: IItem) => {
  const { active } = useContext(ContextAccordion)

  const As = as

  return (
    <ContextItem.Provider value={{ eventKey }}>
      <As id={id} className={className} style={style}>
        {children({ open: handleOpen(eventKey, active) })}
      </As>
    </ContextItem.Provider>
  )
}

interface IButton extends ICommon {
  children?: ReactNode
}

const Button = ({ children, as = `div`, className = null, style = null }: IButton) => {
  const { multipleOpen, active, setActive, clicked, setClicked } = useContext(ContextAccordion)
  const { eventKey } = useContext(ContextItem)

  const handleOnClick = (eventKey: IEventKey) => {
    if (!clicked) {
      setClicked(true)
    }
    const listActive = [...active]
    const includes = listActive.includes(eventKey)
    if (multipleOpen) {
      setActive(includes ? listActive.filter((item) => item !== eventKey) : [...listActive, eventKey])
    } else {
      setActive(includes ? [] : [eventKey])
    }
  }

  const As = as

  return (
    <As className={className} style={style} onClick={() => handleOnClick(eventKey)}>
      {children}
    </As>
  )
}

interface IPanel extends ICommon {
  children?: ReactNode
}

const Panel = ({ children, as = `div`, className = null, style = null }: IPanel) => {
  const { active, clicked } = useContext(ContextAccordion)
  const { eventKey } = useContext(ContextItem)

  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (clicked) {
      let open = handleOpen(eventKey, active)
      if (open) {
        if (ref.current) {
          ref.current.style.display = `block`
          ref.current.style.overflow = `hidden`
          ref.current.style.maxHeight = `0`
        }
        const timeout = setTimeout(() => {
          if (ref.current) {
            ref.current.style.maxHeight = `${ref.current.scrollHeight}px`
          }
        }, 0)
        return () => {
          clearTimeout(timeout)
        }
      } else {
        if (ref.current) {
          ref.current.style.maxHeight = `${ref.current.scrollHeight}px`
        }
        const timeout = setTimeout(() => {
          if (ref.current) {
            ref.current.style.overflow = `hidden`
            ref.current.style.maxHeight = `0`
          }
        }, 0)
        return () => {
          clearTimeout(timeout)
        }
      }
    }
  }, [ref, eventKey, active, clicked])

  useEventListener(
    `transitionend`,
    () => {
      if (clicked) {
        let open = handleOpen(eventKey, active)
        if (open) {
          if (ref.current) {
            ref.current.style.display = ``
          }
        } else {
          if (ref.current) {
            ref.current.style.display = `none`
          }
        }
        if (ref.current) {
          ref.current.style.overflow = ``
          ref.current.style.maxHeight = ``
        }
      }
    },
    ref,
  )

  const firstOpen = useRef(handleOpen(eventKey, active))

  const firstStyle: CSSProperties | null = firstOpen.current ? null : { display: `none` }

  const As = as

  return (
    <As ref={ref} className={className} style={{ ...style, ...firstStyle }}>
      {children}
    </As>
  )
}

export const HeadlessAccordion = Object.assign(Accordion, {
  Item,
  Button,
  Panel,
})
