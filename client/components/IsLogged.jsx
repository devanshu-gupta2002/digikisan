import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const IsLogged = () => {
  return (
    <View className="flex items-center justify-center w-full min-h-[65vh]">
      <Image
        source={images.notLogged}
        className="w-[250px] h-[250px]"
        resizeMode='contain'
      />
      <Text className=" text-xl text-gray-500 font-pbold text-center">
        Uh Oh!
      </Text>
      <Text className=" text-xl text-gray-500 font-pbold text-center">
        Looks like you are not logged in
      </Text>
      <CustomButton
        title="Login to continue"
        handlePress={() => router.push('/auth/sign-in')}
        containerStyles="w-1/2 mt-7 bg-[#FF9001]"
      />
    </View>
  )
}

export default IsLogged