function playDragonVsTiger(betAmount, choice) {
    betAmount = parseFloat(betAmount);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Invalid bet amount!');
        return;
    }
    if (betAmount > userWallet) {
        alert('Insufficient balance!');
        return;
    }

    const outcomes = ['Dragon', 'Tiger', 'Tie'];
    const randomIndex = Math.floor(Math.random() * 100);

    let result;
    if (randomIndex < 40) {
        result = choice; // Higher chance for player's choice to win initially (40%)
    } else if (randomIndex < 80) {
        result = choice === 'Dragon' ? 'Tiger' : 'Dragon'; // Opposite outcome (40%)
    } else {
        result = 'Tie'; // 20% chance of Tie
    }

    if (result === choice) {
        const winAmount = betAmount * 1.9;
        userWallet += winAmount;
        transactionHistory.push({ 
            type: `Win - Dragon vs Tiger (${choice})`, 
            amount: winAmount, 
            date: new Date().toLocaleString() 
        });
        alert(`You Won! The result was ${result}. You won ₹${winAmount}`);
    } else {
        userWallet -= betAmount;
        transactionHistory.push({ 
            type: `Loss - Dragon vs Tiger (${choice})`, 
            amount: -betAmount, 
            date: new Date().toLocaleString() 
        });
        alert(`You Lost! The result was ${result}. You lost ₹${betAmount}`);
    }

    showWallet();
    updateWalletUI();
}

function playAviator(betAmount) {
    betAmount = parseFloat(betAmount);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Invalid bet amount!');
        return;
    }
    if (betAmount > userWallet) {
        alert('Insufficient balance!');
        return;
    }

    const crashPoint = (Math.random() * (5 - 1.1) + 1.1).toFixed(2);

    setTimeout(() => {
        const cashoutPoint = parseFloat(prompt(`Plane is flying! Enter cashout multiplier (1.1 to 5):`, '1.5'));
        if (isNaN(cashoutPoint) || cashoutPoint < 1.1 || cashoutPoint > 5) {
            alert('Invalid cashout multiplier!');
            return;
        }

        if (cashoutPoint <= crashPoint) {
            const winAmount = betAmount * cashoutPoint;
            userWallet += winAmount;
            transactionHistory.push({ 
                type: `Win - Aviator`, 
                amount: winAmount, 
                date: new Date().toLocaleString() 
            });
            alert(`You cashed out at ${cashoutPoint}x and won ₹${winAmount}`);
        } else {
            userWallet -= betAmount;
            transactionHistory.push({ 
                type: `Loss - Aviator`, 
                amount: -betAmount, 
                date: new Date().toLocaleString() 
            });
            alert(`Plane crashed at ${crashPoint}x! You lost ₹${betAmount}`);
        }

        showWallet();
        updateWalletUI();
    }, 2000);
}