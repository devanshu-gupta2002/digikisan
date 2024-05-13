import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../constants"
import CustomButton from '../components/CustomButton';
import { useAuthContext } from '../context/auth.js';

export default function App() {
  const {isLogged} = useAuthContext();
  console.log("isLogged", isLogged)
  if(isLogged) {
    return <Redirect href="/sampling" />
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center  px-4">
          <Image 
            source={images.logo}
            className="w-[380px] h-[300px]"
            resizeMode='contain'
          />
          {/* <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          /> */}
          <CustomButton 
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
          <CustomButton 
            title="Explore Marketplace"
            handlePress={() => router.push('/marketplace')}
            containerStyles="w-full mt-7 bg-[#FF9001]"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

