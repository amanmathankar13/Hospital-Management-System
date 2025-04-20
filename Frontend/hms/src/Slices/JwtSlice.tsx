import { createSlice } from "@reduxjs/toolkit";

const JwtSlice = createSlice({
    name: 'jwt',
    initialState: localStorage.getItem('token')||'',
    reducers: {
        setJwt:(state, action)=>{
            localStorage.setItem('token', action.payload)
            state = action.payload
            return state;
        },
        removeJwt: (state) => {
            localStorage.removeItem('token')
            state = ''
            return state;
        }
    }
})
export const { setJwt, removeJwt } = JwtSlice.actions
export default JwtSlice.reducer;