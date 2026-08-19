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

  const fetchProfile = useCallback(async (userId: string) => {
    const supabase = getSupabase();
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
    setError("");
    setSigningIn(true);
    const { error: authError } = await getSupabase().auth.signInWithPassword({
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
    await getSupabase().auth.signOut();
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
    <section id="delegate-login" className="px-5 pb-20">
      <div className="max-w-lg mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-[#1B2E4A] mb-2"
        >
          Your conference portal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm text-[#7A8FA3] mb-6"
        >
          Sign in with your InterMUN account to see your assignment
        </motion.p>

        <AnimatePresence mode="wait">
          {user && profile ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="bg-white/60 rounded-2xl p-6 border-2 border-[#D4F0E7]"
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
                    <p className="text-sm text-[#7A8FA3] mb-0.5">Signed in as</p>
                    <h3 className="text-xl font-bold text-[#1B2E4A]">
                      Welcome, {displayName}!
                    </h3>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-[#7A8FA3] hover:text-[#1B2E4A] transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-[#F7E8D0] to-[#E8DFF5] rounded-xl px-4 py-3">
                  <div className="text-xs text-[#7A8FA3] font-medium uppercase tracking-wider mb-0.5">
                    Role
                  </div>
                  <div className="text-sm font-bold text-[#1B2E4A]">{roleLabel}</div>
                </div>

                {profile.allocation && (
                  <div className="bg-[#D4F0E7]/50 rounded-xl px-4 py-3">
                    <div className="text-xs text-[#7A8FA3] font-medium uppercase tracking-wider mb-0.5">
                      Allocation
                    </div>
                    <div className="text-sm font-bold text-[#1B2E4A]">
                      {profile.allocation}
                    </div>
                  </div>
                )}

                {allocations.map((a, i) => (
                  <div
                    key={i}
                    className="col-span-2 bg-[#C4E4F7]/30 rounded-xl px-4 py-3"
                  >
                    <div className="text-xs text-[#7A8FA3] font-medium uppercase tracking-wider mb-0.5">
                      {a.conference?.committee || a.conference?.name || "Committee"}
                    </div>
                    <div className="text-sm font-bold text-[#1B2E4A]">
                      {a.country}
                    </div>
                  </div>
                ))}

                {allocations.length === 0 && !profile.allocation && (
                  <div className="col-span-2 bg-[#C4E4F7]/20 rounded-xl px-4 py-3">
                    <p className="text-xs text-[#7A8FA3]">
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
              className="bg-white/50 rounded-2xl p-6"
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
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-[#C4E4F7] focus:outline-none text-sm font-medium text-[#1B2E4A] placeholder:text-[#7A8FA3]/60 transition-colors duration-200"
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
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-[#C4E4F7] focus:outline-none text-sm font-medium text-[#1B2E4A] placeholder:text-[#7A8FA3]/60 transition-colors duration-200"
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 font-medium"
                  >
                    {error}
                  </motion.p>
                )}
                <button
                  onClick={handleLogin}
                  disabled={signingIn}
                  className="w-full px-6 py-3 bg-[#1B2E4A] text-white rounded-xl text-sm font-semibold hover:bg-[#2A4470] transition-colors duration-300 shadow-md shadow-[#1B2E4A]/10 disabled:opacity-60"
                >
                  {signingIn ? "Signing in…" : "Sign in with InterMUN"}
                </button>
                <p className="text-xs text-[#7A8FA3] text-center mt-1">
                  Use the same account you created on{" "}
                  <a
                    href="https://intermun.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#1B2E4A] transition-colors"
                  >
                    intermun.site
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
