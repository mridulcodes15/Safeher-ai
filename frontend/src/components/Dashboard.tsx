import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun,
  Moon,
  RefreshCw,
  Calculator,
  AlertTriangle,
  Lock,
  Unlock,
  CloudRain,
  Wind,
  Thermometer,
  Compass,
  Cpu,
  Wifi,
  Shield,
  Activity,
  FileText,
  MapPin,
  Eye,
  EyeOff,
  Send,
  Volume2,
  Trash2,
  Download,
  CheckCircle2,
  FolderOpen,
  Upload,
  X,
  Database,
  AlertOctagon,
  Search,
  Globe,
  Plus,
  Users,
  Check,
  FileArchive,
  Binary
} from "lucide-react";

// Types for Vault Logs and Weather
interface VaultLog {
  id: string;
  name: string;
  size: string;
  date: string;
  type: string;
  hash: string;
  secured: boolean;
}

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  barometer: number;
  wind: string;
  aqi: number;
  uv: string;
}

const mockWeatherDatabase: Record<string, WeatherData> = {
  london: { city: "London", temp: 58, condition: "Light Drizzle", humidity: 82, barometer: 1011, wind: "12 mph NW", aqi: 24, uv: "Low" },
  tokyo: { city: "Tokyo", temp: 76, condition: "Clear Sky", humidity: 55, barometer: 1015, wind: "5 mph E", aqi: 35, uv: "Very High" },
  "new york": { city: "New York", temp: 72, condition: "Partly Cloudy", humidity: 62, barometer: 1013, wind: "8 mph S", aqi: 42, uv: "Moderate" },
  paris: { city: "Paris", temp: 65, condition: "Mild Breezes", humidity: 70, barometer: 1012, wind: "6 mph WSW", aqi: 28, uv: "Moderate" },
  sydney: { city: "Sydney", temp: 61, condition: "Overcast", humidity: 78, barometer: 1009, wind: "15 mph S", aqi: 18, uv: "Low" },
};

interface DashboardProps {
  onLock?: () => void;
  onNavigateToGuardian?: () => void;
}

export default function Dashboard({ onLock, onNavigateToGuardian }: DashboardProps) {
  // Theme state: "light" = The Disguise (Weather App), "dark" = The Vault (JARVIS Security)
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Exit Panic Notification state
  const [panicActive, setPanicActive] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // --- STATE 1: DISGUISE (WEATHER & UTILITY) STATE ---
  const [weatherSearch, setWeatherSearch] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherDatabase["new york"]);
  const [cleaningActive, setCleaningActive] = useState(false);
  const [cleaningProgress, setCleaningProgress] = useState(0);
  const [calibratingSensors, setCalibratingSensors] = useState(false);

  // --- STATE 2: VAULT (SECURITY/TACTICAL) STATE ---
  // SOS State
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [sosBroadcastActive, setSosBroadcastActive] = useState(false);
  const [audioRecording, setAudioRecording] = useState(false);
  
  // AI Incident Report State
  const [incidentText, setIncidentText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    threatLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    directives: string[];
    classification: string;
    checksum: string;
  } | null>(null);

  // Encrypted Vault State
  const [vaultLogs, setVaultLogs] = useState<VaultLog[]>([
    {
      id: "log-1",
      name: "Audio_Log_20260712_0915.enc",
      size: "4.2 MB",
      date: "2026-07-12 09:15",
      type: "audio/wav",
      hash: "8f9a2e1d7c3b4a5f6e7d8c9b0a1f2e3d",
      secured: true,
    },
    {
      id: "log-2",
      name: "Secure_Photo_Doc_49.enc",
      size: "1.8 MB",
      date: "2026-07-11 18:43",
      type: "image/jpeg",
      hash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      secured: true,
    },
  ]);
  const [isEncryptingFile, setIsEncryptingFile] = useState(false);
  const [encryptProgress, setEncryptProgress] = useState(0);
  const [customFileText, setCustomFileText] = useState("");
  const [customFileName, setCustomFileName] = useState("");
  const [vaultUnlocked, setVaultUnlocked] = useState(true);

  // Evidence Export State
  const [selectedLogIds, setSelectedLogIds] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<"gpg" | "zip" | "bin">("gpg");
  const [exportDestination, setExportDestination] = useState<"download" | "guardian" | "mirror">("download");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStep, setExportStep] = useState(0);
  const [exportCompiledFile, setExportCompiledFile] = useState<{ name: string; content: string } | null>(null);

  // Compile / Package Staged Evidence logs
  const handleCompileExport = () => {
    if (selectedLogIds.length === 0) {
      triggerToast("Please select at least one log file to export.");
      return;
    }
    setIsExporting(true);
    setExportProgress(0);
    setExportStep(0);
    setExportCompiledFile(null);

    const totalDuration = 3000; // 3 seconds total
    const intervalTime = 100;
    const progressStep = 100 / (totalDuration / intervalTime);

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        const next = Math.min(prev + progressStep, 100);
        if (next >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportStep(3); // Complete
          
          // Generate a real dynamic download blob file structure
          const selectedLogs = vaultLogs.filter(log => selectedLogIds.includes(log.id));
          const logsSummaryText = selectedLogs.map(log => 
            `ID: ${log.id}\nNAME: ${log.name}\nSIZE: ${log.size}\nDATE: ${log.date}\nTYPE: ${log.type}\nHASH: ${log.hash}\n-----------------------------------\n`
          ).join("");
          
          const header = theme === "light"
            ? `=== AERONIMBUS METEOROLOGICAL REPORT PACKAGE ===\nGenerated: ${new Date().toISOString()}\nTarget Relay: ${exportDestination === "download" ? "Local Drive Cache" : exportDestination === "guardian" ? "Secondary Meteorological Backup Registry" : "Atmospheric Relay Mirror"}\nFormat Type: .${exportFormat === "gpg" ? "csv" : exportFormat === "zip" ? "json" : "xml"}\n\n`
            : `=== AEGIS SECURITY INTRUSION EVIDENCE PACKAGE ===\nCLASSIFICATION: SECURITY-LEVEL-MAXIMUM\nGenerated: ${new Date().toISOString()}\nExport Proxy Node: ${exportDestination === "download" ? "Tactical Download Gateway" : exportDestination === "guardian" ? "Direct Guardian Node Uplink" : "Direct Public Mirror"}\nEncrypted Cryptographic Wrapper: AES-256 .${exportFormat === "gpg" ? "tar.gpg" : exportFormat === "zip" ? "zip" : "bin"}\n\n`;

          const completeContent = header + logsSummaryText;
          const fileName = theme === "light"
            ? `aeronimbus_weather_report_${Date.now()}.${exportFormat === "gpg" ? "csv" : exportFormat === "zip" ? "json" : "xml"}`
            : `aegis_secure_export_${Date.now()}.${exportFormat === "gpg" ? "tar.gpg" : exportFormat === "zip" ? "zip" : "bin"}`;

          setExportCompiledFile({ name: fileName, content: completeContent });
          return 100;
        }

        // Adjust exportSteps based on progress
        if (next >= 66) {
          setExportStep(2); // Wrapping / final pack
        } else if (next >= 33) {
          setExportStep(1); // Reading / compiling bytes
        }
        return next;
      });
    }, intervalTime);
  };

  // Trigger a real browser file download using a Blob
  const triggerExportDownload = () => {
    if (!exportCompiledFile) return;
    const blob = new Blob([exportCompiledFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportCompiledFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast(theme === "light" ? `Downloaded report: ${exportCompiledFile.name}` : `Downloaded encrypted package: ${exportCompiledFile.name}`);
  };

  const toggleSelectLog = (id: string) => {
    setSelectedLogIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAllLogs = () => {
    if (selectedLogIds.length === vaultLogs.length) {
      setSelectedLogIds([]);
    } else {
      setSelectedLogIds(vaultLogs.map(log => log.id));
    }
  };

  // Live Location State
  const [lat, setLat] = useState(40.7128);
  const [lng, setLng] = useState(-74.0060);
  const [gpsPrecision, setGpsPrecision] = useState(99.8);
  const [broadcastInterval, setBroadcastInterval] = useState<NodeJS.Timeout | null>(null);
  const [satelliteCount, setSatelliteCount] = useState(12);

  // Mouse tilt effect for 3D Spline Placeholder
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom secret code entry
  const [secretCode, setSecretCode] = useState("");

  // Trigger quick toast notification
  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Weather Search Handler
  const handleWeatherSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = weatherSearch.toLowerCase().trim();
    if (mockWeatherDatabase[query]) {
      setWeatherData(mockWeatherDatabase[query]);
      triggerToast(`Loaded atmospheric telemetry for ${mockWeatherDatabase[query].city}`);
    } else if (query) {
      // Generate randomized realistic weather for other queries
      const customWeather: WeatherData = {
        city: weatherSearch.charAt(0).toUpperCase() + weatherSearch.slice(1),
        temp: Math.floor(Math.random() * 40) + 45,
        condition: ["Overcast", "Windy", "Scattered Showers", "Clear Sky", "Mist"][Math.floor(Math.random() * 5)],
        humidity: Math.floor(Math.random() * 40) + 50,
        barometer: Math.floor(Math.random() * 20) + 1000,
        wind: `${Math.floor(Math.random() * 18) + 2} mph ${["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)]}`,
        aqi: Math.floor(Math.random() * 80) + 15,
        uv: ["Low", "Moderate", "High", "Very High"][Math.floor(Math.random() * 4)],
      };
      setWeatherData(customWeather);
      triggerToast(`Generated fresh local sensors for ${customWeather.city}`);
    }
    setWeatherSearch("");
  };

  // RAM Boost simulator for Light Mode
  const startRamCleanup = () => {
    if (cleaningActive) return;
    setCleaningActive(true);
    setCleaningProgress(0);
    const interval = setInterval(() => {
      setCleaningProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCleaningActive(false);
            triggerToast("Memory optimized! Freed 1.84 GB of local application cache.");
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Sensor Calibration simulator for Light Mode
  const triggerSensorCalibration = () => {
    setCalibratingSensors(true);
    setTimeout(() => {
      setCalibratingSensors(false);
      triggerToast("UV & Barometric indices successfully aligned with regional relays.");
    }, 2000);
  };

  // SOS Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosCountdown !== null) {
      if (sosCountdown > 0) {
        timer = setTimeout(() => setSosCountdown(sosCountdown - 1), 1000);
      } else {
        setSosCountdown(null);
        setSosActive(true);
        setSosBroadcastActive(true);
        setAudioRecording(true);
        triggerToast("SOS PROTOCOL BROADCASTING. SECURE UPLINK ESTABLISHED.");
      }
    }
    return () => clearTimeout(timer);
  }, [sosCountdown]);

  // Telemetry Location Drift simulator for State 2
  useEffect(() => {
    const drift = setInterval(() => {
      if (theme === "dark") {
        setLat((prev) => prev + (Math.random() - 0.5) * 0.0001);
        setLng((prev) => prev + (Math.random() - 0.5) * 0.0001);
        setGpsPrecision(() => Number((99.5 + Math.random() * 0.4).toFixed(2)));
        setSatelliteCount(() => Math.floor(Math.random() * 5) + 10);
      }
    }, 3000);
    return () => clearInterval(drift);
  }, [theme]);

  // Handle Quick Exit (Calculator/Refresh icon)
  const handleQuickExit = () => {
    // Instantly hide the secure vault and revert to disguise (Light mode)
    setTheme("light");
    setPanicActive(true);
    setSosCountdown(null);
    setSosActive(false);
    setSosBroadcastActive(false);
    setAudioRecording(false);
    setIsAnalyzing(false);
    
    // Trigger update notification
    triggerToast("System updated: Satellite feed synchronized.");
    setTimeout(() => {
      setPanicActive(false);
      if (onLock) {
        onLock();
      }
    }, 600);
  };

  // Analyze Threat Logic (Local simulator using key phrases)
  const handleThreatAnalysis = () => {
    if (!incidentText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      const text = incidentText.toLowerCase();
      let threat: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW";
      let directives: string[] = [
        "Record and log all surrounding data.",
        "Ensure app state remains masked under standard utility theme."
      ];
      let classification = "Standard Security Notice";

      if (text.includes("follow") || text.includes("stalk") || text.includes("car") || text.includes("vehicle")) {
        threat = "HIGH";
        classification = "Active Surveillance Target";
        directives = [
          "Move immediately to a high-foot-traffic public sanctuary (mall, store).",
          "Activate GPS location beacon and broadcast raw live feed.",
          "Avoid remote routes and isolated side-alleys.",
          "Establish contact with a secondary contact immediately."
        ];
      } else if (text.includes("hacked") || text.includes("password") || text.includes("compromise") || text.includes("cyber")) {
        threat = "MEDIUM";
        classification = "Digital Asset Integrity Breach";
        directives = [
          "De-synchronize local vault from cloud mirrors.",
          "Use the 'Quick Exit' trigger if your device is physically inspected.",
          "Initiate rotation of offline master keys.",
          "Enforce cold-storage state immediately."
        ];
      } else if (text.includes("weapon") || text.includes("danger") || text.includes("break") || text.includes("threat") || text.includes("police")) {
        threat = "CRITICAL";
        classification = "High-Threat Imminent Hazard";
        directives = [
          "Seek visual/physical cover immediately.",
          "Initiate raw audio recording session immediately (SOS Activated).",
          "Transmit silent coordinates packet to emergency webhook node.",
          "Prepare to trigger emergency exit swipe."
        ];
      }

      setAnalysisResult({
        threatLevel: threat,
        directives,
        classification,
        checksum: "SHA256-" + Math.random().toString(36).substring(2, 10).toUpperCase() + Math.random().toString(36).substring(2, 10).toUpperCase(),
      });
      setIsAnalyzing(false);
      triggerToast(`AI Threat Analysis Completed: ${threat} threat detected.`);
    }, 1500);
  };

  // File encryption simulator
  const handleFileEncryption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFileName) return;
    setIsEncryptingFile(true);
    setEncryptProgress(0);

    const interval = setInterval(() => {
      setEncryptProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newFile: VaultLog = {
              id: "log-" + Date.now(),
              name: customFileName.endsWith(".enc") ? customFileName : `${customFileName}.enc`,
              size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
              date: new Date().toISOString().replace("T", " ").substring(0, 16),
              type: "text/plain",
              hash: Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18),
              secured: true,
            };
            setVaultLogs([newFile, ...vaultLogs]);
            setIsEncryptingFile(false);
            setCustomFileName("");
            setCustomFileText("");
            triggerToast("Document encrypted with military-grade AES-256 and stored in secure memory.");
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  // Delete log from vault
  const deleteLog = (id: string) => {
    setVaultLogs(vaultLogs.filter((log) => log.id !== id));
    triggerToast("Item safely shredded from local hardware cache.");
  };

  // Secret passcode trigger to dark mode
  const handleSecretCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSecretCode(val);
    if (val === "911" || val === "777" || val.toLowerCase() === "vault") {
      setTheme("dark");
      setSecretCode("");
      triggerToast("Access Granted. Aegis Secure Tactical Environment Initialized.");
    }
  };

  // Handle 3D Tilt Effect on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      id="dashboard-root"
      className={`min-h-screen font-sans transition-colors duration-1000 relative overflow-hidden select-none pb-12 ${
        theme === "light"
          ? "bg-[#F7F9FC] text-slate-800"
          : "bg-[#050608] text-slate-200"
      }`}
    >
      {/* Dynamic Background Mesh Gradients / Decorative Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {theme === "light" ? (
          <>
            {/* Safe atmosphere gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-emerald-100/30 to-purple-100/20 blur-3xl" />
            <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-purple-100/30 to-indigo-100/20 blur-3xl" />
            <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-50/40 blur-3xl" />
          </>
        ) : (
          <>
            {/* Decorative Background Glows from Frosted Glass Theme */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />
            {/* Cyber grid lines */}
            <div 
              className="absolute inset-0 opacity-[0.03] transition-opacity duration-1000"
              style={{
                backgroundImage: `radial-gradient(circle, #22d3ee 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
          </>
        )}
      </div>

      {/* --- TOP NAVIGATION BAR --- */}
      <header
        id="navbar"
        className={`sticky top-0 z-50 px-6 py-4 transition-all duration-500 border-b ${
          theme === "light"
            ? "bg-white/80 border-slate-200/50 backdrop-blur-md text-slate-800"
            : "bg-white/5 border-white/10 backdrop-blur-xl text-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={theme === "light" ? { rotate: 0 } : { rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`p-2 rounded-lg flex items-center justify-center ${
                theme === "light" 
                  ? "bg-emerald-50 text-emerald-600 shadow-sm" 
                  : "w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
              }`}
            >
              {theme === "light" ? <Globe className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
            </motion.div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase opacity-60 block">
                {theme === "light" ? "Aeronimbus Utility Suite" : "VAULT_SYSTEM_v4.2.0"}
              </span>
              <h1 className="text-sm font-display font-bold tracking-[0.2em] uppercase text-cyan-400">
                {theme === "light" ? "Atmosphere Station" : "Aeon Safety"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Weather Search Input (In Disguise Light Mode) */}
            {theme === "light" && (
              <form onSubmit={handleWeatherSearch} className="hidden md:flex items-center bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 max-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search stations..."
                  value={weatherSearch}
                  onChange={(e) => setWeatherSearch(e.target.value)}
                  className="w-full bg-transparent text-xs outline-none text-slate-700"
                />
              </form>
            )}

            {/* Disguised Passcode Input Container (In Disguise Light Mode) */}
            {theme === "light" && (
              <div className="hidden sm:flex items-center bg-slate-100/80 border border-slate-200 rounded-lg px-2 py-1 max-w-[150px]">
                <Calculator className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="password"
                  placeholder="Utility Mode"
                  value={secretCode}
                  onChange={handleSecretCodeChange}
                  className="w-full bg-transparent text-xs outline-none text-slate-700 font-mono"
                  title="Enter secret passcode (e.g. 911) to unlock Secure Vault"
                />
              </div>
            )}

            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newTheme = theme === "light" ? "dark" : "light";
                setTheme(newTheme);
                triggerToast(
                  newTheme === "light"
                    ? "Safe Environment Mask Activated."
                    : "Encrypted Operational Matrix Loaded."
                );
              }}
              className={`p-2.5 rounded-lg border transition-all ${
                theme === "light"
                  ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm"
                  : "bg-white/5 border border-white/10 hover:bg-white/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
              }`}
              title={theme === "light" ? "Unlock Secure Vault (Dark Mode)" : "Enter Stealth Disguise (Light Mode)"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            {/* Guardian Network Button */}
            {theme === "dark" && onNavigateToGuardian && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToGuardian}
                className="p-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)] flex items-center gap-2"
                title="Manage Trusted Emergency Contacts & Permissions"
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">
                  Guardians
                </span>
              </motion.button>
            )}

            {/* QUICK EXIT BUTTON (Disguised) */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: theme === "light" ? 180 : 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickExit}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                theme === "light"
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
                  : "bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200"
              }`}
              title="Instant emergency exit (Switches back to disguise app)"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                {theme === "light" ? "Sync Feed" : "Quick Purge"}
              </span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* --- NOTIFICATION GLASS TOAST --- */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div
              className={`px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border backdrop-blur-lg ${
                theme === "light"
                  ? "bg-white/95 border-emerald-100 text-slate-800"
                  : "bg-cyan-950/90 border-cyan-500/30 text-cyan-200"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  theme === "light" ? "bg-emerald-50 text-emerald-500" : "bg-cyan-900/50 text-cyan-400"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium tracking-wide">{notification}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 pt-8 z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- PANIC BANNER --- */}
        {panicActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="col-span-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm"
          >
            <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
            <div className="text-sm">
              <span className="font-bold">Sync Diagnostic:</span> Atmosphere readings verified. Secure processes safely hidden in cache.
            </div>
          </motion.div>
        )}

        {/* --- HERO SECTION: WELCOME & 3D INTERACTIVE CORE --- */}
        <div className="col-span-12 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl border p-6 transition-all duration-500 shadow-lg ${
              theme === "light"
                ? "bg-white/80 border-slate-200/50 backdrop-blur-md"
                : "bg-white/5 border-white/10 backdrop-blur-xl shadow-cyan-950/20"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                      theme === "light"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-cyan-950 text-cyan-400 border border-cyan-800/30"
                    }`}
                  >
                    {theme === "light" ? "Operational Mode: Public" : "Security Level: MAXIMUM"}
                  </span>
                  {theme === "dark" && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-red-950 text-red-400 border border-red-900/30 animate-pulse">
                      Live Encryption Active
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-light leading-tight">
                  {theme === "light" ? (
                    <>Welcome to <span className="font-bold">AeroNimbus Core</span></>
                  ) : (
                    <>Welcome back, <span className="font-bold text-white">Agent 702</span></>
                  )}
                </h2>
                <p className="text-sm opacity-70 max-w-lg leading-relaxed text-slate-400">
                  {theme === "light"
                    ? "Interactive meteorological platform tracking local air parameters, microclimates, and regional sensor calibration relays."
                    : "Your tactical environment is ready. All background recording channels are encrypted and active."}
                </p>

                {/* Inline weather station stats for Disguise Mode */}
                {theme === "light" && (
                  <div className="flex items-center gap-3 mt-3 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/10 text-xs">
                    <Sun className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: "20s" }} />
                    <div>
                      <span className="font-semibold">{weatherData.city} Station: </span>
                      <span>{weatherData.temp}°F | {weatherData.condition} | Humidity: {weatherData.humidity}% | Barometer: {weatherData.barometer} hPa</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Metrics Box */}
              <div className="grid grid-cols-2 gap-3 min-w-[200px]">
                <div
                  className={`p-3 rounded-xl border ${
                    theme === "light" ? "bg-slate-50 border-slate-100 text-slate-800" : "bg-white/5 border-white/10 text-cyan-400"
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-60 uppercase block">
                    {theme === "light" ? "Sensor Relay" : "Encryption Keys"}
                  </span>
                  <span className="text-sm font-bold font-mono">
                    {theme === "light" ? "Active (Online)" : "AES-256 (OK)"}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl border ${
                    theme === "light" ? "bg-slate-50 border-slate-100 text-slate-800" : "bg-white/5 border-white/10 text-cyan-400"
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-60 uppercase block">
                    {theme === "light" ? "Station Loc" : "Target Uplink"}
                  </span>
                  <span className="text-sm font-bold font-mono">
                    {theme === "light" ? "Region 4B" : "Scythe Server"}
                  </span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE 3D SPLINE OBJECT CONTAINER */}
            <div className="mt-8 relative" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <div
                className={`relative w-full h-80 rounded-xl overflow-hidden border flex flex-col items-center justify-center transition-all ${
                  theme === "light"
                    ? "bg-slate-50/50 border-slate-200/60"
                    : "bg-white/5 border-white/10 shadow-inner"
                }`}
              >
                {/* 3D Spline Comment Guideline */}
                {/* SPLINE 3D OBJECT GOES HERE */}

                {/* Simulated Interactive 3D Sphere */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 pointer-events-none select-none">
                  <div className="text-center">
                    <span className="text-xs font-mono opacity-40 uppercase tracking-widest block mb-2">
                      Interactive 3D Core Viewport
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-black/10 dark:bg-cyan-950/50 text-[10px] font-mono opacity-60">
                      Spline Mock Container (Hover & Tilt)
                    </span>
                  </div>
                </div>

                {/* Core Rotating 3D Rings Representation */}
                <motion.div
                  style={{
                    transformStyle: "preserve-3d",
                    rotateX: mousePos.y * 50,
                    rotateY: mousePos.x * 50,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="w-48 h-48 relative flex items-center justify-center"
                >
                  {/* Outer Orbit */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className={`absolute w-44 h-44 rounded-full border-2 border-dashed ${
                      theme === "light" ? "border-emerald-300/60" : "border-cyan-500/40"
                    }`}
                  />

                  {/* Horizontal Matrix Grid Line */}
                  <div className={`absolute w-48 h-[1px] ${theme === "light" ? "bg-slate-300/40" : "bg-cyan-500/20"}`} />
                  {/* Vertical Matrix Grid Line */}
                  <div className={`absolute h-48 w-[1px] ${theme === "light" ? "bg-slate-300/40" : "bg-cyan-500/20"}`} />

                  {/* Mid Ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    style={{ rotateX: 65, rotateY: 15 }}
                    className={`absolute w-36 h-36 rounded-full border border-double ${
                      theme === "light" ? "border-purple-300/60" : "border-teal-400/40"
                    }`}
                  />

                  {/* Inner Orbit with glow */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    style={{ rotateX: 15, rotateY: -65 }}
                    className={`absolute w-28 h-28 rounded-full border border-dotted ${
                      theme === "light" ? "border-indigo-300" : "border-cyan-400"
                    }`}
                  />

                  {/* Glowing Core Sphere */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center relative ${
                      theme === "light"
                        ? "bg-gradient-to-br from-mint-300 to-emerald-400 shadow-lg shadow-emerald-200/50"
                        : "bg-gradient-to-br from-cyan-400 to-teal-500 shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                    }`}
                  >
                    {theme === "light" ? (
                      <CloudRain className="w-6 h-6 text-white animate-bounce" />
                    ) : (
                      <Activity className="w-6 h-6 text-slate-900" />
                    )}

                    {/* Orbiting core satellite */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full absolute -top-1 left-1/2 -translate-x-1/2 ${
                          theme === "light" ? "bg-indigo-500" : "bg-white"
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Radar Line sweep (Only in secure mode) */}
                {theme === "dark" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/[0.03] to-cyan-500/0 w-1/2 h-full top-0 left-0 animate-[shimmer_2s_infinite] pointer-events-none" />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- EMERGENCY SOS COMPONENT --- */}
        <div className="col-span-12 lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`rounded-2xl border p-6 h-full flex flex-col justify-between transition-all duration-500 shadow-lg ${
              theme === "light"
                ? "bg-white/80 border-slate-200/50 backdrop-blur-md"
                : "bg-white/5 border-white/10 backdrop-blur-xl shadow-cyan-950/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider opacity-60">
                  {theme === "light" ? "Hardware Sync Console" : "Hazard Control"}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    sosActive ? "bg-red-500 animate-ping" : theme === "light" ? "bg-emerald-400" : "bg-cyan-400"
                  }`}
                />
              </div>

              <h2 className="text-xl font-display font-bold tracking-tight mb-2">
                {theme === "light" ? "Relay Calibration" : "Emergency SOS Gateway"}
              </h2>
              <p className="text-xs opacity-70 leading-relaxed mb-6">
                {theme === "light"
                  ? "Initiates local physical sensors calibration sweep. Tests response metrics and updates telemetry locks."
                  : "DANGER: Pressing triggers high-priority threat countdown. If un-aborted, transmits emergency coordinates, records audio logs, and establishes telemetry mirror."}
              </p>
            </div>

            {/* THE SOS BUTTON */}
            <div className="flex flex-col items-center justify-center py-6">
              {theme === "light" ? (
                /* Safe calibration button (Light Mode) */
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerSensorCalibration}
                    disabled={calibratingSensors}
                    className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white flex flex-col items-center justify-center shadow-lg font-bold text-xs tracking-wider gap-1 border-4 border-white shadow-emerald-200"
                  >
                    <Cpu className={`w-8 h-8 ${calibratingSensors ? "animate-spin" : "animate-pulse"}`} />
                    <span>{calibratingSensors ? "SWEEPING..." : "CALIBRATE"}</span>
                  </motion.button>

                  {/* Pulsing ring */}
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-emerald-400/20 animate-ping pointer-events-none scale-105" />
                </div>
              ) : (
                /* Emergency SOS tactical button (Dark Mode) */
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      if (sosCountdown !== null || sosActive) {
                        // Abort protocol
                        setSosCountdown(null);
                        setSosActive(false);
                        setSosBroadcastActive(false);
                        setAudioRecording(false);
                        triggerToast("SOS Emergency Protocol Aborted.");
                      } else {
                        // Start countdown
                        setSosCountdown(5);
                        triggerToast("SOS Protocol Initialized. 5-second countdown started.");
                      }
                    }}
                    className={`relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center font-bold font-display border-4 shadow-2xl transition-all ${
                      sosCountdown !== null
                        ? "bg-amber-600 hover:bg-amber-700 text-white border-amber-500 animate-pulse shadow-amber-900/40"
                        : sosActive
                        ? "bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-red-900/60"
                        : "bg-gradient-to-br from-red-500 to-rose-700 hover:from-red-600 hover:to-rose-800 text-white border-red-950/40 shadow-red-500/20 hover:shadow-red-500/40"
                    }`}
                  >
                    <AlertTriangle className={`w-10 h-10 mb-1 ${sosCountdown !== null || sosActive ? "animate-bounce" : ""}`} />
                    <span className="text-sm tracking-widest block font-extrabold">
                      {sosCountdown !== null ? `ABORT (${sosCountdown})` : sosActive ? "BROADCASTING" : "TRIGGER SOS"}
                    </span>
                    <span className="text-[9px] font-mono opacity-80 mt-1 uppercase">
                      {sosCountdown !== null ? "Tap to Stop" : sosActive ? "Active" : "Secured Webhook"}
                    </span>
                  </motion.button>

                  {/* Deep secure pulsing rings */}
                  <div className={`absolute inset-0 w-36 h-36 rounded-full pointer-events-none scale-110 ${
                    sosActive 
                      ? "bg-red-500/30 animate-ping" 
                      : sosCountdown !== null 
                      ? "bg-amber-500/20 animate-pulse scale-105" 
                      : "bg-red-500/15 animate-pulse"
                  }`} />
                  <div className={`absolute inset-0 w-36 h-36 rounded-full pointer-events-none scale-125 opacity-60 ${
                    sosActive ? "bg-rose-600/20 animate-[ping_1.5s_infinite]" : ""
                  }`} />
                </div>
              )}
            </div>

            {/* SOS Active Metrics Dashboard Drawer */}
            <div className="mt-4">
              <AnimatePresence>
                {sosActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border border-red-900/30 rounded-xl p-3 bg-red-950/20 text-red-200 text-xs font-mono space-y-2 mt-2"
                  >
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-red-400">
                      <span>UPLINK TELEMETRY BROADCAST</span>
                      <span className="animate-pulse">● LIVE BROADCAST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      <span>Broadcasting to secure IP proxy: <b className="text-white">http://localhost:3000/api/sos</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-red-400 animate-bounce" />
                      <span>Audio Recording Active: <b className="text-white">AES-encrypted chunk log.wav</b></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      <span>GPS Telemetry Packets: <b className="text-white">{lat.toFixed(6)}, {lng.toFixed(6)}</b></span>
                    </div>
                  </motion.div>
                )}
                {!sosActive && (
                  <div className={`text-[10px] font-mono text-center opacity-50 py-2 rounded-lg ${theme === "light" ? "bg-slate-100" : "bg-cyan-950/10"}`}>
                    {theme === "light" ? "Sensors status: Fully aligned with standard satellite clocks." : "SOS Protocol Node: Dormant. Secure server triggers active."}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* --- GRID DASHBOARD: 3 GLASSMORPHIC CARDS --- */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* CARD 1: AI INCIDENT REPORT / METEOROLOGICAL LOGS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
              theme === "light"
                ? "bg-white/80 border-slate-200/50 backdrop-blur-md shadow-sm hover:shadow-slate-200/50"
                : "bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10"
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-2.5 rounded-xl border ${
                    theme === "light"
                      ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                      : "bg-indigo-500/20 border border-indigo-500/30 text-[#818cf8]"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase opacity-50">
                  {theme === "light" ? "Reports v1.4" : "Command AI Analysis"}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold mb-2">
                {theme === "light" ? "Local Atmosphere Logs" : "AI Incident Report"}
              </h3>
              <p className="text-xs opacity-70 mb-4 leading-relaxed">
                {theme === "light"
                  ? "Formulate detailed notes of surrounding cloud formations, regional micro-winds, and ozone observations."
                  : "Describe details of the security situation (threat surveillance, physical follow, hacking target). The secure local AI evaluates threat level & gives directives."}
              </p>

              {/* Form Input */}
              <div className="space-y-3">
                <textarea
                  value={incidentText}
                  onChange={(e) => setIncidentText(e.target.value)}
                  placeholder={
                    theme === "light"
                      ? "Describe cloud patterns, wind speed indicators, or environmental shifts..."
                      : "Describe security threat, suspicious activities, or digital anomalies..."
                  }
                  rows={3}
                  className={`w-full p-3 text-xs rounded-xl border outline-none resize-none transition-all ${
                    theme === "light"
                      ? "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-emerald-400"
                      : "bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-500/40 focus:bg-white/10"
                  }`}
                />
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={
                    theme === "light"
                      ? () => {
                          if (incidentText.trim()) {
                            triggerToast("Atmospheric log cached locally in browser. Thank you.");
                            setIncidentText("");
                          }
                        }
                      : handleThreatAnalysis
                  }
                  disabled={isAnalyzing || !incidentText.trim()}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    theme === "light"
                      ? "bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-50"
                      : "bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 disabled:opacity-30"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{theme === "light" ? "COMPILING..." : "ANALYZING..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{theme === "light" ? "Save Atmosphere Log" : "Analyze Incident"}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* AI Report Results area */}
            <div className="mt-4">
              <AnimatePresence>
                {analysisResult && theme === "dark" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`rounded-xl border p-3.5 text-xs font-mono space-y-2 ${
                      analysisResult.threatLevel === "CRITICAL"
                        ? "bg-red-950/20 border-red-500/30 text-red-200"
                        : analysisResult.threatLevel === "HIGH"
                        ? "bg-amber-950/20 border-amber-500/30 text-amber-200"
                        : "bg-cyan-950/30 border-cyan-500/20 text-cyan-200"
                    }`}
                  >
                    <div className="flex justify-between items-center border-b border-white/10 pb-1.5 mb-1.5">
                      <span className="font-extrabold tracking-wide uppercase text-[10px]">
                        {analysisResult.classification}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          analysisResult.threatLevel === "CRITICAL"
                            ? "bg-red-500 text-white"
                            : analysisResult.threatLevel === "HIGH"
                            ? "bg-amber-500 text-slate-900"
                            : "bg-cyan-500 text-slate-900"
                        }`}
                      >
                        {analysisResult.threatLevel}
                      </span>
                    </div>
                    <div className="space-y-1 text-[11px] list-disc list-inside">
                      {analysisResult.directives.map((dir, idx) => (
                        <div key={idx} className="flex gap-1.5 items-start">
                          <span className="text-cyan-400 font-extrabold">›</span>
                          <span>{dir}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[9px] opacity-40 text-right font-sans pt-1">
                      Checksum: {analysisResult.checksum}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CARD 2: ENCRYPTED EVIDENCE VAULT / ARCHIVED SENSOR LOGS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
              theme === "light"
                ? "bg-white/80 border-slate-200/50 backdrop-blur-md shadow-sm hover:shadow-slate-200/50"
                : "bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10"
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-2.5 rounded-xl border ${
                    theme === "light"
                      ? "bg-purple-50 border-purple-100 text-purple-600"
                      : "bg-teal-500/20 border border-teal-500/30 text-[#2dd4bf]"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase opacity-50">
                  {theme === "light" ? "Sensor Archive" : "Encrypted Directory"}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold mb-2">
                {theme === "light" ? "Atmospheric Log Archive" : "Encrypted Evidence Vault"}
              </h3>
              <p className="text-xs opacity-70 mb-4 leading-relaxed">
                {theme === "light"
                  ? "Access stored histories of barometer metrics, hygrometer readings, and ozone calibration cycles."
                  : "Hardware storage for encrypted evidence files. Enter file name, secure content with AES-256 algorithm and shred from local disk."}
              </p>

              {/* Encryption interactive creator */}
              <form onSubmit={handleFileEncryption} className="space-y-3 mb-4">
                <input
                  type="text"
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  placeholder={theme === "light" ? "dataset_name.dat" : "Enter file name (e.g. video_compromise.mov)"}
                  className={`w-full p-2.5 text-xs rounded-xl border outline-none transition-all ${
                    theme === "light"
                      ? "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-emerald-400"
                      : "bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-500/40 focus:bg-white/10"
                  }`}
                />
                
                {theme === "dark" && (
                  <textarea
                    value={customFileText}
                    onChange={(e) => setCustomFileText(e.target.value)}
                    placeholder="Enter confidential textual metadata or witness descriptions..."
                    rows={2}
                    className="w-full p-2.5 text-xs rounded-xl border outline-none resize-none transition-all bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-cyan-500/40 focus:bg-white/10"
                  />
                )}

                <motion.button
                  type="submit"
                  disabled={!customFileName || isEncryptingFile}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    theme === "light"
                      ? "bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-50"
                      : "bg-gradient-to-tr from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-slate-950 disabled:opacity-30"
                  }`}
                >
                  {isEncryptingFile ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>SECURE ENCRYPTING {encryptProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>{theme === "light" ? "Archive Log File" : "AES Encrypt & Deposit"}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* List of Files */}
            <div className="space-y-2 mt-2">
              <div className="text-[10px] font-mono uppercase opacity-50 flex justify-between items-center">
                <span>{theme === "light" ? "Archived Datasets" : "Secured Items Vault"}</span>
                <span>({vaultLogs.length} Files)</span>
              </div>
              <div className="max-h-44 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {vaultLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all ${
                      theme === "light"
                        ? "bg-slate-50 border-slate-200/60 text-slate-700"
                        : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleSelectLog(log.id)}
                        className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                          selectedLogIds.includes(log.id)
                            ? theme === "light"
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "bg-cyan-500 border-cyan-500 text-slate-950"
                            : "border-slate-300 dark:border-white/20 hover:border-cyan-500"
                        }`}
                        title="Stage for export package"
                      >
                        {selectedLogIds.includes(log.id) ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : theme === "light" ? (
                          <Database className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        )}
                      </button>
                      <div className="truncate cursor-pointer" onClick={() => toggleSelectLog(log.id)}>
                        <p className="font-semibold truncate">
                          {theme === "light" ? log.name.replace(".enc", ".dat") : log.name}
                        </p>
                        <p className="text-[10px] opacity-50 truncate">
                          {log.size} | {log.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => triggerToast(`Downloaded dummy decrypt packet for ${log.name}`)}
                        className={`p-1 rounded transition-colors ${
                          theme === "light" ? "hover:bg-slate-200 text-slate-500" : "hover:bg-white/10 text-cyan-400"
                        }`}
                        title="Download raw log"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteLog(log.id)}
                        className={`p-1 rounded transition-colors ${
                          theme === "light" ? "hover:bg-rose-100 text-rose-600" : "hover:bg-white/10 text-red-400"
                        }`}
                        title="Shred item securely"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CARD 3: LIVE LOCATION SHARING / REAL-TIME SENSOR FEED */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
              theme === "light"
                ? "bg-white/80 border-slate-200/50 backdrop-blur-md shadow-sm hover:shadow-slate-200/50"
                : "bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10"
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-2.5 rounded-xl border ${
                    theme === "light"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                      : "bg-[#06b6d4]/20 border border-[#06b6d4]/30 text-cyan-400"
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase opacity-50">
                  {theme === "light" ? "Ozone GPS v9" : "Telemetry Broadcast"}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold mb-2">
                {theme === "light" ? "Solar Telemetry Tracker" : "Live Location Sharing"}
              </h3>
              <p className="text-xs opacity-70 mb-4 leading-relaxed">
                {theme === "light"
                  ? "Real-time geographical alignment targeting solar ray deflection index, absolute latitude grids, and satellite clock sync."
                  : "Precision satellite lock coordinates. Broadcasters transmit real-time telemetry to secure mirrors, keeping trusted contacts informed of your safety state."}
              </p>

              {/* Geo Location Telemetry Readout */}
              <div
                className={`p-4 rounded-xl border mb-4 font-mono text-xs space-y-2.5 ${
                  theme === "light" ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/10"
                }`}
              >
                <div className="flex justify-between">
                  <span className="opacity-50">STATION LATITUDE:</span>
                  <span className="font-bold">{lat.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-50">STATION LONGITUDE:</span>
                  <span className="font-bold">{lng.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-50">{theme === "light" ? "SOLAR RAY LOCK:" : "GPS PRECISION:"}</span>
                  <span className={`font-bold ${theme === "light" ? "text-emerald-500" : "text-cyan-400"}`}>
                    {theme === "light" ? "98.4% CLOUD CAP" : `${gpsPrecision}% LOC`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-50">{theme === "light" ? "RELAY SATELLITES:" : "COMM LINK LOCKS:"}</span>
                  <span className="font-bold">{satelliteCount} Active</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive Tactical CSS Mini-Map */}
            <div className="mt-2 relative">
              <div
                className={`w-full h-32 rounded-xl relative overflow-hidden border flex items-center justify-center ${
                  theme === "light"
                    ? "bg-slate-100/50 border-slate-200"
                    : "bg-white/5 border-white/10 shadow-inner"
                }`}
              >
                {/* Simulated Radar Sweep Animation (Tactical style) */}
                {theme === "dark" ? (
                  <div className="absolute inset-0">
                    {/* Gridlines overlay */}
                    <div className="absolute inset-0 opacity-[0.08]" 
                      style={{
                        backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
                        backgroundSize: "20px 20px"
                      }}
                    />
                    
                    {/* Radar concentrics */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-500/10 w-24 h-24 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-500/5 w-16 h-16 rounded-full" />
                    
                    {/* Radar Sweep sweep-line */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 origin-center pointer-events-none"
                    >
                      <div className="absolute top-0 left-1/2 w-0.5 h-16 bg-gradient-to-b from-cyan-400/80 to-transparent" />
                    </motion.div>

                    {/* Target blinking dots */}
                    <div className="absolute top-10 left-1/4 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                    <div className="absolute top-10 left-1/4 w-2 h-2 bg-rose-500 rounded-full" />
                    <div className="absolute bottom-8 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />

                    <div className="absolute bottom-2 left-3 text-[8px] font-mono opacity-50 bg-black/60 px-1 py-0.5 rounded uppercase">
                      GRID SCALE: 1:50m
                    </div>
                  </div>
                ) : (
                  /* Safe map visualizer (Light Mode) */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <Compass className="w-8 h-8 text-slate-300 animate-spin" style={{ animationDuration: "12s" }} />
                    <span className="text-[10px] font-mono opacity-40 uppercase tracking-wider mt-2">
                      Hygro-Spatial Grid Alignment Active
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick calibration settings footer button */}
            <div className="mt-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setLat(40.7128 + (Math.random() - 0.5) * 0.1);
                  setLng(-74.0060 + (Math.random() - 0.5) * 0.1);
                  triggerToast("Refreshed localized coordinate alignment mapping.");
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                  theme === "light"
                    ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 text-cyan-400"
                }`}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Re-Align GPS</span>
              </motion.button>
              
              {theme === "dark" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSosBroadcastActive(!sosBroadcastActive);
                    triggerToast(
                      sosBroadcastActive 
                        ? "Broadcasting de-activated. Local logging remains on." 
                        : "Active location telemetry broadcasting initialized!"
                    );
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                    sosBroadcastActive
                      ? "bg-red-500 text-slate-950 border-red-400"
                      : "bg-white/5 border border-white/10 text-cyan-400 hover:bg-white/10"
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>{sosBroadcastActive ? "Stop Broadcast" : "Start Broadcast"}</span>
                </motion.button>
              )}
            </div>

            {theme === "dark" && onNavigateToGuardian && (
              <button
                type="button"
                onClick={onNavigateToGuardian}
                className="w-full mt-3 p-2.5 rounded-xl border border-dashed border-cyan-500/30 bg-cyan-950/10 hover:bg-cyan-950/20 text-[11px] font-mono tracking-wider text-cyan-400 hover:text-cyan-300 transition-all uppercase flex items-center justify-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Configure Guardian Access Controls</span>
              </button>
            )}
          </motion.div>

        </div>

        {/* --- EVIDENCE EXPORT PANEL --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`col-span-12 rounded-2xl border p-6 transition-all duration-500 shadow-lg ${
            theme === "light"
              ? "bg-white/80 border-slate-200/50 backdrop-blur-md hover:shadow-slate-200/50"
              : "bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 shadow-cyan-950/20"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side: Selector of files for export */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/40 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-lg border ${
                      theme === "light"
                        ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                        : "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                    }`}
                  >
                    <FileArchive className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold">
                      {theme === "light" ? "Sensor Calibration Export" : "Secure Evidence Export Gateway"}
                    </h3>
                    <p className="text-xs opacity-60">
                      {theme === "light"
                        ? "Stage historical atmospheric datasets for compiled transmission report."
                        : "Compile multi-evidence assets into a cryptographically sealed AES-256 wrapper."}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={selectAllLogs}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                    theme === "light"
                      ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-cyan-400 hover:text-cyan-300"
                  }`}
                >
                  {selectedLogIds.length === vaultLogs.length ? "Clear All" : "Select All"}
                </button>
              </div>

              {/* Selection list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                {vaultLogs.map((log) => {
                  const isSelected = selectedLogIds.includes(log.id);
                  return (
                    <div
                      key={`export-select-${log.id}`}
                      onClick={() => toggleSelectLog(log.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? theme === "light"
                            ? "bg-emerald-50/40 border-emerald-500/50 shadow-sm"
                            : "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                          : theme === "light"
                          ? "bg-slate-50 border-slate-200/60 hover:bg-slate-100/60"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? theme === "light"
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "bg-cyan-500 border-cyan-500 text-slate-950"
                              : theme === "light"
                              ? "border-slate-300"
                              : "border-white/20"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="truncate text-xs font-mono">
                          <p className={`font-semibold truncate ${isSelected ? (theme === "light" ? "text-emerald-700" : "text-cyan-300") : ""}`}>
                            {theme === "light" ? log.name.replace(".enc", ".dat") : log.name}
                          </p>
                          <p className="text-[10px] opacity-50">
                            {log.size} • {log.date}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/5 text-slate-400">
                        {theme === "light" ? "STAGE" : "SECURE"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {selectedLogIds.length === 0 && (
                <div className="text-center py-8 border border-dashed border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-black/10">
                  <span className="text-xs opacity-50 font-mono">
                    {theme === "light" ? "No datasets staged. Click items above to stage." : "No files staged. Click logs in the vault or above to select."}
                  </span>
                </div>
              )}
            </div>

            {/* Right side: Export parameter setup & action compile */}
            <div className={`w-full lg:w-80 rounded-2xl p-5 space-y-5 flex flex-col justify-between ${
              theme === "light" ? "bg-slate-50 border border-slate-200/60" : "bg-black/30 border border-white/5"
            }`}>
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 block">
                  {theme === "light" ? "Export Parameters" : "Compile Protocols"}
                </span>

                {/* Formats */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono opacity-60">
                    {theme === "light" ? "Output Format" : "Cryptographic Wrapper"}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/50 dark:bg-black/40 rounded-lg border border-slate-300/40 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => setExportFormat("gpg")}
                      className={`py-1 rounded text-[10px] font-mono tracking-wider transition-all ${
                        exportFormat === "gpg"
                          ? theme === "light"
                            ? "bg-slate-800 text-white shadow-sm"
                            : "bg-cyan-500 text-slate-950 font-bold"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {theme === "light" ? ".CSV" : ".TAR.GPG"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setExportFormat("zip")}
                      className={`py-1 rounded text-[10px] font-mono tracking-wider transition-all ${
                        exportFormat === "zip"
                          ? theme === "light"
                            ? "bg-slate-800 text-white shadow-sm"
                            : "bg-cyan-500 text-slate-950 font-bold"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {theme === "light" ? ".JSON" : ".ZIP"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setExportFormat("bin")}
                      className={`py-1 rounded text-[10px] font-mono tracking-wider transition-all ${
                        exportFormat === "bin"
                          ? theme === "light"
                            ? "bg-slate-800 text-white shadow-sm"
                            : "bg-cyan-500 text-slate-950 font-bold"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {theme === "light" ? ".XML" : ".BIN"}
                    </button>
                  </div>
                </div>

                {/* Destination proxy selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono opacity-60">
                    {theme === "light" ? "Destination Tunnel" : "Export Proxy Node"}
                  </label>
                  <select
                    value={exportDestination}
                    onChange={(e) => setExportDestination(e.target.value as any)}
                    className={`w-full p-2 text-xs font-mono rounded-xl border outline-none transition-all ${
                      theme === "light"
                        ? "bg-white border-slate-200 text-slate-800"
                        : "bg-black/40 border border-white/10 text-white focus:border-cyan-500/40"
                    }`}
                  >
                    <option value="download">
                      {theme === "light" ? "Local Drive Cache" : "Tactical Download (This Browser)"}
                    </option>
                    <option value="guardian">
                      {theme === "light" ? "Meteorological Backup Relay" : "Direct Guardian Node Uplink"}
                    </option>
                    <option value="mirror">
                      {theme === "light" ? "Public Feed Mirror" : "Direct Public Mirror Tunnel"}
                    </option>
                  </select>
                </div>

                {/* Progress Tracker / Instructions step */}
                <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2">
                  {isExporting ? (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className={theme === "light" ? "text-emerald-600" : "text-cyan-400"}>
                          {exportStep === 0 && (theme === "light" ? "PARSING FILE BYTES..." : "INITIALIZING STREAM...")}
                          {exportStep === 1 && (theme === "light" ? "ALIGNING CALIBRATION GRID..." : "SEALING AES-256 LAYERS...")}
                          {exportStep === 2 && (theme === "light" ? "COMPILING SPREADSHEETS..." : "COMPILING PARITY CODES...")}
                        </span>
                        <span>{Math.floor(exportProgress)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-black/40 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-100 ${theme === "light" ? "bg-emerald-500" : "bg-cyan-500"}`}
                          style={{ width: `${exportProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : exportCompiledFile ? (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 space-y-1">
                      <p className="font-bold uppercase tracking-wider">✔ Compile Ready</p>
                      <p className="truncate text-[9px]">{exportCompiledFile.name}</p>
                      <p className="opacity-70">Checksum: {theme === "light" ? "MET_SHA256_OK" : "AES_256_GCM_VERIFIED"}</p>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-slate-200/50 dark:bg-black/40 text-[10px] font-mono opacity-50">
                      {theme === "light"
                        ? "Select staged sensors, customize target format sheet, and trigger compile download."
                        : "Stage targets from directory, select wrapper signature, and deploy compiler tunnel."}
                    </div>
                  )}
                </div>
              </div>

              {/* Compile and Download buttons */}
              <div className="pt-3 space-y-2">
                {exportCompiledFile ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={triggerExportDownload}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg ${
                      theme === "light"
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200"
                        : "bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Package</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCompileExport}
                    disabled={selectedLogIds.length === 0 || isExporting}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-30 ${
                      theme === "light"
                        ? "bg-slate-800 text-white hover:bg-slate-900"
                        : "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    }`}
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Compiling...</span>
                      </>
                    ) : (
                      <>
                        <Binary className="w-3.5 h-3.5" />
                        <span>{theme === "light" ? "Compile Reports" : "Compile & Export"}</span>
                      </>
                    )}
                  </motion.button>
                )}

                {exportCompiledFile && (
                  <button
                    type="button"
                    onClick={() => setExportCompiledFile(null)}
                    className="w-full text-center text-[10px] font-mono opacity-50 hover:opacity-100 transition-opacity"
                  >
                    Reset Compile Node
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

      </main>

      {/* --- HARMFUL DEVICE MASK FOOTER --- */}
      <footer className="mt-16 border-t border-slate-200/40 dark:border-white/10 pt-6 text-center max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-50">
          <p>
            {theme === "light"
              ? "© 2026 AeroNimbus Atmospheric Systems. All telemetry licensed under standard global public forecasts."
              : "© 2026 Aegis Global Defense Node. End-to-end telemetry local hashing active."}
          </p>
          <div className="flex items-center gap-4">
            {theme === "light" ? (
              <>
                <button type="button" onClick={startRamCleanup} className="hover:underline flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{cleaningActive ? `Optimizing Cache ${cleaningProgress}%` : "Optimize Device Cache"}</span>
                </button>
                <span>|</span>
                <span className="font-mono">Sensor Nodes: Operational</span>
              </>
            ) : (
              <>
                <span className="text-cyan-400 font-mono animate-pulse">Encryption Status: Operational AES-GCM</span>
                <span>|</span>
                <span className="font-mono">Secure Node Proxy: ACTIVE (SSL)</span>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
