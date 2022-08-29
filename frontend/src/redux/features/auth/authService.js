//strictly for just making https requests and setting any data in local storage
import axios from 'axios';
const API_URL = 'https://tour-application-backend.herokuapp.com//user/'


//register user
const register = async(userData)=>{
    const response =  await axios.post(API_URL + 'signup', userData)

    if(response.data){
        // save the token in local storage
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
//login user
const login = async(userData)=>{
    const response =  await axios.post(API_URL + 'signin', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
//logout
const logout = async(userData)=>{
   localStorage.removeItem('user')
}
const authService = {
    register,
    login,
    logout
}
export default authService;