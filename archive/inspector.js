"use strict";

let inspectorActive = false;
let lastHighlight = null;

document.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    // get the common ancestor of the selection
    const range = sel.getRangeAt(0);
    let el = range.commonAncestorContainer;

    // if it's a text node, climb up to its parent element
    if (el.nodeType !== 1) {
        el = el.parentElement;
    }

    // log the innerHTML of the outer element
    console.log(serializeElement(el));
});

function serializeElement(el) {
    if (!el) return "";

    // tags to skip completely
    const skipTags = [
        "script", "style", 
        "noscript", "iframe", "link", "meta"
        "nav", "footer", "header"
    ];

    if (skipTags.includes(el.tagName.toLowerCase())) {
        return ""; // drop scripts & styles
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

// Highlight on hover
document.addEventListener("mouseover", (e) => {
    if (!inspectorActive) return;
    
    if (lastHighlight) lastHighlight.style.outline = "";

    let el = e.target;

    // If the element has no visible content, climb up until you find one
    while (el && !hasVisibleContent(el) && el.parentElement) {
        el = el.parentElement;
    }

    if (el) {
        el.style.outline = "2px solid red";
        lastHighlight = el;
        console.log("Inspector element:", el.tagName, el);
    }
});

function hasVisibleContent(el) {
    // Check if element has text or non-empty children
    const text = el.textContent.trim();
    if (text.length > 0) return true;

    // Check if it contains images, videos, or other non-empty nodes
    if (el.querySelector("img, video, svg, iframe")) return true;

    return false;
}

// Capture on click and stop inspector
document.addEventListener("click", (e) => {
    if (!inspectorActive) return;

    e.preventDefault();
    e.stopPropagation();

    if (lastHighlight) lastHighlight.style.outline = "";
    lastHighlight = null;

    // Emit to Chrome Runtime Environment
    inspectorActive = false;
    chrome.runtime.sendMessage({ 
        url: window.location.href,
        element: e.target.outerHTML,
        inspectorStopped: true 
    });
}, true);

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((msg) => {
    inspectorActive = msg.inspectorActive;
    if (!inspectorActive && lastHighlight) {
        lastHighlight.style.outline = "";
        lastHighlight = null;
    }
});
