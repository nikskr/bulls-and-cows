export const el = (tag, props = {}, children = []) => {
    const element = Object.assign(document.createElement(tag), props);
    element.append(...children);
    return element;
};
//# sourceMappingURL=dom.js.map