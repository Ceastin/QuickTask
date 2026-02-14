import axiosInstance from "./axios";
export const loginUser=async(data)=>{
    const res=await axiosInstance.post("/user/login",data);
    return res.data;
};
export const registerUser=async(data)=>{
    const res=await axiosInstance.post("/user/registration",data);
    return res.data;
};

