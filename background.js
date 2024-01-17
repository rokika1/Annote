// Creating url
url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    'client_id=525396072905-m17ojlu3nt4l6b5kbn0sbivpgj00m6lo.apps.googleusercontent.com&' +
    'response_type=token&' +
    'redirect_uri=' + encodeURIComponent(chrome.identity.getRedirectURL()) + '&' +
    'scope=openid email profile'

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "signIn") {
        chrome.identity.launchWebAuthFlow({
            url: url,
            interactive: true
        }, function(redirectUrl) {
            if (chrome.runtime.lastError) {
                sendResponse({ success: false, error: chrome.runtime.lastError });
            } else {
                const params = new URLSearchParams(new URL(redirectUrl).hash.substring(1));
                const token = params.get('access_token');
                if (!token) {
                    sendResponse({ success: false, error: 'Token not found' });
                }
                // Fetch user profile
                fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                    headers: { Authorization: `Bearer ${token}`}
                })
                .then(response => response.json())
                .then(userProfile => {sendResponse({ success: true, user: userProfile})})
                .catch(error => {sendResponse({ success: false, error: 'Error fetching user profile' })})
            }
        });
        return true;
    }
})