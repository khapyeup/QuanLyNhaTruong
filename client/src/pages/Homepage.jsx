import React from 'react'
import {Link} from "react-router-dom"

function Homepage() {
  return (
    <>
    <Link to="/choose">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Đăng nhập</button>
    </Link>
    </>
  )
}

export default Homepage