import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../context/auth.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IsLogged from '../../components/IsLogged.jsx';
import CustomButton from '../../components/CustomButton.jsx';
import images from '../../constants/images.js';
import { editDetails } from '../../services/user.js';
import { router } from 'expo-router';

const Profile = () => {
  const { state, setState, isLogged, setIsLogged } = useAuthContext();
  console.log('state', state);
  
  const userAddress = state.user?.address ? state.user.address : "{\"streetAddress\":\"\",\"city\":\"\",\"state\":\"\"}";
  const parsedAddress = JSON.parse(userAddress)  
  const [fullName, setFullName] = useState(state.user?.username || "");
  const [email, setEmail] = useState(state.user?.email || "");
  const [phone, setPhone] = useState(state.user?.phone?.toString() || "");
  const [streetAddress, setStreetAddress] = useState(parsedAddress.streetAddress || "");
  const [city, setCity] = useState(parsedAddress.city || "");
  const [stateAddr, setStateAddr] = useState(parsedAddress.state || "");
  const [isEditing, setIsEditing] = useState(false);

  const logout = async () => {
    setState({
      token: "",
      user: null,
    });
    setIsLogged(false);
    await AsyncStorage.removeItem("user-data");
    router.replace("/auth/sign-in");
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveDetails = async () => {
    const newDetails = {
      username: fullName,
      email,
      phone: parseInt(phone, 10),
      address: {
        streetAddress,
        city,
        state: stateAddr
      }
    };
  
    try {
      // Call editDetails function passing newDetails, state, and setState
      const updatedUser = await editDetails(newDetails, state, setState);
  
      // Update the local state with the updated user details
      setFullName(updatedUser.username);
      setEmail(updatedUser.email);
      setPhone(updatedUser.phone?.toString() || "");
      const updatedAddress = JSON.parse(updatedUser.address);
      setStreetAddress(updatedAddress.streetAddress || "");
      setCity(updatedAddress.city || "");
      setStateAddr(updatedAddress.state || "");
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving details:', error);
    }
  };
  
  

  const renderEditableField = (label, value, setValue, placeholder, keyboardType = 'default') => (
    <View className="w-full p-3 mb-4 bg-white rounded-2xl border border-digiorange relative">
      <TextInput
        value={value}
        onChangeText={setValue}
        editable={isEditing}
        placeholder={placeholder}
        placeholderTextColor="gray"
        className={`text-lg font-pmedium text-gray-800 ${value ? '' : 'text-sm text-gray-500'}`}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderField = (label, value, placeholder) => (
    <View className="w-full p-3 mb-4 bg-white rounded-2xl border border-secondary relative">
      {value ? (
        <Text className="absolute right-2 text-xs font-psemibold text-gray-500 p-1">{label}</Text>
      ) : null}
      <Text className={`text-lg font-pmedium text-gray-800 ${value ? '' : 'text-sm text-gray-500'}`}>
        {value || placeholder}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex bg-gray-300 w-full h-full">
      <View className="flex items-center">
        <View className="w-full justify-center h-[160px] bg-white">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="h-3/5 w-full ml-1 mt-3"
          />
        </View>
        <View className="mt-10 flex items-center p-7 w-full">
          {isEditing
            ? renderEditableField("Full Name", fullName, setFullName, "Add your Full Name")
            : renderField("Full Name", fullName, "Add your Full Name")}
          {isEditing
            ? renderEditableField("Email", email, setEmail, "Add your Email")
            : renderField("Email", email, "Add your Email")}
          {isEditing
            ? renderEditableField("Phone", phone, setPhone, "Add your Phone", "numeric")
            : renderField("Phone", phone, "Add your Phone")}
          {isEditing
            ? renderEditableField("Street Address", streetAddress, setStreetAddress, "Add your Street Address")
            : renderField("Street Address", streetAddress, "Add your Street Address")}
          {isEditing
            ? renderEditableField("City", city, setCity, "Add your City")
            : renderField("City", city, "Add your City")}
          {isEditing
            ? renderEditableField("State", stateAddr, setStateAddr, "Add your State")
            : renderField("State", stateAddr, "Add your State")}

          <CustomButton 
            title={isEditing ? "Save Details" : "Edit Details"}
            handlePress={isEditing ? saveDetails : toggleEdit}
            containerStyles="mt-7 w-1/2"
          />
          <CustomButton 
            title={"Logout"}
            handlePress={logout}
            containerStyles="mt-4 bg-[#b23b3b] w-1/2"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
