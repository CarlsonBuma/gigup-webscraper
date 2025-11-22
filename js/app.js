"use strict"
import { sendApiRequest, getAppSecret, saveAppSecret, deleteAppSecret } from "./modules/request.js"

// Request
const btnStartInspector = document.getElementById("element-inspector");
const inspectorOutput = document.getElementById("output");
const btnRequest = document.getElementById("button-request");
const btnDeleteOutput = document.getElementById("button-delete-output");

// App Secret
const secretInput = document.getElementById("secret");
const btnSaveSecret = document.getElementById("save-secret");
const btnShowSecret = document.getElementById("show-secret");
const btnHideSecret = document.getElementById("hide-secret");
const btnDeleteSecret = document.getElementById("delete-secret");
const secretMsg = document.getElementById("secret-message");

// Globals
let inspectorActive = false;
let inspectorData = {
    url: '',
    data: ''
};

// Init Inspector
const appInit = async () => {
    const storageSecret = await getAppSecret()
    if(storageSecret) {
        secretInput.value = "••••••••";
        secretMsg.textContent = "Secret set.";
        btnSaveSecret.disabled = true;
    }
}

// Listen to Inspector emits
chrome.runtime.onMessage.addListener((msg) => {
    if(!inspectorActive) return;
    inspectorData = msg
    inspectorOutput.value = msg.data
});

// Send Request
btnDeleteOutput.addEventListener("click", async () => {
    inspectorData = null;
    inspectorOutput.value = ""
});

// Send Request
btnRequest.addEventListener("click", async () => {
    btnRequest.disabled = true;
    secretMsg.textContent = "Loading.";
    const response = await sendApiRequest(inspectorData)
    btnRequest.disabled = false;
    secretMsg.textContent = response;
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
    const secret = secretInput.value;
    if (secret) {
        await saveAppSecret(secret)
        secretInput.value = "••••••••"; // mask after save
        secretMsg.textContent = "Secret stored.";
        btnSaveSecret.disabled = true;
    }
});

// Show secret
btnShowSecret.addEventListener("click", async () => {
    const secret = await getAppSecret()
    if (secret) {
        secretMsg.textContent = secret;
    } else {
        secretMsg.textContent = "No secret available.";
    }
});

// Hide secret
btnHideSecret.addEventListener("click", () => {
    secretMsg.textContent = "******"
});

// Delete secret
btnDeleteSecret.addEventListener("click", async () => {
    await deleteAppSecret()
    secretInput.value = "";
    secretMsg.textContent = "Secret removed.";
    btnSaveSecret.disabled = false;
});

// Init App
appInit();
