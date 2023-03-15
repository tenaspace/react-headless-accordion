# @tenaspace/react-headless-accordion

This is an unstyled React component helping you to easy to make the Accordion UI with your style.

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
import HeadlessAccordion from '@tenaspace/react-headless-accordion'

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
      <HeadlessAccordion defaultActiveKey={[0]}>
        {list.map((item, key: number) => (
          <HeadlessAccordion.Item key={key} eventKey={key}>
            {({ open }) => {
              return (
                <>
                  <HeadlessAccordion.Button>
                    {item.title} {open ? `-` : `+`}
                  </HeadlessAccordion.Button>
                  <HeadlessAccordion.Panel
                    style={{
                      transitionProperty: `max-height`,
                      transitionDuration: `0.15s`,
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

| Name             | Mandatory | Type     | Default value | Component              | Note                                                                                                                                                                                                    |
| ---------------- | --------- | -------- | ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultActiveKey | optional  | number[] | []            | HeadlessAccordion      | Make the item you want open by default in the first load. Ex: `[0, 1]` => Item 1 and Item 2 will be opend in the first load. (The value must match with the `eventKey` of the `HeadlessAccordion.Item`) |
| multipleOpen     | optional  | boolean  | false         | HeadlessAccordion      | Set it `true` if you want to open multiple the Item                                                                                                                                                     |
| eventKey         | required  | number   |               | HeadlessAccordion.Item | The key ID of the Item                                                                                                                                                                                  |

## Transition

You can set the transition at the `HeadlessAccordion.Panel` to make the effect collapse

Example with CSS inline:

```tsx
<HeadlessAccordion.Panel
  style={{
    transitionProperty: `max-height`,
    transitionDuration: `0.15s`,
  }}
>
  ... your content here
</HeadlessAccordion.Panel>
```

Example with Tailwind CSS

```tsx
<HeadlessAccordion.Panel className={`transition-[max-height] duration-150`}>
  ... your content here
</HeadlessAccordion.Panel>
```

or you can write your custom CSS and set into it.
