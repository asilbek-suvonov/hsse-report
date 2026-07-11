import { Suspense } from "react";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <Suspense fallback={null}>
      <SigninWithPassword />
    </Suspense> 
  );
} 