import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import { useForm } from "react-hook-form";
import { Input } from "@material-tailwind/react";

function LoginPage({ role }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, currentRole, error } = useSelector(
    (state) => state.user
  );

  const submitHandler = (data) => {
    const username = data.username;
    const password = data.password;
    const fields = { username, password };
    dispatch(loginUser(fields, role));
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "parent") {
        navigate("/Parent/dashboard");
      }
    }
  }, [status, currentRole, navigate, error, currentUser]);

  return (
    <>
      <div className="bg-[url('/backgroundlogin.jpg')] w-full h-screen bg-cover flex justify-center items-center">
        <div className="flex flex-col bg-black/80 flex-1 p-12 max-w-[450px] gap-10 rounded">
          <h1 className="text-white font-bold text-3xl ">Đăng nhập</h1>
          <div>
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-8">
              <Input
                {...register("username", {
                  required: "Chưa nhập tên đăng nhập",
                })}
                id="username"
                name="username"
                type="text"
                required
                
                label="Tên đăng nhập"
                color="white"
                className="px-4 py-6"
              />
              {errors.username && (
                <p className="text-red-800 text-sm">
                  {errors.username.message}
                </p>
              )}

              <Input
                {...register("password", {
                  required: "Chưa nhập mật khẩu",
                })}
                id="password"
                name="password"
                type="password"
                required
                
                color="white"
                label="Mật khẩu"
                className="px-4 py-6"
              />

              {errors.password && (
                <p className="text-red-800 text-sm">
                  {errors.password.message}
                </p>
              )}
              {error && <p className="text-red-800 text-sm">{error}</p>}

              <button className="bg-red-700 rounded py-2 hover:bg-red-800 text-white font-bold" type="submit">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
