"use strict"
import { EXTENSION_STORAGE_LOCAL_KEY_NAME, API_ENDPOINT, apiClient } from "./env.js"

// Send Request
export const sendApiRequest = async (inspectorData) => {

    // Validate
    const storageSecret = await getAppSecret();
    if(!storageSecret) return "No secret stored."
    if(!inspectorData?.data) return "Please select section."

    try {
        // Set Authorization header
        apiClient.defaults.headers.common["Authorization"] = `${storageSecret}`;

        // Request
        const response = await apiClient.post(API_ENDPOINT, inspectorData);
        console.log("API response:", response.data);
        return response.data.message;
    } catch (err) {
        console.error("Request failed:", err);
        return err
    }
}

// App Secret Management
export const getAppSecret = async () => {
    const result = await chrome.storage.local.get([EXTENSION_STORAGE_LOCAL_KEY_NAME]);
    return result[EXTENSION_STORAGE_LOCAL_KEY_NAME] ?? null;
}

export const saveAppSecret = async (secret) => {
    return await chrome.storage.local.set({ [EXTENSION_STORAGE_LOCAL_KEY_NAME]: secret });
}

export const deleteAppSecret = async () => {
    return await chrome.storage.local.remove([EXTENSION_STORAGE_LOCAL_KEY_NAME]);
}
