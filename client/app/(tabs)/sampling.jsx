import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthContext } from '../../context/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/header'
import { router, useRouter } from 'expo-router'
import IsLogged from '../../components/IsLogged'

const Sampling = () => {
  const {state, setState} = useAuthContext()
  const useRouterStack = useRouter()
  useEffect(() => {
    if(useRouterStack.canDismiss()) {
      useRouterStack.dismissAll()
    }
  }, [])
  console.log("sampling page")
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
      <Text>Sampling</Text>
    </SafeAreaView>
  )
}

export default Sampling