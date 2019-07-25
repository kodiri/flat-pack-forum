export const handleGoogleSignIn = (res, history, refreshSession) => {
    const id_token = res.tokenObj.id_token;
    console.log("And JWT token is: ", id_token);
    fetch(`/rest/authenticate/sign-in/google`, {
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + id_token
        },
    }).then(res => res.ok ? res.json() : Promise.reject()).then(res => {
        console.log(res);
        refreshSession();
        history.push(`/user/${res.uuid}`);
    });
}

export const handleGoogleFailure = err => {
    console.log("Eror: ", err);
}