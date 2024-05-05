import React, {useState, useEffect, createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: ""
  })

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("user-data");
      const parsed = JSON.parse(data);
      console.log("parsed", parsed)
      setState({...state, user: parsed.user, token: parsed.token})
    }
    loadFromAsyncStorage()
  }, [])

  return(
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}