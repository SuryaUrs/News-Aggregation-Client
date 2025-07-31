import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ROUTE_PATHS } from '../constants/apiEndpoints';
import { loginUser } from '../api/userApi';
import { localStorageConstants } from '../constants/localStorage.constant';
import { toast, ToastContainer } from 'react-toastify';
import { VALIDATION_ERROR_MESSAGES, API_MESSAGES } from '../constants/errorMessages';
import { COMMON_CONSTANTS } from '../constants/commonConstants';
import 'react-toastify/dist/ReactToastify.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().email(VALIDATION_ERROR_MESSAGES.INVALID_EMAIL).required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
    hashPassword: Yup.string()
      .required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD)
      .matches(/[a-z]/, VALIDATION_ERROR_MESSAGES.LOWERCASE_LETTER)
      .matches(/[A-Z]/, VALIDATION_ERROR_MESSAGES.UPPERCASE_LETTER)
      .matches(/[0-9]/, VALIDATION_ERROR_MESSAGES.NUMBER)
      .matches(/[@$!%*?&]/, VALIDATION_ERROR_MESSAGES.SPECIAL_CHARACTER),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      hashPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await loginUser(values);
        const userData = response?.data;
        if (userData) {
          sessionStorage.setItem(localStorageConstants.ACCESS_TOKEN, userData.token);
          sessionStorage.setItem(localStorageConstants.REFRESH_TOKEN, userData.refreshToken);
          sessionStorage.setItem(localStorageConstants.REFRESH_TOKEN_EXPIRY, userData.refreshTokenExpiry);
          sessionStorage.setItem(localStorageConstants.ACTIVE_ACCOUNT_ID, userData.userId);
          sessionStorage.setItem(localStorageConstants.USER, userData.name);
          sessionStorage.setItem(localStorageConstants.USER_ROLE, userData.role);

          toast.success(API_MESSAGES.LOGIN_SUCCESS);
          if (userData.role === 'Admin') {
            navigate(ROUTE_PATHS.EXTERNAL_SERVER);
          } else {
            navigate(ROUTE_PATHS.NEWS_ARTICLES);
          }
        }
      } catch (error) {
        toast.error(API_MESSAGES.LOGIN_ERROR);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to News App</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="email"
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.username}</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="hashPassword"
              id="password"
              value={formik.values.hashPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 pr-10"
            />
            <span onClick={togglePasswordVisibility} className="absolute right-3 top-9 cursor-pointer text-sm text-gray-600">
              {showPassword ? 'Hide' : 'Show'}
            </span>
            {formik.touched.hashPassword && formik.errors.hashPassword && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.hashPassword}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition flex justify-center items-center ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {formik.isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              <>{COMMON_CONSTANTS.LOGIN}</>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate(ROUTE_PATHS.SIGN_UP)}
            className="text-blue-600 hover:underline cursor-pointer font-medium">
            Let’s get started today. Sign up
          </span>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
