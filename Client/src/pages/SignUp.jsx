import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function SignUp() {
  const inputs = [
    {
      id: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      id: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

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
            Explore this demo blog project and you can sign in via Google or
            with e-mail and password.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            {inputs.map((input) => (
              <Input
                key={input.id}
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
              />
            ))}

            <Button
              gradientDuoTone="purpleToBlue"
              className="w-1/2 self-center"
              type="submit"
            >
              Sign Up
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const Input = ({ id, type, placeholder }) => (
  <div>
    <Label value={placeholder} />
    <TextInput type={type} placeholder={placeholder} id={id} />
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SignUp;
