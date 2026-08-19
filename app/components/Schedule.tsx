"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScheduleItem {
  time: string;
  title: string;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
}

const GROUP_LABELS = [
  "Group 1 — UNHRC, DISEC, Press Corps",
  "Group 2 — WHO, UN Women, UNSC",
  "Group 3 — ECOSOC, UNODC, Interpol, FWC",
];

const schedules: Record<string, ScheduleItem[]> = {
  "1-1": [
    { time: "7:30", title: "Arrival & Registration", startHour: 7, startMin: 30, endHour: 8, endMin: 30 },
    { time: "8:30", title: "Opening Ceremony", startHour: 8, startMin: 30, endHour: 9, endMin: 15 },
    { time: "9:15", title: "Break & Photo Ops", startHour: 9, startMin: 15, endHour: 9, endMin: 45 },
    { time: "9:45", title: "Icebreakers", startHour: 9, startMin: 45, endHour: 10, endMin: 0 },
    { time: "10:00", title: "Committee Session 1 — Motions", startHour: 10, startMin: 0, endHour: 11, endMin: 0 },
    { time: "11:00", title: "Lunch (Eat)", startHour: 11, startMin: 0, endHour: 11, endMin: 30 },
    { time: "11:30", title: "Lunch (Socialise)", startHour: 11, startMin: 30, endHour: 12, endMin: 0 },
    { time: "12:00", title: "Committee Session 2 — Resolutions", startHour: 12, startMin: 0, endHour: 14, endMin: 30 },
    { time: "14:30", title: "Break — Resolutions Due", startHour: 14, startMin: 30, endHour: 15, endMin: 0 },
    { time: "15:00", title: "Committee Session 3 — Voting", startHour: 15, startMin: 0, endHour: 16, endMin: 30 },
    { time: "16:30", title: "Feedback & Departure", startHour: 16, startMin: 30, endHour: 17, endMin: 0 },
  ],
  "1-2": [
    { time: "7:30", title: "Arrival & Registration", startHour: 7, startMin: 30, endHour: 8, endMin: 30 },
    { time: "8:30", title: "Opening Ceremony", startHour: 8, startMin: 30, endHour: 9, endMin: 15 },
    { time: "9:15", title: "Break & Photo Ops", startHour: 9, startMin: 15, endHour: 9, endMin: 45 },
    { time: "9:45", title: "Icebreakers", startHour: 9, startMin: 45, endHour: 10, endMin: 0 },
    { time: "10:00", title: "Committee Session 1 — Motions", startHour: 10, startMin: 0, endHour: 11, endMin: 0 },
    { time: "11:00", title: "Lunch (Socialise)", startHour: 11, startMin: 0, endHour: 11, endMin: 30 },
    { time: "11:30", title: "Lunch (Eat)", startHour: 11, startMin: 30, endHour: 12, endMin: 30 },
    { time: "12:30", title: "Committee Session 2 — Resolutions", startHour: 12, startMin: 30, endHour: 14, endMin: 30 },
    { time: "14:30", title: "Break — Resolutions Due", startHour: 14, startMin: 30, endHour: 15, endMin: 0 },
    { time: "15:00", title: "Committee Session 3 — Voting", startHour: 15, startMin: 0, endHour: 16, endMin: 30 },
    { time: "16:30", title: "Feedback & Departure", startHour: 16, startMin: 30, endHour: 17, endMin: 0 },
  ],
  "1-3": [
    { time: "7:30", title: "Arrival & Registration", startHour: 7, startMin: 30, endHour: 8, endMin: 30 },
    { time: "8:30", title: "Opening Ceremony", startHour: 8, startMin: 30, endHour: 9, endMin: 15 },
    { time: "9:15", title: "Break & Photo Ops", startHour: 9, startMin: 15, endHour: 9, endMin: 45 },
    { time: "9:45", title: "Icebreakers", startHour: 9, startMin: 45, endHour: 10, endMin: 0 },
    { time: "10:00", title: "Committee Session 1 — Motions", startHour: 10, startMin: 0, endHour: 11, endMin: 30 },
    { time: "11:30", title: "Lunch (Socialise)", startHour: 11, startMin: 30, endHour: 12, endMin: 0 },
    { time: "12:00", title: "Lunch (Eat)", startHour: 12, startMin: 0, endHour: 13, endMin: 0 },
    { time: "13:00", title: "Committee Session 2 — Resolutions", startHour: 13, startMin: 0, endHour: 14, endMin: 30 },
    { time: "14:30", title: "Break — Resolutions Due", startHour: 14, startMin: 30, endHour: 15, endMin: 0 },
    { time: "15:00", title: "Committee Session 3 — Voting", startHour: 15, startMin: 0, endHour: 16, endMin: 30 },
    { time: "16:30", title: "Feedback & Departure", startHour: 16, startMin: 30, endHour: 17, endMin: 0 },
  ],
  "2-1": [
    { time: "7:30", title: "Arrival", startHour: 7, startMin: 30, endHour: 8, endMin: 30 },
    { time: "8:30", title: "Registration & Photo Ops", startHour: 8, startMin: 30, endHour: 9, endMin: 0 },
    { time: "9:00", title: "Committee Session 1 — Motions", startHour: 9, startMin: 0, endHour: 10, endMin: 0 },
    { time: "10:00", title: "Break", startHour: 10, startMin: 0, endHour: 10, endMin: 30 },
    { time: "10:30", title: "Committee Session 2 — Motions & Resolutions", startHour: 10, startMin: 30, endHour: 12, endMin: 0 },
    { time: "12:00", title: "Lunch (Socialise)", startHour: 12, startMin: 0, endHour: 12, endMin: 30 },
    { time: "12:30", title: "Lunch (Eat)", startHour: 12, startMin: 30, endHour: 13, endMin: 0 },
    { time: "13:00", title: "Committee Session 3 — Resolutions", startHour: 13, startMin: 0, endHour: 14, endMin: 30 },
    { time: "14:30", title: "Break — Resolutions Due", startHour: 14, startMin: 30, endHour: 15, endMin: 0 },
    { time: "15:00", title: "Committee Session 4 — Voting", startHour: 15, startMin: 0, endHour: 16, endMin: 0 },
    { time: "16:00", title: "Feedback & Break", startHour: 16, startMin: 0, endHour: 16, endMin: 30 },
    { time: "16:30", title: "Closing Ceremony", startHour: 16, startMin: 30, endHour: 17, endMin: 30 },
    { time: "17:30", title: "Photo Ops & Departure", startHour: 17, startMin: 30, endHour: 18, endMin: 0 },
  ],
  "2-2": [
    { time: "7:30", title: "Arrival", startHour: 7, startMin: 30, endHour: 8, endMin: 30 },
    { time: "8:30", title: "Registration & Photo Ops", startHour: 8, startMin: 30, endHour: 9, endMin: 0 },
    { time: "9:00", title: "Committee Session 1 — Motions", startHour: 9, startMin: 0, endHour: 10, endMin: 0 },
    { time: "10:00", title: "Break", startHour: 10, startMin: 0, endHour: 10, endMin: 30 },
    { time: "10:30", title: "Committee Session 2 — Motions & Resolutions", startHour: 10, startMin: 30, endHour: 11, endMin: 30 },
    { time: "11:30", title: "Lunch (Eat)", startHour: 11, startMin: 30, endHour: 12, endMin: 0 },
    { time: "12:00", title: "Lunch (Socialise)", startHour: 12, startMin: 0, endHour: 12, endMin: 30 },
    { time: "12:30", title: "Committee Session 3 — Resolutions", startHour: 12, startMin: 30, endHour: 14, endMin: 30 },
    { time: "14:30", title: "Break — Resolutions Due", startHour: 14, startMin: 30, endHour: 15, endMin: 0 },
    { time: "15:00", title: "Committee Session 4 — Voting", startHour: 15, startMin: 0, endHour: 16, endMin: 0 },
    { time: "16:00", title: "Feedback & Break", startHour: 16, startMin: 0, endHour: 16, endMin: 30 },
    { time: "16:30", title: "Closing Ceremony", startHour: 16, startMin: 30, endHour: 17, endMin: 30 },
    { time: "17:30", title: "Photo Ops & Departure", startHour: 17, startMin: 30, endHour: 18, endMin: 0 },
  ],
  "2-3": [
    { time: "7:30", title: "Arrival", startHour: 7, startMin: 30, endHour: 8, endMin: 30 },
    { time: "8:30", title: "Registration & Photo Ops", startHour: 8, startMin: 30, endHour: 9, endMin: 0 },
    { time: "9:00", title: "Committee Session 1 — Motions", startHour: 9, startMin: 0, endHour: 10, endMin: 0 },
    { time: "10:00", title: "Break", startHour: 10, startMin: 0, endHour: 10, endMin: 30 },
    { time: "10:30", title: "Committee Session 2 — Motions & Resolutions", startHour: 10, startMin: 30, endHour: 11, endMin: 30 },
    { time: "11:30", title: "Lunch (Socialise)", startHour: 11, startMin: 30, endHour: 12, endMin: 0 },
    { time: "12:00", title: "Lunch (Eat)", startHour: 12, startMin: 0, endHour: 12, endMin: 30 },
    { time: "12:30", title: "Committee Session 3 — Resolutions", startHour: 12, startMin: 30, endHour: 14, endMin: 30 },
    { time: "14:30", title: "Break — Resolutions Due", startHour: 14, startMin: 30, endHour: 15, endMin: 0 },
    { time: "15:00", title: "Committee Session 4 — Voting", startHour: 15, startMin: 0, endHour: 16, endMin: 0 },
    { time: "16:00", title: "Feedback & Break", startHour: 16, startMin: 0, endHour: 16, endMin: 30 },
    { time: "16:30", title: "Closing Ceremony", startHour: 16, startMin: 30, endHour: 17, endMin: 30 },
    { time: "17:30", title: "Photo Ops & Departure", startHour: 17, startMin: 30, endHour: 18, endMin: 0 },
  ],
};

