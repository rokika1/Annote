document.addEventListener('DOMContentLoaded', function() {
    checkSignInState();
});

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'popup.html';
});

function checkSignInState() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user = JSON.parse(storedUser);
        document.getElementById('greeting').innerText = `Welcome, ${user.name}!`;
    }
}