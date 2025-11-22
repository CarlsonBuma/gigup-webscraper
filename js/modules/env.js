"use strict"

export const EXTENSION_STORAGE_LOCAL_KEY_NAME = "scraper_secret"

// Axios Request
export const API_BASE_URL="http://localhost:8000/api"

export const apiClient = window.axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // optional: 10s timeout
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true
});
