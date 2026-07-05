import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { KeyRound, ShieldCheck, Users, CalendarDays, ImageIcon, LogOut } from "lucide-react";

const PASSWORD = "demoiselles2027";

// ─── locked state ─────────────────────────────────────────────────

function LockedView({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue]   = useState("");
  const [error, setError]   = useState("");
  const [shake, setShake]   = useState(false);
  const inputRef            = useRef<HTMLInputElement>(null);

  const attempt = () => {
    if (value === PASSWORD) {
      setError("");
      onUnlock();
    } else {
      setError("Mot de passe incorrect. Veuillez réessayer.");
      setShake(true);
      setValue("");
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center" style={{ gap: 32 }}>
      {/* icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "rgba(224,197,160,0.14)",
          border: "1px solid rgba(224,197,160,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KeyRound style={{ width: 28, height: 28, color: "#E0C5A0" }} strokeWidth={1.5} />
      </motion.div>

      {/* heading */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#A3B18A",
          }}
        >
          Portail sécurisé
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "#6B5C3E",
            lineHeight: 1.2,
          }}
        >
          Accès Administration
        </h2>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.78rem",
            color: "#9B8B6E",
            lineHeight: 1.7,
            maxWidth: 320,
            margin: "0 auto",
          }}
        >
          Espace réservé à l'équipe organisatrice du mariage.
          Saisissez votre mot de passe pour continuer.
        </p>
      </div>

      {/* divider */}
      <div
        style={{
          width: 48,
          height: 1,
          background: "linear-gradient(to right, transparent, #E0C5A0, transparent)",
        }}
      />

      {/* form */}
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, -3, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 12 }}
      >
        {/* password input */}
        <div style={{ position: "relative" }}>
          <input
            ref={inputRef}
            type="password"
            placeholder="Mot de passe"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "14px 48px 14px 18px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.82rem",
              letterSpacing: "0.06em",
              color: "#6B5C3E",
              background: "#FEFCF5",
              border: `1px solid ${error ? "#C08060" : "rgba(224,197,160,0.55)"}`,
              borderRadius: 3,
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#A3B18A";
              e.target.style.boxShadow = "0 0 0 3px rgba(163,177,138,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? "#C08060" : "rgba(224,197,160,0.55)";
              e.target.style.boxShadow = "none";
            }}
          />
          <KeyRound
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              width: 16,
              height: 16,
              color: "#C8B898",
              pointerEvents: "none",
            }}
            strokeWidth={1.5}
          />
        </div>

        {/* error message */}
        <div style={{ minHeight: 18 }}>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.72rem",
                  color: "#B06040",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* submit button */}
        <button
          onClick={attempt}
          style={{
            width: "100%",
            padding: "13px 0",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#fff",
            background: "linear-gradient(135deg, #E0C5A0, #C9A878)",
            border: "none",
            borderRadius: 3,
            cursor: "pointer",
            transition: "opacity 0.2s, transform 0.15s",
          }}
          onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.opacity = "0.88"; }}
          onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
          onMouseDown={(e) => { (e.target as HTMLButtonElement).style.transform = "scale(0.98)"; }}
          onMouseUp={(e) => { (e.target as HTMLButtonElement).style.transform = "scale(1)"; }}
        >
          Accéder
        </button>
      </motion.div>
    </div>
  );
}

// ─── unlocked state ───────────────────────────────────────────────

const adminSections = [
  {
    icon: Users,
    label: "Invités",
    description: "Gérer la liste des invités et les confirmations RSVP.",
  },
  {
    icon: CalendarDays,
    label: "Planning",
    description: "Retrotroplanning, essayages, répétitions et journée J.",
  },
  {
    icon: ImageIcon,
    label: "Moodboard",
    description: "Inspirations visuelles, tenues, décoration et fleurs.",
  },
];

function UnlockedView({ onLock }: { onLock: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}
    >
      {/* success icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "rgba(163,177,138,0.14)",
          border: "1px solid rgba(163,177,138,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ShieldCheck style={{ width: 28, height: 28, color: "#A3B18A" }} strokeWidth={1.5} />
      </div>

      {/* heading */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#A3B18A",
          }}
        >
          Accès autorisé
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "2rem",
            fontWeight: 400,
            color: "#6B5C3E",
          }}
        >
          Bienvenue dans l'espace admin
        </h2>
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.78rem",
            color: "#9B8B6E",
            lineHeight: 1.7,
          }}
        >
          Carmela & Benedict · 27 Octobre 2027
        </p>
      </div>

      {/* divider */}
      <div
        style={{
          width: 48,
          height: 1,
          background: "linear-gradient(to right, transparent, #E0C5A0, transparent)",
        }}
      />

      {/* cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          width: "100%",
        }}
      >
        {adminSections.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              style={{
                background: "#FEFCF5",
                border: "1px solid rgba(224,197,160,0.35)",
                borderRadius: 4,
                padding: "24px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              whileHover={{
                boxShadow: "0 6px 24px rgba(100,75,30,0.09)",
                borderColor: "rgba(163,177,138,0.6)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(224,197,160,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon style={{ width: 20, height: 20, color: "#E0C5A0" }} strokeWidth={1.5} />
              </div>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.05rem",
                  color: "#7A6040",
                  textAlign: "center",
                }}
              >
                {s.label}
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.7rem",
                  color: "#9B8B6E",
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                {s.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* logout */}
      <button
        onClick={onLock}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#B8A888",
          padding: "6px 0",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#8B7355")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8A888")}
      >
        <LogOut style={{ width: 13, height: 13 }} strokeWidth={1.5} />
        Se déconnecter
      </button>
    </motion.div>
  );
}

// ─── main export ──────────────────────────────────────────────────

export function BridesmaidsPortal() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: 560,
          background: "#FFFBF0",
          borderRadius: 8,
          padding: "52px 48px",
          boxShadow: "0 8px 40px rgba(100,75,30,0.08), 0 1px 4px rgba(100,75,30,0.05)",
          border: "1px solid rgba(224,197,160,0.25)",
        }}
      >
        <AnimatePresence mode="wait">
          {unlocked ? (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UnlockedView onLock={() => setUnlocked(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LockedView onUnlock={() => setUnlocked(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
