import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-sm shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
        <form>
          <InputField label="Name" type="text" placeholder="Your name" />
          <InputField label="Email" type="email" placeholder="you@example.com" />
          <InputField label="Password" type="password" placeholder="********" />
          <Button>Register</Button>
        </form>
        <p className="text-white/60 text-sm text-center mt-4">
          Already have an account? <a href="/login" className="text-[#3BACE2]">Login</a>
        </p>
      </div>
    </div>
  );
}
