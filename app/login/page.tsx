import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="my-10">
        <LoginForm />
      </div>
    </main>
  );
}
