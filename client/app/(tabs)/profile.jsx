import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../context/auth.js'

const Profile = () => {
  const [state, setState] = useContext(AuthContext)
  console.log("state", state)

  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile