"use client";
//this page will be used for mainly profile editing & stuffs
import SignupForm from "../_components/SignupForm";
import LoginForm from "../_components/LoginForm";
import { useState } from "react";

export default function userAuth() {

  const [newUser, setNewUser] = useState(false);

  function changeUser() {
    setNewUser(!newUser);
  }
  return (
    <div className="flex w-screen h-screen bg-white">
      <div className="w-1/2 p-4 flex flex-col justify-center items-center ">
        {newUser ? <SignupForm /> : <LoginForm />}

        {newUser ? (
          <div className="flex flex-row text-xs gap-4">
            <p>Already have an account?</p>
            <span className="text-blue-500 cursos-pointer" onClick={changeUser}>
              {" "}
              Log in
            </span>
          </div>
        ) : (
          <div className="flex flex-row text-xs gap-4">
            <p>New user?</p>
            <span className="text-blue-500 cursor-pointer" onClick={changeUser}>
              Sign Up
            </span>
          </div>
        )}
      </div>
      <div className="w-full scale-95">
        <div className=" w-full h-full bg-[url('/deliverypic.jpg')] bg-cover bg-no-repeat bg-center rounded-2xl"></div>
      </div>
    </div>
  );
}
//user aunthentication & user authorization are diff diggah

//user authentication is supposed to verify that the user it not a bot.
//user authorization is supposed to verify that the user is registered | unregistered.
