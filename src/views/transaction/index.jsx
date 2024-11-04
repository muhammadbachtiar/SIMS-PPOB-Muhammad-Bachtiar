import { useSelector } from 'react-redux';
import UserMainInfo from '../../components/userMainInfo';
import useFetchTransactionHistory from '../../hooks/useFetchTransactionHistory';
import { useState } from 'react';

function Transaction() {
    const [limit, setLimit] = useState(5);
    useFetchTransactionHistory({limit});
    const transactionHistory = useSelector((state) => state.user.transactionHistory);

return (
    <div className="w-full flex-col flex items-stretch justify-center">
        <UserMainInfo/>
        <div className='my-10 flex flex-col gap-3 items-center justify-center'>
            <p className="text-xl w-full text-start font-semibold text-gray-800">Semua Transaksi</p>
            {transactionHistory.map((transaction, index) => {
                const formattedAmount = transaction.total_amount.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                });
                const formattedDate = new Date(transaction.created_on).toLocaleString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Jakarta',
                }).replace(' pukul', '');

                const isTopUp = transaction.transaction_type === 'TOPUP';
                const amountClass = isTopUp ? 'text-green-400' : 'text-red-400';
                const amountSign = isTopUp ? '+ ' : '- ';

                return (
                <div key={index} className='w-full flex flex-col items-start border px-5 py-3 border-gray-400 rounded-md justify-center'>
                    <div className="w-full flex flex-row items-center justify-center">
                    <div className='w-1/2 flex flex-col items-start gap-2'>
                        <h1 className={`text-2xl font-semibold ${amountClass}`}>
                        {amountSign}{formattedAmount}
                        </h1>
                    </div>
                    <div className='w-1/2 flex items-start justify-end'>
                        <p className='text-sm text-gray-800'>{transaction.description}</p>
                    </div>
                    </div>
                    <div className="w-full flex flex-row rounded-md items-start justify-start">
                        <p className='text-sm text-gray-500'>{formattedDate} WIB</p>
                    </div>
                </div>
                );
            })}
            <button onClick={()=>{setLimit(limit+5)}} className='bg-white text-[#F13B2E] w-fit p-3 cursor-pointer hover:text-red-800'>Show more</button>
        </div>
    </div>
  );
}

export default Transaction
