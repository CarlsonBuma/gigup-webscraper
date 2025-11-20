"use strict"

// DOM Parser
export const parseHtml = (htmlString) => {
    // Convert string into a DOM Document
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Extract plain text (all visible text)
    const textContent = doc.body.innerText;

    // Extract all links
    const links = Array.from(doc.querySelectorAll("a"))
        .map(a => a.href)
        .filter(href => href); // remove empty

    // Extract headings
    const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        .map(h => h.innerText);

    // Extract images
    const images = Array.from(doc.querySelectorAll("img"))
        .map(img => img.src);

    return {
        text: textContent,
        links,
        headings,
        images
    };
}
