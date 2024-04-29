import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl justify-center items-center min-h-[62px] ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
    <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
      {title}
    </Text>
    </TouchableOpacity>
  )
}

export default CustomButton