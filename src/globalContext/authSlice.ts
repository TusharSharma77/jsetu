'use client'
import {createSlice} from '@reduxjs/toolkit'
import { object } from 'motion/react-client'

type Auth = Readonly<{
    status:boolean,
    userData:object|null
}>

const initialState:Auth ={
    status:false, // Set to false to show login page first
    userData:{
        id: '1',
        name: 'Demo User',
        email: 'demo@jeevansetu.com',
        role: 'admin', // Change to 'patient' or 'doctor' to test different roles
        avatar: '',
        phone: '+91-9876543210',
        location: {
            latitude: 28.6139,
            longitude: 77.2090,
            address: 'Rural Village, District, State'
        },
        preferences: {
            language: 'en',
            notifications: true,
            theme: 'light'
        }
    }
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,actions)=>{
            state.status=actions.payload.status
            
        }
    }
})

export const {login} = authSlice.actions
export default authSlice.reducer
