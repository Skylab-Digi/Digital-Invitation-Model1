import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface Props {
  onOpen: () => void;
}

// ─── constants ────────────────────────────────────────────────────
const W      = 380;   // envelope width
const H      = 248;   // envelope body height
const FLAP_H = 158;   // flap triangle height
const SEAL   = 46;    // seal radius

// ─── palette ─────────────────────────────────────────────────────
const ENV_COLOR    = "#E8DFCC";
const SHADOW_COLOR = "#D6CBB4";
const LINING_COLOR = "#D9CEBC";
const SEAL_COLOR   = "#C49A5A";
const GOLD         = "#E0C5A0";
const SAGE         = "#A3B18A";
const CREAM        = "#FEFDF5";

// ─── types ───────────────────────────────────────────────────────
type Phase = "idle" | "flap-open" | "card-rise" | "exit";

// ─── helpers ─────────────────────────────────────────────────────
function usePhaseTimer(
  phase: Phase,
  setPhase: (p: Phase) => void,
  onOpen: () => void
) {
  useEffect(() => {
    const map: Partial<Record<Phase, [Phase | null, number]>> = {
      "flap-open": ["card-rise", 850],
      "card-rise": ["exit",      1050],
      "exit":      [null,        550],
    };
    const entry = map[phase];
    if (!entry) return;
    const [next, delay] = entry;
    const t = setTimeout(() => {
      if (next) setPhase(next);
      else onOpen();
    }, delay);
    return () => clearTimeout(t);
  }, [phase, setPhase, onOpen]);
}

// ─── sub-components ───────────────────────────────────────────────

/** 
 * The rectangular envelope body (The Pocket).
 * Uses an SVG path to create the V-neck opening so the card can slide out.
 */
function EnvelopeBody() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0E8D5" />
            <stop offset="100%" stopColor={ENV_COLOR} />
          </linearGradient>
        </defs>
        {/* V-cutout matches the tip of the flap (FLAP_H) */}
        <path 
          d={`M 0,0 L ${W / 2},${FLAP_H} L ${W},0 L ${W},${H} L 0,${H} Z`} 
          fill="url(#bodyGrad)" 
        />
        <line x1="0" y1="0" x2={W / 2} y2={FLAP_H} stroke={SHADOW_COLOR} strokeWidth="1" />
        <line x1={W} y1="0" x2={W / 2} y2={FLAP_H} stroke={SHADOW_COLOR} strokeWidth="1" />
        <line x1="0" y1={H} x2={W / 2} y2={FLAP_H} stroke={SHADOW_COLOR} strokeWidth="0.7" />
        <line x1={W} y1={H} x2={W / 2} y2={FLAP_H} stroke={SHADOW_COLOR} strokeWidth="0.7" />
      </svg>
    </div>
  );
}

/** 
 * The triangular flap. 
 * Starts pointing DOWN inside the envelope and rotates UP from the top origin.
 */
function Flap({ isOpen }: { isOpen: boolean }) {
  // Triangle pointing down
  const pts = `0,0 ${W},0 ${W / 2},${FLAP_H}`;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: W,
        height: FLAP_H,
        top: 0,
        left: 0,
        transformOrigin: "top center", // Pivot from the top edge
        transformStyle: "preserve-3d",
      }}
      initial={{ rotateX: 0, zIndex: 5 }}
     animate={{ 
        rotateX: isOpen ? 180 : 0, 
        zIndex: isOpen ? 1 : 5 
      }}
      transition={{ 
        // Matches: transition: transform 0.4s ease
        rotateX: { duration: 0.4, ease: "easeOut" }, 
        // Matches: transition: z-index 0.6s
        zIndex: { duration: 0.6 } 
      }}
    >
      {/* Front face */}
      <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${FLAP_H}`}>
          <polygon points={pts} fill={ENV_COLOR} />
        </svg>
      </div>

      {/* Back face (Lining) - visible after 180° rotation */}
      <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${FLAP_H}`}>
          <defs>
            <pattern id="stripe" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="12" stroke={SAGE} strokeWidth="0.9" strokeOpacity="0.25" />
            </pattern>
          </defs>
          <polygon points={pts} fill={LINING_COLOR} />
          <polygon points={pts} fill="url(#stripe)" />
        </svg>
      </div>
    </motion.div>
  );
}

