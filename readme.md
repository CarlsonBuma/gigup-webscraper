# Inspector Extension

A Chrome browser extension for capturing and inspecting HTML elements on web pages.

## Overview

Inspector Extension provides an intuitive interface to extract HTML content from any webpage. It offers two primary modes:
1. **Record HTML** - Captures the entire body HTML of the current page
2. **Element Inspector** - Interactively inspect individual elements by hovering and clicking

## Features

- 📋 **Full Page HTML Capture** - Export the complete HTML structure of a webpage's body
- 🔍 **Interactive Element Inspector** - Hover over elements to preview their HTML, click to capture
- 🎯 **Visual Highlighting** - Elements highlight with a red outline during inspection mode
- 📌 **Side Panel Interface** - Access the extension directly from the browser's side panel
- ✨ **Real-time Preview** - See element HTML as you hover over them

## Project Structure

```
app-events-webscraper/
├── manifest.json          # Chrome extension manifest (v3)
├── readme.md              # This file
├── app.html               # Alternative HTML interface
└── js/
    ├── app.js             # Main popup logic and event handlers
    ├── background.js      # Service worker for extension lifecycle
    └── inspector.js       # Content script for element inspection
```

## File Descriptions

### `manifest.json`
Defines the extension configuration:
- **Manifest Version**: 3 (latest Chrome extension format)
- **Permissions**: activeTab, scripting, sidePanel
- **Features**: Side panel integration, content scripts, service worker

### `app.html` / `popup.html`
User interface with:
- **Record HTML Button** - Captures full page body HTML
- **Element Inspector Button** - Toggles element inspection mode
- **Output Textarea** - Displays captured HTML content (420px × 70vh)

### `js/app.js`
Main application logic:
- Handles "Record HTML" button click to capture page body
- Toggles element inspector mode on/off
- Displays live HTML preview as user hovers over elements
- Communicates with content script via Chrome messaging API

### `js/background.js`
Service worker for extension lifecycle:
- Opens the side panel when the extension icon is clicked

### `js/inspector.js`
Content script injected into web pages:
- Highlights elements with red outline on hover
- Captures element HTML when clicked
- Sends HTML to popup via Chrome messaging
- Handles inspector mode activation/deactivation

## How to Use

1. **Install the Extension**
   - Load the extension in Chrome via `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select this folder

2. **Record Full Page HTML**
   - Click the extension icon in the toolbar
   - Click the "Record HTML" button
   - The complete body HTML will appear in the textarea

3. **Inspect Individual Elements**
   - Click the extension icon in the toolbar
   - Click the "Element Inspector" button
   - Hover over any element on the webpage to see its HTML
   - Click an element to capture it and stop inspector mode

## Technical Details

### Communication Flow

```
User clicks button in app.html
    ↓
app.js sends message to content script
    ↓
inspector.js captures element HTML
    ↓
Sends message back to app.js
    ↓
HTML displays in textarea
```

### Chrome APIs Used

- `chrome.tabs.query()` - Get active tab
- `chrome.scripting.executeScript()` - Run scripts in page context
- `chrome.runtime.onMessage` - Receive messages from content scripts
- `chrome.runtime.sendMessage()` - Send messages to popup
- `chrome.sidePanel.open()` - Open extension side panel

## Browser Compatibility

- Chrome 90+ (Manifest V3 requirement)
- Chromium-based browsers (Edge, Brave, etc.)

## Version

Current version: 1.0

## License

Internal use extension

## Notes

- The inspector mode prevents default click behavior to avoid navigation
- Elements remain highlighted until inspection is stopped
- HTML output is displayed as plain text for easy copying
