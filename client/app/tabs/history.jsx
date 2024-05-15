import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/header'
import React from 'react'
import { useAuthContext } from '../../context/auth'
import { router } from 'expo-router'
import IsLogged from '../../components/IsLogged'

const History = () => {
  const {state, setState} = useAuthContext()
  console.log("history page")
  if(state.user === null) {
    return (
      <SafeAreaView className="flex bg-gray-300 w-full h-full">
      <Header />
      <IsLogged />
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex bg-gray-300 w-full h-full">
      <Header />
      <Text>History</Text>
    </SafeAreaView>
  )
}

export default History