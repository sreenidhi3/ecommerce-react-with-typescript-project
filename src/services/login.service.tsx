import axios from 'axios'
import {LoginRequestType, LoginResponseType} from '../types/login.types'

export const login=(data:LoginRequestType):Promise<LoginResponseType>=>{
    return axios.post('https://reqres.in/api/login', {
        email: data.email,
        password: data.password
      })
      .then(response =>{console.log(response.data); return response.data})
      .catch(function (error) {
        console.log(error.response.data);
        // return error
        throw(error.response.data.error)
      });
}