import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Admin = () => {
    const [admins, setAdmins] = useState([])
    const [file, setFile] = useState(null)
    const [image, setImage] = useState("https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg");
    const fileInputRef = useRef(null);

    const handleAddAdmin = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("username", "admin01")
        formData.append("password", "1234")
        formData.append("fname", "Somchai")
        formData.append("lname", "Jaidee")
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
                    <form>
                        <div className='pt-3 flex'>
                            <div>
                                <h3>First Name *</h3>
                                <input type="text" name="" id="" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Admin