# 🔐 How HTTPS Secures API Requests

When your extension sends an API request over **HTTPS**, the communication is protected by **TLS encryption**, ensuring that sensitive data (like tokens or secrets) cannot be intercepted or altered in transit.

1. **TLS Handshake**  
   - The browser and server initiate a handshake when connecting to `https://api.example.com/...`.  
   - They negotiate an encryption algorithm (e.g., AES, ChaCha20) and securely exchange keys using asymmetric cryptography (RSA, ECDHE).  

2. **Session Key Established**  
   - Both sides derive a shared session key.  
   - This key is used to encrypt and decrypt all subsequent traffic.  

3. **Secure Transmission**  
   - Requests (headers, body, tokens) are encrypted before leaving the browser.  
   - On the network, the data appears as random bytes, unreadable to anyone intercepting traffic.  

4. **Decryption on the Server**  
   - The server uses the session key to decrypt the request back into its original HTTP payload.  
   - It then processes the request (e.g., validating tokens, storing data).  

5. **Encrypted Response**  
   - The server encrypts its response with the same session key.  
   - The browser decrypts it before passing it to your extension.  

---

## 🚫 Without HTTPS
- Requests sent over `http://` are **unencrypted**.  
- All data — URLs, headers, bearer tokens, secrets, and body content — is visible to anyone monitoring the connection (e.g., on public Wi‑Fi, ISP logs, proxies).  
- Attackers can steal credentials or tamper with responses.  

---

## ✅ Summary
- HTTPS uses TLS to negotiate encryption once (during the handshake) and then secures all traffic with a shared session key.  
- **With HTTPS**: communication is encrypted, protecting secrets in transit.  
- **Without HTTPS**: requests are plain text, fully exposed to interception.  

---

👉 For Chrome extensions transmitting API secrets, **HTTPS is mandatory**. Using plain HTTP is equivalent to broadcasting your credentials to anyone on the network.
