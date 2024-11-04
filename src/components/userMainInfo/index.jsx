import UserInfo from "../../atoms/userInfo";
import UserSaldo from "../../atoms/UserSaldo";

const UserMainInfo = () => {
  
  return (
       <>
        <div className="w-full flex items-stretch my-4 justify-center">
            <div className="w-5/12 flex flex-col items-start justify-end">
                <UserInfo/>
            </div>
            <div className="w-7/12 bg-[#F13B2E] py-5 px-7 flex flex-col bg-cover bg-center rounded-md gap-5" style={{ backgroundImage: "url('/Background Saldo.png')" }}>
                <UserSaldo/>
            </div>
        </div>
       </>
  );
};

export default UserMainInfo;