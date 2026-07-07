import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Leaf, X, ArrowLeft } from "lucide-react";
import { 
  signInWithGoogleClient, 
  signInWithEmailClient, 
  signUpWithEmailClient, 
  sendPasswordResetClient 
} from "../auth/firebaseClient"; 
import { ADMIN_ROUTES } from "../admin/routes";
import { STORE_ROUTES } from "../routes/storefrontRoutes";
import { LOGO_SRC } from "../constants/branding";
import { FONT_BODY, FONT_DISPLAY, G, PRIMARY, PRIMARY_DARK } from "../constants/theme";

type AuthMode = "login" | "signup" | "forgot";

export interface AuthPageProps {
  onAuthSuccess: () => void;
  onClose?: () => void;
  initialMode?: "login" | "signup";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Feature Flag: Check if Firebase is configured/active
const IS_FIREBASE_ACTIVE = !!import.meta.env.VITE_FIREBASE_API_KEY;

function fieldClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300",
    "placeholder:text-gray-400",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-[#246841] focus:ring-2 focus:ring-[#e8f3ed]",
  ].join(" ");
}

export function AuthPage({ onAuthSuccess, onClose, initialMode = "login" }: AuthPageProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const resetErrors = (...keys: string[]) => {
    setErrors(prev => {
      const next = { ...prev };
      keys.forEach(k => delete next[k]);
      return next;
    });
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (mode === "forgot") {
      if (!email.trim()) {
        next.email = "Email is required.";
      } else if (!EMAIL_RE.test(email.trim())) {
        next.email = "Enter a valid email address.";
      }
      setErrors(next);
      return Object.keys(next).length === 0;
    }

    if (mode === "signup" && fullName.trim().length < 2) {
      next.fullName = "Please enter your full name.";
    }
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    if (mode === "signup") {
      if (!confirmPassword) {
        next.confirmPassword = "Please confirm your password.";
      } else if (confirmPassword !== password) {
        next.confirmPassword = "Passwords do not match.";
      }
      if (!acceptTerms) {
        next.terms = "You must accept the Terms & Conditions.";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Roles are read from backend response attributes to process specific navigation routing
  const handleUserRouting = (userData: any, token: string) => {
  localStorage.setItem("matti_token", token);
  
  if (userData.is_staff === true || userData.is_superuser === true) {
    localStorage.setItem("is_maati_admin", "true");
    window.location.href = "/admin/dashboard";
  } else {
    // Normal user logic
    localStorage.setItem("maati_user_auth", "true");
    onAuthSuccess();
    navigate("/");
  }
};
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (mode === "forgot") {
        if (IS_FIREBASE_ACTIVE) {
          await sendPasswordResetClient(email.trim());
        } else {
          const response = await fetch("http://127.0.0.1:8000/api/auth/password-reset/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.trim() }),
          });
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Reset submission failed.");
          }
        }
        alert("If an account exists, reset instructions have been sent.");
        setMode("login");
      } 
      
      else if (mode === "signup") {
        if (IS_FIREBASE_ACTIVE) {
          const idToken = await signUpWithEmailClient(email.trim(), password);
          const response = await fetch("http://127.0.0.1:8000/api/auth/sync/", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` },
            body: JSON.stringify({ first_name: fullName })
          });
          if (!response.ok) throw new Error("Firebase-Django Sync failed.");
          const userData = await response.json();
          handleUserRouting(userData, idToken);
        } else {
          // Connected to your Local Django Register API
          const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.trim(), password, first_name: fullName })
          });
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Registration failed.");
          }
          const userData = await response.json();
          handleUserRouting(userData, userData.token); 
        }
      } 
      
      else if (mode === "login") {
        if (IS_FIREBASE_ACTIVE) {
          const idToken = await signInWithEmailClient(email.trim(), password);
          const response = await fetch("http://127.0.0.1:8000/api/auth/sync/", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` }
          });
          if (!response.ok) throw new Error("Firebase-Django Session Sync failed.");
          const userData = await response.json();
          handleUserRouting(userData, idToken);
        } else {
          // Connected to your Local Django Login API (Handles standard user + admin accounts)
          const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.trim(), password })
          });
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Invalid credentials.");
          }
          const userData = await response.json();
          handleUserRouting(userData, userData.token);
        }
      }
    } catch (err) {
      setErrors({ email: err instanceof Error ? err.message : "Authentication process failed." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!IS_FIREBASE_ACTIVE) return;
    setSubmitting(true);
    try {
      const idToken = await signInWithGoogleClient();
      const response = await fetch("http://127.0.0.1:8000/api/auth/sync/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` }
      });
      if (!response.ok) throw new Error("Google sync setup broken.");
      const userData = await response.json();
      handleUserRouting(userData, idToken);
    } catch (err) {
      setErrors({ email: err instanceof Error ? err.message : "Google authentication failed." });
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setErrors({});
    setPassword("");
    setConfirmPassword("");
    //if (next === "login") navigate(STORE_ROUTES.login || "/login");
    //else if (next === "signup") navigate(STORE_ROUTES.signup || "/signup");
  };

  return (
    <div
      className="relative flex min-h-full w-full flex-col overflow-hidden bg-white lg:min-h-0 lg:flex-row lg:rounded-2xl lg:shadow-2xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-heading"
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:text-gray-800 lg:right-4 lg:top-4"
        >
          <X size={18} />
        </button>
      )}

      {/* Brand panel */}
      <aside
        className="relative flex shrink-0 flex-col items-center justify-center overflow-hidden px-6 py-12 text-center sm:px-8 lg:w-1/2 lg:min-h-[680px] lg:px-12 lg:py-16"
        style={{
          background: `linear-gradient(145deg, ${PRIMARY_DARK} 0%, ${PRIMARY} 55%, ${G[400]} 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(0,0,0,0.2) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 16px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center max-w-sm">
          <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-white p-5 shadow-2xl ring-4 ring-white/10 sm:h-36 sm:w-36 lg:mb-8 lg:h-40 lg:w-40">
            <img 
              src={LOGO_SRC} 
              alt="Maati Tatva Logo" 
              className="h-full w-full object-contain" 
            />
          </div>

          <p 
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80" 
            style={{ fontFamily: FONT_BODY }}
          >
            Organic · Pure · Trusted
          </p>
          
          <h2
            id="auth-heading"
            className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            Maati Tatva
          </h2>
          
          <p className="mt-1 text-sm font-medium text-white/90" style={{ fontFamily: FONT_BODY }}>
            Agro & Wellness
          </p>
          
          <p className="mt-4 text-sm leading-relaxed text-white/75 lg:mt-6 lg:text-base">
            Sourcing 99.99% pure organic wellness directly from the rich soils of sustainable farmer networks.
          </p>
        </div>

        <div className="relative z-10 mt-10 hidden items-center gap-2 text-white/70 lg:flex">
          <Leaf size={14} className="animate-pulse" />
          <p className="text-xs font-semibold" style={{ fontFamily: FONT_BODY }}>
            6,000+ Verified Farmer Partners
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <div className="flex flex-1 flex-col justify-center px-5 py-10 sm:px-10 lg:w-1/2 lg:px-12 lg:py-14">
        <div className="mx-auto w-full max-w-md">
          
          <div className="mb-6 sm:mb-8">
            {mode === "forgot" ? (
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="group mb-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 transition-colors duration-300 hover:text-gray-900"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                Back to Sign In
              </button>
            ) : (
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400" style={{ fontFamily: FONT_BODY }}>
                {mode === "login" ? "Welcome back" : "Create account"}
              </p>
            )}
            
            <h3 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl" style={{ fontFamily: FONT_DISPLAY }}>
              {mode === "login" && "Sign in to continue"}
              {mode === "signup" && "Join Maati Tatva"}
              {mode === "forgot" && "Recover Password"}
            </h3>
            
            <p className="mt-2 text-sm text-gray-500">
              {mode === "login" && "Access your cart, orders, and organic updates."}
              {mode === "signup" && "Create an account to complete purchases and earn farmer points."}
              {mode === "forgot" && "Confirm your registered email below to receive instructions."}
            </p>
          </div>

          {mode !== "forgot" && (
            <div
              className="mb-6 flex rounded-full border p-1"
              style={{ borderColor: G[200], background: G[50] }}
              role="tablist"
              aria-label="Authentication mode"
            >
              {(["login", "signup"] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={mode === tab}
                  onClick={() => switchMode(tab)}
                  className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all duration-300 ${
                    mode === tab ? "text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={mode === tab ? { background: PRIMARY } : undefined}
                >
                  {tab === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>
          )}

          {/* Google login handling */}
          {mode !== "forgot" && (
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={submitting || !IS_FIREBASE_ACTIVE}
                className={`flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 active:scale-[0.99] ${
                  !IS_FIREBASE_ACTIVE ? 'opacity-60 bg-gray-50/50 cursor-not-allowed text-gray-400' : 'hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <svg className={`mr-3 h-5 w-5 ${!IS_FIREBASE_ACTIVE ? 'grayscale opacity-50' : ''}`} viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.102C18.29 1.845 15.424 1 12.24 1 6.01 1 1 5.925 1 12s5.01 11 11.24 11c6.5 0 10.82-4.503 10.82-11 0-.74-.08-1.3-.176-1.715H12.24z"
                  />
                </svg>
                {mode === "login" 
                  ? `Continue with Google ${!IS_FIREBASE_ACTIVE ? "(Coming Soon)" : ""}`
                  : `Sign up with Google ${!IS_FIREBASE_ACTIVE ? "(Coming Soon)" : ""}`
                }
              </button>

              <div className="relative mt-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative bg-white px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Or use your email
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {mode === "signup" && (
              <div>
                <label htmlFor="auth-fullname" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  id="auth-fullname"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={e => { setFullName(e.target.value); resetErrors("fullName"); }}
                  className={fieldClass(!!errors.fullName)}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => { setEmail(e.target.value); resetErrors("email"); }}
                className={fieldClass(!!errors.email)}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {mode !== "forgot" && (
              <div>
                <label htmlFor="auth-password" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); resetErrors("password"); }}
                    className={`${fieldClass(!!errors.password)} pr-12`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 transition-colors hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label htmlFor="auth-confirm" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="auth-confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); resetErrors("confirmPassword"); }}
                    className={`${fieldClass(!!errors.confirmPassword)} pr-12`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 transition-colors hover:text-gray-600"
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            )}

            {mode === "login" && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 transition-colors"
                    style={{ accentColor: PRIMARY }}
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => switchMode("forgot")}
                  className="text-sm font-semibold transition-colors duration-300 hover:underline"
                  style={{ color: PRIMARY }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={e => { setAcceptTerms(e.target.checked); resetErrors("terms"); }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300"
                    style={{ accentColor: PRIMARY }}
                  />
                  <span>
                    I agree to the{" "}
                    <button type="button" className="font-semibold hover:underline" style={{ color: PRIMARY }}>
                      Terms & Conditions
                    </button>{" "}
                    and Privacy Policy.
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:opacity-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: PRIMARY, boxShadow: "0 4px 14px rgba(36,104,65,0.35)" }}
            >
              {submitting ? "Please wait…" : 
                mode === "login" ? "Sign In" : 
                mode === "signup" ? "Create Account" : "Send Recovery Link"
              }
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === "login" && (
              <>
                New to Maati Tatva?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-bold transition-colors duration-300 hover:underline"
                  style={{ color: PRIMARY }}
                >
                  Create an account
                </button>
              </>
            )}
            {mode === "signup" && (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-bold transition-colors duration-300 hover:underline"
                  style={{ color: PRIMARY }}
                >
                  Sign in instead
                </button>
              </>
            )}
            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="font-bold transition-colors duration-300 hover:underline"
                style={{ color: PRIMARY }}
              >
                Back to Sign In
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default AuthPage;