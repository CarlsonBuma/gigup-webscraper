# Gigup Web Scraper

A Chrome browser extension for capturing and sending HTML elements from web pages to a backend API via authenticated requests.

## Browser Compatibility

- Chrome 90+ (Manifest V3 requirement)
- Chromium-based browsers (Edge, Brave, etc.)

## Key Features

- **Text Selection Inspector** - Select text or HTML elements on any webpage
- **API Integration** - Send captured HTML to a backend API endpoint with automatic serialization
- **Secure Authentication** - Store and manage API secrets locally in browser storage
- **Side Panel Interface** - Convenient side panel UI for all extension features
- **Smart HTML Filtering** - Automatically removes scripts, styles, forms, and other non-content elements
- **Real-time Output** - View captured HTML before sending to API

---

## 👤 For End Users

App Events Web Scraper is a Chrome extension designed to extract HTML content from web pages and submit it to a backend API for processing. Users can select specific text or HTML sections on any webpage, and the extension will send the serialized data to the configured API endpoint with secure authentication.

### Usage

1. Highlight content on a webpage  
2. See the captured HTML in the side panel  
3. Click **Send Element** to submit it to the API  
4. Manage your secret with **Save / Show / Hide / Delete** buttons

### Install

Download `repository` and store it within your prefered path:

1. **Enable Developer Mode**
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle the "Developer mode" switch in the top right corner

2. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to and select the `repository` folder
   - The extension will be installed and ready to use

3. **Verify Installation**
   - The extension icon should appear in your Chrome toolbar
   - Click it to verify the popup loads correctly

---

## 💻 For Developers

### Tech Stack
- **Manifest V3** (Chrome extension format)  
- **Languages**: HTML, CSS, JavaScript (ES6+)  
- **HTTP Client**: Axios  
- **Chrome APIs**: Runtime, Tabs, Storage, Side Panel 

### Folder Structure

```
webscraper/
├── manifest.json          # Chrome extension manifest (v3)
├── readme.md              # Documentation
├── package.json           # Project dependencies (axios, dotenv)
├── app.html               # Main UI interface
└── js/                    # Active source files
    ├── app.js             # Main popup logic and UI event handlers
    ├── background.js      # Service worker for extension lifecycle
    ├── inspector.js       # Content script for HTML capture and serialization
    └── modules/
        ├── env.js         # API configuration and axios client setup
        └── request.js     # API request and secret management utilities
```

---

## Legal & Compliance

- **Compliance**: Users are responsible for ensuring that any scraping activity complies with applicable laws, regulations, and the terms of service of the websites they interact with.
- **Data Protection**: Captured content may include personal or sensitive information. Users must handle such data responsibly and in accordance with local data protection rules (e.g., GDPR).
- **API Secrets**: Secrets stored in the browser are under the sole control of the user. Do not share or expose them publicly.  
- **No Warranty**: The software is provided “as‑is” without guarantees of accuracy, reliability, or suitability for production environments. 
- **Liability**: The authors and contributors are not liable for misuse of the extension, including violations of site policies or data protection laws.

## License

see licence.md
