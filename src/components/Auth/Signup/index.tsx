import { Suspense } from "react";
import SignupWithPassword from "../SignupWithPassword";

export default function Signup() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupWithPassword />
    </Suspense>
  );
}
