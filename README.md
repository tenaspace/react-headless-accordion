# @tenaspace/react-headless-accordion

This is an unstyled React component helping you to easy to make the Accordion UI with your style.

## Demo

See how to use accordion basic and nested: [DEMO](https://react-package.tenaspace.com/react-headless-accordion)

## Installation

```shell
yarn add @tenaspace/react-headless-accordion
```

or via npm

```shell
npm install @tenaspace/react-headless-accordion
```

## Usage

```tsx
import { HeadlessAccordion } from '@tenaspace/react-headless-accordion'

const list = [
  {
    title: 'Item 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, praesentium nihil saepe similique distinctio impedit minima soluta quas reiciendis autem recusandae nesciunt libero magnam iusto aspernatur voluptatibus hic obcaecati ipsum',
  },
  {
    title: 'Item 2',
    content:
      'Illo, praesentium nihil saepe similique distinctio impedit minima soluta quas reiciendis autem recusandae',
  },
  {
    title: 'Item 3',
    content: 'libero magnam iusto aspernatur voluptatibus hic obcaecati ipsum',
  },
]

const App = () => {
  return (
    <>
      <HeadlessAccordion defaultActiveKey={[`0`]}>
        {list.map((item, key) => (
          <HeadlessAccordion.Item key={key} eventKey={`${key}`}>
            {({ open }) => {
              return (
                <>
                  <HeadlessAccordion.Button style={{ cursor: `pointer` }}>
                    {item.title} {open ? `-` : `+`}
                  </HeadlessAccordion.Button>
                  <HeadlessAccordion.Panel
                    style={{
                      transitionProperty: `max-height`,
                      transitionDuration: `0.2s`,
                    }}
                  >
                    <div>{item.content}</div>
                  </HeadlessAccordion.Panel>
                </>
              )
            }}
          </HeadlessAccordion.Item>
        ))}
      </HeadlessAccordion>
    </>
  )
}

export default App
```

## Props

| Name             | Mandatory | Type                | Default value | Component              | Note                                                                                                                                                                                                        |
| ---------------- | --------- | ------------------- | ------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultActiveKey | optional  | string[]            | []            | HeadlessAccordion      | Make the item you want open by default in the first load. Ex: `['0', '1']` => Item 1 and Item 2 will be opend in the first load. (The value must match with the `eventKey` of the `HeadlessAccordion.Item`) |
| multipleOpen     | optional  | boolean             | false         | HeadlessAccordion      | Set it `true` if you want to open multiple the Item                                                                                                                                                         |
| eventKey         | required  | string              |               | HeadlessAccordion.Item | The key ID of the Item                                                                                                                                                                                      |
| as               | optional  | React.ElementType              | div           | All                    | Set the tag HTML like whatever you want                                                                                                                                                                     |
| className        | optional  | string              | null          | All                    |                                                                                                                                                                                                             |
| style            | optional  | React.CSSProperties | {}            | All                    |                                                                                                                                                                                                             |

You can use the props `style` and `className` only in `HeadlessAccordion.Button` and `HeadlessAccordion.Panel`.

## Transition

You can set the transition at the `HeadlessAccordion.Panel` to make the effect collapse

Example with CSS inline:

```tsx
<HeadlessAccordion.Panel
  style={{
    transitionProperty: `max-height`,
    transitionDuration: `0.2s`,
  }}
>
  ... your content here
</HeadlessAccordion.Panel>
```

Example with Tailwind CSS

```tsx
<HeadlessAccordion.Panel className={`transition-[max-height] duration-200`}>
  ... your content here
</HeadlessAccordion.Panel>
```

or you can write your custom CSS and set into it.
