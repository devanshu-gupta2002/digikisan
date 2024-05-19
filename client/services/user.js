import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/auth.js';

export const editDetails = async (newDetails, state, setState) => {
  try {
    const token = state.token;
    const userId = state.user._id;
    const API_URL = `https://digikisan-production.up.railway.app/user/${userId}`;

    // Stringify the address object
    const dataToSend = {
      ...newDetails,
      address: JSON.stringify(newDetails.address)
    };

    const response = await axios.patch(API_URL, dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      const updatedUser = response.data;
      setState(prevState => ({
        ...prevState,
        user: updatedUser
      }));

      await AsyncStorage.setItem('user-data', JSON.stringify({
        token,
        user: updatedUser
      }));

      return updatedUser;
    } else {
      throw new Error('Failed to update details');
    }
  } catch (error) {
    console.error('Error updating details:', error, error.response.data);
    throw error;
  }
};


