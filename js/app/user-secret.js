"use strict"
import { EXTENSION_STORAGE_LOCAL_KEY_NAME } from "../env.js"

// App Secret
const secretInput = document.getElementById("secret");
const saveBtn = document.getElementById("save-secret");
const showBtn = document.getElementById("show-secret");
const hideBtn = document.getElementById("hide-secret");
const deleteBtn = document.getElementById("delete-secret");
const secretMsg = document.getElementById("secret-message");

// Load secret on startup (mask it)
chrome.storage.local.get([EXTENSION_STORAGE_LOCAL_KEY_NAME], (result) => {
    if (result[EXTENSION_STORAGE_LOCAL_KEY_NAME]) {
        secretInput.value = "••••••••"; // masked
        secretMsg.textContent = "Secret set.";
        saveBtn.disabled = true;
    }
});

// Save secret
saveBtn.addEventListener("click", () => {
    const secret = secretInput.value;
    if (secret) {
        chrome.storage.local.set({ [EXTENSION_STORAGE_LOCAL_KEY_NAME]: secret }, () => {
            secretInput.value = "••••••••"; // mask after save
            secretMsg.textContent = "Secret stored.";
            saveBtn.disabled = true;
        });
    }
});

// Show secret
showBtn.addEventListener("click", () => {
    chrome.storage.local.get([EXTENSION_STORAGE_LOCAL_KEY_NAME], (result) => {
        if (result[EXTENSION_STORAGE_LOCAL_KEY_NAME]) {
            secretMsg.textContent = result[EXTENSION_STORAGE_LOCAL_KEY_NAME];
        } else {
            secretMsg.textContent = "No secret available.";
        }
    });
});

// Hide secret
hideBtn.addEventListener("click", () => {
    secretMsg.textContent = "******"
});

// Delete secret
deleteBtn.addEventListener("click", () => {
    chrome.storage.local.remove(EXTENSION_STORAGE_LOCAL_KEY_NAME, () => {
        secretInput.value = "";
        secretMsg.textContent = "Secret removed.";
        saveBtn.disabled = false;
    });
});
