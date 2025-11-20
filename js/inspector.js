"use strict";

let inspectorActive = false;
let lastHighlight = null;

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((msg) => {
    inspectorActive = msg.inspectorActive;
    if (!inspectorActive && lastHighlight) {
        lastHighlight.style.outline = "";
        lastHighlight = null;
    }
});

// Utility: parse element into structured data
function parseElement(el) {
    const clone = el.cloneNode(true);
    clone.querySelectorAll("script, style").forEach(node => node.remove());

    const text = clone.innerText || "";

    const links = Array.from(clone.querySelectorAll("a"))
        .map(a => a.href)
        .filter(Boolean);

    const headings = Array.from(clone.querySelectorAll("h1,h2,h3,h4,h5,h6"))
        .map(h => h.innerText);

    const images = Array.from(clone.querySelectorAll("img"))
        .map(img => img.src);

    return {
        text: text.substring(0, 1999), // enforce limit
        links,
        headings,
        images
    };
}

// Highlight on hover
document.addEventListener("mouseover", (e) => {
    if (!inspectorActive) return;

    if (lastHighlight) lastHighlight.style.outline = "";
    e.target.style.outline = "2px solid red";
    lastHighlight = e.target;

    // Send structured preview
    chrome.runtime.sendMessage({ parsed: parseElement(e.target) });
});

// Capture on click and stop inspector
document.addEventListener("click", (e) => {
    if (!inspectorActive) return;

    e.preventDefault();
    e.stopPropagation();

    chrome.runtime.sendMessage({ parsed: parseElement(e.target) });

    if (lastHighlight) lastHighlight.style.outline = "";
    lastHighlight = null;

    inspectorActive = false;
    chrome.runtime.sendMessage({ inspectorStopped: true });
}, true);
