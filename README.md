# 💸 Solana Smart Payments

A full-stack blockchain-based smart contract system for secure and modern peer-to-peer payments using the Solana blockchain. Built with Anchor (Rust), Phantom Wallet, Web3.js, and a beautiful Tailwind UI.

## 🔗 Live Demo

**[View Live Demo](https://nuralbhardwaj.github.io/solana-smart-payments/)** - Experience the application in action!

## 📸 Screenshots

<div align="center">
  <img src="./assets/screenshots/dashboard.png" alt="Dashboard" width="80%" />
  <p><em>Modern dashboard with Solana-themed UI</em></p>

  <img src="./assets/screenshots/login.png" alt="Login Screen" width="80%" style="margin-top: 20px;" />
  <p><em>Sleek login interface with Solana branding</em></p>

  <img src="./assets/screenshots/qr code scan.png" alt="QR Code Scanner" width="80%" style="margin-top: 20px;" />
  <p><em>Advanced QR code scanner with camera controls</em></p>

  <img src="./assets/screenshots/file upload .png" alt="File Upload" width="80%" style="margin-top: 20px;" />
  <p><em>QR code image upload alternative</em></p>
</div>

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
| 2025-05-22 | - Fixed QR code scanner UI with better button positioning              |
|            | - Added QR code image upload functionality                             |
|            | - Improved camera controls and scanning experience                     |
|            | - Enhanced user feedback during QR code scanning                       |
| 2025-05-21 | - Enhanced UI with Solana-themed gradients and animations              |
|            | - Improved QR code scanner with better camera handling                 |
|            | - Fixed transaction history display issues                             |
|            | - Changed to session-based authentication (login required every time)  |
|            | - Added visual feedback for all user interactions                      |

## 📱 QR Code Scanner Features

The application includes an advanced QR code scanner with the following features:

- 📷 Live camera scanning with real-time detection
- 🔄 Camera switching for devices with multiple cameras
- 📤 QR code image upload as an alternative to camera scanning
- 🎯 Visual scanning guide for better user experience
- 🔍 Automatic validation of Solana wallet addresses
- 🔔 Instant feedback with toast notifications
- 📋 Auto-filling of scanned addresses into the payment form

## 🧪 Testing Summary

| Feature                         | Result     |
|----------------------------------|------------|
| Wallet Connection               | ✅ Passed  |
| SPL Token Transfers             | ✅ Passed  |
| QR Scanner                      | ✅ Passed  |
| QR Image Upload                 | ✅ Passed  |
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

