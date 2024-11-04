import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from "../../services/config/api";
import { setLoading, setErrorMessage, setErrorStatus } from "../../redux/features/app/appSlices";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit} = useForm();
    const isError = useSelector((state) => state.app.isError);
    const errorMessage = useSelector((state) => state.app.errorMessage);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
      dispatch(setLoading(true));
        try {
            
            const response = await axios.post(
              `${API_URL}/login`, data,
              {
                timeout: 15000,
              }
            );
            localStorage.setItem('token', response.data.data.token);  
            window.location.reload();
          } catch (error) {
            if (error.code === 'ECONNABORTED') {
              console.error('Request timed out');
              Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: 'Server tidak menanggapi, Coba lagi',
                showConfirmButton: true,
                confirmButtonText: 'Mengerti',
              });
            } else if (error.response) {
              dispatch(setErrorMessage(error.response.data.message))
              dispatch(setErrorStatus(true));
            } else {
              console.error('Error during login:', error.message);
              alert('An unexpected error occurred. Please try again.');
            }
          } finally {
            dispatch(setLoading(false));
          }
        };


  return (
    <>
        <div className="max-w-xs mx-auto mt-5">
            <h1 className="mb-4 text-center text-xl font-semibold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">Masuk atau buat akun untuk memulai</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full">
            <div className="relative mt-6">  
                <input type="email" 
                         {...register("email", {
                            required: "Email diperlukan",
                            pattern: {
                              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                              message: "Mohon masukkan email yang valid",
                            },
                          })}
                        className="pl-10 pr-3 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400" placeholder="Masukan email anda">
                </input>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 text-gray-300" fill="#d1d5db">
                        <path d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256l0 32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32l0 80 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/>
                    </svg>
                </span>  
            </div>  
            <div className="relative mt-6">  
                <input  
                    type={showPassword ? "text" : "password"} 
                     {...register("password", {
                    required: "Password diperlukan",
                  })}
                    className="pl-10 pr-14 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400" placeholder="Masukan password anda"></input>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 text-gray-300" fill="#d1d5db">
                        <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/>
                    </svg>
                </span>  
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex bg-white m-1 items-center px-3 focus:outline-none"
                >
                    {showPassword ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                        >
                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                        >
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>
                        </svg>
                    )}
                </button>
            </div> 
            <button type="submit" className="focus:outline-none w-full text-white bg-[#F22619] hover:bg-red-800 focus:ring-4 focus:ring-red-950 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 mt-12">Masuk</button>
            <div className="text-center">
                <p className="text-sm text-gray-600 mt-5">
                    Belum punya akun?{' '}Registrasi {' '}
                    <Link to="/register" className="text-[#F22619] hover:text-red-800 hover:underline">
                         di sini
                    </Link>
                </p>
            </div>
        </form>
        {isError && (
        <div id="alert-2" className="flex items-center max-w-md w-full py-4 px-2 mb-4 mt-6 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <div className="ms-3 text-sm font-normal">
            {errorMessage}
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            onClick={()=> { dispatch(setErrorMessage(null)); dispatch(setErrorStatus(false));}}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
