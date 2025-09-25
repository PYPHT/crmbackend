import React, { useState } from 'react'
import * as FaIcaons from "react-icons/fa6";
import {fadeIn} from '../ultils/motion'
import {motion} from 'motion/react'

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState('#compa')
  const menuItems = [
    { href: "#compa", label: "MyCompany", icon: <FaIcaons.FaBuildingUser /> },
    { href: "#admin", label: "Admins", icon: <FaIcaons.FaAddressCard /> },
    { href: "#prod", label: "Products", icon: <FaIcaons.FaBoxesStacked /> },
    { href: "#cont", label: "Contacts", icon: <FaIcaons.FaAddressBook /> },
    { href: "#task", label: "Tasks", icon: <FaIcaons.FaListCheck /> },
  ]

  return (
    <div className=''>
      <motion.div variants={fadeIn('down', 0.2)} initial='hidden' whileInView='show' viewport={{ once: true }} className='dark:bg-gray-600 bg-gray-300 border-b-2 border-gray-200 dark:border-gray-500'>
        <h1 className='pl-2 pt-2 text-2xl font-bold dark:text-white text-blue-600'>SalesPro CRM</h1>
        <h2 className='pl-2 pb-2 font-semibold dark:text-white text-blue-600'>Management</h2>
      </motion.div>
      <motion.div variants={fadeIn('down', 0.4)} initial='hidden' whileInView='show' viewport={{ once: true }}>
        {
          menuItems.map((link, index) => (
            <button key={index} type="button" className={`cursor-pointer w-full group hover:bg-gray-400 font-semibold text-gray-500 dark:text-gray-300 py-3 pl-5 dark:bg-gray-600 bg-gray-300 ${activeLink == link.href ? 'bg-gray-400 dark:bg-gray-800' : ''}`}>
              <a key={index} href={link.href} onClick={() => setActiveLink(link.href)} className='flex items-center hover:bg-gray-400'>{link.icon} <div className='pl-2'></div> {link.label}</a>
            </button>
          ))
        }
      </motion.div>
    </div>
  )
}
