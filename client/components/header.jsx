import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {images, icons} from "../constants"
import { router } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context'

const TabIcon = ({ icon, color}) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  );
};

const handleLogoClick = () => {
  router.replace("/screens/profile")
}

const Header = () => {
  return (
    <View className="flex w-full h-[80px] bg-white items-center justify-between flex-row">
    <TouchableOpacity onPress={handleLogoClick}>
    <Image 
      source={images.logo}
      resizeMode='contain'
      className="w-[200px] h-[100px] ml-1 mt-3"
    />
    </TouchableOpacity>
    <View className="w-10 h-12 flex items-center justify-center rounded-full bg-[#008A29] mr-4">
      <TabIcon
        icon={icons.profile}
        color={"#E5E5F7"}
      />
    </View>
  </View>
  )
}

export default Header