/** The wax seal — fades out right before the flap opens */
function WaxSeal({ visible, onClick }: { visible: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      style={{
        position: "absolute",
        width: SEAL * 2,
        height: SEAL * 2,
        top: FLAP_H - SEAL, // Centered perfectly on the tip of the downward flap
        left: "50%",
        marginLeft: -SEAL,
        zIndex: 6,
        borderRadius: "50%",
        border: "none",
        padding: 0,
        cursor: "pointer",
        background: `radial-gradient(circle at 36% 34%, #EDD5AF, ${SEAL_COLOR})`,
        boxShadow: `0 4px 20px rgba(140,90,30,0.38), inset 0 1px 4px rgba(255,235,180,0.45)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      whileHover={visible ? { scale: 1.07 } : {}}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div style={{ position: "absolute", inset: 5, borderRadius: "50%", border: "1px solid rgba(255,245,200,0.38)" }} />
      <span style={{ fontFamily: "Great Vibes, cursive", fontSize: "1.5rem", color: "#FFF3D8", zIndex: 1, marginRight: "5px" }}>
        H&I
      </span>
    </motion.button>
  );
}

/** The invitation card — Slides upward to emerge */
function InvitationCard({ isRising }: { isRising: boolean }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 10,
        left: 22,
        right: 22,
        height: H - 20,
        zIndex: 2, // Sits safely between the back shadow and the front pocket
        background: "linear-gradient(160deg, #FFFEF8 0%, #FBF6EA 100%)",
        borderRadius: 2,
        boxShadow: "0 8px 28px rgba(100,75,30,0.14)",
        overflow: "hidden",
      }}
      animate={{ y: isRising ? -160 : 0 }}
      transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* double border inset */}
      <div style={{ position: "absolute", inset: 10, border: `1px solid ${GOLD}55`, borderRadius: 1 }} />
      
      {/* text content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <p style={{ fontFamily:"Montserrat, sans-serif", fontSize:"0.58rem", letterSpacing:"0.3em", color:GOLD, textTransform:"uppercase" }}>
          Vous êtes invité
        </p>
        <p style={{ fontFamily:"Great Vibes, cursive", fontSize:"2.3rem", color:"#7A5A2A", lineHeight:1.1, textAlign:"center" }}>
          Haythem &amp; Islem
        </p>
        <div style={{ width:72, height:1, background:GOLD, opacity:0.5 }} />
        <p style={{ fontFamily:"Cormorant Garamond, serif", fontSize:"0.92rem", color:SAGE, letterSpacing:"0.14em" }}>
          27 · 10 · 2027
        </p>
      </div>
    </motion.div>
  );
}

// ─── main ─────────────────────────────────────────────────────────

export function EnvelopeEntrance({ onOpen }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  usePhaseTimer(phase, setPhase, onOpen);

  const flapOpen  = phase !== "idle";
  const cardRises = phase === "card-rise" || phase === "exit";
  const sealShow  = phase === "idle";
  const exiting   = phase === "exit";

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(158deg, ${CREAM} 0%, #EDE5D0 100%)`,
      }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={exiting ? { duration: 0.5 } : {}}
    >
      <div style={{ perspective: 1200 }}>
        <motion.div
          style={{ position: "relative", width: W, height: H }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 1. Back of the envelope */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: ENV_COLOR, borderRadius: 2, boxShadow: "0 20px 60px rgba(90,65,20,0.18)" }} />

          {/* 2. Invitation card (slides up between back and pocket) */}
          <InvitationCard isRising={cardRises} />

          {/* 3. Envelope body (The front pocket) */}
          <EnvelopeBody />

          {/* 4. Flap (Rotates from top, dynamically changes Z-index) */}
          <Flap isOpen={flapOpen} />

          {/* 5. Wax seal */}
          <WaxSeal visible={sealShow} onClick={() => phase === "idle" && setPhase("flap-open")} />
        </motion.div>
      </div>

      <motion.p
        style={{ marginTop: 44, fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: SAGE }}
        initial={{ opacity: 0, y: 8 }}
        animate={flapOpen ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
        transition={flapOpen ? { duration: 0.2 } : { delay: 1.0, duration: 0.55 }}
      >
        Cliquer ici pour ouvrir l'invitation
      </motion.p>
    </motion.div>
  );
}