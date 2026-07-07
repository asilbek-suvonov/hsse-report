import { Suspense } from "react";
import SigninWithPassword from "../SigninWithPassword";

function SigninSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 rounded-lg bg-gray-200 dark:bg-dark-3" />
      <div className="h-12 rounded-lg bg-gray-200 dark:bg-dark-3" />
      <div className="h-10 rounded-lg bg-gray-200 dark:bg-dark-3" />
    </div>
  );
}

export default function Signin() {
  return (
    <Suspense fallback={<SigninSkeleton />}>
      <SigninWithPassword />
    </Suspense>
  );
}
