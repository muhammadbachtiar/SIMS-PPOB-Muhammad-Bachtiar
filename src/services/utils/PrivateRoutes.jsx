import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/features/app/appSlices";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const isLogedIn = useSelector((state) => state.user.isLoggedIn);
  if (isLogedIn === null) {
    dispatch(setLoading(true));
  }else {
    dispatch(setLoading(false));
  }
  return isLogedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
