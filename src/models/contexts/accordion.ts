export interface IContextAccordion {
  multipleOpen: boolean;
  defaultActiveKey: number[];
  active: number[];
  setActive: (active: number[]) => void;
}
