"use strict";
const inspectorBtn = document.getElementById("element-inspector");
const output = document.getElementById("output");
let inspectorActive = false;

export const inspectorData = {
    url: '',
    text: '',
    links: [],
    headings: [],
    images: []
};

// Listen for updates from inspector.js
chrome.runtime.onMessage.addListener((msg) => {

    // Reset
    inspectorData.url = '';
    inspectorData.text = '';
    inspectorData.links = [];
    inspectorData.headings = [];
    inspectorData.images = [];

    // Set Inspector Data
    if (msg.element) {
        
        // Parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(msg.element, 'text/html');

        // Extract text, links, headings, images
        const text = doc.body.textContent.trim().replace(/\s+/g, ' ');

        const links = [...doc.querySelectorAll('a')].map(a => ({
            href: a.getAttribute('href'),   // use getAttribute for raw value
            text: a.innerText.trim()
        }));

        const headings = [...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')]
            .map(h => h.textContent.trim());

        const images = [...doc.querySelectorAll('img')].map(img => ({
            src: img.getAttribute('src'),   // raw attribute (avoids chrome-extension:// rewriting)
            alt: img.getAttribute('alt') || ''
        }));

        // Clean Raw HTML
        doc.body.querySelectorAll('[style],[class]').forEach(el => {
            el.removeAttribute('style');
            el.removeAttribute('class');
        });

        const cleanedElement = doc.body.outerHTML
            .trim()           
            .replace(/\s+/g, ' ');

        // Set Data
        inspectorData.url = msg.url;
        inspectorData.text = text;
        inspectorData.links = links;
        inspectorData.headings = headings;
        inspectorData.images = images;
        inspectorData.element = cleanedElement;

        // Show
        output.value = cleanedElement;
    }

    if (msg.inspectorStopped) {
        inspectorActive = false;
        inspectorBtn.textContent = "Element Inspector";
    }
});


