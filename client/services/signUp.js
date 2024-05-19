import axios from "axios"
import { Alert } from 'react-native';
import { router } from "expo-router";

export const submitSignUp = async (form, setIsSubmitting) => {
  console.log(form)
  if (!form.fullname || !form.email || !form.password) {
    Alert.alert("Please fill all fields")
    return;
  }

  if (form.password.length < 6) {
    Alert.alert("Password length must be greater than 6")
    return;
  }

  if (form.fullname.trim().length < 3) {
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
    if (resp.data.error) {
      throw new Error(resp.data.error)
    }
    console.log("signup response", resp.data)
    Alert.alert("Registration successful, Sign in to continue!");
    router.replace("/auth/sign-in")
  } catch (error) {
    console.log("error response", error.response.data.msg)
    throw error;
  } finally {
    setIsSubmitting(false);
  }
}