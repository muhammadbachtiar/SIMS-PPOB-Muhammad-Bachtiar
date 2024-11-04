import { useSelector } from "react-redux";
const UserInfo = () => {
  const userInfo = useSelector((state) => state.user.user);
  const hasUserInfo = userInfo && userInfo.email;
  return (
    <>
       <div className="my-2">
            <img className="w-16 h-16 rounded-full" 
              src={
              hasUserInfo && userInfo.profile_image && userInfo.profile_image !== "https://minio.nutech-integrasi.com/take-home-test/null"
                ? userInfo.profile_image
                : "/ProfileDefault.png"
            } alt="Profile Photo">
            </img>
        </div>
        <p className="text-xl font-semibold text-gray-500">Selamat Datang,</p>
        <h2 className="text-3xl font-bold">
          {hasUserInfo
            ? `${userInfo.first_name} ${userInfo.last_name}`
            : "Kristanto Wibowo"}
        </h2>
    </>
  );
};

export default UserInfo;