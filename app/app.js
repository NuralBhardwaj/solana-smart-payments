const status = document.getElementById("status");

// Authentication functions
window.onload = () => {
  // Always show login page on initial load
  document.getElementById("mainApp").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");

  // Clear any previous auth state
  localStorage.removeItem("auth");
};

// Function to initialize app components
function initializeApp() {
  // Render transaction history
  renderTransactionHistory();

  // Fetch SOL price
  fetchSolPrice();

  // Check if wallet is already connected
  checkWalletConnection();

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Function to check if wallet is already connected
async function checkWalletConnection() {
  try {
    // Check if Phantom is installed
    if ("solana" in window) {
      const provider = window.solana;

      // Check if it's Phantom
      if (provider.isPhantom) {
        // Check if already connected
        if (provider.isConnected) {
          const walletAddress = provider.publicKey.toString();

          // Update status with wallet address
          document.getElementById("status").innerHTML = `✅ Connected: <span class="font-mono text-xs">${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 6)}</span>`;

          // Update button text to show it's connected
          document.getElementById("connectWallet").innerHTML = `
            <i data-lucide="check-circle" class="inline mr-2 w-4 h-4"></i> Wallet Connected
          `;
          document.getElementById("connectWallet").classList.remove("bg-purple-600", "hover:bg-purple-700");
          document.getElementById("connectWallet").classList.add("bg-green-600", "hover:bg-green-700");

          // Fetch and display balance
          try {
            const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
            const balance = await connection.getBalance(provider.publicKey);
            const solBalance = balance / solanaWeb3.LAMPORTS_PER_SOL;
            document.getElementById("balance").innerText = `💰 Balance: ${solBalance.toFixed(4)} SOL`;
          } catch (err) {
            console.error("Error fetching balance:", err);
          }

          // Re-initialize icons
          if (window.lucide) {
            lucide.createIcons();
          }
        }
      }
    }
  } catch (err) {
    console.error("Error checking wallet connection:", err);
  }
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "user@example.com" && password === "123456") {
    // Store auth state for current session only
    sessionStorage.setItem("auth", "true");

    // Show main app and hide login page
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("loginPage").classList.add("hidden");

    // Initialize app components
    initializeApp();

    // Show success toast
    showToast("✅ Login successful!", "#22c55e");
  } else {
    showToast("❌ Invalid login. Try again.", "#ef4444");
  }
}

function logout() {
  // Clear both localStorage and sessionStorage
  localStorage.removeItem("auth");
  sessionStorage.removeItem("auth");

  // Show login page
  document.getElementById("mainApp").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");

  // Show logout toast
  showToast("👋 Logged out successfully!", "#3b82f6");
}

// Import SPL Token functions
// Note: These imports will work when bundled with a tool like webpack
// For direct browser usage, we'll need to access these from the loaded library
// const { getAssociatedTokenAddress, createTransferInstruction, getAccount, getMint } = require("@solana/spl-token");

// USDC Devnet mint address
const USDC_MINT_ADDRESS = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"; // Devnet USDC mint

// Function to fetch SOL price
async function fetchSolPrice() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    const data = await response.json();
    const price = data.solana.usd;

    const solPriceElement = document.getElementById("solPrice");
    solPriceElement.innerHTML = `
      <i data-lucide="trending-up" class="inline w-4 h-4 mr-1"></i>
      1 SOL ≈ <span class="font-bold text-green-400">$${price}</span> USD
    `;
    // Re-initialize icons for the newly added icon
    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (err) {
    document.getElementById("solPrice").innerHTML = `
      <i data-lucide="alert-triangle" class="inline w-4 h-4 mr-1 text-yellow-500"></i>
      SOL Price Unavailable
    `;
    // Re-initialize icons for the newly added icon
    if (window.lucide) {
      lucide.createIcons();
    }
    console.error("Error fetching SOL price:", err);
  }
}

