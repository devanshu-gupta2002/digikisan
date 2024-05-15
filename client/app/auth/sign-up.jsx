import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../../constants/index.js"
import FormField from '../../components/FormField.jsx';
import CustomButton from '../../components/CustomButton.jsx'
import { Link, router } from 'expo-router';
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuthContext } from '../../context/auth.js';

const SignUp = () => {

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {state, setState, setLogged, setIsLogged} = useAuthContext()

  const submit = async () => {
    console.log({
      fullname: form.fullname,
      email: form.email,
      password: form.password
    })

    if(!form.fullname || !form.email || !form.password) {
      Alert.alert("Please fill all fields")
      return;
    }

    if(form.password.length<6){
      Alert.alert("Password length must be greater than 6")
      return;
    }

    if(form.fullname.trim().length<3){
      Alert.alert("Username length must be greater than 3")
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(!emailPattern.test(form.email)) {
      Alert.alert("Invalid Email")
      return;
    }

    setIsSubmitting(true);

  try {
      const resp = await axios.post("https://digikisan-production.up.railway.app/auth/register", {
        username: form.fullname.trim(),
        email: form.email.trim(),
        password: form.password
      });
      if(resp.data.error) {
        throw new Error(resp.data.error)
      }
      console.log("signup response", resp.data)

    // const signInResp = await axios.post("https://digikisan-production.up.railway.app/auth/login", {
    //     email: form.email.trim(),
    //     password: form.password
    //   });

    //   console.log("login response", signInResp.data)
    //   setState(signInResp.data);
    //   setIsLogged(true);
    //   const storage = await AsyncStorage.setItem("user-data", JSON.stringify(signInResp.data));
    //   console.log("storage", storage)
      Alert.alert("Registration successful, Sign in to continue!");
      router.replace("/auth/sign-in")

    } catch (error) {
      console.log("error", error)
      console.log("error response", error.response.data.msg)
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
            Sign Up to DigiKisan
          </Text>
          <FormField
          title="Full Name"
          value={form.fullname}
          handleChangeText={(e) => setForm({...form, fullname: e})}
          otherStyles = "mt-7"
          />
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          otherStyles = "mt-5"
          keyboardType="email-address"
          />
          <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          otherStyles = "mt-5"
          />
          <CustomButton 
            title="Sign Up"
            handlePress={submit}
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