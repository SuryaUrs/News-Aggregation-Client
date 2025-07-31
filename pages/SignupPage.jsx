import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../constants/apiEndpoints";
import { signupUser } from "../api/userApi";
import {
  API_MESSAGES,
  VALIDATION_ERROR_MESSAGES,
} from "../constants/errorMessages";
import { COMMON_CONSTANTS } from "../constants/commonConstants";
import { Gender } from "../constants/enums";
import { toast } from "react-toastify";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, VALIDATION_ERROR_MESSAGES.MIN_LENGTH.replace("{min}", "3"))
      .required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
    lastName: Yup.string(),
    userName: Yup.string()
      .email(VALIDATION_ERROR_MESSAGES.INVALID_EMAIL)
      .required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
    hashPassword: Yup.string()
      .required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD)
      .matches(/[a-z]/, VALIDATION_ERROR_MESSAGES.LOWERCASE_LETTER)
      .matches(/[A-Z]/, VALIDATION_ERROR_MESSAGES.UPPERCASE_LETTER)
      .matches(/[0-9]/, VALIDATION_ERROR_MESSAGES.NUMBER)
      .matches(/[@$!%*?&]/, VALIDATION_ERROR_MESSAGES.SPECIAL_CHARACTER),
    phoneNumber: Yup.string()
      .required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD)
      .matches(/^[0-9]{10}$/, VALIDATION_ERROR_MESSAGES.PHONE_NUMBER),
    gender: Yup.string()
      .oneOf(Object.values(Gender), VALIDATION_ERROR_MESSAGES.INVALID_GENDER)
      .required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      hashPassword: "",
      phoneNumber: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (values, { isSubmitting }) => {
      try {
        await signupUser(values);
        toast.success(API_MESSAGES.SIGNUP_SUCCESS);
        navigate(ROUTE_PATHS.LOGIN);
      } catch (error) {
        toast.error(API_MESSAGES.SIGNUP_ERROR);
      } finally {
        isSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 p-2 border rounded-md ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 p-2 border rounded-md border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 p-2 border rounded-md ${
                  formik.touched.userName && formik.errors.userName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500 text-sm">{formik.errors.userName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 p-2 border rounded-md ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="hashPassword"
                  value={formik.values.hashPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full mt-1 p-2 border rounded-md pr-10 ${
                    formik.touched.hashPassword && formik.errors.hashPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formik.touched.hashPassword && formik.errors.hashPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.hashPassword}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 p-2 border rounded-md ${
                  formik.touched.gender && formik.errors.gender
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="">Select Gender</option>
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
                <option value={Gender.Others}>Others</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm">{formik.errors.gender}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition flex justify-center items-center ${formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {formik.isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              <>{COMMON_CONSTANTS.SIGN_UP}</>
            )}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate(ROUTE_PATHS.LOGIN)}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              Log in here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
