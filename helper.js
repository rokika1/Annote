export function getCurrentUser() {
    let currentUserId = localStorage.getItem('curUser');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(user => user.id === currentUserId);
    return currentUser || null;
}

// For testing purposes only
export function testDatabaseState() {
    let storageDisplay = document.createElement('pre');
    let storageContent = JSON.stringify(localStorage, null, 2);
    storageDisplay.textContent = storageContent;
    document.body.appendChild(storageDisplay);
}