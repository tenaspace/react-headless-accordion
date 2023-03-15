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
import HeadlessAccordion from '@tenaspace/react-headless-accordion';

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
];

const App = () => {
  return (
    <>
      <HeadlessAccordion defaultActiveKey={[0]}>
        {list.map((item, key: number) => (
          <HeadlessAccordion.Item eventKey={key}>
            {({ open }) => {
              return (
                <>
                  <HeadlessAccordion.Button>
                    {item.title} {open ? `-` : `+`}
                  </HeadlessAccordion.Button>
                  <HeadlessAccordion.Panel
                    style={{
                      transitionProperty: `max-height`,
                      transitionDuration: `0.3s`,
                    }}
                  >
                    <div>{item.content}</div>
                  </HeadlessAccordion.Panel>
                </>
              );
            }}
          </HeadlessAccordion.Item>
        ))}
      </HeadlessAccordion>
    </>
  );
};

export default App;
```
