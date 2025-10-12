export const getUser = () => {
    let userAuth = localStorage?.getItem("auth") ?? null;
    if (userAuth) {
        userAuth = JSON.parse(userAuth);
    }
    return userAuth;
}