import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { motion } from 'motion/react'
import { fadeIn } from '../ultils/motion'

const Admin = () => {
    const [admins, setAdmins] = useState([])
    const [departs, setDeparts] = useState([])
    const [departsName, setDepartsName] = useState([])
    const [file, setFile] = useState(null)
    const [image, setImage] = useState("https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
    const fileInputRef = useRef(null);

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [conpassword, setConfirmPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("1")
    const [department, setDepartment] = useState()

    const handleAddAdmin = async () => {
        const now = new Date().toISOString();

        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        formData.append("fname", fname)
        formData.append("lname", lname)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("status", "0")
        formData.append("type", type)
        formData.append("department", department)
        formData.append("createtime", now)
        formData.append("logintime", now)
        formData.append("image", file)

        const res = await axios.post("http://192.168.1.30:5001/insertadmins", formData)
        if (res.status === 200) {
            getAdmins()
            window.location.reload()
        }
    }

    const getAdmins = async () => {
        try {
            const res = await axios.post("http://192.168.1.30:5001/getadmins")
            setAdmins(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getDepartment = async () => {
        try {
            const res = await axios.post("http://192.168.1.30:5001/getdepartment")
            setDeparts(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getDepartmentName = async (id = null) => {
        try {
            const res = await axios.post("http://192.168.1.30:5001/getdepartment")
            setDepartsName(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAdmins()
        getDepartment()
    }, [])

    const handleButtonClick = () => {
        fileInputRef.current.click()
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImage(imageUrl)
            setFile(file)
        }
    };

    return (
        <div>
            {admins.length !== 0 && <motion.div variants={fadeIn('left', 0.3)} initial='hidden' whileInView='show' viewport={{ once: true }} className={`w-full h-80 rounded-xl relative flex flex-col border-1 dark:border-gray-500 border-gray-300 ${admins.length !== 0 ? 'overflow-y-scroll scroll-smooth' : ''}`}>
                <table className='w-full table-auto min-w-max'>
                    <thead className='bg-gray-500 h-10 text-white'>
                        <tr>
                            <th>No.</th>
                            <th>User</th>
                            <th>Department</th>
                            <th>Create Time</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={6} className='text-end'>
                                <input type="text" placeholder='Search user admin' className='outline-1 p-2 m-2 rounded-lg dark:outline-gray-500 outline-gray-300 dark:text-white' />
                            </td>
                        </tr>
                        {
                            admins.length > 0 ? admins.map((admin, index) => (
                                <motion.tr variants={fadeIn('left', 0.4)} initial='hidden' whileInView='show' viewport={{ once: true }} key={index} className='dark:text-white text-gray-600 font-semibold border-b-1 dark:border-gray-500 border-gray-300'>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='py-2'>
                                        <div className='flex items-center'>
                                            <div>
                                                <img src={admin.imageUrl} alt={admin.username} className='w-[60px] h-[60px] rounded-full' />
                                            </div>
                                            <div className='pl-3'>
                                                <p>{`${admin.fname} ${admin.lname}(${admin.username})`}</p>
                                                <p className='text-sm font-normal'>{admin.email}</p>
                                                <p className='text-sm font-normal'>{admin.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </motion.tr>
                            )) :
                                <tr>
                                    <td colSpan={5} className='text-center py-5 text-lg font-semibold dark:text-white'>No Data</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </motion.div>}
            <div className={`${admins.length > 0 ? 'pt-10' : ''}`}>
                <motion.div variants={fadeIn('left', 0.4)} initial='hidden' whileInView='show' viewport={{ once: true }}>
                    <h1 className='dark:text-white text-gray-600 font-bold text-2xl'>Add New Admin</h1>
                    <h2 className='dark:text-white text-gray-600 font-semibold'>Enter admin information to save in the CRM</h2>
                </motion.div>
                <motion.div variants={fadeIn('left', 0.5)} initial='hidden' whileInView='show' viewport={{ once: true }} className='w-full border-1 my-3 p-3 rounded-lg dark:border-gray-500 border-gray-300'>
                    <div className='flex items-center'>
                        <img src={image} alt="" className='w-[120px] h-[120px] rounded-full object-cover' />
                        <button type='button' onClick={handleButtonClick} className='text-lg font-semibold text-white bg-blue-500 w-auto h-max ml-3 rounded-lg p-2 cursor-pointer hover:bg-blue-600'>
                            + Add Image
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </button>
                    </div>
                    <form onSubmit={handleAddAdmin}>
                        <div className='p-3 flex justify-between w-full'>
                            <div className='w-120'>
                                <h3 className='font-medium dark:text-white text-xl'>Admin Configuration</h3>
                                <h4 className='text-sm dark:text-gray-400'>Set User name and Password for an admin login.</h4>
                                <div className='pt-3'>
                                    <h3 className='font-sans dark:text-white'>User Name *</h3>
                                    <input required type="text" onChange={(e) => setUserName(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                </div>
                                <div className='pt-3 flex justify-between'>
                                    <div>
                                        <h3 className='font-sans dark:text-white'>Password *</h3>
                                        <input required type="password" onChange={(e) => setPassword(e.target.value)} className='outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                    </div>
                                    <div>
                                        <h3 className='font-sans dark:text-white'>Confirm Password *</h3>
                                        <input required type="password" onChange={(e) => setConfirmPassword(e.target.value)} className='outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                    </div>
                                </div>
                                <h3 className='pt-15 font-medium dark:text-white text-xl'>Admin Basic Details</h3>
                                <h4 className='text-sm dark:text-gray-400'>Set details for an admin info.</h4>
                                <div className='pt-3 flex justify-between'>
                                    <div>
                                        <h3 className='font-sans dark:text-white'>First Name *</h3>
                                        <input required type="text" onChange={(e) => setFname(e.target.value)} className='outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                    </div>
                                    <div>
                                        <h3 className='font-sans dark:text-white'>Last Name *</h3>
                                        <input required type="text" onChange={(e) => setLname(e.target.value)} className='outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                    </div>
                                </div>
                                <div className='pt-3'>
                                    <h3 className='font-sans dark:text-white'>Email *</h3>
                                    <input required type="email" onChange={(e) => setEmail(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                </div>
                                <div className='pt-3'>
                                    <h3 className='font-sans dark:text-white'>Phone *</h3>
                                    <input required type="tel" onChange={(e) => setPhone(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                </div>
                            </div>
                            <div className='w-0.5 rounded-lg dark:bg-gray-500 bg-gray-300'></div>
                            <div className='w-120'>
                                <h3 className='font-medium dark:text-white text-xl'>Admin Additional Details</h3>
                                <h4 className='text-sm dark:text-gray-400'>Set details for an admin info.</h4>
                                <div className='pt-3'>
                                    <h3 className='font-sans dark:text-white'>Admin type *</h3>
                                    <select required onChange={(e) => setType(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium'>
                                        <option value="" className='font-semibold text-sm dark:text-gray-500'>-- Select Type --</option>
                                        <option value="1" className='font-semibold text-sm dark:text-gray-500'>General Admin</option>
                                        <option value="2" className='font-semibold text-sm dark:text-gray-500'>Supervisor</option>
                                    </select>
                                </div>
                                <div className='pt-3'>
                                    <h3 className='font-sans dark:text-white'>Department *</h3>
                                    <select required onChange={(e) => setDepartment(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium'>
                                        <option value="" className='font-semibold text-sm dark:text-gray-500'>-- Select Type --</option>
                                        {
                                            departs.map((depart) => (
                                                <option key={depart.id} value={depart.id} className='font-semibold text-sm dark:text-gray-500'>{depart.department}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='text-end w-full'>
                            <button
                                type="submit"
                                onClick={(e) => {
                                    if (password !== conpassword) {
                                        alert("Passwords are not compatible!!")
                                        return
                                    }
                                    if (file === null) {
                                        alert("Please select image profile!")
                                        return
                                    }
                                }}
                                className='p-3 bg-blue-600 rounded-lg text-white font-semibold w-50 cursor-pointer hover:bg-blue-700'
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Admin