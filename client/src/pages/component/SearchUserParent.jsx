import React, { useEffect, useState } from 'react'
import { Card, CardBody } from '@material-tailwind/react'
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import { CiSearch } from "react-icons/ci";
import axios from 'axios'

const SearchUserParent = () => {
    const [searchUser, setSearchUser] = useState([]);
    const [searchKey, setSearchKey] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/teachers/search',
                { search: searchKey }
            )

            setLoading(false);

            setSearchUser(response.data);

        } catch (error) {
            alert("Có lỗi khi tìm user!", error?.response?.data?.message)
            console.log(error)
        }
    }

    useEffect(() => {
        handleSearch();
    }, [searchKey])

    console.log(searchUser);
    return (
        <Card>
            <CardBody>
                <div className='flex items-center overflow-hidden justify-center'>
                    <input onChange={(e) => setSearchKey(e.target.value)} type='text' className='w-full border-b-2 border-b-gray-500 p-2 outline-none' placeholder='Tìm tài khoản theo tên...' />
                    <CiSearch size={30}/>
                </div>
               
                <div className='h-48 overflow-y-scroll mt-2'>
                    {searchUser.length === 0 && !loading && (
                        <p className='text-center'>Không tìm thấy tài khoản.</p>
                    )
                    }
                    {loading && (
                        <p className='text-center'><Loading size={12} /></p>
                    )
                    }
                    {searchUser.length !== 0 && !loading && (
                        searchUser.map((user, index) => (
                            <UserSearchCard user={user} key={user._id}/>
                        )
                        )
                    )
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default SearchUserParent