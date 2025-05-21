# 💸 Solana Smart Payments

A full-stack blockchain-based smart contract system for secure and modern peer-to-peer payments using the Solana blockchain. Built with Anchor (Rust), Phantom Wallet, Web3.js, and a beautiful Tailwind UI.

---

## 🚀 Features

- 🔐 Phantom Wallet connection
- 💰 Send SOL and SPL Tokens (e.g., USDC)
- 🌐 Real-time SOL price via CoinGecko
- 📲 QR Code scanner to auto-fill wallet address
- 🔔 Toast notifications for transaction success/failure
- 🧾 Transaction history stored locally
- 🔒 Email/password login authentication
- 🎨 Modern Tailwind CSS-based responsive dashboard UI with animations
- 🌙 Dark mode with Solana-themed gradients and visual effects
- 📱 Mobile-friendly responsive design
- ⚙️ Smart contract deployed on Solana Devnet

---

## 🛠️ Tech Stack

| Layer            | Technologies                        |
|------------------|-------------------------------------|
| Blockchain       | Solana, Anchor (Rust)               |
| Wallet           | Phantom Wallet                      |
| Frontend         | HTML, Tailwind CSS, JavaScript      |
| Web3 API         | Solana Web3.js, SPL-Token           |
| Auth             | Email/Password (session-based)      |
| Utilities        | Toastify.js, html5-qrcode           |
| Price Feed       | CoinGecko Public API                |

---

## 🆕 Recent Updates

| Date       | Updates                                                                |
|------------|------------------------------------------------------------------------|
| 2023-11-15 | - Enhanced UI with Solana-themed gradients and animations              |
|            | - Improved QR code scanner with better camera handling                 |
|            | - Fixed transaction history display issues                             |
|            | - Changed to session-based authentication (login required every time)  |
|            | - Added visual feedback for all user interactions                      |

## 🧪 Testing Summary

| Feature                         | Result     |
|----------------------------------|------------|
| Wallet Connection               | ✅ Passed  |
| SPL Token Transfers             | ✅ Passed  |
| QR Scanner                      | ✅ Passed  |
| SOL Price Fetching              | ✅ Passed  |
| Toast Notifications             | ✅ Passed  |
| Auth System                     | ✅ Passed  |
| Transaction History Display     | ✅ Passed  |

---

## 🔧 Setup Instructions

### 1. Clone this repo
```bash
git clone https://github.com/NuralBhardwaj/solana-smart-payments.git
cd solana-smart-payments
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Run the development server
```bash
npx http-server -p 8080 -c-1
```

### 4. Open in browser
Navigate to `http://localhost:8080` in your browser

### 5. Login with demo credentials
- Email: user@example.com
- Password: 123456


---

## **📜 License**

**This project is licensed under the MIT License.**

---

## **🙌 Author**

**Made with ☕ & ❤️ by [Nural Bhardwaj](https://github.com/NuralBhardwaj)**

