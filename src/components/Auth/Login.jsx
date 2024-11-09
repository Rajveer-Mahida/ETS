import { Input, Typography, Button } from "@material-tailwind/react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      // Proceed with form submission
      console.log("Trying to login...");
      // console.log("Email:", email);
      // console.log("Password:", password);
      handleLogin(email, password);

    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center '>
      <div className='flex flex-col gap-6 w-96 bg-white p-6 rounded-lg shadow-lg'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-800'>Login</h1>
          <p className='text-sm text-gray-500'>Login to your account</p>
        </div>
        <div className='form' onSubmit={handleSubmit}>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <Input
              variant='standard'
              label='Email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
            />
            {emailError && (
              <Typography variant='small' color='red' className='flex items-center gap-1'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='red' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM11.25 7.5a.75.75 0 011.5 0v5.25a.75.75 0 01-1.5 0V7.5zm.75 9a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z'
                    clipRule='evenodd'
                  />
                </svg>
                {emailError}
              </Typography>
            )}
            <div className='relative'>
              <Input
                type={showPassword ? "text" : "password"}
                variant='standard'
                label='Password'
                placeholder='Password'
                onChange={(e) => {
                  ``;
                  setPassword(e.target.value);
                }}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 rounded-3xl p-3 m-2 flex items-center text-sm leading-5 color-red bg-red-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <Button type='submit' color='blue' fullWidth>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
