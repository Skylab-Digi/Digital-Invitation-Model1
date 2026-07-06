import { MapPin, Shirt, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "./reusable/card";
import { Button } from "./reusable/button";

// ─── Calendar block ───────────────────────────────────────────────

const WEDDING_YEAR  = 2027;
const WEDDING_MONTH = 9;   // 0-indexed → October
const WEDDING_DAY   = 27;

const MONTHS_FR = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

function CalendarBlock() {
  const firstDay    = new Date(WEDDING_YEAR, WEDDING_MONTH, 1).getDay();
  const daysInMonth = new Date(WEDDING_YEAR, WEDDING_MONTH + 1, 0).getDate();
  const startOffset = (firstDay + 6) % 7; // Monday-first
  const cells       = Array.from({ length: startOffset + daysInMonth });

  const addToCalendar = () => {
    const url =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Mariage+Haythem+%26+Islem" +
      "&dates=20271027T150000/20271027T230000" +
      "&details=C%C3%A9r%C3%A9monie+%26+R%C3%A9ception+-+Villa+Azure%2C+Bord+de+Mer" +
      "&location=Villa+Azure%2C+Bord+de+Mer";
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p
        className="text-xs tracking-widest uppercase w-full text-left px-1"
        style={{ fontFamily: "Montserrat, sans-serif", color: "#A3B18A", letterSpacing: "0.15em" }}
      >
        {MONTHS_FR[WEDDING_MONTH]} {WEDDING_YEAR}
      </p>

      {/* weekday row */}
      <div className="grid grid-cols-7 w-full">
        {["L","M","M","J","V","S","D"].map((d, i) => (
          <div
            key={i}
            className="text-center text-xs py-0.5"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#A3B18A", opacity: 0.55 }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* day cells */}
      <div className="grid grid-cols-7 w-full gap-y-1">
        {cells.map((_, idx) => {
          const day = idx - startOffset + 1;
          const valid = day >= 1 && day <= daysInMonth;
          const isWedding = valid && day === WEDDING_DAY;
          return (
            <div
              key={idx}
              className="aspect-square flex items-center justify-center text-xs rounded-full relative"
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: isWedding ? "#fff" : valid ? "#8B7355" : "transparent",
                background: isWedding ? "#E0C5A0" : "transparent",
                fontWeight: isWedding ? 600 : 400,
              }}
            >
              {valid ? day : ""}
              {isWedding && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#E0C5A0]"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          );
        })}
      </div>

      <Button
        onClick={addToCalendar}
        className="w-full bg-[#E0C5A0] hover:bg-[#D2B48C] text-white border-0 mt-1"
        style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", letterSpacing: "0.05em" }}
      >
        <Calendar className="w-3.5 h-3.5 mr-2" />
        Ajouter à mon calendrier
      </Button>
    </div>
  );
}

// ─── Map block ────────────────────────────────────────────────────

function MapBlock() {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full overflow-hidden rounded-sm" style={{ aspectRatio: "16/9" }}>
        <iframe
          title="Lieu du mariage"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.0!2d2.3488!3d48.8534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmlsbGEgQXp1cmU!5e0!3m2!1sfr!2sfr!4v1680000000000"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <Button
        onClick={() => window.open("https://maps.google.com", "_blank")}
        className="w-full bg-[#E0C5A0] hover:bg-[#D2B48C] text-white border-0"
        style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", letterSpacing: "0.05em" }}
      >
        <MapPin className="w-3.5 h-3.5 mr-2" />
        Ouvrir dans Google Maps
      </Button>
    </div>
  );
}

// ─── Cards data ───────────────────────────────────────────────────

interface CardData {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  content?: string;
  extra?: React.ReactNode;
  simpleButton?: { label: string; action: () => void };
}

const cardsData: CardData[] = [
  {
    icon: Shirt,
    title: "Code Vestimentaire",
    subtitle: "Harmonie naturelle",
    content: "Teintes naturelles — lin blanc, beiges, pastels — pour des photos douces et assorties.",
    simpleButton: {
      label: "Voir le Dress Code",
      action: () => document.getElementById("dress-code")?.scrollIntoView({ behavior: "smooth" }),
    },
  },
  {
    icon: Calendar,
    title: "Notez la Date",
    subtitle: "27 · 10 · 2027",
    extra: <CalendarBlock />,
  },
  {
    icon: MapPin,
    title: "Lieu & Heures",
    subtitle: "Villa Azure · Bord de Mer",
    content: "Cérémonie : 15h00\nRéception : 18h00 — Terrasse des Vagues",
    extra: <MapBlock />,
  },
];

// ─── Main component ───────────────────────────────────────────────

export function EventDetailsCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
      {cardsData.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={i}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-[#E0C5A0]/30 hover:border-[#E0C5A0] transition-all duration-300 hover:shadow-lg p-6 h-full">
              <div className="flex flex-col items-center text-center gap-4 h-full">
                {/* icon */}
                <div className="w-14 h-14 rounded-full bg-[#FFFBF0] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-[#E0C5A0]" />
                </div>

                {/* heading */}
                <div>
                  <h3
                    className="text-2xl text-[#A3B18A]"
                    style={{ fontFamily: "Great Vibes, cursive" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-xs tracking-widest uppercase mt-0.5 opacity-55"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "#8B7355" }}
                  >
                    {card.subtitle}
                  </p>
                </div>

                {/* text content */}
                {card.content && (
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "#8B7355" }}
                  >
                    {card.content}
                  </p>
                )}

                {/* rich block (calendar or map) */}
                {card.extra && <div className="w-full">{card.extra}</div>}

                {/* simple CTA */}
                {card.simpleButton && (
                  <Button
                    onClick={card.simpleButton.action}
                    className="bg-[#E0C5A0] hover:bg-[#D2B48C] text-white border-0 mt-auto"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {card.simpleButton.label}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
