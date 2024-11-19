import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { LogIn } from "lucide-react";

export default function Signin() {
  const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div className=" flex min-h-screen items-center justify-center bg-gradient-to-br  px-4">
      <div className="p-6 sm:p-8 w-full max-w-md ">
        <div className="text-center mb-8">
          <LogIn className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            size="large"
            theme="filled_black"
            shape="rectangular"
            width="300"
            logo_alignment="left"
            useOneTap
          />
        </div>
      </div>
    </div>
  );
}