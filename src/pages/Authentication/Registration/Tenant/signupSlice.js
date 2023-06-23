import { createSlice } from '@reduxjs/toolkit'

export const signupSlice = createSlice({
  name: 'signupSlice',
  initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    mobileNumber: '',
    selecteD: '',
    passworD: '',
    confirmPassword: '',

    

  },
  reducers: {
    

    setFirstName: (state, action) => {
      
      state.firstName = action.payload
    
    },
    setLastName: (state, action) => {
      
      state.lastName = action.payload
    
    },
    setUserName: (state, action) => {
           
        state.userName = action.payload
      },
      setMobileNumber: (state, action) => {
      
        
        state.mobileNumber = action.payload
        
      },
      setSelected: (state, action) => {
      
        state.selecteD = action.payload
        
      },
      setPassword: (state, action) => {
      
        state.passworD = action.payload
        
      },
      setConfirmPassword: (state, action) => {
      
        state.confirmPassword = action.payload
      },

      
      
    

  },
})


export const { setFirstName, setLastName,setUserName, setMobileNumber, 
    setSelected, setPassword, setConfirmPassword  } = signupSlice.actions

export default signupSlice.reducer