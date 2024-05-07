import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useContext} from 'react'
import { useAuthContext } from '../../context/auth';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Marketplace = () => {

  const {state, setState, isLogged, setIsLogged} = useAuthContext()

  // logout();

  return (
    <View>
      <Text>MarketPlace</Text>
    </View>
  )
}

export default Marketplace