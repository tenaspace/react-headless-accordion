import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, createContext } from 'react';
import { ContextAccordion } from '.';
export var ContextAccordionItem = createContext({
    eventKey: -1,
    open: false
});
var HeadlessAccordionItem = function (_a) {
    var _b = _a.as, as = _b === void 0 ? "div" : _b, eventKey = _a.eventKey, id = _a.id, className = _a.className, children = _a.children;
    var As = as;
    var active = useContext(ContextAccordion).active;
    var open = active
        ? active.includes(eventKey)
        : false;
    return (_jsx(ContextAccordionItem.Provider, __assign({ value: { eventKey: eventKey, open: open } }, { children: _jsx(As, __assign({ id: id, className: "".concat(className !== null && className !== void 0 ? className : "") }, { children: children({ open: open }) })) })));
};
export default HeadlessAccordionItem;
//# sourceMappingURL=item.js.map