import React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { HeadlessAccordion } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
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
    render(
      <HeadlessAccordion defaultActiveKey={[`0`]}>
        {list.map((item, key: number) => (
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
      </HeadlessAccordion>,
    )
  })
})
