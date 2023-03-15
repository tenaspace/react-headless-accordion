import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, createContext } from 'react';
import HeadlessAccordionItem from './item';
import HeadlessAccordionButton from './button';
import HeadlessAccordionPanel from './panel';
export var ContextAccordion = createContext({
    multipleOpen: false,
    defaultActiveKey: [],
    active: [],
    setActive: function () { }
});
var HeadlessAccordion = function (_a) {
    var _b = _a.as, as = _b === void 0 ? "div" : _b, _c = _a.multipleOpen, multipleOpen = _c === void 0 ? false : _c, _d = _a.defaultActiveKey, defaultActiveKey = _d === void 0 ? [] : _d, className = _a.className, children = _a.children;
    var As = as;
    var _e = useState(defaultActiveKey), active = _e[0], setActive = _e[1];
    return (_jsx(ContextAccordion.Provider, __assign({ value: {
            multipleOpen: multipleOpen,
            defaultActiveKey: defaultActiveKey,
            active: active !== null && active !== void 0 ? active : [],
            setActive: setActive
        } }, { children: _jsx(As, __assign({ className: "".concat(className !== null && className !== void 0 ? className : "") }, { children: children })) })));
};
export default Object.assign(HeadlessAccordion, {
    Item: HeadlessAccordionItem,
    Button: HeadlessAccordionButton,
    Panel: HeadlessAccordionPanel
});
//# sourceMappingURL=index.js.map