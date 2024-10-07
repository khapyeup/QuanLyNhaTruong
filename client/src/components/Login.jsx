export default function Login() {
    return (
        <>
            
            <div className="flex flex-col-reverse justify-center items-center h-screen md:flex-row">
                <div className="w-3/4 md:w-2/4">
                    <form className="flex-col flex gap-10 justify-center items-center">
                        <p className="font-bold">Đăng nhập vào hệ thống</p>
                        <input className="border-solid border-2 rounded-md w-3/5 p-2" name="username" type="text" placeholder="Tên đăng nhập"/>
                        <input className="border-solid border-2 rounded-md w-3/5 p-2" name="password" type="password" placeholder="Mật khẩu"/>
                        <button className="bg-black p-3 rounded-xl text-white hover:bg-violet-600 hover:text-white" type="submit">Đăng nhập</button>
                    </form>
                </div>
                <div>
                    <img className="size-0 md:w-max md:h-screen" src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"></img>
                </div>
            </div>
        </>
    )
}