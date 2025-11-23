"use strict"
import { sendApiRequest, getAppSecret, saveAppSecret, deleteAppSecret } from "./modules/request.js"

// Request
const btnStartInspector = document.getElementById("element-inspector");
const inspectorOutput = document.getElementById("output");
const btnRequest = document.getElementById("button-request");
const btnRemoveOutput = document.getElementById("button-delete-output");

// App Secret
const endpointInput = document.getElementById("endpoint");
const secretInput = document.getElementById("secret");
const btnSaveSecret = document.getElementById("save-secret");
const btnShowSecret = document.getElementById("show-secret");
const btnHideSecret = document.getElementById("hide-secret");
const btnDeleteSecret = document.getElementById("delete-secret");

// Message
const appMsg = document.getElementById("app-message");

// Globals
let inspectorActive = false;
let inspectorData = {
    url: '',
    data: ''
};

// Chrome runtime Emits
chrome.runtime.onMessage.addListener((msg) => {

    // Init App
    // console.log('watcher', msg)
    if(msg?.type === "init") {
        initApp()
    }

    // Listen to inspector emits 
    else if(msg?.type === "inspector") {
        if(!inspectorActive) return;
        inspectorData = msg
        inspectorOutput.value = msg.data
    }
});

// Init App
const initApp = async () => {

    // Default Values
    btnSaveSecret.disabled = false;
    btnRequest.disabled = true
    secretInput.value = ""
    endpointInput.value = ""
    inspectorData = null;
    inspectorOutput.value = ""
    appMsg.textContent = "Configuration missing."
    btnStartInspector.textContent = inspectorActive ? "Stop Inspector" : "Element Inspector";

    // Set App Configuration
    const { endpoint, secret } = await getAppSecret();
    if(secret) secretInput.value = secret;
    if(endpoint) endpointInput.value = endpoint
    if(secret && endpoint) {
        appMsg.textContent = "Confguration completed.";
        btnRequest.disabled = false;
        return
    }

    // Configuration Guide
    if(!secret) appMsg.textContent = "Please enter secret.";
    if(!endpoint) appMsg.textContent = "Please enter endpoint.";
}

// Send Request
btnRequest.addEventListener("click", async () => {
    btnRequest.disabled = true;
    appMsg.textContent = "Loading.";
    const response = await sendApiRequest(inspectorData)
    btnRequest.disabled = false;
    appMsg.textContent = response;
});

// Remove Inspector Output
btnRemoveOutput.addEventListener("click", async () => {
    inspectorData = null;
    inspectorOutput.value = ""
});

// Toggle inspector mode
btnStartInspector.addEventListener("click", async () => {
    inspectorActive = !inspectorActive;
    btnStartInspector.textContent = inspectorActive ? "Stop Inspector" : "Element Inspector";

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tab.id, { inspectorActive });
});

// Save secret
btnSaveSecret.addEventListener("click", async () => {
    await saveAppSecret(endpointInput.value, secretInput.value)
    initApp()
});

// Show secret
btnShowSecret.addEventListener("click", async () => {
    const { endpoint, secret } = await getAppSecret()
    if (secret) {
        appMsg.textContent = secret;
    } else {
        appMsg.textContent = "No secret available.";
    }
});

// Hide secret
btnHideSecret.addEventListener("click", () => {
    appMsg.textContent = "******"
});

// Delete secret
btnDeleteSecret.addEventListener("click", async () => {
    await deleteAppSecret()
    initApp()
});

// INIT APP
initApp();
