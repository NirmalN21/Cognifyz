import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import PasswordStrengthBar from "react-password-strength-bar";
import signup from "../assets/signup-image.jpg";
import "../styles/register.css"
import InputField from "./InputField";

const Register = () => {

  const Navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileNumberRegex = /^\d{10}$/;

  const [user, setUser] = useState({ name: "", email: "", phone: "", registration: "", room: "", password: "", cpassword: "", });

  const [error, setError] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const onType = () => {
    setError("");
  };

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (event) => {
    event.preventDefault();

    if (!user.name || !user.email || !user.phone || !user.registration || !user.room || !user.password || !user.cpassword) {
      window.alert("Fill all the fields");
    } else {
      if (user.password !== user.cpassword) {
        setError("Passwords didn't match");
        setUser({ ...user, password: "", cpassword: "" });
      } else if (!emailRegex.test(user.email)) {
        setError("Invalid Email!");
      } else if (!mobileNumberRegex.test(user.phone)) {
        setError("Invalid Mobile No.!");
      } else if (user.password.length < 8) {
        setError("Password should contain at least 8 characters");
      }
      else {
        Navigate("/login");
        setUser({ name: "", email: "", phone: "", registration: "", room: "", password: "", cpassword: "", });
        window.alert("User Registered Successfully");
      }
    }
  };


  return (
    <>
      <section className="container-main">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <form method="" className="register-form" id="register-form">

                <InputField htmlFor="name" className="zmdi zmdi-account material-icons-name" type="text" name="name" id="name"
                  value={user.name}
                  onChange={handleInput}
                  placeholder="Your Name"
                  onType={onType}
                />

                <InputField htmlFor="email" className="zmdi zmdi-email material-icons-name" type="email" name="email" id="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="College Email"
                  onType={onType}
                />

                <InputField htmlFor="phone" className="zmdi zmdi-phone material-icons-name" type="tel" name="phone" id="phone"
                  value={user.phone}
                  onChange={handleInput}
                  placeholder="Phone No."
                  onType={onType}
                />

                <InputField htmlFor="registration" className="zmdi zmdi-assignment-account material-icons-name" type="number" name="registration" id="registration"
                  value={user.registration}
                  onChange={handleInput}
                  placeholder="Registration No."
                  onType={onType}
                />

                <InputField htmlFor="room" className="zmdi zmdi-hotel material-icons-name" type="text" name="room" id="room"
                  value={user.room}
                  onChange={handleInput}
                  placeholder="Room No."
                  onType={onType}
                />

                <div className="form-group">

                  <label htmlFor="pass"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                  <input type={showPassword1 ? "text" : "password"} name="password" id="pass" autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Password"
                    onClick={onType}
                  />

                  <div className="eye-div" onClick={() => setShowPassword1(!showPassword1)}>
                    {showPassword1 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                  </div>

                </div>

                <div className="password-strength"><PasswordStrengthBar password={user.password} /></div>

                <div className="form-group">

                  <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline material-icons-name"></i></label>
                  <input type={showPassword2 ? "text" : "password"} name="cpassword" id="re_pass" autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInput}
                    placeholder="Confirm password"
                    onClick={onType}
                  />

                  <div className="eye-div" onClick={() => setShowPassword2(!showPassword2)}>
                    {showPassword2 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                  </div>

                </div>

                <span className="form-error" style={{ display: error ? "block" : "none" }}>{error}</span>

                {user.name && user.email && user.phone && user.registration && user.room && user.password && user.cpassword ? (
                  <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup"
                      className="form-submit"
                      value="Register"
                      onClick={postData}
                    />
                  </div>
                ) : (
                  <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup"
                      className="form-not-submit"
                      value="Fill the form"
                      onClick={postData}
                    />
                  </div>
                )}
              </form>
            </div>

            <div className="signup-image">
              <figure><img src={signup} alt="img" /></figure>
              <div className="below-image">
                <span className="new-here">Already member?</span>
                <NavLink to="/dummy" className="signup-image-link">Login here</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
