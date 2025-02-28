function showTransactionHistory() {
    const transactionContainer = document.getElementById('transaction-history');

    if (transactionHistory.length === 0) {
        transactionContainer.innerHTML = '<h3>Transaction History</h3><p>No transactions yet.</p>';
        return;
    }

    let historyHTML = '<h3>Transaction History</h3><ul>';
    transactionHistory.forEach(tx => {
        const formattedAmount = tx.amount < 0 ? `-₹${Math.abs(tx.amount)}` : `₹${tx.amount}`;
        historyHTML += `<li>${tx.date} - ${tx.type}: ${formattedAmount}</li>`;
    });
    historyHTML += '</ul>';

    transactionContainer.innerHTML = historyHTML;
}