import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import API_URL from "../../services/config/api";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/features/app/appSlices";
import { clearUser } from "../../redux/features/user/userSlices";
import { cleareStatusApp } from "../../redux/features/app/appSlices";
import axios from "axios";

function Account() {
    const token = localStorage.getItem('token');
    const [preview, setPreview] = useState(null);
    const dispatch = useDispatch();
    const infoUser =  useSelector((state) => state.user.user);
    const [isEditing, setIsEditing] = useState(false);
    const { register: registerPhoto, handleSubmit: handleSubmitPhoto } = useForm();
    const { register, handleSubmit } = useForm({
        defaultValues: {
          email: infoUser.email,
          first_name: infoUser.first_name,
          last_name: infoUser.last_name
        }
      });

    const handleEditProfile = () => {
        setIsEditing(true);
    };
    
    const handleLogOut = () => {
        Swal.fire({
            title: "Yakin ingin keluar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F42619",
            cancelButtonColor: "grey",
            confirmButtonText: "Ya, Keluar",
            cancelButtonText: "Batalkan"
          }).then(async (result) => {
            if (result.isConfirmed) {
              dispatch(setLoading(true));
              dispatch(clearUser());
              dispatch(cleareStatusApp());
              localStorage.removeItem('token');
              window.location.reload();
              dispatch(setLoading(false));
            }
          })
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setPreview(null); 
        }
      };

    const onSubmitPhoto = async (data) => {
        console.log(data)
        if (data.photo[0]) {
          const formData = new FormData();
          formData.append('file', data.photo[0]);
    
          try {
            await axios.put(`${API_URL}/profile/image`, formData, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
              },
            });
    
            Swal.fire({
                icon: 'success',
                title: 'Update Profil Berhasil',
                text: 'Berhasil memperbarui Foto Profil',
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
 
          } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Profil Gagal',
                text: error.response.data.message,
                showConfirmButton: true,
                confirmButtonText: 'Mengerti',
              });
    
          }
        }
      };

    const onSubmit = async (data) => {
        dispatch(setLoading(true));
          try {
                await axios.put(
                `${API_URL}/profile/update`, data, {
                    timeout: 15000,
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
              );
              Swal.fire({
                icon: 'success',
                title: 'Update Profil Berhasil',
                text: 'Berhasil memperbarui data profile',
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } catch (error) {
              if (error.code === 'ECONNABORTED') {
                console.error('Request timed out');
                Swal.fire({
                  icon: 'error',
                  title: 'Update Profil Gagal',
                  text: 'Server tidak menanggapi, Coba lagi',
                  showConfirmButton: true,
                  confirmButtonText: 'Mengerti',
                });
              } else if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Profil Gagal',
                    text: error.response.data.message,
                    showConfirmButton: true,
                    confirmButtonText: 'Mengerti',
                  });
              } else {
                console.error('Error during login:', error.message);
                alert('An unexpected error occurred. Please try again.');
              }
            } finally {
              dispatch(setLoading(false));
            }
          };

return (
    <div className="w-full flex-col flex items-center justify-center py-3">
       <div className="my-2 relative">
           <form onSubmit={handleSubmitPhoto(onSubmitPhoto)}>
            <label htmlFor="upload-photo" className="cursor-pointer">
                <img className="w-28 h-28 rounded-full" src={preview || infoUser.profile_image || "/ProfileDefault.png"} alt="Profile Photo"></img>
                <div className="relative">
                <input
                    id="upload-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={!isEditing}
                    {...registerPhoto('photo', { onChange: handleFileChange })}
                ></input>
                <span className="absolute bottom-0 right-0 bg-white border border-gray-500 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#6b7280" viewBox="0 0 512 512" className="w-3 h-3 text-white">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                    </svg>
                </span>
                </div>
            </label>
            {isEditing ? (
            <button type="submit" className="focus:outline-none w-full text-white bg-[#F22619] hover:bg-red-800 focus:ring-4 focus:ring-red-950 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 mt-5">
                Simpan
            </button>
        ) : (
            <></>)}
           </form>
        </div>
        <h2 className="text-3xl mt-2 font-bold">{infoUser.first_name} {infoUser.last_name}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl w-full">
            <div className="mt-4">
                <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Email</label>
                <div className="relative">  
                    <input 
                    type="email"
                    {...register("email", {
                        required: "Email diperlukan",
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Mohon masukkan email yang valid",
                        },
                      })} 
                    className="pl-10 pr-3 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 disabled:text-gray-300" placeholder="masukan email anda" disabled={!isEditing}></input>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">  
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 text-gray-300" fill="#d1d5db">
                            <path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256l0 32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32l0 80 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/>
                        </svg>
                    </span>  
                </div>  
            </div>
            <div className="mt-4">
                <label htmlFor="firstName" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Nama Depan</label>
                <div className="relative">  
                    <input 
                     type="text"
                     {...register("first_name", {
                        required: "Nama depan diperlukan",
                      })}
                     className="pl-10 pr-3 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 disabled:text-gray-300" placeholder="nama depan" disabled={!isEditing}></input>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">  
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 text-gray-300" fill="#d1d5db">
                            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
                        </svg>
                    </span>  
                </div> 
            </div>
            <div className="mt-4">
                <label htmlFor="last_name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Nama Belakang</label>
                <div className="relative">  
                    <input 
                    type="text" 
                     {...register("last_name", {
                        required: "Nama belakang diperlukan",
                      })}
                    className="pl-10 pr-3 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 disabled:text-gray-300" placeholder="nama belakang" disabled={!isEditing}></input>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">  
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 text-gray-300" fill="#d1d5db">
                            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
                        </svg>
                    </span>  
                </div> 
            </div>
            {isEditing ? (
                <button type="submit" className="focus:outline-none w-full text-white bg-[#F22619] hover:bg-red-800 focus:ring-4 focus:ring-red-950 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 mt-5">
                    Simpan
                </button>
            ) : (
                <>
                    <button type="button" onClick={handleEditProfile} className="focus:outline-none w-full border border-[#F22619] text-[#F22619] bg-white hover:bg-gray-400 hover:border-red-900 hover:text-red-900 focus:ring-4 focus:ring-red-950 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 mt-6">
                        Edit Profile
                    </button>
                    <button onClick={handleLogOut} type="button" className="focus:outline-none w-full text-white bg-[#F22619] hover:bg-red-800 focus:ring-4 focus:ring-red-950 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 mt-3">
                        Log Out
                    </button>
                </>
            )}
        </form>
    </div>
  );
}

export default Account
