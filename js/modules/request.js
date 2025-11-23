"use strict"
import { 
    axiosRequest,
    STORAGE_KEY_API_ENDPOINT, 
    STORAGE_KEY_API_SECRET 
} from "./env.js"

// Send API Request
export const sendApiRequest = async (inspectorData) => {

    // Validate
    const { endpoint, secret } = await getAppSecret();
    if (!secret) console.error("No secret stored.");
    if (!endpoint) console.error("No endpoint stored.");
    if(!inspectorData?.data) return "Please select section."

    try {
        // Set Authorization header
        axiosRequest.defaults.headers.common["Authorization"] = `${secret}`;

        // Request
        const response = await axiosRequest.post(endpoint, {
            'base_url': inspectorData?.url,
            'scraper_data': inspectorData.data
        });
        console.log("API response:", response.data);
        return response.data.message;
    } catch (err) {
        console.error("Request failed:", err?.message);
        return err
    }
}

// App Secret Management
export const getAppSecret = async () => {
    const result = await chrome.storage.local.get([
        STORAGE_KEY_API_ENDPOINT,
        STORAGE_KEY_API_SECRET
    ]);

    return {
        endpoint: result[STORAGE_KEY_API_ENDPOINT] ?? null,
        secret: result[STORAGE_KEY_API_SECRET] ?? null
    };
}

export const saveAppSecret = async (apiEndpoint, apiSecret) => {
    const payload = {};
    if (apiEndpoint) payload[STORAGE_KEY_API_ENDPOINT] = apiEndpoint;
    if (apiSecret) payload[STORAGE_KEY_API_SECRET] = apiSecret;

    return await chrome.storage.local.set(payload);
}

export const deleteAppSecret = async () => {
    return await chrome.storage.local.remove([
        STORAGE_KEY_API_SECRET,
        STORAGE_KEY_API_ENDPOINT
    ]);
}