function isCurrentSession(item: ScheduleItem, conferenceDay: number, activeDay: number): boolean {
  if (conferenceDay !== activeDay) return false;
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const startMins = item.startHour * 60 + item.startMin;
  const endMins = item.endHour * 60 + item.endMin;
  return nowMins >= startMins && nowMins < endMins;
}

function getConferenceDay(): number {
  const now = new Date();
  const d1 = new Date(2027, 0, 16);
  const d2 = new Date(2027, 0, 17);
  if (now.toDateString() === d1.toDateString()) return 1;
  if (now.toDateString() === d2.toDateString()) return 2;
  return 0;
}

const GROUP_KEY = "seamun-schedule-group";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeGroup, setActiveGroup] = useState(1);
  const [conferenceDay, setConferenceDay] = useState(0);

  useEffect(() => {
    setConferenceDay(getConferenceDay());
    const saved = localStorage.getItem(GROUP_KEY);
    if (saved) setActiveGroup(Number(saved));
  }, []);

  const handleGroupChange = (g: number) => {
    setActiveGroup(g);
    localStorage.setItem(GROUP_KEY, String(g));
  };

  const key = `${activeDay}-${activeGroup}`;
  const items = schedules[key] || [];

  return (
    <section id="schedule" className="px-5 pb-20">
      <div className="max-w-lg mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-[#1B2E4A] mb-2"
        >
          Schedule
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm text-[#7A8FA3] mb-5"
        >
          January 16–17, 2027 · D-PREP International School
        </motion.p>

        {/* Group selector */}
        <div className="mb-4">
          <p className="text-xs font-medium text-[#7A8FA3] uppercase tracking-wider mb-2">
            Your committee group
          </p>
          <div className="flex gap-2">
            {[1, 2, 3].map((g) => (
              <button
                key={g}
                onClick={() => handleGroupChange(g)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  activeGroup === g
                    ? "bg-[#1B2E4A] text-white shadow-md shadow-[#1B2E4A]/15"
                    : "bg-white/50 text-[#4A6078] hover:bg-white/70"
                }`}
              >
                Group {g}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#7A8FA3]/80 mt-1.5">
            {GROUP_LABELS[activeGroup - 1]}
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-6">
          {[1, 2].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeDay === day
                  ? "bg-[#1B2E4A] text-white shadow-md shadow-[#1B2E4A]/15"
                  : "bg-white/50 text-[#4A6078] hover:bg-white/70"
              }`}
            >
              {day === 1 ? "Fri Jan 16" : "Sat Jan 17"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2"
          >
            {items.map((item, i) => {
              const isCurrent = isCurrentSession(item, conferenceDay, activeDay);
              const isSession = item.title.startsWith("Committee Session");
              return (
                <motion.div
                  key={`${item.time}-${item.title}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-colors duration-200 ${
                    isCurrent
                      ? "bg-[#1B2E4A] text-white shadow-lg shadow-[#1B2E4A]/20"
                      : isSession
                        ? "bg-white/60 border border-[#C4E4F7]/50"
                        : "bg-white/40"
                  }`}
                >
                  <span
                    className={`text-sm font-mono font-medium w-14 shrink-0 ${
                      isCurrent ? "text-white/80" : "text-[#7A8FA3]"
                    }`}
                  >
                    {item.time}
                  </span>
                  <span
                    className={`text-sm ${
                      isCurrent
                        ? "text-white font-semibold"
                        : isSession
                          ? "text-[#1B2E4A] font-semibold"
                          : "text-[#4A6078] font-medium"
                    }`}
                  >
                    {item.title}
                  </span>
                  {isCurrent && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-md">
                      Now
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
