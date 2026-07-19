import React, { useState } from "react";
import api from "../config/ApiConfig";

const UploadPhoto = () =>{
    const[image,setImage] = useState(null);
    const[preview,setPreview] = useState(null);
    const [loading,setLoading] = useState(false);

    const handelImage = (e) =>{
        const file = e.target.files[0];

        if(!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!image){
            alert("Please select an image");
            return;
        }

        const formData = new FormData();

        formData.append("fullName","Devendra bankhede");
        formData.append("email","devendrabankhede1@gmail.com");
        formData.append("phone","9098241356");
        formData.append("displayPic", image);

        try{
            setLoading(true);

            const response = await api.put("/common/edit-profile",formData);
            console.log(response.data);
            alert("Profile Updated Successfully");
        }catch(error){
            console.log(error.response?.data || error.message);
            alert("Upload Failed");
        }finally{
            setLoading(false);
        }
    };
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
                <h1 className="text-3xl font-bold mb-5 text-center">
                        Upload Profile Photo
                </h1>

                {preview && (
                    <img 
                    src={preview} 
                    alt="Preview"
                    className="w-40 h-40 rounded-full object-cover mx-auto mb-5"
                     />
                )}

                <form onSubmit={handleSubmit}>
                    <input type="file"
                        accept="image/*"
                        onChange={handelImage}
                        className="mb-5 w-full"
                     />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"

                    >
                        {loading ? "uploading...":"Upload"}
                        
                    </button>
                </form>
            </div>

        </div>
    )
};
export default UploadPhoto;