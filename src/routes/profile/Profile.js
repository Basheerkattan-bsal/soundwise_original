import React, { useContext } from 'react'
import { useEffect } from 'react'
import DisplayContext from '../../context/DisplayContext'
import MainContext from '../../context/MainContext'
import { useToken } from '../../spotify'

export default function Profile() {
 const [display, dispatch] = useContext(DisplayContext)
 const [STATE, DISPATCH] = useContext(MainContext)
 const {activePlaylist} = display
 const {profile} = STATE
 console.log(profile);
   const searchParams = useToken()
 const getProfile = () => {
    fetch(`https://api.spotify.com/v1/users/spotify`, searchParams)
    .then(res => res.json())
    .then(res => DISPATCH({
        type: 'SET_PROFILE',
        profile: res
    }))
 }

useEffect(() => {
    getProfile()
},[])
  return (
    <div>Profile</div>
  )
}
