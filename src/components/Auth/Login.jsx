import { Input, Typography, Button } from "@material-tailwind/react";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  const { handleLogin } = useContext(AuthContext); // Use handleLogin from AuthContext

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim(); // Trim whitespace from email
    const trimmedPassword = password.trim(); // Trim whitespace from password

    if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!trimmedPassword) {
      setEmailError("");
      setFormError("Password cannot be empty.");
      return;
    }

    setEmailError("");
    setFormError("");

    // Call handleLogin and process the result
    const result = await handleLogin(trimmedEmail, trimmedPassword);
    if (!result.success) {
      setFormError(result.message); // Display login error
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
            {formError && (
              <span>
                <Typography variant='small' color='red' className='flex items-center gap-1'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='red' className='h-4 w-4'>
                    <path
                      fillRule='evenodd'
                      d='M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM11.25 7.5a.75.75 0 011.5 0v5.25a.75.75 0 01-1.5 0V7.5zm.75 9a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {formError}
                </Typography>
              </span>
            )}
            <Button type='submit' color='blue' fullWidth>
              Login
            </Button>
          </form>
        </div>
        {/* Demo Credentials */}
        <details className='text-black'>
          <summary className='font-medium text-black'>Demo Credentials</summary>

          <div className='border-b-2 text-black border-gray-200 my-2 pb-2'>
            <p className='text-black text-sm font-bold'>Employee Login</p>
            <p className='text-sm text-black'>
              Email: <span className='font-semibold text-black'>rajveermahida@myvision.com</span>
            </p>
            <p className='text-sm text-black'>
              Password: <span className='font-semibold text-black'>spidy123</span>
            </p>
          </div>
          <div className='border-b-2 text-black border-gray-200 my-2 pb-2'>
            <h3 className='text-black text-sm font-bold'>Admin Login</h3>
            <p className='text-sm text-black'>
              Email: <span className='font-semibold text-black'>hello@myvision.com</span>
            </p>
            <p className='text-sm text-black'>
              Password: <span className='font-semibold text-black'>hello@myvision.com</span>
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Login;
