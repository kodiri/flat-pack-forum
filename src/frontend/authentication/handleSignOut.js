export default function signOutBackend(clientInfo, history, refreshSession, onSuccess) {
    fetch('/rest/authenticate/sign-out', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({clientInfo})
    }).then(res => res.ok ? res.json() : Promise.reject()).then(_res => {
        onSuccess();
        refreshSession();
        history.push('/');
    });
}