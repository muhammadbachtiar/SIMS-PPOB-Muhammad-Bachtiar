import UserMainInfo from '../../components/userMainInfo';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import API_URL from "../../services/config/api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/features/app/appSlices";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Payment() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { type } = useParams();
  const transactionType = useSelector((state) => state.app.service);
  const filteredServices = transactionType.filter(service => 
    type.includes(service.service_code)
);
    const { handleSubmit } = useForm({
      defaultValues: {
        service_code: type
      }
    });

    const onSubmit = async (data) => {
      Swal.fire({
        html: `
        <div style="text-align: center;">
        <p style="margin: 0;">Beli ${filteredServices[0].service_name} senilai</p>
        <h2 style="margin: 0; font-size: 24px; font-weight: bold">Rp ${filteredServices[0].service_tariff}</h2>
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
                `${API_URL}/transaction`, data, {
                    timeout: 15000,
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
              );
              Swal.fire({
                icon: 'success',
                title: 'Transaksi Berhasil',
                text: `Pembayaran ${response.data.data.service_name} berhasil !`,
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
                  title: 'Transaksi Gagal',
                  text: 'Server tidak menanggapi, Coba lagi',
                  showConfirmButton: true,
                  confirmButtonText: 'Mengerti',
                });
              } else if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Transaksi Gagal',
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
            <p className="text-xl font-semibold text-gray-500">Pembayaran</p>
            <div className="flex items-center my-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src={filteredServices[0].service_icon} className="h-6" alt="Flowbite Logo" />
              <span className={`self-center font-semibold whitespace-nowrap dark:text-white text-2xl`}>{filteredServices[0].service_name}</span>
          </div>
            <div className='flex flex-row items-start justify-center gap-2 my-5'>
                <div className="w-full flex flex-col items-center justify-center content-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="relative mt-3">  
                            <input 
                            type="number" 
                            min={0} 
                              value={filteredServices[0].service_tariff}
                              disabled
                            className="pl-12 pr-3 py-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400" placeholder="Masukan nominal Transaksi"></input>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">  
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-5 text-gray-300" fill="#d1d5db">
                                    <path d="M112 112c0 35.3-28.7 64-64 64l0 160c35.3 0 64 28.7 64 64l352 0c0-35.3 28.7-64 64-64l0-160c-35.3 0-64-28.7-64-64l-352 0zM0 128C0 92.7 28.7 64 64 64l448 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16l0 64-8 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l24 0 24 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-8 0 0-80c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16z"/>
                                </svg>
                            </span>  
                        </div>  
                        <button type="submit" className="focus:outline-none w-full text-white bg-[#F22619] hover:bg-red-800 focus:ring-4 focus:ring-red-950 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 mt-4 disabled:bg-[#C6C0C0]">Bayar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Payment
