import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Plane, Sparkles, CalendarHeart } from "lucide-react";

const timelineData = [
  {
    id: 1,
    title: "La Rencontre",
    year: "08/01/2020",
    description: "Notre premier regard, l'instant où tout a commencé.",
    icon: Heart,
    photo: "https://images.unsplash.com/photo-1540076156429-35ffe82b7870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBmaXJzdCUyMG1lZXRpbmclMjByb21hbnRpY3xlbnwxfHx8fDE3ODI1OTk5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Les Voyages",
    year: "2021",
    description: "Découvrir le monde ensemble et forger des souvenirs complices.",
    icon: Plane,
    photo: "https://images.unsplash.com/photo-1566759996874-04d713cc224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0cmF2ZWxpbmclMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgyNTk5OTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "La Proposition",
    year: "2025",
    description: "Une promesse d'éternité scellée au bord de l'eau.",
    icon: Sparkles,
    photo: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdhZ2VtZW50JTIwcHJvcG9zYWwlMjByb21hbnRpY3xlbnwxfHx8fDE3ODI1OTk5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Le Grand Jour",
    year: "2027",
    description: "Le 27 Octobre 2027, le début d'un nouveau chapitre.",
    icon: CalendarHeart,
    photo: "https://images.unsplash.com/photo-1576694667642-6f289dd54187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjBjZXJlbW9ueSUyMGVsZWdhbnR8ZW58MXx8fHwxNzgyNTk5OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = timelineData[activeIndex];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12 items-center">

        {/* ── Photo container ── */}
        <div className="relative w-full lg:w-[400px] flex-shrink-0">
          <div
            className="relative overflow-hidden rounded-sm"
            style={{
              aspectRatio: "4/5",
              boxShadow: "0 24px 60px rgba(90,65,20,0.14), 0 4px 16px rgba(90,65,20,0.08)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.photo}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

            {/* label on photo */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <p
                    className="text-white/55 text-xs tracking-widest uppercase mb-1"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {active.year}
                  </p>
                  <p
                    className="text-white text-3xl"
                    style={{ fontFamily: "Great Vibes, cursive" }}
                  >
                    {active.title}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* decorative circle */}
          <div
            className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: "#A3B18A", opacity: 0.08 }}
          />
        </div>

        {/* ── Timeline list ── */}
        <div className="flex-1 w-full">
          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute top-8 bottom-8 w-px"
              style={{
                left: 0,
                background: "linear-gradient(to bottom, transparent, #E0C5A0 20%, #E0C5A0 80%, transparent)",
              }}
            />

            <div className="space-y-1">
              {timelineData.map((point, index) => {
                const Icon = point.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={point.id}
                    className="relative flex items-start gap-5 cursor-pointer rounded-sm py-4 pr-4"
                    style={{
                      paddingLeft: 16,
                      background: isActive ? "rgba(224,197,160,0.09)" : "transparent",
                      borderLeft: `2px solid ${isActive ? "#E0C5A0" : "transparent"}`,
                      transition: "background 0.3s, border-color 0.3s",
                    }}
                    onHoverStart={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                  >
                    {/* icon */}
                    <motion.div
                      className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                      style={{
                        background: isActive ? "#E0C5A0" : "rgba(224,197,160,0.14)",
                        border: isActive ? "none" : "1.5px solid #E0C5A0",
                        transition: "background 0.3s",
                      }}
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.22 }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: isActive ? "#fff" : "#E0C5A0" }}
                      />
                    </motion.div>

                    {/* text */}
                    <div className="pt-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3
                          className="text-xl"
                          style={{
                            fontFamily: "Great Vibes, cursive",
                            color: isActive ? "#E0C5A0" : "#A3B18A",
                            transition: "color 0.3s",
                          }}
                        >
                          {point.title}
                        </h3>
                        <span
                          className="text-xs tracking-widest"
                          style={{ fontFamily: "Montserrat, sans-serif", color: "#8B7355", opacity: 0.5 }}
                        >
                          {point.year}
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "#8B7355",
                          opacity: isActive ? 1 : 0.5,
                          transition: "opacity 0.3s",
                        }}
                      >
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
