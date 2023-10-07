"use client";
import { signIn, signOut } from "next-auth/react";

const SignInAndOutTest = () => {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => signIn()}>
        SignIn
      </button>
      <button className="btn btn-secondary" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default SignInAndOutTest;
