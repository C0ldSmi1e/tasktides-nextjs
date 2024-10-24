"use client";
import { useState } from "react";
import { useAuthContext } from "@/contexts/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login({ password });
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form
      className="w-64 flex gap-2"
      onSubmit={onSubmit}
    >
      <input
        className="p-2 outline-none border-2 border-black rounded"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button className="p-2 rounded border-2 border-black">Login</button>
    </form>
  );
};

export default Login;