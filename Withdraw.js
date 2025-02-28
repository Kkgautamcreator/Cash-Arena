function withdrawFunds() {
    const amount = parseFloat(prompt("Enter withdrawal amount (Minimum ₹100):"));
    if (isNaN(amount) || amount < 100) {
        alert("Minimum withdrawal amount is ₹100.");
        return;
    }

    const method = prompt("Choose withdrawal method: 1 for Paytm, 2 for PhonePe, 3 for PayPal");

    let account = '';
    if (method === '1') {
        account = prompt("Enter your Paytm number:");
    } else if (method === '2') {
        account = prompt("Enter your PhonePe number:");
    } else if (method === '3') {
        account = prompt("Enter your PayPal email:");
    } else {
        alert("Invalid option!");
        return;
    }

    const currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 50;

    if (currentBalance < amount) {
        alert("Insufficient wallet balance.");
        return;
    }

    // Deduct balance and update wallet
    const newBalance = currentBalance - amount;
    localStorage.setItem('walletBalance', newBalance);
    document.getElementById('walletBalance').innerText = newBalance;
    const modalWalletBalance = document.getElementById('modalWalletBalance');
    if (modalWalletBalance) modalWalletBalance.innerText = newBalance;

    transactionHistory.push({
        date: new Date().toLocaleString(),
        type: 'Withdrawal',
        amount: -amount
    });

    alert(`Withdrawal request of ₹${amount} to ${account} via ${method === '1' ? 'Paytm' : method === '2' ? 'PhonePe' : 'PayPal'} submitted successfully!`);

    // Simulate a delay to make it feel real
    setTimeout(() => {
        alert("Withdrawal processed successfully! Money will reflect soon.");
    }, 3000);

    showTransactionHistory();
}