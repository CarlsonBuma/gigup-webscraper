"use strict"

export const STORAGE_KEY_API_ENDPOINT = "api_endpoint"
export const STORAGE_KEY_API_SECRET = "api_secret"

export const axiosRequest = window.axios.create({
    timeout: 10000, // optional: 10s timeout
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true
})
