import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setService} from '../redux/features/app/appSlices';
import axios from 'axios';
import API_URL from '../services/config/api';

const useFetchService = () => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/services`, {
              timeout: 15000,
              headers: {
              Authorization: `Bearer ${token}`,
              },
          }
          );
        if (response.status === 200) {
          dispatch(setService(response.data.data));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error('Error during get balance:', error.response.message);
      } finally {
      dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, token]);
};

export default useFetchService;
