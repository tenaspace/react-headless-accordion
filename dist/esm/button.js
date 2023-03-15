import { __assign, __rest, __spreadArray } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { ContextAccordion } from ".";
import { ContextAccordionItem } from "./item";
var HeadlessAccordionButton = function (_a) {
    var _b;
    var _c = _a.as, as = _c === void 0 ? "button" : _c, props = __rest(_a, ["as"]);
    var As = as;
    var _d = useContext(ContextAccordion), multipleOpen = _d.multipleOpen, active = _d.active, setActive = _d.setActive;
    var eventKey = useContext(ContextAccordionItem).eventKey;
    var handleOnClick = function (eventKey) {
        var listActive = __spreadArray([], active, true);
        var includes = listActive.includes(eventKey);
        if (multipleOpen) {
            setActive(includes
                ? listActive.filter(function (item) { return item !== eventKey; })
                : __spreadArray(__spreadArray([], listActive, true), [eventKey], false));
        }
        else {
            setActive(includes ? [] : [eventKey]);
        }
    };
    return (_jsx(As, __assign({}, props, { className: "".concat((_b = props.className) !== null && _b !== void 0 ? _b : ""), onClick: function () { return handleOnClick(eventKey); } }, { children: props.children })));
};
export default HeadlessAccordionButton;
//# sourceMappingURL=button.js.map