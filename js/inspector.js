"use strict";

// On Website "Mouse-Selection"
document.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    // get the common ancestor of the selection
    const range = sel.getRangeAt(0);

    // clone only the selected fragment
    const fragment = range.cloneContents();

    // wrap in a temporary container to get HTML
    const el = document.createElement("div");
    el.appendChild(fragment);

    // Emit to App - see background.js
    const serializedElement = serializeElement(el)
    chrome.runtime.sendMessage({ 
        url: window.location.href,
        data: serializedElement,
    });
});

function serializeElement(el) {
    if (!el) return "";

    // tags to skip completely
    const skipTags = [
        "script", "style", 
        "noscript", "iframe", "link", "meta",
        "nav", "footer", "header", "form"
    ];
    
    // Skip Tags
    if (skipTags.includes(el.tagName.toLowerCase())) {
        return "";
    }

    // whitelist of attributes to keep
    const keepAttrs = [
        "id", "title", 
        "href", 
        "src", "alt", "width", "height" 
    ];

    const attrs = [];
    for (const name of keepAttrs) {
        if (el.hasAttribute && el.hasAttribute(name)) {
        attrs.push(`${name}="${el.getAttribute(name)}"`);
        }
    }

    const tag = el.tagName.toLowerCase();
    const selfClosing = ["img", "br", "hr", "input"].includes(tag);

    const openTag = `<${tag}${attrs.length ? " " + attrs.join(" ") : ""}${selfClosing ? " />" : ">"}`;
    if (selfClosing) return openTag;

    const children = Array.from(el.childNodes).map(node => {
        if (node.nodeType === 3) {
        return node.textContent.replace(/\s+/g, " ").trim(); // normalize whitespace
        } else if (node.nodeType === 1) {
        return serializeElement(node);
        }
        return "";
    }).join("");

    return openTag + children + `</${tag}>`;
}
