import axios from "../api/axios";

const AUTH_API='/Account'
export const login = async(user) =>{
    try{
    const response = await axios.post(AUTH_API+"/login", user);
    console.log(response.data);
    return response.data;
    } catch(error){
        console.log("login error",error);
        throw error;
    };
}

export const register = async(user) =>{
    return (await axios.post(AUTH_API+ '/Register', user)).data;
}

export const getProfile = async() =>{
    axios.interceptors.request.use((config) =>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = 'Bearer '+token;
        }
        return config;
    });
    
    const profile = await axios.get(AUTH_API+'/userProfile');
    return profile.data;
}
export const getusers = async() =>{
    axios.interceptors.request.use((config) =>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = 'Bearer '+token;
        }
        return config;
    });
    
    const profile = await axios.get(AUTH_API+'/Admin/GetAllUsers');
    return profile.data;
}
export const logout = async() =>{
    try{
        const token = localStorage.getItem('token');
        const res = await axios.post(AUTH_API+'/logout',{},{
            headers: {
                Authorization: 'Bearer '+token
            }
        });
        return res.data;
        
    } catch(error){
        console.log(error);
    };

}
export const UpdateProfile = async() =>{
    try{
        const token = localStorage.getItem('token');
        const res = await axios.post(AUTH_API+'/updateProfile',{},{
            headers: {
                Authorization: 'Bearer '+token
            }
        });
        return res.data;
        
    } catch(error){
        console.log(error);
    };
}