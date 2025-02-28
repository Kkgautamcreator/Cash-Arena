let gameOdds = {
    Aviator: 0.3,
    DragonTiger: 0.3,
    Ludo: 0.3,
    CarRacing: 0.3,
    LuckySpin: 0.3
};

function updateHouseEdge(game, newOdds) {
    if (newOdds < 0.1 || newOdds > 0.9) {
        alert('Invalid odds! Must be between 0.1 and 0.9');
        return;
    }
    gameOdds[game] = newOdds;
    alert(`${game} odds updated to ${newOdds}`);
}

function showAdminPanel() {
    const password = prompt('Enter Admin Password:');
    if (password !== 'Admin@123') {
        alert('Wrong Password!');
        return;
    }

    let panelHTML = '<h3>Admin Panel - Set Game Odds (House Edge)</h3>';
    for (const game in gameOdds) {
        panelHTML += `
            <div>
                <label>${game}: </label>
                <input type="number" id="${game}-odds" value="${gameOdds[game]}" step="0.01" min="0.1" max="0.9">
            </div>
        `;
    }
    panelHTML += `
        <button onclick="saveAdminSettings()">Save Changes</button>
        <button onclick="closeAdminPanel()">Close</button>
    `;

    const adminPanel = document.createElement('div');
    adminPanel.id = 'adminPanel';
    adminPanel.innerHTML = panelHTML;
    adminPanel.style.position = 'fixed';
    adminPanel.style.top = '10%';
    adminPanel.style.left = '10%';
    adminPanel.style.backgroundColor = 'white';
    adminPanel.style.padding = '20px';
    adminPanel.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    adminPanel.style.zIndex = '1000';

    document.body.appendChild(adminPanel);
}

function saveAdminSettings() {
    for (const game in gameOdds) {
        const newOdds = parseFloat(document.getElementById(`${game}-odds`).value);
        if (newOdds < 0.1 || newOdds > 0.9) {
            alert(`${game} odds must be between 0.1 and 0.9.`);
            return;
        }
        gameOdds[game] = newOdds;
    }
    alert('Game odds updated successfully!');
    closeAdminPanel();
}

function closeAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) panel.remove();
}