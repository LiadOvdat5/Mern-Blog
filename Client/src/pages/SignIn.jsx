import { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Keep track of the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password)
      return dispatch(signInFailure("Please fill in all fields"));

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // If the request was not successful, dispatch the error message
      if (data.success === false) return dispatch(signInFailure(data.message));

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500
             via-purple-500 to-pink-500 rounded-lg text-white"
            >
              {" "}
              Liad&apos;s{" "}
            </span>
            Blog
          </Link>
          <p className="text=sm my-5">
            Sign In to access your account and start writing your blog posts.
          </p>
          <p className="text=sm my-5">
            You can use your email and password to sign in or use your Google
            account.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToBlue"
              className="w-1/2 self-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
