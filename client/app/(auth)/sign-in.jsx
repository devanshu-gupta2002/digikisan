import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../../constants"
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/auth.js';

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  // console.log("state", useContext(AuthContext))
  const {state, setState, isLogged, setIsLogged} = useContext(AuthContext)

  const submit = async () => {
    console.log({
      email: form.email,
      password: form.password
    })

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(!emailPattern.test(form.email)) {
      Alert.alert("Invalid Email")
      return;
    }
    setIsSubmitting(true);

    try {
        const resp = await axios.post("https://digikisan-production.up.railway.app/auth/login", {
          email: form.email,
          password: form.password
        });

        console.log("signin response", resp.data)
        setState(resp.data)
        setIsLogged(true)
        await AsyncStorage.setItem("user-data", JSON.stringify(resp.data));
        Alert.alert("Login successful. Welcome back!");
        router.replace("/sampling")
      } catch (error) {
        Alert.alert(error.response.data.msg);
      } finally {
        setIsSubmitting(false);
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
            Login to DigiKisan
          </Text>
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          otherStyles = "mt-7"
          keyboardType="email-address"
          />
          <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          otherStyles = "mt-7"
          />
          <CustomButton 
            title="Log In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-800 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className='text-lg text-digiorange font-psemibold'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn