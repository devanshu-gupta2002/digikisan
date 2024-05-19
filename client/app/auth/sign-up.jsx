import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants/index.js"
import FormField from '../../components/FormField.jsx';
import CustomButton from '../../components/CustomButton.jsx'
import { Link, router } from 'expo-router';
import { useAuthContext } from '../../context/auth.js';
import { submitSignUp } from '../../services/signUp.js';

const SignUp = () => {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { state, setState, setLogged, setIsLogged } = useAuthContext()

  const handleSubmit = async () => {
    try {
      await submitSignUp(form, setIsSubmitting);
    } catch (error) {
      console.log("error", error)
      Alert.alert(error.response.data.msg);
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[315px] h-[105px] mx-auto"
          />
          <Text className="text-2xl text-gray-900 text-semibold mt-10 font-psemibold">
            Sign Up to DigiKisan
          </Text>
          <FormField
            title="Full Name"
            value={form.fullname}
            handleChangeText={(e) => setForm({ ...form, fullname: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />
          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-800 font-pregular">
              Already have an account?
            </Text>
            <Link href="/sign-in" className='text-lg text-digiorange font-psemibold'>
              Log In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp