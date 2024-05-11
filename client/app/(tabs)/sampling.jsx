import { View, Text } from 'react-native'
import React, {useState, useContext} from 'react'
import { useAuthContext } from '../../context/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/header'

const Sampling = () => {
  const {state, setState} = useAuthContext()
  console.log("state", state)

  return (
    <SafeAreaView className="flex bg-primary w-full h-full">
      <Header />
      <Text>Sampling</Text>
    </SafeAreaView>
  )
}

export default Sampling