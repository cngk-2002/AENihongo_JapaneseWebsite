import { useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/AENihongoLogo.svg";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaExclamationCircle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const loggedIn = Auth.loggedIn();
  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [addUser, { loading, error }] = useMutation(ADD_USER);
  const [errorMessage, setErrorMessage] = useState("");

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const inputData = Object.fromEntries(formData.entries());

    try {
      const { data } = await addUser({
        variables: { ...inputData },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);

      switch (true) {
        case error.message.includes("username_1 dup key"):
          setErrorMessage("Username đã tồn tại.");
          break;
        case error.message.includes("email_1 dup key"):
          setErrorMessage("Email đã tồn tại.");
          break;
        case error.message.includes("Must match an email address"):
          setErrorMessage("Email không hợp lệ.");
          break;
        case error.message.includes("shorter than the minimum allowed length"):
          setErrorMessage("Password phải tối thiểu 6 ký tự.");
          break;
        default:
          setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
          break;
      }
    }
  };

  return (
    <section
      id="signup"
      className="w-full min-h-[calc(100vh-72px)] py-14 flex justify-center hero-bg"
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="form-container-style"
      >
        <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-2" />
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="username">
              Username
            </label>
            <input
              className="form-input-style px-3 py-2"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="form-input-style px-3 py-2"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                className="password-input"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="off"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-show-btn"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>
        </div>
        {error && (
          <p className="text-red-500 mt-6 inline-flex items-center text-sm sm:text-base">
            <FaExclamationCircle className="mr-1" />
            {errorMessage}
          </p>
        )}
        <button
          className="w-full mt-6 py-3 px-6 bg-primary hover:bg-primary-shade text-white font-bold rounded-xl"
          type="submit"
        >
          {loading ? (
            <AiOutlineLoading className="animate-spin h-6 w-6 mx-auto" />
          ) : (
            "Tạo tài khoản"
          )}
        </button>
        <p className="mt-6 text-gray-500 dark:text-gray-400 text-center">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-bold text-primary hover:text-primary-shade hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
