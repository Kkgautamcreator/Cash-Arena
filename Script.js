let userWallet = 50; // Starting balance
let transactionHistory = [];

document.getElementById('walletBalance').innerText = userWallet;

// Update wallet balance in both top bar and wallet modal
function updateWalletUI() {
    document.getElementById('walletBalance').innerText = userWallet;
    const modalWalletBalance = document.getElementById('modalWalletBalance');
    if (modalWalletBalance) {
        modalWalletBalance.innerText = userWallet;
    }
}

// Show wallet modal (renamed to match index.html button call)
function showWallet() {
    updateWalletUI();
    document.getElementById('walletModal').style.display = 'block';
}

// Close wallet modal
function closeWallet() {
    document.getElementById('walletModal').style.display = 'none';
}

// Add funds to wallet
function addFunds() {
    const amount = parseFloat(prompt('Enter amount to add:'));
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount!');
        return;
    }
    userWallet += amount;
    transactionHistory.push({ date: new Date().toLocaleString(), type: 'Deposit', amount });
    alert(`₹${amount} added successfully!`);
    updateWalletUI();
    showTransactionHistory();
}

// Withdraw funds from wallet
function withdrawFunds() {
    const amount = parseFloat(prompt('Enter withdrawal amount (Min ₹100):'));
    if (isNaN(amount) || amount < 100) {
        alert('Invalid amount. Minimum withdrawal is ₹100.');
        return;
    }
    if (amount > userWallet) {
        alert('Insufficient balance.');
        return;
    }

    const paymentMethod = prompt('Enter payment method (PhonePe / Paytm / PayPal):');
    if (!paymentMethod || !['phonepe', 'paytm', 'paypal'].includes(paymentMethod.toLowerCase())) {
        alert('Invalid payment method!');
        return;
    }

    userWallet -= amount;
    transactionHistory.push({ date: new Date().toLocaleString(), type: 'Withdrawal', amount: -amount });
    alert(`₹${amount} withdrawal request submitted via ${paymentMethod}. Processing...`);
    updateWalletUI();
    showTransactionHistory();
}

// Show transaction history in modal
function showTransactionHistory() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    if (transactionHistory.length === 0) {
        transactionList.innerHTML = '<li>No transactions yet.</li>';
    } else {
        transactionHistory.forEach(tx => {
            const li = document.createElement('li');
            li.innerText = `${tx.date} - ${tx.type} - ₹${tx.amount}`;
            transactionList.appendChild(li);
        });
    }

    document.getElementById('transactionHistoryModal').style.display = 'block';
}

// Close transaction history modal
function closeTransactionHistory() {
    document.getElementById('transactionHistoryModal').style.display = 'none';
}

// Game Simulation with House Edge
function playGame(gameName) {
    const betAmount = parseFloat(prompt(`Enter bet amount for ${gameName}:`));
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Invalid bet amount!');
        return;
    }
    if (betAmount > userWallet) {
        alert('Insufficient balance!');
        return;
    }

    const result = calculateGameResult(gameName);
    if (result === 'win') {
        const winnings = betAmount * 1.5;
        userWallet += winnings;
        alert(`You won ₹${winnings}!`);
        transactionHistory.push({ date: new Date().toLocaleString(), type: `Win (${gameName})`, amount: winnings });
    } else {
        userWallet -= betAmount;
        alert(`You lost ₹${betAmount}. Better luck next time!`);
        transactionHistory.push({ date: new Date().toLocaleString(), type: `Loss (${gameName})`, amount: -betAmount });
    }

    updateWalletUI();
    showTransactionHistory();
}

// House edge logic (favorable to house)
function calculateGameResult(gameName) {
    const winProbability = 0.25;  // 25% chance to win
    return Math.random() < winProbability ? 'win' : 'lose';
}

// Close wallet modal if clicked outside
window.onclick = function(event) {
    const walletModal = document.getElementById('walletModal');
    if (event.target === walletModal) {
        walletModal.style.display = 'none';
    }
}

// Initialize wallet balance on page load
updateWalletUI();