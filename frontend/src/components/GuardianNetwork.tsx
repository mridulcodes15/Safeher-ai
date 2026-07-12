import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Users,
  ChevronLeft,
  UserCheck,
  Phone,
  Settings2,
  Trash2,
  UserPlus,
  Compass,
  Mic,
  FileText,
  AlertTriangle,
  Info,
  Check,
  Plus,
  RefreshCw,
  LogOut,
  Power,
  Lock
} from "lucide-react";

interface Guardian {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  permissions: {
    liveLocation: boolean;
    audioSnippets: boolean;
    incidentReports: boolean;
  };
  isActive: boolean;
}

interface GuardianNetworkProps {
  onBack: () => void;
  onLock?: () => void;
}

export default function GuardianNetwork({ onBack, onLock }: GuardianNetworkProps) {
  // State for trusted guardians
  const [guardians, setGuardians] = useState<Guardian[]>([
    {
      id: "1",
      name: "Sarah Jenkins",
      relationship: "Mother / Primary Kin",
      phone: "+1 (555) 382-9901",
      permissions: {
        liveLocation: true,
        audioSnippets: false,
        incidentReports: true
      },
      isActive: true
    },
    {
      id: "2",
      name: "Aegis NGO Security Hotline",
      relationship: "International Support Relay",
      phone: "+44 (20) 7946-0192",
      permissions: {
        liveLocation: true,
        audioSnippets: true,
        incidentReports: true
      },
      isActive: true
    },
    {
      id: "3",
      name: "Civil Protection Agency",
      relationship: "Local Emergency Authority",
      phone: "112 / 911 Direct Uplink",
      permissions: {
        liveLocation: false,
        audioSnippets: false,
        incidentReports: true
      },
      isActive: false
    }
  ]);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  
  // Custom Toaster Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle a single permission for a guardian
  const togglePermission = (id: string, permission: keyof Guardian["permissions"]) => {
    setGuardians((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const updatedPermissions = {
            ...g.permissions,
            [permission]: !g.permissions[permission]
          };
          showToast(`Updated permissions for ${g.name}`);
          return { ...g, permissions: updatedPermissions };
        }
        return g;
      })
    );
  };

  // Toggle general activation status
  const toggleActive = (id: string) => {
    setGuardians((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const newState = !g.isActive;
          showToast(`${g.name} is now ${newState ? "ENABLED" : "MUTED"}`);
          return { ...g, isActive: newState };
        }
        return g;
      })
    );
  };

  // Delete a guardian
  const deleteGuardian = (id: string, name: string) => {
    setGuardians((prev) => prev.filter((g) => g.id !== id));
    showToast(`De-authorized contact: ${name}`);
  };

  // Handle Form Submission
  const handleAddGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !relationship.trim()) {
      showToast("Please complete all authorization fields.");
      return;
    }

    const newGuardian: Guardian = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      relationship: relationship.trim(),
      permissions: {
        liveLocation: true,
        audioSnippets: false,
        incidentReports: true
      },
      isActive: true
    };

    setGuardians((prev) => [...prev, newGuardian]);
    showToast(`Successfully authorized Guardian node: ${name}`);
    
    // Reset Form fields
    setName("");
    setPhone("");
    setRelationship("");
  };

  return (
    <div className="min-h-screen w-full bg-[#050608] text-slate-200 font-sans p-6 md:p-12 relative overflow-hidden select-none flex flex-col justify-between">
      {/* Dynamic Background Mesh Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
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
      </div>

      {/* NOTIFICATION TOAST OVERLAY */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="px-5 py-3 rounded-xl shadow-2xl border border-cyan-500/30 bg-cyan-950/95 text-cyan-200 backdrop-blur-lg flex items-center gap-3 text-xs font-mono tracking-wide shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <div className="p-1 rounded bg-cyan-500/20 text-cyan-400">
                <Info className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl w-full mx-auto z-10 flex-1 flex flex-col">
        {/* --- HEADER DIVISION --- */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all shadow-inner"
              title="Return to Secure Terminal"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                  Aegis Safety Suite v4.2.0
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-light tracking-tight text-white">
                Guardian Network <span className="font-bold text-cyan-400">Configuration</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Lock/Backdoor disguise button */}
            {onLock && (
              <button
                onClick={onLock}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 transition-all flex items-center gap-1.5"
                title="Instant Emergency Exit (Disguises app as weather widget)"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Quick Purge</span>
              </button>
            )}
          </div>
        </header>

        {/* --- DYNAMIC TWIN PANELS LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 mb-8">
          
          {/* LEFT PANEL: ACTIVE TRUSTED GUARDIANS LIST (8 cols) */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-medium text-white tracking-tight">
                  Active Trusted Guardians
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                {guardians.length} authorized nodes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {guardians.map((guardian) => (
                  <motion.div
                    layout
                    key={guardian.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className={`rounded-2xl border backdrop-blur-xl p-5 flex flex-col justify-between transition-all relative group ${
                      guardian.isActive
                        ? "bg-white/5 border-white/10 shadow-[0_0_20px_rgba(6,182,212,0.05)]"
                        : "bg-white/[0.01] border-white/5 opacity-50"
                    }`}
                  >
                    {/* Floating Glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/[0.01] to-cyan-500/0 rounded-2xl pointer-events-none group-hover:via-cyan-500/[0.03] transition-all duration-500" />

                    <div>
                      {/* Guardian Identity Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                            {guardian.name}
                            {guardian.isActive && (
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            )}
                          </h3>
                          <p className="text-xs text-cyan-400/80 font-mono font-medium">
                            {guardian.relationship}
                          </p>
                        </div>

                        {/* Power Mute Toggle */}
                        <button
                          onClick={() => toggleActive(guardian.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            guardian.isActive
                              ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                              : "bg-white/5 border-white/10 text-slate-500"
                          }`}
                          title={guardian.isActive ? "Mute Guardian Broadcast" : "Enable Guardian Broadcast"}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Phone metadata */}
                      <div className="flex items-center gap-2 mb-5 text-xs font-mono text-slate-400 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5 w-fit">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{guardian.phone}</span>
                      </div>

                      {/* DATA PERMISSION CONTROLS SECTION */}
                      <div className="space-y-3.5 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>DATA ACCESS STREAM</span>
                          <span>PERMISSION LEVEL</span>
                        </div>

                        {/* Switch 1: Live Location */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all">
                          <div className="flex items-center gap-2">
                            <Compass className={`w-4 h-4 ${guardian.permissions.liveLocation ? "text-cyan-400 animate-spin" : "text-slate-500"}`} style={{ animationDuration: "12s" }} />
                            <div>
                              <p className="text-xs font-bold text-white leading-none">Live Location</p>
                              <p className="text-[9px] text-slate-500">Real-time GPS telemetry sharing</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => togglePermission(guardian.id, "liveLocation")}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors relative ${
                              guardian.permissions.liveLocation ? "bg-cyan-500" : "bg-white/10"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                              guardian.permissions.liveLocation ? "translate-x-4 bg-white" : ""
                            }`} />
                          </button>
                        </div>

                        {/* Switch 2: Audio Snippets */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all">
                          <div className="flex items-center gap-2">
                            <Mic className={`w-4 h-4 ${guardian.permissions.audioSnippets ? "text-teal-400 animate-pulse" : "text-slate-500"}`} />
                            <div>
                              <p className="text-xs font-bold text-white leading-none">Audio Snippets</p>
                              <p className="text-[9px] text-slate-500">Duress microphone recording chunks</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => togglePermission(guardian.id, "audioSnippets")}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors relative ${
                              guardian.permissions.audioSnippets ? "bg-cyan-500" : "bg-white/10"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                              guardian.permissions.audioSnippets ? "translate-x-4 bg-white" : ""
                            }`} />
                          </button>
                        </div>

                        {/* Switch 3: Incident Reports */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all">
                          <div className="flex items-center gap-2">
                            <FileText className={`w-4 h-4 ${guardian.permissions.incidentReports ? "text-purple-400" : "text-slate-500"}`} />
                            <div>
                              <p className="text-xs font-bold text-white leading-none">Incident Reports</p>
                              <p className="text-[9px] text-slate-500">Automated AI threat logs upload</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => togglePermission(guardian.id, "incidentReports")}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors relative ${
                              guardian.permissions.incidentReports ? "bg-cyan-500" : "bg-white/10"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                              guardian.permissions.incidentReports ? "translate-x-4 bg-white" : ""
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Contact footer area */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span>SECURED NODE</span>
                      <button
                        onClick={() => deleteGuardian(guardian.id, guardian.name)}
                        className="text-red-400/60 hover:text-red-400 flex items-center gap-1 transition-colors"
                        title="Revoke emergency contact authorization"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Revoke Access</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* RIGHT PANEL: ADD NEW GUARDIAN FORM (4 cols) */}
          <section className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5">
              <UserPlus className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-medium text-white tracking-tight">
                Authorize New Guardian
              </h2>
            </div>

            {/* Frosted Glass Form Container */}
            <form
              onSubmit={handleAddGuardian}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.05)] space-y-4"
            >
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">
                  Guardian Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Robert Vance"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/5 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">
                  Relationship Description
                </label>
                <input
                  type="text"
                  required
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Attorney / Brother / NGO Agent"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/5 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5">
                  Secure Communication Line (Phone)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (202) 555-0143"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/5 transition-all font-mono"
                  />
                  <Phone className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Warning Notice Banner */}
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/10 flex items-start gap-2.5 text-[11px] text-slate-400 leading-normal">
                <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                <p>
                  Authorizing a contact exposes real-time telemetry datasets when a duress state is active. Please confirm relationship legitimacy.
                </p>
              </div>

              {/* GLOOMING PULSE SUBMIT BUTTON */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all pt-3.5"
              >
                <UserCheck className="w-4 h-4 text-slate-950" />
                <span>Authorize Contact Node</span>
              </motion.button>
            </form>

            {/* Quick status summary info */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] text-xs font-mono space-y-2 text-slate-400">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Active System Status
              </p>
              <div className="flex justify-between">
                <span>Direct Satellite Link:</span>
                <span className="text-cyan-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>Broadcaster Mode:</span>
                <span className="text-cyan-400 font-bold">STANDBY</span>
              </div>
              <div className="flex justify-between">
                <span>Encryption standard:</span>
                <span className="text-slate-300">AES-256 GCM</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* --- AEON SYSTEM FOOTER --- */}
      <footer className="mt-8 border-t border-white/10 pt-6 text-center max-w-7xl mx-auto px-6 w-full z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-50">
          <p>
            © 2026 Aegis Global Defense Node. End-to-end telemetry local hashing active.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400 font-mono animate-pulse">Encryption Status: Operational AES-GCM</span>
            <span>|</span>
            <span className="font-mono">Secure Node Proxy: ACTIVE (SSL)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
