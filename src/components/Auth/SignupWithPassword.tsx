"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { signUp } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import InputGroup from "../shared/FormElements/InputGroup";

export default function SignupWithPassword() {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp.email();
      toast.success("Ro'yxatdan o'tish bu versiyada mavjud emas");
      router.push("/auth/sign-in");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Xatolik yuz berdi";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="text" label="Ism" className="mb-4 [&_input]:py-3.75"
        placeholder="Ismingizni kiriting" name="name"
        handleChange={handleChange} value={data.name}
      />
      <InputGroup
        type="email" label="Email" className="mb-4 [&_input]:py-3.75"
        placeholder="Email manzilingizni kiriting" name="email"
        handleChange={handleChange} value={data.email} icon={<EmailIcon />}
      />
      <InputGroup
        type="password" label="Parol" className="mb-5 [&_input]:py-3.75"
        placeholder="Parol yarating" name="password"
        handleChange={handleChange} value={data.password} icon={<PasswordIcon />}
      />
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <button
        type="submit" disabled={loading}
        className="hover:bg-opacity-90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
      >
        Ro'yxatdan o'tish
        {loading && <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />}
      </button>
    </form>
  );
}
