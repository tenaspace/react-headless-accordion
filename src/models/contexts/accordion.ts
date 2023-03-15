export interface IContextHeadlessAccordion {
  multipleOpen: boolean
  defaultActiveKey: number[]
  active: number[]
  setActive: (active: number[]) => void
}
