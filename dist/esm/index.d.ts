import { ElementType, ReactNode } from 'react';
export interface IContextHeadlessAccordion {
    multipleOpen: boolean;
    defaultActiveKey: number[];
    active: number[];
    setActive: (active: number[]) => void;
}
export interface IHeadlessAccordion {
    as?: ElementType;
    multipleOpen?: IContextHeadlessAccordion[`multipleOpen`];
    defaultActiveKey?: IContextHeadlessAccordion[`defaultActiveKey`];
    className?: string;
    children?: ReactNode;
}
export declare const ContextAccordion: import("react").Context<IContextHeadlessAccordion>;
declare const _default: (({ as, multipleOpen, defaultActiveKey, className, children, }: IHeadlessAccordion) => JSX.Element) & {
    Item: ({ as, eventKey, id, className, children, }: import("./item").IHeadlessAccordionItem) => JSX.Element;
    Button: ({ as, ...props }: import("./button").IHeadlessAccordionButton) => JSX.Element;
    Panel: ({ as, className, children, }: import("./panel").IHeadlessAccordionPanel) => JSX.Element;
};
export default _default;
