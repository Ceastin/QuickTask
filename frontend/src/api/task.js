import axiosInstance from "./axios";

export const getAllUsers=async()=>{
    const res=await axiosInstance.get("/home/info");
    return res.data;
};
export const addTask=async (data)=>{
    const res=await axiosInstance.post("/home/add",data);
    return res.data;
};

export const modifyTask=async(Id,data)=>{
    const res=await axiosInstance.patch(`/home/edit/${Id}`,data);
    return res.data;
}
export const deleteTasky =async(id)=>{
    const res=await axiosInstance.delete(`/home/remove/${id}`);
    return res.data;
}