document.getElementById("connectWallet").addEventListener("click", async () => {
  try {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        // Update status before connecting
        document.getElementById("status").innerHTML = "Connecting to wallet...";

        // Connect to wallet
        const resp = await provider.connect();
        const walletAddress = resp.publicKey.toString();

        // Update status with wallet address
        document.getElementById("status").innerHTML = `✅ Connected: <span class="font-mono text-xs">${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 6)}</span>`;

        // Show toast notification
        showToast("✅ Wallet Connected: " + walletAddress);

        // Fetch and display balance
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
        const balance = await connection.getBalance(resp.publicKey);
        const solBalance = balance / solanaWeb3.LAMPORTS_PER_SOL;
        document.getElementById("balance").innerText = `💰 Balance: ${solBalance.toFixed(4)} SOL`;

        // Update button text to show it's connected
        document.getElementById("connectWallet").innerHTML = `
          <i data-lucide="check-circle" class="inline mr-2 w-4 h-4"></i> Wallet Connected
        `;
        document.getElementById("connectWallet").classList.remove("bg-purple-600", "hover:bg-purple-700");
        document.getElementById("connectWallet").classList.add("bg-green-600", "hover:bg-green-700");

        // Re-initialize icons
        if (window.lucide) {
          lucide.createIcons();
        }
      } else {
        showToast("⚠️ Phantom Wallet not detected.", "#f97316");
        document.getElementById("status").innerHTML = "⚠️ Phantom Wallet not detected.";
      }
    } else {
      showToast("⚠️ Please install Phantom Wallet.", "#f97316");
      document.getElementById("status").innerHTML = "⚠️ Please install Phantom Wallet.";
    }
  } catch (err) {
    console.error("Wallet connection error:", err);
    showToast("❌ Wallet connection failed.", "#ef4444");
    document.getElementById("status").innerHTML = "❌ Wallet connection failed.";
  }
});

