import { useLocation, Link } from 'react-router-dom';
import LogoApp from "../../atoms/logoApp";

const AppMenu = () => {
    const { pathname } = useLocation();
  
  return (
       <>
        <nav className="bg-white w-full border-gray-200 border-b">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to="/dashboard"><LogoApp imgClass="h-6" textClass="text-xl" /></Link>
                <div id="mega-menu-full" className="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li className='flex items-center'>
                            <Link to="/topup" className={`block py-2 px-3 text-[##565656] rounded ${pathname === "/topup" ? "text-[#F13B2E]" : "text-grey-200"} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9c3e37] md:p-0 md:px-2`}>Top Up</Link>
                        </li>
                        <li className='flex items-center'>
                            <Link to="/transaction" className={`block py-2 px-3 text-[##565656] rounded ${pathname === "/transaction" ? "text-[#F13B2E]" : "text-grey-200"} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9c3e37] md:p-0 md:px-2`}>Transaction</Link>
                        </li>
                        <li className='flex items-center'>
                            <Link to="/account" className={`block py-2 px-3 text-[##565656] rounded ${pathname === "/account" ? "text-[#F13B2E]" : "text-grey-200"} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9c3e37] md:p-0 md:px-2`}>Akun</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
       </>
  );
};

export default AppMenu;