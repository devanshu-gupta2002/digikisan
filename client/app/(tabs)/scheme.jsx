import { View, Text } from 'react-native'
import React from 'react'
import { useAuthContext } from '../../context/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/header'

const Scheme = () => {
  // const {state, setState} = useAuthContext()
  // console.log("state", state)

  return (
    <SafeAreaView className="flex bg-gray-300 w-full h-full">
      <Header />
      <Text>Scheme</Text>
    </SafeAreaView>
  )
}

export default Scheme