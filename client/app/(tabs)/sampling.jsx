import { View, Text } from 'react-native'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../../context/auth'

const Sampling = () => {
  const [state, setState] = useContext(AuthContext)
  console.log("state", state)

  return (
    <View>
      <Text>Sampling</Text>
    </View>
  )
}

export default Sampling