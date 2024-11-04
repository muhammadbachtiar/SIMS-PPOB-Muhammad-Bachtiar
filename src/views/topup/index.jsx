import UserMainInfo from '../../components/userMainInfo';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import API_URL from "../../services/config/api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/features/app/appSlices";
import axios from "axios";

function Topup() {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, getValues, watch } = useForm();
    const topUpStatus = watch('top_up_amount');

    const onSubmit = async (data) => {
      Swal.fire({
        html: `
        <div style="text-align: center;">
        <p style="margin: 0;">Anda yakin untuk Top Up sebesar</p>
        <h2 style="margin: 0; font-size: 24px; font-weight: bold">Rp ${getValues('top_up_amount')} ?</h2>
        </div>
    `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F42619",
        cancelButtonColor: "grey",
        confirmButtonText: "Ya, Lanjutkan Bayar",
        cancelButtonText: "Batalkan"
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch(setLoading(true));
          try {
               const response =  await axios.post(
                `${API_URL}/topup`, data, {
                    timeout: 15000,
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
              );
              Swal.fire({
                icon: 'success',
                title: 'Top Up Berhasil',
                text: response.data.message,
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
                  title: 'Top Up Gagal',
                  text: 'Server tidak menanggapi, Coba lagi',
                  showConfirmButton: true,
                  confirmButtonText: 'Mengerti',
                });
              } else if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Top Up Gagal',
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
        }
      })
          };

return (
    <div className="w-full flex-col flex items-stretch justify-center">
        <UserMainInfo/>
        <div className='my-10'>
            <p className="text-xl font-semibold text-gray-500">Silahkan masukan</p>
            <h2 className="text-3xl font-bold">Nominal Top Up</h2>
            <div className='flex flex-row items-start justify-center gap-2 my-5'>
                <div className="w-3/5 flex flex-col items-center justify-center content-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="relative mt-3">  
                            <input 
                            type="number" 
                            min={10000}
                            max={1000000} 
                            {...register("top_up_amount", {
                                required: "Nominal Top Up diperlukan",
                              })}
                            className="pl-12 pr-3 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400" placeholder="Masukan nominal Top Up"></input>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">  
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-5 text-gray-300" fill="#d1d5db">
                                    <path d="M112 112c0 35.3-28.7 64-64 64l0 160c35.3 0 64 28.7 64 64l352 0c0-35.3 28.7-64 64-64l0-160c-35.3 0-64-28.7-64-64l-352 0zM0 128C0 92.7 28.7 64 64 64l448 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16l0 64-8 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l24 0 24 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-8 0 0-80c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16z"/>
                                </svg>
                            </span>  
                        </div>  
                        <button type="submit" className="focus:outline-none w-full text-white bg-[#F22619] hover:bg-red-800 focus:ring-4 focus:ring-red-950 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 mt-4 disabled:bg-[#C6C0C0]" disabled={!topUpStatus}>Top Up</button>
                    </form>
                </div>
                <div className="w-2/5 flex">
                    <div className='w-full h-full grid grid-cols-3 gap-4 p-3'>
                        <button onClick={()=> {setValue('top_up_amount', 10000)}} className='bg-white text-gray-500 rounded border-2 p-2'>Rp 10.000</button>
                        <button onClick={()=> {setValue('top_up_amount', 20000)}} className='bg-white text-gray-500 rounded border-2 p-2'>Rp 20.000</button>
                        <button onClick={()=> {setValue('top_up_amount', 50000)}} className='bg-white text-gray-500 rounded border-2 p-2'>Rp 50.000</button>
                        <button onClick={()=> {setValue('top_up_amount', 100000)}} className='bg-white text-gray-500 rounded border-2 p-2'>Rp 100.000</button>
                        <button onClick={()=> {setValue('top_up_amount', 250000)}} className='bg-white text-gray-500 rounded border-2 p-2'>Rp 250.000</button>                    
                        <button onClick={()=> {setValue('top_up_amount', 500000)}} className='bg-white text-gray-500 rounded border-2 p-2'>Rp 500.000</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Topup
