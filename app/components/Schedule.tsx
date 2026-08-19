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

  const segmentedStyle = (active: boolean) => ({
    background: active ? "#ffffff" : "transparent",
    color: active ? "#1d1d1f" : "#6e6e73",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
    borderRadius: "7px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: 600 as const,
    transition: "all 0.2s",
    cursor: "pointer" as const,
    border: "none",
  });

  return (
    <section id="schedule" className="w-full elevated-card">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold mb-1"
        style={{ color: "#1d1d1f" }}
      >
        Schedule
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm mb-5"
        style={{ color: "#6e6e73" }}
      >
        January 16–17, 2027 · D-PREP International School
      </motion.p>

      {/* Group selector — segmented control */}
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#6e6e73" }}>
          Your committee group
        </p>
        <div
          className="inline-flex gap-0.5 p-1 rounded-lg"
          style={{ background: "rgba(118,118,128,0.12)" }}
        >
          {[1, 2, 3].map((g) => (
            <button
              key={g}
              onClick={() => handleGroupChange(g)}
              style={segmentedStyle(activeGroup === g)}
            >
              Group {g}
            </button>
          ))}
        </div>
        <p className="text-[11px] mt-1.5" style={{ color: "#6e6e73" }}>
          {GROUP_LABELS[activeGroup - 1]}
        </p>
      </div>

      {/* Day tabs — segmented control */}
      <div className="mb-5">
        <div
          className="inline-flex gap-0.5 p-1 rounded-lg"
          style={{ background: "rgba(118,118,128,0.12)" }}
        >
          {[1, 2].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              style={segmentedStyle(activeDay === day)}
            >
              {day === 1 ? "Fri Jan 16" : "Sat Jan 17"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: "0.5px solid rgba(0,0,0,0.06)",
          }}
        >
          {items.map((item, i) => {
            const isCurrent = isCurrentSession(item, conferenceDay, activeDay);
            return (
              <motion.div
                key={`${item.time}-${item.title}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="flex items-center gap-4 px-4 py-3"
                style={{
                  borderBottom: i < items.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                  marginLeft: isCurrent ? 0 : undefined,
                  background: isCurrent ? "rgba(0,122,255,0.08)" : "transparent",
                }}
              >
                {isCurrent && (
                  <div
                    className="w-1 self-stretch rounded-full"
                    style={{ background: "#007aff", minHeight: "100%" }}
                  />
                )}
                <span
                  className="text-sm font-mono font-medium w-14 shrink-0"
                  style={{ color: isCurrent ? "#007aff" : "#6e6e73" }}
                >
                  {item.time}
                </span>
                <span
                  className="text-sm"
                  style={{
                    color: isCurrent ? "#007aff" : "#1d1d1f",
                    fontWeight: isCurrent || item.title.startsWith("Committee Session") ? 600 : 500,
                  }}
                >
                  {item.title}
                </span>
                {isCurrent && (
                  <span
                    className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                    style={{ background: "#007aff", color: "#fff" }}
                  >
                    Now
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
