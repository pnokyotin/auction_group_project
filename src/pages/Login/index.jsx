import InputField from "../components/InputField";
import Button from "../components/button/Button_L&R";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-sm shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form>
          <InputField label="Email" type="email" placeholder="you@example.com" />
          <InputField label="Password" type="password" placeholder="********" />
          <Button>Login</Button>
        </form>
        <p className="text-white/60 text-sm text-center mt-4">
          Don't have an account? <a href="/register" className="text-[#FF56F6]">Register</a>
        </p>
      </div>
    </div>
  );
}
