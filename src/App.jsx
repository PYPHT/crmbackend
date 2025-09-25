import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import Admin from './components/Admin';
import MyCompany from './components/MyCompany'

const App = () => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return (
    <main>
      <div className='flex md:grid-rows-2'>
        <div className='w-80 h-screen bg-gray-200 dark:bg-gray-800 border-r-2 border-gray-100 dark:border-gray-500'>
          <Navbar />
        </div>
        <div className='h-screen w-screen overflow-y-scroll dark:bg-gray-800 p-5'>
          {hash == "" && <MyCompany/>}
          {hash == "#compa" && <MyCompany/>}
          {hash == "#admin" && <Admin />}
        </div>
      </div>
    </main>
  )
}

export default App