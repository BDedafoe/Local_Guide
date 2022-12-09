import axios from 'axios';

const api_url = 'http://localhost:4000/user';

//Register User
const register = async (user) => {
    const response = await axios.post(`${api_url}/sign-up`, user);
    console.log(response)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        //using session storage creates issues with thunk
        //sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

//Login User
const login = async (user) => {
    const response = await axios.post(`${api_url}/login`, user);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        //sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

//Logout User
const logout = () => {
    localStorage.removeItem('user');
    //sessionStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout
};

export default authService;