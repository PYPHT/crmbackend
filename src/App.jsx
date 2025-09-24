import React from 'react'
import { Navbar } from './components/Navbar'

const App = () => {
  return (
    <div className='flex md:grid-rows-2'>
      <div className='w-80 h-screen bg-gray-200 dark:bg-gray-800 border-r-2 border-gray-100 dark:border-gray-500'>
        <Navbar />
      </div>
      <div className='h-screen w-screen overflow-y-scroll bg-gray-200 dark:bg-gray-800'></div>
    </div>
  )
}

export default App