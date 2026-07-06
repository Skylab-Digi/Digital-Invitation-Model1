import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Mic, MicOff, Square, Play, Trash2, Plus, Minus, Users } from "lucide-react";

// ─── design tokens (inline for full control) ──────────────────────
const GOLD  = "#E0C5A0";
const SAGE  = "#A3B18A";
const BROWN = "#8B7355";
const CREAM = "#FEFCF5";
const SAND  = "#F5EFE0";

// ─── reusable field wrapper ───────────────────────────────────────
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <label
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: SAGE,
          }}
        >
          {label}
        </label>
        {hint && (
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.65rem",
              color: BROWN,
              opacity: 0.5,
              fontStyle: "italic",
            }}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// shared input style
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.82rem",
  color: "#6B5C3E",
  background: CREAM,
  border: `1px solid rgba(224,197,160,0.5)`,
  borderRadius: 3,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        borderColor: focused ? SAGE : "rgba(224,197,160,0.5)",
        boxShadow: focused ? `0 0 0 3px rgba(163,177,138,0.12)` : "none",
        ...props.style,
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

function StyledTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      style={{
        ...inputStyle,
        borderColor: focused ? SAGE : "rgba(224,197,160,0.5)",
        boxShadow: focused ? `0 0 0 3px rgba(163,177,138,0.12)` : "none",
        resize: "none",
        minHeight: 88,
        ...props.style,
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
    />
  );
}

// ─── attendance pill selector ─────────────────────────────────────
type Attendance = "yes" | "maybe" | "no" | "";

const attendanceOptions: { value: Attendance; emoji: string; label: string }[] = [
  { value: "yes",   emoji: "🎉​", label: "Oui, j'arrive !" },
  { value: "maybe", emoji: "🤔", label: "Peut-être..." },
  { value: "no",    emoji: "😢", label: "Je ne pourrai pas" },
];

function AttendancePicker({
  value,
  onChange,
}: {
  value: Attendance;
  onChange: (v: Attendance) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {attendanceOptions.map((opt) => {
        const active = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            whileTap={{ scale: 0.96 }}
            style={{
              flex: 1,
              minWidth: 110,
              padding: "12px 10px",
              borderRadius: 3,
              border: `1.5px solid ${active ? (opt.value === "yes" ? SAGE : opt.value === "maybe" ? GOLD : "#C08060") : "rgba(224,197,160,0.4)"}`,
              background: active
                ? opt.value === "yes"
                  ? "rgba(163,177,138,0.14)"
                  : opt.value === "maybe"
                  ? "rgba(224,197,160,0.14)"
                  : "rgba(192,128,96,0.1)"
                : CREAM,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              transition: "border-color 0.2s, background 0.2s",
            }}
          >
            <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{opt.emoji}</span>
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
                color: active ? "#5A4030" : BROWN,
                fontWeight: active ? 600 : 400,
              }}
            >
              {opt.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── guest counter ────────────────────────────────────────────────
function GuestCounter({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "10px 16px",
        background: CREAM,
        border: "1px solid rgba(224,197,160,0.5)",
        borderRadius: 3,
        width: "fit-content",
      }}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: `1px solid ${GOLD}`,
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: GOLD,
          transition: "background 0.15s",
        }}
      >
        <Minus style={{ width: 13, height: 13 }} />
      </button>
      <span
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "1.5rem",
          color: "#6B5C3E",
          minWidth: 28,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(10, value + 1))}
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: `1px solid ${GOLD}`,
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: GOLD,
          transition: "background 0.15s",
        }}
      >
        <Plus style={{ width: 13, height: 13 }} />
      </button>
      <span
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.72rem",
          color: BROWN,
          opacity: 0.65,
        }}
      >
        {value === 0 ? "seul(e)" : value === 1 ? "accompagnant" : "accompagnants"}
      </span>
    </div>
  );
}

// ─── voice recorder ───────────────────────────────────────────────
function VoiceRecorder({
  blob,
  onBlob,
}: {
  blob: Blob | null;
  onBlob: (b: Blob | null) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds]     = useState(0);
  const [playing, setPlaying]     = useState(false);
  const mediaRef   = useRef<MediaRecorder | null>(null);
  const chunksRef  = useRef<Blob[]>([]);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef   = useRef<HTMLAudioElement | null>(null);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const b = new Blob(chunksRef.current, { type: "audio/webm" });
        onBlob(b);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRef.current = mr;
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      alert("Microphone non accessible.");
    }
  };

  const stop = () => {
    mediaRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
  };

  const play = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = new Audio(url);
    audioRef.current = a;
    a.play();
    setPlaying(true);
    a.onended = () => setPlaying(false);
  };

  const discard = () => {
    audioRef.current?.pause();
    onBlob(null);
    setSeconds(0);
    setPlaying(false);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      style={{
        padding: "16px",
        background: CREAM,
        border: "1px solid rgba(224,197,160,0.45)",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap",
      }}
    >
      {!blob ? (
        <>
          <motion.button
            type="button"
            onClick={recording ? stop : start}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: recording ? "#C08060" : GOLD,
              flexShrink: 0,
            }}
          >
            {recording
              ? <Square style={{ width: 16, height: 16, color: "#fff" }} />
              : <Mic style={{ width: 18, height: 18, color: "#fff" }} />
            }
          </motion.button>

          <div>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.75rem",
                color: recording ? "#C08060" : BROWN,
                fontWeight: recording ? 600 : 400,
              }}
            >
              {recording ? `Enregistrement… ${fmt(seconds)}` : "Appuyez pour enregistrer"}
            </p>
            {recording && (
              <motion.div
                style={{ display: "flex", gap: 3, marginTop: 4 }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              >
                {[3, 5, 4, 6, 3].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 3,
                      height: h * 3,
                      borderRadius: 2,
                      background: "#C08060",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={playing ? undefined : play}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
              cursor: playing ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: SAGE,
              flexShrink: 0,
            }}
          >
            <Play style={{ width: 16, height: 16, color: "#fff" }} />
          </button>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", color: BROWN, flex: 1 }}>
            {playing ? "Lecture en cours…" : `Message enregistré · ${fmt(seconds)}`}
          </p>
          <button
            type="button"
            onClick={discard}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#C08060",
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.68rem",
              opacity: 0.75,
            }}
          >
            <Trash2 style={{ width: 13, height: 13 }} /> Supprimer
          </button>
        </>
      )}
    </div>
  );
}