document.getElementById("sendPayment").addEventListener("click", async () => {
  try {
    showLoader(); // show spinner
    const provider = window.solana;
    if (!provider || !provider.publicKey) {
      document.getElementById("status").innerHTML = "⚠️ Connect your wallet first.";
      showToast("⚠️ Please connect your wallet first.", "#f97316");
      hideLoader(); // hide spinner since we're returning early
      return;
    }

    // Update status to show we're processing
    document.getElementById("status").innerHTML = "Processing transaction...";

    const toAddress = document.getElementById("toAddress").value.trim();
    const amountInput = parseFloat(document.getElementById("amount").value.trim());
    const tokenType = document.getElementById("tokenType").value;

    // Check if we're sending SOL or SPL token
    if (tokenType === "SOL") {
      // Convert amount to lamports for SOL transfer
      const amount = amountInput * solanaWeb3.LAMPORTS_PER_SOL;

      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
      const fromPubkey = provider.publicKey;
      const toPubkey = new solanaWeb3.PublicKey(toAddress);

      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: amount,
        })
      );

      transaction.feePayer = fromPubkey;
      const blockhash = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash.blockhash;

      const signed = await provider.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());

      showToast(`✅ Payment sent!`);
      document.getElementById("status").innerHTML = `✅ Payment sent! <br/>🔗 <a href="https://explorer.solana.com/tx/${txid}?cluster=devnet" target="_blank">View on Explorer</a>`;
      saveTransactionToHistory(txid, amountInput, toAddress, "SOL");
    }
    else if (tokenType === "USDC") {
      // For USDC transfer, use the SPL token function
      await sendSPLToken(toAddress, amountInput, USDC_MINT_ADDRESS);
      // Note: The sendSPLToken function already handles the toast and history
    }
  } catch (err) {
    console.error(err);
    showToast("❌ Transaction failed. Check console.", "#ef4444");
  } finally {
    hideLoader(); // hide spinner
  }
});
// Save transaction to local storage
function saveTransactionToHistory(signature, amount, receiver, tokenType = "SOL") {
    let history = JSON.parse(localStorage.getItem("txHistory")) || [];
    history.unshift({
      signature,
      amount,
      receiver,
      tokenType,
      time: new Date().toLocaleString()
    });
    localStorage.setItem("txHistory", JSON.stringify(history));
    renderTransactionHistory();
  }

  // Render transaction history
  function renderTransactionHistory(showToastNotification = false) {
    const history = JSON.parse(localStorage.getItem("txHistory")) || [];
    const container = document.getElementById("txHistory");
    container.innerHTML = "";

    if (history.length === 0) {
      container.innerHTML = "<p class='text-gray-400 text-center py-4'>No transactions yet.</p>";
      if (showToastNotification) {
        showToast("ℹ️ No transaction history found.", "#3b82f6");
      }
      return;
    }

    if (showToastNotification) {
      showToast(`✅ Loaded ${history.length} transaction(s).`, "#22c55e");
    }

    const table = document.createElement("table");
    table.className = "w-full text-sm text-left text-white border-collapse";

    table.innerHTML = `
      <thead class="bg-gray-700 text-xs uppercase">
        <tr>
          <th class="px-4 py-3 rounded-tl-lg">Receiver</th>
          <th class="px-4 py-3">Amount</th>
          <th class="px-4 py-3">Token</th>
          <th class="px-4 py-3">Time</th>
          <th class="px-4 py-3 rounded-tr-lg">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${history.map((tx, index) => `
          <tr class="${index % 2 === 0 ? 'bg-gray-700 bg-opacity-30' : 'bg-gray-700 bg-opacity-10'} hover:bg-gray-700 hover:bg-opacity-50 transition-colors">
            <td class="px-4 py-3 font-mono text-xs">${tx.receiver.substring(0, 8)}...${tx.receiver.substring(tx.receiver.length - 8)}</td>
            <td class="px-4 py-3 font-medium">${tx.amount}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-1 rounded-full text-xs font-medium ${tx.tokenType === 'USDC' ? 'bg-blue-900 text-blue-200' : 'bg-green-900 text-green-200'}">
                ${tx.tokenType || 'SOL'}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-300">${tx.time}</td>
            <td class="px-4 py-3">
              <a href="https://explorer.solana.com/tx/${tx.signature}?cluster=devnet" target="_blank"
                 class="text-blue-400 hover:text-blue-300 flex items-center">
                <i data-lucide="external-link" class="inline w-4 h-4 mr-1"></i> View
              </a>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
    container.appendChild(table);
  }

  // Call render on page load
  renderTransactionHistory();
  function showToast(message, color = "#22c55e") { // default: green
    // Use Toastify
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: color,
      close: true
    }).showToast();

    // Also use custom toast
    const toast = document.getElementById("toast");
    if (toast) {
      // Set toast content and color based on message type
      if (message.includes("Payment sent")) {
        toast.textContent = "Payment sent successfully! 🔥";
        toast.style.backgroundColor = color;
        toast.classList.remove("hidden");
      }
      // Handle error messages
      else if (message.includes("❌") || message.includes("failed") || message.includes("⚠️")) {
        toast.textContent = message;
        toast.style.backgroundColor = color; // Use the provided color (usually red or orange for errors)
        toast.classList.remove("hidden");
      }

      // Hide after 3 seconds
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }
  }

  function showLoader() {
    document.getElementById("loader").style.display = "flex";
  }

  function hideLoader() {
    document.getElementById("loader").style.display = "none";
  }
  // Function to send SPL tokens
  async function sendSPLToken(toAddress, amount, mintAddress) {
    try {
      showLoader(); // Show spinner

      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
      const fromWallet = window.solana;

      if (!fromWallet || !fromWallet.publicKey) {
        showToast("⚠️ Please connect your wallet first.", "#f97316");
        return;
      }

      const mintPubkey = new solanaWeb3.PublicKey(mintAddress);
      const fromPublicKey = fromWallet.publicKey;
      const toPublicKey = new solanaWeb3.PublicKey(toAddress);

      // For browser usage, we need to use the SPL Token library methods differently
      // This is a simplified version that works with the SPL Token library loaded via script tag

      // Get the associated token accounts
      const fromTokenAccount = await splToken.getAssociatedTokenAddress(
        mintPubkey,
        fromPublicKey
      );

      const toTokenAccount = await splToken.getAssociatedTokenAddress(
        mintPubkey,
        toPublicKey
      );

      // Check if destination token account exists, if not create it
      let transaction = new solanaWeb3.Transaction();

      try {
        await connection.getAccountInfo(toTokenAccount);
      } catch (error) {
        // If account doesn't exist, add instruction to create it
        transaction.add(
          splToken.createAssociatedTokenAccountInstruction(
            fromPublicKey,
            toTokenAccount,
            toPublicKey,
            mintPubkey
          )
        );
      }

      // Add transfer instruction
      transaction.add(
        splToken.createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          fromPublicKey,
          amount * (10 ** 6) // assuming 6 decimals for USDC
        )
      );

      transaction.feePayer = fromPublicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      const signed = await fromWallet.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());

      showToast(`✅ Token Sent!`);
      document.getElementById("status").innerHTML = `✅ Token Sent! <br/>🔗 <a href="https://explorer.solana.com/tx/${txid}?cluster=devnet" target="_blank">View on Explorer</a>`;
      saveTransactionToHistory(txid, amount, toAddress, "USDC");

      return txid;
    } catch (err) {
      console.error(err);
      showToast("❌ Token transfer failed. Check console.", "#ef4444");
      throw err;
    } finally {
      hideLoader(); // Hide spinner
    }
  }

  document.getElementById("refreshBalance").addEventListener("click", async () => {
    try {
      const provider = window.solana;
      if (!provider || !provider.publicKey) {
        document.getElementById("status").innerHTML = "⚠️ Connect your wallet first.";
        showToast("⚠️ Connect your wallet first.", "#f97316");
        return;
      }

      // Show loading status
      document.getElementById("status").innerHTML = "Refreshing balance...";

      // Get wallet address for display
      const walletAddress = provider.publicKey.toString();

      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
      const balance = await connection.getBalance(provider.publicKey);
      const solBalance = balance / solanaWeb3.LAMPORTS_PER_SOL;

      // Update balance display
      document.getElementById("balance").innerText = `💰 Balance: ${solBalance.toFixed(4)} SOL`;

      // Update status with wallet address
      document.getElementById("status").innerHTML = `✅ Connected: <span class="font-mono text-xs">${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 6)}</span>`;

      // Show success toast
      showToast("✅ Balance refreshed!", "#22c55e");
    } catch (err) {
      console.error(err);
      document.getElementById("status").innerHTML = "❌ Failed to fetch balance.";
      showToast("❌ Failed to fetch balance.", "#ef4444");
    }
  });

