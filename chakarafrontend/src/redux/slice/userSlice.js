import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:[],
  token:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
   
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer