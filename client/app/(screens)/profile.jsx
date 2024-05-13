import { View, Text, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { useAuthContext } from '../../context/auth.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IsLogged from '../../components/IsLogged.jsx';

const Profile = () => {
  const {state, setState, isLogged, setIsLogged} = useAuthContext()
  console.log("state", state)
  if(state.user === null) {
    return (
      <SafeAreaView className="flex bg-gray-300 w-full h-full">
      <IsLogged />
    </SafeAreaView>
    )
  }
  
  const logout = async () => {
    setState(null);
    setIsLogged(false);
    await AsyncStorage.removeItem("user-data");
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="flex bg-primary w-full h-full items-center justify-center">
    <TouchableOpacity
       onPress={logout}
       className="flex w-[300px] h-[50px] bg-secondary-100 items-center justify-center mb-10"
     >
       <Text className="text-black">Logout</Text>
   </TouchableOpacity>
 </SafeAreaView>
  )
}

export default Profile