// Call fetchSolPrice on page load and refresh every 30 seconds
fetchSolPrice();
setInterval(fetchSolPrice, 30000); // refresh every 30 sec

// Add event listeners to ensure camera is stopped when page is unloaded
window.addEventListener('beforeunload', () => {
  if (html5QrCodeScanner) {
    try {
      stopQRScanner();
    } catch (err) {
      console.error("Error stopping QR scanner on page unload:", err);
    }
  }
});

// Also stop scanner when user navigates away or switches tabs
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && html5QrCodeScanner) {
    try {
      stopQRScanner();
    } catch (err) {
      console.error("Error stopping QR scanner on visibility change:", err);
    }
  }
});

// QR Code Scanner functionality
let html5QrCodeScanner = null;
let availableCameras = [];
let currentCameraIndex = 0;

function startQRScanner() {
  try {
    // First, make sure any existing scanner is properly stopped
    if (html5QrCodeScanner) {
      stopQRScanner();
      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        initializeScanner();
      }, 300);
      return;
    }

    initializeScanner();
  } catch (error) {
    console.error("QR scanner initialization error:", error);
    showToast("❌ QR scanner initialization failed.", "#ef4444");
    hideLoader();
  }
}

function initializeScanner() {
  try {
    showLoader(); // Show loader while initializing camera

    const qrRegion = document.getElementById("qr-reader");
    const scannerGuides = document.getElementById("qr-scanner-guides");
    const scannerControls = document.getElementById("qr-scanner-controls");
    const fileUpload = document.getElementById("qr-file-upload");

    // Clear any previous content
    qrRegion.innerHTML = '';

    // Show the QR reader, guides, and controls
    qrRegion.classList.remove("hidden");
    scannerGuides.classList.remove("hidden");
    scannerControls.classList.remove("hidden");
    fileUpload.classList.remove("hidden");

    // Set fixed dimensions for better UI
    qrRegion.style.height = "350px";
    qrRegion.style.width = "100%";
    qrRegion.style.maxWidth = "500px";
    qrRegion.style.margin = "0 auto";
    qrRegion.style.position = "relative";

    // Create configuration object with improved detection settings
    const config = {
      fps: 15,                   // Higher frames per second for better detection
      qrbox: { width: 200, height: 200 }, // Slightly smaller scanning area for better focus
      aspectRatio: 1.0,
      formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ],
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true // Use the built-in detector if available
      },
      rememberLastUsedCamera: false, // Don't remember to avoid issues
      showTorchButtonIfSupported: true,    // Show torch button if device supports it
      disableFlip: false                   // Allow both horizontal and vertical QR codes
    };

    // Make sure we don't have an existing instance
    if (html5QrCodeScanner) {
      try {
        html5QrCodeScanner.clear();
      } catch (err) {
        console.log("Error clearing scanner:", err);
      }
      html5QrCodeScanner = null;
    }

    // Initialize scanner with verbose logging for debugging
    html5QrCodeScanner = new Html5Qrcode(
      "qr-reader",
      { verbose: true }
    );

    // First check if camera access is available
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        // Store available cameras for switching
        availableCameras = devices;

        // Camera devices found, use the environment camera if available
        let cameraId = devices[0].id; // Default to first camera
        currentCameraIndex = 0;

        // Try to find environment (back) camera
        const backCameraIndex = devices.findIndex(device =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('environment')
        );

        if (backCameraIndex !== -1) {
          cameraId = devices[backCameraIndex].id;
          currentCameraIndex = backCameraIndex;
        }

        // Update UI based on number of cameras
        document.getElementById("switchCamera").style.display =
          devices.length > 1 ? "block" : "none";

        // Log available cameras for debugging
        console.log("Available cameras:", devices);
        console.log("Selected camera:", cameraId, "at index", currentCameraIndex);

        // Start scanning with selected camera
        startScanningWithCamera(cameraId, config);
      } else {
        showToast("❌ No camera devices found.", "#ef4444");
        stopQRScanner();
        hideLoader();
      }
    }).catch(err => {
      console.error("Error getting cameras:", err);
      showToast("❌ Could not access camera. Check permissions.", "#ef4444");
      stopQRScanner();
      hideLoader();
    });
  } catch (error) {
    console.error("QR scanner initialization error:", error);
    showToast("❌ QR scanner initialization failed.", "#ef4444");
    hideLoader();
  }
}

