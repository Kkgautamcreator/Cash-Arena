let userWallet = 50; // Starting bonus
let transactionHistory = [];

function showWallet() {
    alert(`Your Wallet Balance: ₹${userWallet}`);
}

function addFunds(amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount! Please enter a valid number.');
        return;
    }

    userWallet += amount;
    transactionHistory.push({ 
        type: 'Deposit', 
        amount: amount, 
        date: new Date().toLocaleString() 
    });

    alert(`₹${amount} added to your wallet! New Balance: ₹${userWallet}`);
}

function withdrawFunds(amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount! Please enter a valid number.');
        return;
    }

    if (amount > userWallet) {
        alert('Insufficient balance!');
        return;
    }

    const upiId = prompt('Enter UPI ID (Paytm/PhonePe/PayPal):');
    if (!upiId || !upiId.includes('@')) {
        alert('Invalid UPI ID!');
        return;
    }

    userWallet -= amount;
    transactionHistory.push({ 
        type: 'Withdrawal', 
        amount: -amount, 
        date: new Date().toLocaleString() 
    });

    alert(`₹${amount} withdrawn successfully to ${upiId}. Remaining Balance: ₹${userWallet}`);
}

function showTransactionHistory() {
    if (transactionHistory.length === 0) {
        alert('No transactions yet!');
        return;
    }

    let history = 'Transaction History:\n\n';
    transactionHistory.forEach(tx => {
        history += `${tx.date} - ${tx.type}: ₹${tx.amount}\n`;
    });

    alert(history);
}