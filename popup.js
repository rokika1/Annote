import { getCurrentUser } from './helper.js';

document.addEventListener('DOMContentLoaded', function() {
    checkSignInState();
});

document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = 'home.html'
})

document.getElementById('signInButton').addEventListener('click', handleSignIn)
document.getElementById('signOutButton').addEventListener('click', handleSignOut)

function handleSignIn() {
    chrome.runtime.sendMessage({action: "signIn"}, function(response) {
        if (response && response.success) {
            localStorage.setItem('curUser', response.user.id);
            addUser(response.user.id, response.user.email, response.user.name);
            checkSignInState();
        } else {
            console.error('Could not sign in:', response.error);
        }
    })
}

function addUser(id, email, name) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.id === id);
    if (!userExists) {
        let newUser = {id, email, name, summaryDocs: []};
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function handleSignOut() {
    localStorage.removeItem('curUser');
    checkSignInState();
}

function checkSignInState() {
    if (localStorage.getItem('curUser')) {
        signedInUI();
    } else {
        signedOutUI();
    }
}

function signedInUI() {
    let user = getCurrentUser();
    document.getElementById('greeting').innerText = `Welcome, ${user.name}!`;
    document.getElementById('signInButton').style.display = 'none';
    document.getElementById('signOutButton').style.display = 'block';
    document.getElementById('homeButton').style.display = 'block';
    document.getElementById('save').style.display = 'block';
}

function signedOutUI() {
    document.getElementById('signInButton').style.display = 'block';
    document.getElementById('signOutButton').style.display = 'none';
    document.getElementById('greeting').innerText = 'Hi, Please sign in!';
    document.getElementById('homeButton').style.display = 'none';
    document.getElementById('save').style.display = 'none';
}
