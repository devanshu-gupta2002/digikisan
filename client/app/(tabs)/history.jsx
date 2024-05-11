import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/header'
import React from 'react'

const History = () => {
  return (
    <SafeAreaView className="flex bg-gray-300 w-full h-full">
      <Header />
      <Text>History</Text>
    </SafeAreaView>
  )
}

export default History