// ─── success screen ───────────────────────────────────────────────
function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: "48px 0",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "rgba(163,177,138,0.14)",
          border: "1px solid rgba(163,177,138,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckCircle2 style={{ width: 32, height: 32, color: SAGE }} strokeWidth={1.5} />
      </div>
      <h3
        style={{ fontFamily: "Great Vibes, cursive", fontSize: "2.8rem", color: SAGE }}
      >
        Merci infiniment !
      </h3>
      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.82rem",
          color: BROWN,
          lineHeight: 1.8,
          maxWidth: 340,
        }}
      >
        Votre réponse a bien été enregistrée. Nous avons hâte de partager ce moment avec vous.
      </p>
      <p style={{ fontFamily: "Great Vibes, cursive", fontSize: "1.6rem", color: GOLD, opacity: 0.7 }}>
        Carmela & Benedict
      </p>
    </motion.div>
  );
}

// ─── divider ─────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      style={{
        width: "100%",
        height: 1,
        background: "linear-gradient(to right, transparent, rgba(224,197,160,0.4), transparent)",
      }}
    />
  );
}

// ─── main form ────────────────────────────────────────────────────
export function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    attendance: "" as Attendance,
    fullName: "",
    phone: "",
    withCompany: "" as "alone" | "company" | "",
    guestCount: 1,
    note: "",
  });
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);

  const set = <K extends keyof typeof form>(key: K, val: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RSVP:", form, voiceBlob);
    setSubmitted(true);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          background: "rgba(255,251,240,0.9)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(224,197,160,0.35)",
          borderRadius: 6,
          padding: "48px 40px",
          boxShadow: "0 8px 40px rgba(100,75,30,0.08), 0 1px 4px rgba(100,75,30,0.05)",
        }}
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SuccessScreen />
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* header */}
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: SAGE,
                    marginBottom: 10,
                  }}
                >
                  Réponse attendue avant le 1er Août 2027
                </p>
                <h2
                  style={{
                    fontFamily: "Great Vibes, cursive",
                    fontSize: "2.6rem",
                    color: "#6B5C3E",
                    lineHeight: 1,
                  }}
                >
                  Confirmez votre présence
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 28 }}
              >

                {/* 1 — attendance */}
                <Field label="Serez-vous avec nous ?">
                  <AttendancePicker
                    value={form.attendance}
                    onChange={(v) => set("attendance", v)}
                  />
                </Field>

                <Divider />

                {/* 2 — full name */}
                <Field label="Nom complet">
                  <StyledInput
                    required
                    placeholder="Prénom Nom"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </Field>

                {/* 3 — phone */}
                <Field label="Téléphone / WhatsApp">
                  <StyledInput
                    type="tel"
                    placeholder="Saisissez votre numéro"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </Field>

                <Divider />

                {/* 4 — alone or with company */}
                <Field label="Vous venez…">
                  <div style={{ display: "flex", gap: 10 }}>
                    {(["alone", "company"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("withCompany", opt)}
                        style={{
                          flex: 1,
                          padding: "12px 10px",
                          borderRadius: 3,
                          border: `1.5px solid ${form.withCompany === opt ? SAGE : "rgba(224,197,160,0.45)"}`,
                          background: form.withCompany === opt ? "rgba(163,177,138,0.1)" : CREAM,
                          cursor: "pointer",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.75rem",
                          color: form.withCompany === opt ? "#5A4030" : BROWN,
                          fontWeight: form.withCompany === opt ? 600 : 400,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 7,
                          transition: "border-color 0.2s, background 0.2s",
                        }}
                      >
                        <Users style={{ width: 14, height: 14 }} />
                        {opt === "alone" ? "Seul(e)" : "En compagnie"}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {form.withCompany === "company" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden", marginTop: 12 }}
                      >
                        <div
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "0.68rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: SAGE,
                            marginBottom: 8,
                          }}
                        >
                          Combien de personnes viennent avec vous ?
                        </div>
                        <GuestCounter
                          value={form.guestCount}
                          onChange={(n) => set("guestCount", n)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Field>

                <Divider />

                {/* 6 — note */}
                <Field label="Note" hint="optionnel">
                  <StyledTextarea
                    placeholder="Allergies, régimes alimentaires, un mot pour les mariés…"
                    value={form.note}
                    onChange={(e) => set("note", e.target.value)}
                  />
                </Field>

                {/* 7 — voice message */}
                <Field label="Message vocal" hint="optionnel">
                  <VoiceRecorder blob={voiceBlob} onBlob={setVoiceBlob} />
                </Field>

                <Divider />

                {/* submit */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "16px 0",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#fff",
                    background: "linear-gradient(135deg, #E0C5A0, #C9A878)",
                    border: "none",
                    borderRadius: 3,
                    cursor: "pointer",
                    opacity: form.attendance && form.fullName ? 1 : 0.55,
                    transition: "opacity 0.2s",
                  }}
                  disabled={!form.attendance || !form.fullName}
                >
                  Envoyer ma réponse
                </motion.button>

              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
