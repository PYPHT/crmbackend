import React, { useState } from 'react'
import * as FaIcaons from "react-icons/fa6";

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState('#admin')
  const menuItems = [
    { href: "#admin", label: "Admins", icon: <FaIcaons.FaAddressCard /> },
    { href: "#prod", label: "Products", icon: <FaIcaons.FaBoxesStacked /> },
    { href: "#cont", label: "Contacts", icon: <FaIcaons.FaAddressBook /> },
    { href: "#task", label: "Tasks", icon: <FaIcaons.FaListCheck /> },
  ]

  return (
    <div className=''>
      <div className='dark:bg-gray-600 bg-gray-300 border-b-2 border-gray-200 dark:border-gray-500'>
        <h1 className='pl-2 pt-2 text-2xl font-bold dark:text-white text-blue-600'>SalesPro CRM</h1>
        <h2 className='pl-2 pb-2 font-semibold dark:text-white text-blue-600'>Management</h2>
      </div>
      <div>
        {
          menuItems.map((link, index) => (
            <button id={index} type="button" className='cursor-pointer w-full hover:bg-gray-400 font-semibold text-gray-500 dark:text-gray-300 py-3 pl-5 dark:bg-gray-600 bg-gray-300'>
              <a href={link.href} className='flex w-full h-full items-center group-hover:bg-gray-400'>{link.icon} <div className='pl-2'></div> {link.label}</a>
            </button>
          ))
        }
      </div>
    </div>
  )
}
