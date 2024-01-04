import React from 'react'
import {useState} from 'react'

import Header from './global/Header'

import UserProfile from './component/profile/UserProfile'
import Chart from './component/profile/Chart'

export default function Profile() {
  const [progress,setProgress]=useState([80])
  return (
    <div className='profile'>
      <Header ofPage="profile" />
      <br />
      <UserProfile />
      <Chart  data={progress}/>
    </div>
  )
}
