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

const day1: ScheduleItem[] = [
  { time: "8:00 AM", title: "Registration & Check-in", startHour: 8, startMin: 0, endHour: 9, endMin: 0 },
  { time: "9:00 AM", title: "Opening Ceremony", startHour: 9, startMin: 0, endHour: 10, endMin: 0 },
  { time: "10:00 AM", title: "Committee Session I", startHour: 10, startMin: 0, endHour: 12, endMin: 0 },
  { time: "12:00 PM", title: "Lunch Break", startHour: 12, startMin: 0, endHour: 13, endMin: 30 },
  { time: "1:30 PM", title: "Committee Session II", startHour: 13, startMin: 30, endHour: 15, endMin: 30 },
  { time: "3:30 PM", title: "Committee Session III", startHour: 15, startMin: 30, endHour: 17, endMin: 0 },
  { time: "5:00 PM", title: "End of Day 1", startHour: 17, startMin: 0, endHour: 17, endMin: 30 },
];

const day2: ScheduleItem[] = [
  { time: "8:30 AM", title: "Committee Session IV", startHour: 8, startMin: 30, endHour: 10, endMin: 30 },
  { time: "10:30 AM", title: "Committee Session V", startHour: 10, startMin: 30, endHour: 12, endMin: 0 },
  { time: "12:00 PM", title: "Lunch Break", startHour: 12, startMin: 0, endHour: 13, endMin: 30 },
  { time: "1:30 PM", title: "Closing Ceremony & Awards", startHour: 13, startMin: 30, endHour: 15, endMin: 30 },
  { time: "3:30 PM", title: "End of Conference", startHour: 15, startMin: 30, endHour: 16, endMin: 0 },
];

function isCurrentSession(item: ScheduleItem, conferenceDay: number, activeDay: number): boolean {
  if (conferenceDay !== activeDay) return false;
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const nowMins = h * 60 + m;
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

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1);
  const [conferenceDay, setConferenceDay] = useState(0);
  const items = activeDay === 1 ? day1 : day2;

  useEffect(() => {
    setConferenceDay(getConferenceDay());
  }, []);

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
          className="text-sm text-[#7A8FA3] mb-6"
        >
          January 16–17, 2027
        </motion.p>

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
              Day {day} — Jan {day === 1 ? 16 : 17}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: activeDay === 1 ? -15 : 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeDay === 1 ? 15 : -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2.5"
          >
            {items.map((item, i) => {
              const isCurrent = isCurrentSession(item, conferenceDay, activeDay);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors duration-200 ${
                    isCurrent
                      ? "bg-[#1B2E4A] text-white shadow-lg shadow-[#1B2E4A]/20"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                >
                  <span
                    className={`text-sm font-mono font-medium w-20 shrink-0 ${
                      isCurrent ? "text-white/80" : "text-[#7A8FA3]"
                    }`}
                  >
                    {item.time}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      isCurrent ? "text-white" : "text-[#1B2E4A]"
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
