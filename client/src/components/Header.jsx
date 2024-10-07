import { Outlet, Link } from "react-router-dom"
export default function Header() {
    return <>
        <nav className="absolute w-screen bg-slate-800 text-white shadow shadow-gray-300 w-100 px-6 flex justify-between items-center md:px-20 py-2">
            <h1 className="">Quản Lý Trường Học</h1>
            <Link to="/login">
                <button className="px-5 text-black bg-white py-2 rounded-lg hover:bg-violet-600 hover:text-white">Đăng nhập</button>
            </Link>
        </nav>
        <Outlet/>
    </>
}