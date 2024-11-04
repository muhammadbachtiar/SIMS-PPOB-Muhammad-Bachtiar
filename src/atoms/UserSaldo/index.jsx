import { useSelector } from "react-redux";
import useFetchBalance from "../../hooks/useFetchBalance";
import { useState } from "react";

const UserSaldo = () => {
  useFetchBalance()
  const [showSaldo, setShowSaldo] = useState(false);
  const userBalance = useSelector((state) => state.user.balance);

  const toggleSaldo = () => {
      setShowSaldo(!showSaldo);
  };

  const formattedBalance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(userBalance);
  

  return (
    <>
      <h2 className="text-gray-50 text-md font-medium">Saldo anda</h2>
      <h2 className="text-gray-50 text-3xl font-semibold">
          {showSaldo ? 
              formattedBalance :  
                  <>
                      Rp{' '}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 inline m-1" viewBox="0 0 512 512">
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" fill="currentColor" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 inline m-1" viewBox="0 0 512 512">
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" fill="currentColor" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 inline m-1" viewBox="0 0 512 512">
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" fill="currentColor" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 inline m-1" viewBox="0 0 512 512">
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" fill="currentColor" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 inline m-1" viewBox="0 0 512 512">
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" fill="currentColor" />
                      </svg>
                  </>
          }
      </h2>
      <button 
          onClick={toggleSaldo} 
          className="text-gray-50 w-fit text-xs py-2 font-medium bg-transparent border-none cursor-pointer hover:text-gray-300"
      >
          {showSaldo ? 'Tutup Saldo' : 'Lihat Saldo'}
      </button>
    </>
  );
};

export default UserSaldo;