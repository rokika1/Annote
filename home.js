import { getCurrentUser } from './helper.js';

document.addEventListener('DOMContentLoaded', function() {
    checkSignInState();
});

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'popup.html';
});

function checkSignInState() {
    if (localStorage.getItem('curUser')) {
        let user = getCurrentUser();
        document.getElementById('greeting').innerText = `Welcome, ${user.name}!`;
    }
}