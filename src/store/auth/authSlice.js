import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";




const initialState={
    authTokens:null,
    user: null,
   
    
   
}
const clearAll = () => {
    
      localStorage.clear()
   
    
  }
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuthToken:(state,action)=>{
            state.authTokens = action.payload
            
        },
        setUser:(state , action)=>{
            state.user = action.payload

        },
       logoutUser:(state)=>{
        state.authTokens=null,
        state.user=null,
        clearAll()
       },
     
        
    }    
})

export const initializeAsyncData = () => (dispatch) => {
    try {
      const userName = localStorage.getItem('authTokens')
      
      const token = userName ? JSON.parse(userName) : null;
      const userExist = userName ? (jwtDecode(userName)) : null;
  
      dispatch(setAuthToken(token));
      dispatch(setUser(userExist));
    } catch (error) {
      console.error('Error initializing async data:', error);
    }
  };

export const {setAuthToken , setUser,logoutUser }=authSlice.actions



export default authSlice.reducer
