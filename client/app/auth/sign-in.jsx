import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants"
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'
import { Link, router, useRouter } from 'expo-router';
import { useAuthContext } from '../../context/auth.js';
import { submitLogin } from '../../services/signIn.js';

const SignIn = () => {
  const useRouterStack = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { state, setState, isLogged, setIsLogged } = useAuthContext()

  const handleSubmit = async () => {
    try {
      await submitLogin(form, setIsSubmitting, setState, setIsLogged, useRouterStack);
    } catch (error) {
      console.log("error", error)
      Alert.alert(error.response.data.msg);
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[315px] h-[105px] mx-auto" />
          <Text className="text-2xl text-gray-900 text-semibold mt-10 font-psemibold"> Login to DigiKisan </Text>
          <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address" />
          <FormField title="Password" value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles="mt-7" />
          <CustomButton title="Log In" handlePress={handleSubmit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-800 font-pregular"> Don't have an account? </Text>
            <Link href="/auth/sign-up" className='text-lg text-digiorange font-psemibold'> Sign Up </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn