import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Fingerprint,
  Calculator,
  RefreshCw,
  Sun,
  Moon,
  Unlock,
  Lock,
  Mail,
  Key,
  ChevronRight,
  Info,
  Scale,
  Thermometer,
  Wind,
  Check,
  Compass,
  AlertTriangle,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";

interface AuthGatewayProps {
  onAuthSuccess: () => void;
}

export default function AuthGateway({ onAuthSuccess }: AuthGatewayProps) {
  // Mode: "disguise" (Aeronimbus Unit Converter) or "vault" (Aegis Security Authentication)
  const [mode, setMode] = useState<"disguise" | "vault">("disguise");
  
  // Disguise State variables
  const [inputValue, setInputValue] = useState<string>("12");
  const [conversionType, setConversionType] = useState<"temp" | "wind" | "baro">("temp");
  const [convertedValue, setConvertedValue] = useState<string>("");
  const [disguiseTheme, setDisguiseTheme] = useState<"light" | "dark">("light");

  // Secure Auth State variables
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Biometric interaction state
  const [biometricScanning, setBiometricScanning] = useState<boolean>(false);
  const [biometricSuccess, setBiometricSuccess] = useState<boolean>(false);
  const [biometricProgress, setBiometricProgress] = useState<number>(0);

  // Hidden long-press or activation counters
  const [secretCounter, setSecretCounter] = useState<number>(0);
  const [secretAlert, setSecretAlert] = useState<string | null>(null);

  // Run conversion in disguise mode
  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setConvertedValue("---");
      return;
    }
    if (conversionType === "temp") {
      // Fahrenheit to Celsius
      const res = ((val - 32) * 5) / 9;
      setConvertedValue(`${res.toFixed(1)} °C`);
    } else if (conversionType === "wind") {
      // Knots to mph
      const res = val * 1.15078;
      setConvertedValue(`${res.toFixed(1)} mph`);
    } else if (conversionType === "baro") {
      // Inches of Mercury to hPa
      const res = val * 33.8639;
      setConvertedValue(`${res.toFixed(1)} hPa`);
    }
  }, [inputValue, conversionType]);

  // Handle calculator icon click for secret trigger
  const handleLogoClick = () => {
    setSecretCounter((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setMode("vault");
        triggerAlert("Secure Uplink Decrypted. Loading Aegis Security Matrix...");
        return 0;
      } else {
        triggerAlert(`Unit Calibration Stage ${next}/5 initialized...`);
        return next;
      }
    });
  };

  const triggerAlert = (msg: string) => {
    setSecretAlert(msg);
    setTimeout(() => setSecretAlert(null), 3000);
  };

  // Run simulated biometric fingerprint scan
  const handleBiometricStart = () => {
    if (biometricScanning || biometricSuccess) return;
    setBiometricScanning(true);
    setBiometricProgress(0);

    const interval = setInterval(() => {
      setBiometricProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBiometricSuccess(true);
          setBiometricScanning(false);
          setTimeout(() => {
            onAuthSuccess();
          }, 1000);
          return 100;
        }
        return prev + 4;
      });
    }, 80);
  };

  // Submit standard credentials form
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      triggerAlert("Please enter valid credentials to access the vault.");
      return;
    }
    setIsSubmitting(true);
    
    // Simulate tactical authorization check
    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess();
    }, 1500);
  };

  // Handle emergency backdoor passcode "911" in converter input
  const handleConverterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val === "911" || val === "777" || val.toLowerCase() === "vault") {
      setMode("vault");
      triggerAlert("Backdoor authenticated. Entering Secure Vault.");
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center font-sans p-4 transition-all duration-1000 relative overflow-hidden select-none ${
        mode === "disguise"
          ? disguiseTheme === "light"
            ? "bg-[#F7F9FC] text-slate-800"
            : "bg-[#0B0F19] text-slate-200"
          : "bg-[#050608] text-slate-200"
      }`}
    >
      {/* Dynamic Background Mesh Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          {mode === "disguise" ? (
            <motion.div
              key="disguise-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-emerald-100/30 to-teal-100/20 blur-3xl" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-purple-100/30 to-indigo-100/20 blur-3xl" />
            </motion.div>
          ) : (
            <motion.div
              key="vault-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-cyan-900/20 rounded-full blur-[130px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-teal-900/10 rounded-full blur-[130px]" />
              {/* Cyber Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle, #22d3ee 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECRETS / INLINE POPUP ALERTS */}
      <AnimatePresence>
        {secretAlert && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div
              className={`px-5 py-3 rounded-xl shadow-xl border backdrop-blur-lg flex items-center gap-3 text-xs font-mono tracking-wide ${
                mode === "disguise"
                  ? disguiseTheme === "light"
                    ? "bg-white/95 border-emerald-100 text-slate-800"
                    : "bg-slate-900/95 border-emerald-950 text-emerald-400"
                  : "bg-cyan-950/90 border-cyan-500/30 text-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
              }`}
            >
              <div className={`p-1 rounded ${mode === "disguise" ? "bg-emerald-500/10 text-emerald-500" : "bg-cyan-500/20 text-cyan-400"}`}>
                <Info className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <span>{secretAlert}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUTH CARD MATRIX */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="w-full max-w-md z-10"
      >
        <AnimatePresence mode="wait">
          {/* --- VIEW 1: THE DISGUISE (Aeronimbus Utility) --- */}
          {mode === "disguise" ? (
            <motion.div
              key="disguise-view"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl border p-8 transition-all duration-500 shadow-xl relative ${
                disguiseTheme === "light"
                  ? "bg-white/80 border-slate-200/50 backdrop-blur-md"
                  : "bg-slate-900/60 border-slate-800 backdrop-blur-xl"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleLogoClick}
                    className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-all"
                    title="Atmosphere Calibration Node (Hidden Trigger: tap 5 times)"
                  >
                    <Scale className="w-5 h-5 animate-pulse" />
                  </button>
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.15em] text-emerald-600 uppercase">
                      AeroNimbus
                    </h3>
                    <p className="text-[9px] opacity-50 font-mono">
                      UNIT_CONVERTER_v1.0.4
                    </p>
                  </div>
                </div>

                {/* Local theme toggle for disguise */}
                <button
                  onClick={() => setDisguiseTheme(disguiseTheme === "light" ? "dark" : "light")}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-500 transition-all"
                >
                  {disguiseTheme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
              </div>

              {/* Title & Help */}
              <div className="space-y-1 mb-6">
                <h2 className="text-xl font-display font-bold tracking-tight">
                  Atmospheric Converter
                </h2>
                <p className="text-xs opacity-60">
                  Translate real-time meteorological metrics across standardized scale indices.
                </p>
              </div>

              {/* Conversion selector tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-950/60 rounded-xl mb-6 border border-slate-200/40 dark:border-slate-800/40">
                <button
                  onClick={() => setConversionType("temp")}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    conversionType === "temp"
                      ? "bg-white dark:bg-slate-800 text-emerald-600 shadow-sm"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>Temp</span>
                </button>
                <button
                  onClick={() => setConversionType("wind")}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    conversionType === "wind"
                      ? "bg-white dark:bg-slate-800 text-emerald-600 shadow-sm"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Wind</span>
                </button>
                <button
                  onClick={() => setConversionType("baro")}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    conversionType === "baro"
                      ? "bg-white dark:bg-slate-800 text-emerald-600 shadow-sm"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Baro</span>
                </button>
              </div>

              {/* Converter inputs */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[10px] font-mono opacity-50 uppercase tracking-widest block mb-1.5">
                    {conversionType === "temp" && "Fahrenheit Input (e.g. enter 911 for bypass)"}
                    {conversionType === "wind" && "Knots Speed Input"}
                    {conversionType === "baro" && "Inches of Mercury (inHg)"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleConverterInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 outline-none focus:border-emerald-500 font-mono text-sm transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono opacity-40">
                      {conversionType === "temp" && "°F"}
                      {conversionType === "wind" && "kt"}
                      {conversionType === "baro" && "inHg"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center py-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200/50 dark:bg-slate-800 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 opacity-50 rotate-90" />
                  </div>
                </div>

                {/* Converted Output Display */}
                <div>
                  <label className="text-[10px] font-mono opacity-50 uppercase tracking-widest block mb-1.5">
                    Standardized Unit Output
                  </label>
                  <div className="px-4 py-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-emerald-50/20 dark:bg-emerald-950/10 font-mono font-bold text-emerald-600 text-base flex justify-between items-center">
                    <span>{convertedValue}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                      Converted
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Guide Info */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900 flex items-start gap-2.5 text-[11px] leading-normal opacity-70">
                <HelpCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <p>
                  Verify local sensor nodes alignment. Enter atmospheric metrics above. For custom system integration, contact the system coordinator.
                </p>
              </div>

              {/* Subtle clue to access the hidden vault */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-[10px] font-mono opacity-35">
                <span>RE-SYNCHRONIZATION ACTIVE</span>
                <button
                  onClick={() => setMode("vault")}
                  className="hover:underline flex items-center gap-0.5"
                >
                  <Lock className="w-2.5 h-2.5" />
                  <span>Tactical Vault</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* --- VIEW 2: THE REVEALED SECURE AUTH (Tactical JARVIS Vault) --- */
            <motion.div
              key="vault-view"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative"
            >
              {/* Top Navigation Row */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-cyan-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">
                      Aeon Safety
                    </h1>
                    <p className="text-[10px] text-slate-500 font-mono tracking-wider">
                      SECURE_VAULT_v4.2.0
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMode("disguise");
                    triggerAlert("Operational interface updated. Disguised mode successfully active.");
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-[11px] font-semibold text-slate-300"
                  title="Failsafe: return to disguise utility immediately"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
                  <span>Stealth Mode</span>
                </button>
              </div>

              {/* Title & Status */}
              <div className="space-y-1 mb-6">
                <div className="inline-flex items-center px-2.5 py-0.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse mr-1.5" />
                  <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
                    Aegis Secure Uplink
                  </span>
                </div>
                <h2 className="text-2xl font-light tracking-tight text-white leading-snug">
                  Authorize <span className="font-bold">Vault Access</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Authenticate your identity via AES credentials or direct hardware biometrics mapping.
                </p>
              </div>

              {/* Login/Signup Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    isLogin ? "bg-white/15 text-white shadow-sm" : "opacity-60 hover:opacity-100 text-slate-300"
                  }`}
                >
                  Secure Login
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    !isLogin ? "bg-white/15 text-white shadow-sm" : "opacity-60 hover:opacity-100 text-slate-300"
                  }`}
                >
                  Register Node
                </button>
              </div>

              {/* Interactive Credentials Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">
                    Authorized Agent Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="agent@safety-vault.org"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/5 transition-all font-mono"
                    />
                    <Mail className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">
                    Vault Passphrase
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/5 transition-all font-mono"
                    />
                    <Key className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Sign-in / Create Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-all mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Verifying Cryptographic Tokens...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 text-slate-950" />
                      <span>{isLogin ? "Authenticate Credentials" : "Initialize Agent Node"}</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* BIOMETRICS SCANNER DIVISION */}
              <div className="mt-6 pt-6 border-t border-white/15">
                <div className="text-center mb-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    OR SECURE SYSTEM BIOMETRICS
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="relative">
                    {/* Glowing outer progress ring */}
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        className="stroke-white/5"
                        strokeWidth="3.5"
                        fill="transparent"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        className="stroke-cyan-500 transition-all duration-100"
                        strokeWidth="3.5"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - biometricProgress / 100)}
                      />
                    </svg>

                    {/* Biometric trigger button */}
                    <button
                      type="button"
                      onMouseDown={handleBiometricStart}
                      onTouchStart={handleBiometricStart}
                      className={`absolute top-3 left-3 w-[72px] h-[72px] rounded-full border flex flex-col items-center justify-center transition-all ${
                        biometricSuccess
                          ? "bg-emerald-500 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] text-slate-950"
                          : biometricScanning
                          ? "bg-cyan-950/40 border-cyan-400 text-cyan-400 scale-95 shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                          : "bg-white/5 border-white/10 hover:border-cyan-500/40 text-cyan-400/80 hover:text-cyan-400"
                      }`}
                      title="Simulate Fingerprint Biometrics Mapping: Click and Hold"
                    >
                      {biometricSuccess ? (
                        <Check className="w-8 h-8 animate-bounce text-slate-950" />
                      ) : (
                        <Fingerprint className={`w-8 h-8 ${biometricScanning ? "animate-pulse" : ""}`} />
                      )}
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 tracking-wider mt-3">
                    {biometricSuccess
                      ? "BIOMETRICS OK. UPLINK SUCCESSFUL."
                      : biometricScanning
                      ? `MAPPING INDEX NODES... ${biometricProgress}%`
                      : "CLICK & HOLD FINGERPRINT TO MAP"}
                  </span>
                </div>
              </div>

              {/* Emergency silent exit trigger */}
              <div className="mt-6 flex justify-between items-center text-[9px] font-mono text-slate-500">
                <span>ENCRYPTED FEED ACTIVE</span>
                <span className="text-red-400 flex items-center gap-1.5 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>DURESS PASSCODE TRIGGER ENABLED</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
