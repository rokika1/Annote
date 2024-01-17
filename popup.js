document.addEventListener('DOMContentLoaded', function() {
    checkSignInState();
});

document.getElementById('signInButton').addEventListener('click', handleSignIn)
document.getElementById('signOutButton').addEventListener('click', handleSignOut)

document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = 'home.html'
})

function handleSignIn() {
    chrome.runtime.sendMessage({action: "signIn"}, function(response) {
        if (response && response.success) {
            localStorage.setItem('user', JSON.stringify({
                id: response.user.id,
                email: response.user.email,
                name: response.user.name
            }));
            checkSignInState();
        } else {
            console.error('Could not sign in:', response.error);
        }
    })
}

function handleSignOut() {
    localStorage.removeItem('user');
    checkSignInState();
}

function checkSignInState() {
    if (localStorage.getItem('user')) {
        signedInUI();
    } else {
        signedOutUI();
    }
}

function signedInUI() {
    const user = JSON.parse(localStorage.getItem('user'));
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
