import React from 'react'

import Header from './global/Header'

import UserProfile from './component/profile/UserProfile'

export default function Profile() {
  return (
    <div className='profile'>
      <Header ofPage="profile" />
      <br />
      <UserProfile />
    </div>
  )
}
