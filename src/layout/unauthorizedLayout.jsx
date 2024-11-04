import { useLocation } from 'react-router-dom';
import LogoApp from '../atoms/logoApp';
import Login from '../views/login';
import Register from '../views/register';

const UnautorizedLayout = () => {

  const { pathname } = useLocation();
  let contentComponent;

  switch (true) {
    case pathname ===  "/login":
      contentComponent = <Login />;
      break;
    case pathname ===  "/register":
        contentComponent = <Register />;
        break
  };
  
  return (
        <div className="min-h-screen bg-white flex flex-row items-start justify-center gap-2">
            <div className="w-7/12 flex flex-col h-screen items-center justify-center content-center">
                <LogoApp/>
                {contentComponent}
            </div>
            <div className="w-5/12 h-screen flex justify-end">
                <img
                    src="../../public/unautorizedWelcome.png"
                    alt=""
                    className="w-auto h-full object-contain"
                />
            </div>
        </div>
  );
};

export default UnautorizedLayout;