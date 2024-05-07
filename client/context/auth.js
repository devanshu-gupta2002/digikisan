import React, {useState, useEffect, createContext, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: ""
  })
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("user-data");
      const parsed = JSON.parse(data);
      console.log("parsed", parsed)
      if(parsed && parsed.token) {
        setIsLogged(true)
        setState({...state, user: parsed.user, token: parsed.token})
      } else {
        setIsLogged(false)
      }
    }
    loadFromAsyncStorage()
  }, [])

  return(
    <AuthContext.Provider value={{state, setState, isLogged, setIsLogged}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider}