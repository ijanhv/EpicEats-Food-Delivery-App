import LoginForm from "@/components/forms/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className=" relative  h-screen items-center grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white  lg:flex"></div>

      <div className="mx-auto flex  flex-col justify-center space-y-6 w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login In to Your Account
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
