import React from "react";
import { useRef, useState } from "react";
import { signup, logout, useAuth } from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);
  async function handleSignUp() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("En az 6 karakterden oluşan bir şifre giriniz");
    }
    setLoading(false);
  }
  return (
    <div className="App">
      <div className="container">
        <div className="loginCard">
          <div className="card-container">
            <form className="loginArea">
              <div>
                <input
                  className="inputMail"
                  ref={emailRef}
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="inputPassword"
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                />
                <button
                  className="loginBtn"
                  disabled={loading || currentUser != null}
                  onClick={handleSignUp}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
