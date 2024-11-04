import { useEffect } from "react";
import axios from "axios";
import { setUser, clearUser, setLoginStatus } from "../../redux/features/user/userSlices";
import { setLoading } from "../../redux/features/app/appSlices";
import { useDispatch } from 'react-redux';
import API_URL from "../config/api";


const CheckLoginStatus = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
  
    useEffect(() => {
        const checkLoginStatus = async () => {
            dispatch(setLoading(true));
            if (!token) {
              dispatch(setLoginStatus(false));
              dispatch(clearUser());
              return;
            }
          
            try {
              dispatch(setLoading(true));
              const response = await axios.get(`${API_URL}/profile`, {
                    timeout: 15000,
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
                );
              if (response.status === 200) {
                dispatch(setLoginStatus(true));
                dispatch(setUser(response.data.data));
                dispatch(setLoading(false));
              }
            } catch (error) {
              console.log(token);
              console.error('Error during login check:', error);
              dispatch(setLoginStatus(false));
              dispatch(clearUser());
            } finally {
            dispatch(setLoading(false));
            }
            dispatch(setLoading(false));
          };
          checkLoginStatus();
    }, [dispatch, token]);

  };
  
  export default CheckLoginStatus;