function startScanningWithCamera(cameraId, config) {
  if (!html5QrCodeScanner) {
    console.error("Scanner not initialized");
    return;
  }

  // If already scanning, stop first
  if (html5QrCodeScanner.isScanning) {
    html5QrCodeScanner.stop().then(() => {
      startActualScanning(cameraId, config);
    }).catch(err => {
      console.error("Error stopping previous scan:", err);
      startActualScanning(cameraId, config);
    });
  } else {
    startActualScanning(cameraId, config);
  }
}

function startActualScanning(cameraId, config) {
  // Add a visual indicator that scanning is active
  const scanGuide = document.querySelector("#qr-scanner-guides .w-48");
  if (scanGuide) {
    scanGuide.classList.add("animate-pulse");
  }

  html5QrCodeScanner.start(
    cameraId,
    config,
    (qrCodeMessage) => {
      // On success - update the input field with the wallet address
      document.getElementById("toAddress").value = qrCodeMessage;

      // Check if it's a valid Solana address
      try {
        // Try to create a PublicKey object to validate the address
        new solanaWeb3.PublicKey(qrCodeMessage);
        showToast("✅ Valid Solana address scanned!", "#22c55e");
      } catch (err) {
        // Still use the scanned value but warn the user
        showToast("⚠️ QR code scanned, but may not be a valid Solana address.", "#f97316");
      }

      stopQRScanner();
    },
    (errorMessage) => {
      // On error - just log to console, don't disrupt the user
      console.log("QR scan error:", errorMessage);
    }
  ).then(() => {
    hideLoader(); // Hide loader after camera starts
    showToast("📷 Camera started. Point at a QR code.", "#3b82f6");

    // Re-initialize Lucide icons for the scanner controls
    if (window.lucide) {
      lucide.createIcons();
    }
  }).catch((err) => {
    console.error("QR scanner start error:", err);
    showToast("❌ Could not start camera. Check permissions.", "#ef4444");
    stopQRScanner();
    hideLoader();
  });
}

