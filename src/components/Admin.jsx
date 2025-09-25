import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Admin = () => {
    const [admins, setAdmins] = useState([])
    const [file, setFile] = useState(null)
    const [image, setImage] = useState("https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg");
    const fileInputRef = useRef(null);

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [conpassword, setConfirmPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [status, setStatus] = useState("")
    const [type, setType] = useState("1")
    const [department, setDepartment] = useState("")
    const [createtime, setCreateTime] = useState("")
    const [logintime, setLoginTime] = useState("")

    const handleAddAdmin = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        formData.append("fname", fname)
        formData.append("lname", lname)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("status", status)
        formData.append("type", type)
        formData.append("department", department)
        formData.append("createtime", createtime)
        formData.append("logintime", logintime)
        formData.append("image", file)

        await axios.post("http://localhost:5001/admins", formData)

        getAdmins()
    }

    const getAdmins = async () => {
        const res = await axios.post("http://192.168.1.30:5001/getadmins")
        setAdmins(res.data)
    }

    useEffect(() => {
        getAdmins()
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
            {admins.length !== 0 && <div className={`w-full rounded-b-xl relative flex flex-col border-1 ${admins.length !== 0 ? 'overflow-y-scroll' : ''}`}>
                <table className='w-full table-auto min-w-max'>
                    <thead className='bg-gray-500 h-10 text-white'>
                        <tr>
                            <th>User</th>
                            <th>Department</th>
                            <th>Create Time</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.length !== 0 ? admins.map((admin, index) => (
                                <tr key={index}>
                                    <td>{admin.username}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )) :
                                <tr>
                                    <td colSpan={5} className='text-center py-5 text-lg font-semibold dark:text-white'>No Data</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>}
            <div>
                <div>
                    <h1 className='dark:text-white text-gray-600 font-bold text-2xl'>Add New Admin</h1>
                    <h2 className='dark:text-white text-gray-600 font-semibold'>Enter admin information to save in the CRM</h2>
                </div>
                <div className='w-full border-1 my-3 p-3 rounded-lg dark:border-gray-500 border-gray-300'>
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
                        <input type="hidden" value={() => setCreateTime(Date.now.toString)} />
                        <input type="hidden" value={() => setLoginTime(Date.now.toString)} />
                        <input type="hidden" value={() => setStatus("0")} />
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
                                    <input required type="email" onChange={(e) => setUserName(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                </div>
                                <div className='pt-3'>
                                    <h3 className='font-sans dark:text-white'>Phone *</h3>
                                    <input required type="tel" onChange={(e) => setUserName(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium' />
                                </div>
                            </div>
                            <div className='w-0.5 rounded-lg dark:bg-gray-500 bg-gray-300'></div>
                            <div className='w-120'>
                                <h3 className='font-medium dark:text-white text-xl'>Admin Additional Details</h3>
                                <h4 className='text-sm dark:text-gray-400'>Set details for an admin info.</h4>
                                <div className='pt-3'>
                                    <h3 className='font-sans dark:text-white'>Admin type *</h3>
                                    <select onChange={(e) => setType(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium optional:hover:text-black'>
                                        <option value="">-- Select Type --</option>
                                        <option value="1">General Admin</option>
                                        <option value="2">Supervisor</option>
                                    </select>
                                </div>
                                <div className='pt-3'>
                                    <h3 className='font-sans dark:text-white'>Admin type *</h3>
                                    <select onChange={(e) => setType(e.target.value)} className='w-full outline-2 rounded-lg mt-2 p-2 dark:outline-gray-400 outline-gray-300 dark:text-white focus:outline-blue-600 font-medium optional:hover:text-black'>
                                        <option value="">-- Select Type --</option>
                                        <option value="1">General Admin</option>
                                        <option value="2">Supervisor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='text-end w-full'>
                            <button
                            type="submit"
                            onClick={(e) => {
                                if (password !== conpassword) {
                                    alert("Passwords are not compatible!!");
                                    return;
                                }
                                e.target.form.submit();
                            }}
                            className='p-3 bg-blue-600 rounded-lg text-white font-semibold w-50 cursor-pointer hover:bg-blue-700'
                        >
                            Save
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Admin