import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export const submitLogin = async (form, setIsSubmitting, setState, setIsLogged, useRouterStack) => {
  console.log(form)
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

    if (resp.data.error) {
      throw new Error(resp.data.error)
    }

    console.log("signin response", resp.data)
    setState(resp.data)
    setIsLogged(true)
    await AsyncStorage.setItem("user-data", JSON.stringify(resp.data));
    Alert.alert("Login successful. Welcome back!");
    router.navigate("/tabs/sampling")
    useRouterStack.dismissAll()
  } catch (error) {
    console.log("error response", error.response.data.msg)
    throw error;
  } finally {
    setIsSubmitting(false);
  }
}