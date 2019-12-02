import API from '../api/index';

async function checkAuth(email:string, password: string) {

    const response = await API.signIn(email, password);
    const auth = await response.json();

    if(auth.result === "ok") {
        return true;
    }
    return false;

}

export default checkAuth;