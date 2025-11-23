# Gigup Web Scraper

A Chrome browser extension for capturing and sending HTML elements from web pages to a backend API via authenticated requests.

## 🌐 Browser Compatibility

- Chrome 90+ (Manifest V3 requirement)
- Chromium-based browsers (Edge, Brave, etc.)

## ✨ Key Features

- **Scaled Data Extraction** – Capture structured content from websites repeatedly and reliably, enabling large‑scale scraping workflows  
- **Provider‑Supplied API Connection** – Connect directly to your service provider’s API using the endpoint and secret they supply for further processing
- **Structured Data Delivery** – Send clean, noise‑free HTML snippets that are ready for AI extraction, content analysis, or automated processing by the provider  
- **Side Panel Workflow** – Manage configuration, preview captured snippets, and control requests through a simple side panel interface  
- **Preview & Validation** – Review extracted content in real time before submission, ensuring accuracy and control for both user and provider  

---

## 👤 For End Users

Gigup Web Scraper is a Chrome extension designed to extract HTML content from web pages and submit it to a backend API for processing. Users can select specific text or HTML sections on any webpage, and the extension will send the serialized data to the configured API endpoint with secure authentication.

### Usage

1. **Configure API Access**
   - Enter your API **endpoint** and **secret** in the input fields.
   - Manage your secret with the **Save / Show / Hide / Delete** buttons.

2. **Activate the Inspector**
   - Click **Start Inspector** to enable selection mode.

3. **Capture Content**
   - Highlight any text or HTML fragment on a webpage.
   - The captured snippet appears instantly in the side panel.

4. **Review Selection**
   - Inspect the extracted HTML in the side panel preview.
   - Adjust your selection if needed.

5. **Send to API**
   - Click **Send Element** to submit the selection.
   - The request is sent with your stored endpoint and secret (see [API Data Flow](#api-data-flow-developer-notes)).

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
root/
├── manifest.json          # Chrome extension manifest (v3)
├── readme.md              # Documentation
├── package.json           # Project metadata (still useful for dev/build)
├── app.html               # Main UI interface
├── lib/                   # Vendored third‑party libraries
│   └── axios.min.js       # Axios UMD build (bundled for browser use)
└── js/                    # Active source files
    ├── app.js             # Main popup logic and UI event handlers
    ├── background.js      # Service worker for extension lifecycle
    ├── inspector.js       # Content script for HTML capture and serialization
    └── modules/
        ├── env.js         # App configuration and axios client setup
        └── request.js     # API request and configuration utilities
```

---

### API Data Flow (Developer Notes)

The extension communicates with the backend API using `axios` through the helper function `sendApiRequest(inspectorData)` defined in `request.js`.

#### Request Overview
- **Endpoint**: `<api_endpoint>` — retrieved from `chrome.storage.local`
- **Method**: `POST`
- **Headers**:
  - `Authorization: <api_secret>` — retrieved from `chrome.storage.local`
  - `Content-Type: application/json` (set automatically by axios)

#### Request Body
```json
{
  "base_url": "<string>",        // The URL of the inspected page
  "scraper_data": "<string>"     // Serialized HTML fragment selected by the inspector
}
```

---

# Legal & Compliance

- **Compliance**: Users are responsible for ensuring that any scraping activity complies with applicable laws, regulations, and the terms of service of the websites they interact with.
- **Data Protection**: Captured content may include personal or sensitive information. Users must handle such data responsibly and in accordance with local data protection rules (e.g., GDPR).
- **API Secrets**: Secrets stored in the browser are under the sole control of the user and their service provider. We recommend managing secret lifetimes according to established security best practices and industry standards. Never share or expose these secrets publicly.  
- **No Warranty**: The software is provided “as‑is” without guarantees of accuracy, reliability, or suitability for production environments. 
- **Liability**: The authors and contributors are not liable for misuse of the extension, including violations of site policies or data protection laws.

## License

see licence.md
