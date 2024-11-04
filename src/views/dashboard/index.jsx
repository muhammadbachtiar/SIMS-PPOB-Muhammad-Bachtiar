import UserMainInfo from '../../components/userMainInfo';
import BannerApp from '../../atoms/bannerApp';
import useFetchService from '../../hooks/useFetchService';
import useFetchBanner from '../../hooks/userFetchBanner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard() {
    useFetchService();
    useFetchBanner();
    const services =  useSelector((state) => state.app.service);

return (
   <>
     <div className="w-full flex-col flex items-stretch justify-center">
        <UserMainInfo/>
        <div className="grid grid-cols-12 gap-10 my-10">
            {services.map((service, index) => (
                <Link key={index} to={`/transaction/${service.service_code}`}>
                    <div  className="flex flex-col items-center">
                    <img className="h-auto rounded-lg" src={service.service_icon} alt={service.service_name} />
                    <figcaption className="mt-1 text-md text-center font-semibold text-gray-600 dark:text-gray-400">
                        {service.service_name}
                    </figcaption>
                    </div>
                </Link>
            ))}
        </div>
        <h2 className='text-md font-bold'>Temukan promo menarik</h2>
        <BannerApp/>
    </div>
   </>
  );
}

export default Dashboard
