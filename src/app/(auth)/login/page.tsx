import LoginForm from "@/features/auth/components/login-form";
import { requireAuth } from "@/lib/auth-libs";

const Login = async() => {
  // await requireAuth()
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
