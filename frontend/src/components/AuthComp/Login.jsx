import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import lodash from "lodash";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate()
  const _ = lodash;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({});

  const { username, password } = formData;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const validationerror = {};
    if (username == "") {
      validationerror.username = "Required field cannot be empty";
    }

    let regexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,15}$/;

    if (password == "") {
      validationerror.password = "Password can't be empty";
    } else if (!regexPass.test(password)) {
      validationerror.password = "Password didn't met the expectation";
    }
    setError(validationerror);
    if (_.isEmpty(validationerror)) {
      let payload = formData;
      await axios
        .post("http://localhost:5000/api/login", payload,{withCredentials: true})
        .then((data) => {
          console.log("login successful", data);
          navigate("/")
        })
        .catch((err) => alert(err.response.data.error));
    }
  };

  return (
    <div className="w-full h-full flex align-middle justify-center">
      <form className="md:w-1/3 sm:w-1/2 lg:w-1/4 h-auto flex flex-col gap-3 border mt-8 shadow-lg rounded-md p-5 bg-gray-50">
        <legend className="font-extrabold text-3xl">Log In</legend>

        <section className="form-group">
          <label>Username</label>
          <div>
            <div className="error-feild">
              {error.username && (
                <p className="errordata text-red-600 text-xl">
                  *{error.username}
                </p>
              )}
            </div>
            <input
              className="inp"
              type="text"
              name="username"
              value={username}
              placeholder="Enter user Name"
              onChange={onChangeHandler}
            />
          </div>
        </section>
        <section className="form-group">
          <label>Password</label>
          <div>
            <div className="error-feild">
              {error.password && (
                <p className="errordata text-red-600 text-xl">
                  *{error.password}
                </p>
              )}
            </div>
            <input
              className="inp"
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChangeHandler}
            />
          </div>
        </section>
        <section className="form-group flex justify-around">
          <button className="btn btn-blue" onClick={sumbitHandler}>
            Login
          </button>
          <Link to="/signup">
            <button className="btn btn-white">Signup</button>
          </Link>
        </section>
      </form>
    </div>
  );
};

export default Login;
