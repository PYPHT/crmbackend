import React from 'react'
import { Navbar } from './components/Navbar'

const App = () => {
  return (
    <div className='flex md:grid-rows-2'>
      <div className='w-80 h-screen bg-gray-200'>
        <Navbar />
      </div>
      <div className='h-screen w-screen overflow-y-scroll'></div>
    </div>
  )
}

export default App