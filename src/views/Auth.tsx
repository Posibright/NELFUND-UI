import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail, Lock, Phone, User, ArrowRight, Eye, EyeOff,
  CheckCircle2, AlertCircle, ChevronLeft, Loader2, KeyRound, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import nelfundLogo from "../assets/nelfund-logo.png";

type AuthMode = "login" | "register" | "otp" | "forgot" | "resetOtp";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "Uppercase letter (A–Z)", pass: /[A-Z]/.test(password) },
    { label: "Lowercase letter (a–z)", pass: /[a-z]/.test(password) },
    { label: "Number (0–9)", pass: /\d/.test(password) },
    { label: "Special character (!@#$...)", pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColors = ["", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-emerald-400", "bg-emerald-600"];

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= score ? strengthColors[score] : "bg-neutral-100"}`} />
        ))}
      </div>
      {password.length > 0 && (
        <div className="text-xs text-neutral-500">
          Strength: <span className="font-bold">{strengthLabels[score]}</span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c, i) => (
          <div key={i} className={`flex items-center gap-1.5 text-xs ${c.pass ? "text-emerald-600" : "text-neutral-400"}`}>
            {c.pass ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-neutral-300" />}
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function OtpInput({ value, onChange, length = 6 }: { value: string; onChange: (v: string) => void; length?: number }) {
  const digits = value.split("").slice(0, length);
  while (digits.length < length) digits.push("");

  function handleChange(idx: number, v: string) {
    if (!/^\d*$/.test(v)) return;
    const newDigits = [...digits];
    newDigits[idx] = v.slice(-1);
    onChange(newDigits.join(""));
    if (v && idx < length - 1) {
      const next = document.getElementById(`otp-${idx + 1}`);
      next?.focus();
    }
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      const prev = document.getElementById(`otp-${idx - 1}`);
      prev?.focus();
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          className={`w-12 h-14 text-center text-xl rounded-lg border-2 outline-none transition-all font-mono ${d ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-neutral-200 focus:border-emerald-400"
            }`}
        />
      ))}
    </div>
  );
}

const inputClass = "w-full h-11 px-4 rounded-lg border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all text-sm";

export function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Login
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  // Forgot
  const [forgotContact, setForgotContact] = useState("");

  const router = useRouter();

  // --- Handlers ---
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginId || !loginPassword) { toast.error("Please fill in all fields."); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back to NELFUND SKILL UP!");
      setTimeout(() => router.push("/"), 1200);
    }, 1500);
  }

  function validateRegister(): boolean {
    const errors: Record<string, string> = {};
    if (!regName) errors.name = "Full name is required.";
    if (!regEmail || !/\S+@\S+\.\S+/.test(regEmail)) errors.email = "Enter a valid email address.";
    if (!regPhone || regPhone.length < 11) errors.phone = "Enter a valid Nigerian phone number.";
    const pwChecks = [
      regPassword.length >= 8,
      /[A-Z]/.test(regPassword),
      /[a-z]/.test(regPassword),
      /\d/.test(regPassword),
      /[^A-Za-z0-9]/.test(regPassword),
    ];
    if (!pwChecks.every(Boolean)) errors.password = "Password does not meet the complexity requirements.";
    if (regPassword !== regConfirm) errors.confirm = "Passwords do not match.";
    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!validateRegister()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMode("otp");
      toast.info("OTP sent to your email and phone.");
    }, 1500);
  }

  function handleOtpVerify() {
    if (otp.length < 6) { setOtpError("Please enter the complete 6-digit OTP."); return; }
    setOtpError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account verified! You can now apply.");
      setTimeout(() => router.push("/apply"), 1200);
    }, 1500);
  }

  function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    if (!forgotContact) { toast.error("Please enter your email or phone number."); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMode("resetOtp");
      toast.info("OTP sent. Check your email or SMS.");
    }, 1500);
  }

  function handleResetOtp() {
    if (otp.length < 6) { setOtpError("Please enter the complete 6-digit OTP."); return; }
    setOtpError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password reset successfully. Please sign in.");
      setMode("login");
      setOtp("");
    }, 1500);
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-neutral-50">
      <div className="w-full max-w-5xl grid lg:grid-cols-5 bg-white rounded-2xl overflow-hidden shadow-xl border border-neutral-100">

        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-neutral-950 text-white lg:col-span-2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle cx="160" cy="40" r="80" fill="currentColor" />
              <circle cx="40" cy="160" r="60" fill="currentColor" />
            </svg>
          </div>

          <Link href="/" className="flex items-center gap-2 relative z-10">
            <img src={nelfundLogo.src} alt="NELFUND" className="w-9 h-9 object-contain rounded-lg bg-white p-0.5" />
            <div>
              <div className="text-base font-bold tracking-tight leading-none">NELFUND</div>
              <div className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase mt-0.5">SKILL UP</div>
            </div>
          </Link>

          <div className="relative z-10">
            <h2 className="text-3xl mb-5 leading-snug">
              {mode === "login" ? "Welcome Back" :
                mode === "register" ? "Create Your Account" :
                  mode === "otp" ? "Verify Your Identity" :
                    "Reset Your Password"}
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              {mode === "login"
                ? "Sign in to track your application status and receive notifications about your SKILL UP application."
                : mode === "register"
                  ? "Register to apply for vocational training. Nigerian citizens aged 18\u201345."
                  : mode === "otp"
                    ? "A 6-digit verification code has been sent to your registered email and phone number."
                    : "Enter the OTP sent to your contact to securely reset your password."}
            </p>
            <div className="space-y-3">
              {[
                { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, text: "Government-grade data encryption" },
                { icon: <KeyRound className="w-4 h-4 text-emerald-400" />, text: "NIN & BVN identity verification" },
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, text: "Real-time application tracking" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-neutral-600 relative z-10">
            © {new Date().getFullYear()} NELFUND Nigeria. A Federal Government Initiative.
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-8 lg:p-12 flex flex-col justify-center lg:col-span-3">
          <AnimatePresence mode="wait">
            {/* ---- LOGIN ---- */}
            {mode === "login" && (
              <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-8">
                  <h3 className="text-2xl text-neutral-900 mb-1">Sign In</h3>
                  <p className="text-neutral-500 text-sm">
                    New to NELFUND?{" "}
                    <button onClick={() => setMode("register")} className="text-emerald-700 font-bold hover:underline">Create an account</button>
                  </p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm text-neutral-700 flex items-center gap-2"><Mail className="w-4 h-4 text-neutral-400" />Email Address or Phone Number</label>
                    <input type="text" value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="you@example.com or 0800 000 0000" className={inputClass} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-neutral-700 flex items-center gap-2"><Lock className="w-4 h-4 text-neutral-400" />Password</label>
                      <button type="button" onClick={() => setMode("forgot")} className="text-xs text-emerald-700 font-bold hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="••••••••" className={`${inputClass} pr-11`} />
                      <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full h-11 bg-emerald-700 text-white rounded-lg font-bold text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 mt-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Sign In</>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ---- REGISTER ---- */}
            {mode === "register" && (
              <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-6">
                  <h3 className="text-2xl text-neutral-900 mb-1">Create Account</h3>
                  <p className="text-neutral-500 text-sm">
                    Already have an account?{" "}
                    <button onClick={() => setMode("login")} className="text-emerald-700 font-bold hover:underline">Sign in</button>
                  </p>
                </div>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm text-neutral-700 flex items-center gap-2"><User className="w-4 h-4 text-neutral-400" />Full Name</label>
                    <input value={regName} onChange={e => setRegName(e.target.value)} placeholder="Surname First Name" className={inputClass} />
                    {regErrors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{regErrors.name}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm text-neutral-700 flex items-center gap-2"><Mail className="w-4 h-4 text-neutral-400" />Email</label>
                      <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
                      {regErrors.email && <p className="text-xs text-red-500">{regErrors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm text-neutral-700 flex items-center gap-2"><Phone className="w-4 h-4 text-neutral-400" />Phone</label>
                      <input type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} placeholder="080 0000 0000" className={inputClass} />
                      {regErrors.phone && <p className="text-xs text-red-500">{regErrors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-neutral-700 flex items-center gap-2"><Lock className="w-4 h-4 text-neutral-400" />Password</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="Create a strong password" className={`${inputClass} pr-11`} />
                      <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {regPassword && <PasswordStrength password={regPassword} />}
                    {regErrors.password && <p className="text-xs text-red-500">{regErrors.password}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-neutral-700">Confirm Password</label>
                    <div className="relative">
                      <input type={showConfirm ? "text" : "password"} value={regConfirm} onChange={e => setRegConfirm(e.target.value)} placeholder="Re-enter password" className={`${inputClass} pr-11`} />
                      <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {regErrors.confirm && <p className="text-xs text-red-500">{regErrors.confirm}</p>}
                  </div>
                  <p className="text-xs text-neutral-400">By registering, you agree to NELFUND's <span className="text-emerald-700 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-emerald-700 cursor-pointer hover:underline">Privacy Policy</span>.</p>
                  <button type="submit" disabled={isLoading} className="w-full h-11 bg-emerald-700 text-white rounded-lg font-bold text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><User className="w-4 h-4" /> Create Account &amp; Send OTP</>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ---- OTP VERIFICATION ---- */}
            {mode === "otp" && (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setMode("register")} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 mb-6">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="w-8 h-8 text-emerald-700" />
                  </div>
                  <h3 className="text-2xl text-neutral-900 mb-2">Verify Your Account</h3>
                  <p className="text-neutral-500 text-sm max-w-sm mx-auto">
                    A 6-digit OTP has been sent to <strong>{regEmail || "your email"}</strong> and <strong>{regPhone || "your phone"}</strong>. Enter it below.
                  </p>
                </div>
                <div className="mb-6">
                  <OtpInput value={otp} onChange={v => { setOtp(v); setOtpError(""); }} />
                  {otpError && <p className="text-xs text-red-500 flex items-center justify-center gap-1 mt-3"><AlertCircle className="w-3 h-3" />{otpError}</p>}
                </div>
                <button onClick={handleOtpVerify} disabled={isLoading} className="w-full h-11 bg-emerald-700 text-white rounded-lg font-bold text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Verify & Continue</>}
                </button>
                <p className="text-center text-sm text-neutral-400 mt-4">
                  Didn't receive a code?{" "}
                  <button onClick={() => toast.info("OTP resent.")} className="text-emerald-700 font-bold hover:underline">Resend OTP</button>
                </p>
              </motion.div>
            )}

            {/* ---- FORGOT PASSWORD ---- */}
            {mode === "forgot" && (
              <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setMode("login")} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 mb-6">
                  <ChevronLeft className="w-4 h-4" /> Back to Sign In
                </button>
                <div className="mb-8">
                  <h3 className="text-2xl text-neutral-900 mb-1">Forgot Password</h3>
                  <p className="text-neutral-500 text-sm">Enter your registered email address or phone number. We'll send you a verification code.</p>
                </div>
                <form onSubmit={handleForgot} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm text-neutral-700">Email Address or Phone Number</label>
                    <input value={forgotContact} onChange={e => setForgotContact(e.target.value)} placeholder="you@example.com or 0800 000 0000" className={inputClass} />
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full h-11 bg-emerald-700 text-white rounded-lg font-bold text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Send Reset OTP</>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ---- RESET OTP ---- */}
            {mode === "resetOtp" && (
              <motion.div key="resetOtp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="mb-8 text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl text-neutral-900 mb-2">Enter Reset Code</h3>
                  <p className="text-neutral-500 text-sm max-w-sm mx-auto">
                    Enter the 6-digit code sent to <strong>{forgotContact}</strong>.
                  </p>
                </div>
                <div className="mb-6">
                  <OtpInput value={otp} onChange={v => { setOtp(v); setOtpError(""); }} />
                  {otpError && <p className="text-xs text-red-500 flex items-center justify-center gap-1 mt-3"><AlertCircle className="w-3 h-3" />{otpError}</p>}
                </div>
                <button onClick={handleResetOtp} disabled={isLoading} className="w-full h-11 bg-emerald-700 text-white rounded-lg font-bold text-sm hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Verify &amp; Reset Password</>}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