function switchCamera() {
  if (availableCameras.length <= 1) {
    showToast("⚠️ No other cameras available", "#f97316");
    return;
  }

  // Move to next camera in the list
  currentCameraIndex = (currentCameraIndex + 1) % availableCameras.length;
  const nextCamera = availableCameras[currentCameraIndex];

  showToast("🔄 Switching camera...", "#3b82f6");

  // Get the current config
  const config = {
    fps: 15,
    qrbox: { width: 200, height: 200 },
    aspectRatio: 1.0,
    formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ],
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true
    },
    showTorchButtonIfSupported: true,
    disableFlip: false
  };

  // Start scanning with the new camera
  startScanningWithCamera(nextCamera.id, config);
}

function stopQRScanner() {
  const qrRegion = document.getElementById("qr-reader");
  const scannerGuides = document.getElementById("qr-scanner-guides");
  const scannerControls = document.getElementById("qr-scanner-controls");
  const fileUpload = document.getElementById("qr-file-upload");

  // Force stop any active video streams
  const videoElements = document.querySelectorAll('video');
  videoElements.forEach(video => {
    if (video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach(track => {
        console.log("Stopping track:", track.kind);
        track.stop(); // Stop each track
      });
      video.srcObject = null; // Clear the source
    }
  });

  // Stop the QR scanner if it exists and is scanning
  if (html5QrCodeScanner) {
    if (html5QrCodeScanner.isScanning) {
      html5QrCodeScanner.stop().then(() => {
        console.log("QR Scanner stopped successfully");
        cleanupScanner();
        hideQRScannerElements();
      }).catch(err => {
        console.error("Error stopping QR scanner:", err);
        cleanupScanner();
        hideQRScannerElements();
      });
    } else {
      cleanupScanner();
      hideQRScannerElements();
    }
  } else {
    // If scanner wasn't initialized, just hide the elements
    hideQRScannerElements();
  }

  function cleanupScanner() {
    // Clear the scanner element
    if (qrRegion) {
      qrRegion.innerHTML = '';
    }

    // Remove any added styles
    if (qrRegion) {
      qrRegion.removeAttribute('style');
    }

    // Set the scanner to null to allow garbage collection
    html5QrCodeScanner = null;
  }

  function hideQRScannerElements() {
    qrRegion.classList.add("hidden");
    scannerGuides.classList.add("hidden");
    scannerControls.classList.add("hidden");
    fileUpload.classList.add("hidden");
  }
}

// Handle QR code file upload as a fallback method
function handleQRFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  showLoader();

  // Create a temporary HTML5QrCode instance if needed
  const tempScanner = html5QrCodeScanner || new Html5Qrcode("qr-reader");

  // Read the file and decode QR code
  tempScanner.scanFile(file, true)
    .then(qrCodeMessage => {
      // Update the input field with the wallet address
      document.getElementById("toAddress").value = qrCodeMessage;

      // Check if it's a valid Solana address
      try {
        // Try to create a PublicKey object to validate the address
        new solanaWeb3.PublicKey(qrCodeMessage);
        showToast("✅ Valid Solana address scanned from image!", "#22c55e");
      } catch (err) {
        // Still use the scanned value but warn the user
        showToast("⚠️ QR code scanned, but may not be a valid Solana address.", "#f97316");
      }

      // Reset the file input
      document.getElementById("qrFileInput").value = "";

      // Stop the scanner if it was running
      stopQRScanner();
    })
    .catch(err => {
      console.error("QR code scan error:", err);
      showToast("❌ Could not read QR code from image. Try another image or use camera.", "#ef4444");

      // Reset the file input
      document.getElementById("qrFileInput").value = "";
    })
    .finally(() => {
      hideLoader();
    });
}
