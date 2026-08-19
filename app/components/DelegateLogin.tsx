"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";

interface DelegateProfile {
  name: string | null;
  role: string;
  allocation: string | null;
  profile_picture_url: string | null;
}

interface AllocationInfo {
  country: string;
  conference: { name: string; committee: string | null } | null;
}

export default function DelegateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DelegateProfile | null>(null);
  const [allocations, setAllocations] = useState<AllocationInfo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [available, setAvailable] = useState(false);

  const fetchProfile = useCallback(async (userId: string) => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data: prof } = await supabase
      .from("profiles")
      .select("name, role, allocation, profile_picture_url")
      .eq("id", userId)
      .single();

    if (prof) setProfile(prof);

    const { data: allocs } = await supabase
      .from("allocations")
      .select("country, conference:conferences(name, committee)")
      .eq("user_id", userId);

    if (allocs) {
      setAllocations(
        allocs.map((a: Record<string, unknown>) => ({
          country: a.country as string,
          conference: Array.isArray(a.conference) ? a.conference[0] : a.conference,
        }))
      );
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    setAvailable(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setAllocations([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const handleLogin = async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setError("");
    setSigningIn(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSigningIn(false);
    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Wrong email or password. Use your InterMUN account."
          : authError.message
      );
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    setProfile(null);
    setAllocations([]);
    setEmail("");
    setPassword("");
  };

  if (loading) return null;

  const displayName =
    profile?.name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Delegate";

  const roleLabel =
    profile?.role === "smt"
      ? "Secretariat"
      : profile?.role === "chair"
        ? "Chair"
        : profile?.role === "advisor"
          ? "Advisor"
          : "Delegate";

  return (
    <section id="delegate-login" className="w-full elevated-card">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold mb-1"
        style={{ color: "#1d1d1f" }}
      >
        Your conference portal
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm mb-6"
        style={{ color: "#6e6e73" }}
      >
        Sign in with your InterMUN account to see your assignment
      </motion.p>

      <AnimatePresence mode="wait">
        {!available ? (
          <motion.div
            key="unavailable"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl p-6 text-center"
            style={{ background: "#f2f2f7" }}
          >
            <p className="text-sm" style={{ color: "#6e6e73" }}>
              Delegate login will be available closer to the conference.
            </p>
            <a
              href="https://intermun.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-semibold underline transition-colors"
              style={{ color: "#007aff" }}
            >
              Visit InterMUN to create your account
            </a>
          </motion.div>
        ) : user && profile ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl p-5"
            style={{
              background: "#f2f2f7",
              border: "0.5px solid rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                {profile.profile_picture_url && (
                  <img
                    src={profile.profile_picture_url}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "#6e6e73" }}>Signed in as</p>
                  <h3 className="text-lg font-bold" style={{ color: "#1d1d1f" }}>
                    Welcome, {displayName}!
                  </h3>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-medium transition-colors duration-200"
                style={{ color: "#007aff" }}
              >
                Sign out
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl px-4 py-3" style={{ background: "#ffffff", border: "0.5px solid rgba(0,0,0,0.06)" }}>
                <div className="text-[11px] font-medium uppercase tracking-wider mb-0.5" style={{ color: "#6e6e73" }}>
                  Role
                </div>
                <div className="text-sm font-bold" style={{ color: "#1d1d1f" }}>{roleLabel}</div>
              </div>

              {profile.allocation && (
                <div className="rounded-xl px-4 py-3" style={{ background: "#ffffff", border: "0.5px solid rgba(0,0,0,0.06)" }}>
                  <div className="text-[11px] font-medium uppercase tracking-wider mb-0.5" style={{ color: "#6e6e73" }}>
                    Allocation
                  </div>
                  <div className="text-sm font-bold" style={{ color: "#1d1d1f" }}>
                    {profile.allocation}
                  </div>
                </div>
              )}

              {allocations.map((a, i) => (
                <div
                  key={i}
                  className="sm:col-span-2 rounded-xl px-4 py-3"
                  style={{ background: "#ffffff", border: "0.5px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="text-[11px] font-medium uppercase tracking-wider mb-0.5" style={{ color: "#6e6e73" }}>
                    {a.conference?.committee || a.conference?.name || "Committee"}
                  </div>
                  <div className="text-sm font-bold" style={{ color: "#1d1d1f" }}>
                    {a.country}
                  </div>
                </div>
              ))}

              {allocations.length === 0 && !profile.allocation && (
                <div className="sm:col-span-2 rounded-xl px-4 py-3" style={{ background: "#ffffff", border: "0.5px solid rgba(0,0,0,0.06)" }}>
                  <p className="text-xs" style={{ color: "#6e6e73" }}>
                    No committee allocation yet — check back closer to the conference.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 outline-none"
                style={{
                  background: "#f2f2f7",
                  color: "#1d1d1f",
                  border: "0.5px solid rgba(0,0,0,0.06)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#007aff")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)")}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 outline-none"
                style={{
                  background: "#f2f2f7",
                  color: "#1d1d1f",
                  border: "0.5px solid rgba(0,0,0,0.06)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#007aff")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)")}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-medium"
                  style={{ color: "#ff3b30" }}
                >
                  {error}
                </motion.p>
              )}
              <button
                onClick={handleLogin}
                disabled={signingIn}
                className="w-full px-6 py-3 text-white text-sm font-semibold transition-opacity duration-200 hover:opacity-85 disabled:opacity-60"
                style={{
                  background: "#007aff",
                  borderRadius: "980px",
                }}
              >
                {signingIn ? "Signing in…" : "Sign in with InterMUN"}
              </button>
              <p className="text-xs text-center mt-1" style={{ color: "#6e6e73" }}>
                Use the same account you created on{" "}
                <a
                  href="https://intermun.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors"
                  style={{ color: "#007aff" }}
                >
                  intermun.site
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
