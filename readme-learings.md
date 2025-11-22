# 🔐 How HTTPS Secures API Requests

1. **Client → Server handshake**  
   - When your extension calls `https://api.example.com/...`, the browser and server first perform a **TLS handshake**.  
   - They agree on an encryption algorithm (AES, ChaCha20, etc.) and exchange keys securely using asymmetric cryptography (RSA, ECDHE).  

2. **Session key established**  
   - After the handshake, both sides have a shared **session key**.  
   - This key is used to encrypt all subsequent traffic between your extension and the server.  

3. **Encrypted transmission**  
   - Your API request (headers, body, tokens) is encrypted with the session key before leaving the browser.  
   - On the wire, it looks like random bytes — not readable by anyone intercepting traffic.  

4. **Server decrypts**  
   - The server uses the same session key to decrypt the request back into the original HTTP payload.  
   - It processes the request normally (e.g., validates your bearer token, stores data).  

5. **Response encrypted back**  
   - The server encrypts its response with the same session key.  
   - The browser decrypts it before handing it to your extension.  

---

## 🚫 Without HTTPS
- If you call `http://api.example.com/...`, there is **no encryption**.  
- The request goes over the network in plain text:  
  - URL, headers, bearer tokens, API secrets, and body are all visible to anyone sniffing traffic (e.g., on public Wi‑Fi, ISP logs, proxies).  
- Attackers could steal your tokens or modify the response.  

---

## ✅ Summary
- HTTPS doesn’t mean the server “sends an algorithm” each time — the algorithm is agreed during the TLS handshake, then all traffic is encrypted/decrypted with a shared session key.  
- With HTTPS: safe, encrypted, secrets protected in transit.  
- Without HTTPS: just raw API calls, fully exposed.  

---

👉 Since you’re building a Chrome extension that transmits API secrets, **always use HTTPS**. Otherwise, you’re effectively handing those secrets to anyone watching the network.
