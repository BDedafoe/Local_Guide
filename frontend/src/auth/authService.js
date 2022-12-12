import axios from 'axios';

const api_url = 'http://localhost:4000/User';

//Register User
const register = async (User) => {
    const response = await axios.post(`${api_url}/register`, User);
    console.log(response)
    if (response.data) {
        localStorage.setItem('User', JSON.stringify(response.data));
        //using session storage creates issues with thunk
        //sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

//Login User
const login = async (User) => {
    const response = await axios.post(`${api_url}/login`, User);
    if (response.data) {
        localStorage.setItem('User', JSON.stringify(response.data));
        //sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

//Logout User
const logout = () => {
    localStorage.removeItem('User');
    //sessionStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout
};

export default authService;