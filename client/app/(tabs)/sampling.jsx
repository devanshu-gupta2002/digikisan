import { View, Text } from 'react-native'
import React, {useState, useContext} from 'react'
import { useAuthContext } from '../../context/auth'

const Sampling = () => {
  const {state, setState} = useAuthContext()
  console.log("state", state)

  return (
    <View>
      <Text>Sampling</Text>
    </View>
  )
}

export default Sampling