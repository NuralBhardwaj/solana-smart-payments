const status = document.getElementById("status");

document.getElementById("connectWallet").addEventListener("click", async () => {
  try {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        const resp = await provider.connect();
        showToast("✅ Wallet Connected: " + resp.publicKey.toString());

         // New: Fetch and display balance
         const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
         const balance = await connection.getBalance(resp.publicKey);
         const solBalance = balance / solanaWeb3.LAMPORTS_PER_SOL;
         document.getElementById("balance").innerText = `💰 Balance: ${solBalance.toFixed(4)} SOL`;
      } else {
        showToast("⚠️ Phantom Wallet not detected.", "#f97316");
      }
    } else {
      showToast("⚠️ Please install Phantom Wallet.", "#f97316");
    }
  } catch (err) {
    showToast("❌ Wallet connection failed.", "#ef4444");
  }
});

document.getElementById("sendPayment").addEventListener("click", async () => {
  try {
    showLoader(); // show spinner
    const provider = window.solana;
    if (!provider || !provider.publicKey) {
      showToast("⚠️ Please connect your wallet first.", "#f97316");
      return;
    }

    const toAddress = document.getElementById("toAddress").value.trim();
    const amount = parseFloat(document.getElementById("amount").value.trim()) * solanaWeb3.LAMPORTS_PER_SOL;

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
    saveTransactionToHistory(txid, amount / solanaWeb3.LAMPORTS_PER_SOL, toAddress);
  } catch (err) {
    console.error(err);
    showToast("❌ Transaction failed. Check console.", "#ef4444");
  } finally {
    hideLoader(); // hide spinner
  }
});
// Save transaction to local storage
function saveTransactionToHistory(signature, amount, receiver) {
    let history = JSON.parse(localStorage.getItem("txHistory")) || [];
    history.unshift({
      signature,
      amount,
      receiver,
      time: new Date().toLocaleString()
    });
    localStorage.setItem("txHistory", JSON.stringify(history));
    renderTransactionHistory();
  }

  // Render transaction history
  function renderTransactionHistory() {
    const history = JSON.parse(localStorage.getItem("txHistory")) || [];
    const container = document.getElementById("txHistory");
    container.innerHTML = "";

    if (history.length === 0) {
      container.innerHTML = "<p class='text-gray-500'>No transactions yet.</p>";
      return;
    }

    const table = document.createElement("table");
    table.className = "w-full text-sm text-left text-white";

    table.innerHTML = `
      <thead class="bg-gray-700 text-xs uppercase">
        <tr>
          <th class="px-4 py-2">Receiver</th>
          <th class="px-4 py-2">Amount (SOL)</th>
          <th class="px-4 py-2">Time</th>
          <th class="px-4 py-2">Link</th>
        </tr>
      </thead>
      <tbody>
        ${history.map(tx => `
          <tr class="border-b border-gray-600">
            <td class="px-4 py-2">${tx.receiver}</td>
            <td class="px-4 py-2">${tx.amount}</td>
            <td class="px-4 py-2">${tx.time}</td>
            <td class="px-4 py-2">
              <a href="https://explorer.solana.com/tx/${tx.signature}?cluster=devnet" target="_blank" class="text-blue-400 underline">View</a>
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
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: color,
      close: true
    }).showToast();
  }
  
  function showLoader() {
    document.getElementById("loader").style.display = "flex";
  }
  
  function hideLoader() {
    document.getElementById("loader").style.display = "none";
  }
  document.getElementById("refreshBalance").addEventListener("click", async () => {
    try {
      const provider = window.solana;
      if (!provider || !provider.publicKey) {
        status.innerText = "⚠️ Connect your wallet first.";
        return;
      }
  
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
      const balance = await connection.getBalance(provider.publicKey);
      const solBalance = balance / solanaWeb3.LAMPORTS_PER_SOL;
      document.getElementById("balance").innerText = `💰 Balance: ${solBalance.toFixed(4)} SOL`;
    } catch (err) {
      console.error(err);
      status.innerText = "❌ Failed to fetch balance.";
    }
  });
  