"use strict";
import { parseHtml } from "../modules/dom-parser.js";

const recordBtn = document.getElementById("record");
const inspectorBtn = document.getElementById("element-inspector");
const output = document.getElementById("output");
let inspectorActive = false;

// Record full body HTML
recordBtn.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const clone = document.body.cloneNode(true);
            clone.querySelectorAll("script, style").forEach(el => el.remove());
            return clone.outerHTML;
        }
    });

    // Parse the HTML string
    const parsed = parseHtml(result);
    output.value = parsed.text.substring(0, 1999);
    console.log("output", parsed);
});

// Toggle inspector mode
inspectorBtn.addEventListener("click", async () => {
    output.value = "";
    inspectorActive = !inspectorActive;
    inspectorBtn.textContent = inspectorActive ? "Stop Inspector" : "Element Inspector";

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tab.id, { inspectorActive });
});

// Listen for updates from content script
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.parsed) {
        output.value = msg.parsed.text;
        console.log("Links:", msg.parsed.links);
        console.log("Headings:", msg.parsed.headings);
        console.log("Images:", msg.parsed.images);
    }
    if (msg.inspectorStopped) {
        inspectorActive = false;
        inspectorBtn.textContent = "Element Inspector";
    }
});
