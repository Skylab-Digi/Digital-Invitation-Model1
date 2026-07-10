import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── mobile detection ─────────────────────────────────────────────
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

import {
  KeyRound, ShieldCheck, LogOut,
  ChevronLeft, ChevronRight, Volume2,
  Users, UserCheck, UserX, HelpCircle,
  RefreshCw,
} from "lucide-react";
import { supabase } from "../../lib/SupabaseClient";

// ─── palette ─────────────────────────────────────────────────────
const GOLD   = "#E0C5A0";
const SAGE   = "#A3B18A";
const BROWN  = "#8B7355";
const CREAM  = "#FEFCF5";
const BORDER = "rgba(224,197,160,0.32)";
const ROWS_PER_PAGE = 7;

// ─── types ───────────────────────────────────────────────────────
interface GuestRow {
  id: number;
  nom?: string;
  fullName?: string;
  telephone?: string;
  phone?: string;
  presence?: string;
  attendance?: string;
  accompagnement?: string;
  withCompany?: string;
  nb_accompagnants?: number;
  guestCount?: number;
  note?: string;
  message_vocal_url?: string | null;
  created_at?: string;
}

// ─── helpers ─────────────────────────────────────────────────────
function guestName(g: GuestRow) { return g.nom || g.fullName || "—"; }
function guestPhone(g: GuestRow) { return g.telephone || g.phone || "—"; }
function guestPresence(g: GuestRow) { return g.presence || g.attendance || "—"; }
function guestCompany(g: GuestRow) {
  const v = g.accompagnement || g.withCompany || "";
  if (v === "alone") return "Seul(e)";
  if (v === "company") return "Avec accompagnants";
  return v || "—";
}
function guestCount(g: GuestRow) {
  const n = g.nb_accompagnants ?? g.guestCount;
  return n !== undefined ? String(n) : "0";
}

// ─── presence badge ───────────────────────────────────────────────
function PresenceBadge({ value }: { value: string }) {
  const lower = value.toLowerCase();
  const isYes   = lower === "oui" || lower === "yes";
  const isNo    = lower === "non" || lower === "no";
  const isMaybe = lower === "peut-être" || lower === "maybe";

  const Icon   = isYes ? UserCheck : isNo ? UserX : HelpCircle;
  const color  = isYes ? SAGE : isNo ? "#B06050" : GOLD;
  const bg     = isYes ? "rgba(163,177,138,0.12)" : isNo ? "rgba(176,96,80,0.1)" : "rgba(224,197,160,0.15)";
  const label  = isYes ? "Oui" : isNo ? "Non" : "Peut-être";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 10px",
        borderRadius: 20,
        background: bg,
        border: `1px solid ${color}40`,
        fontFamily: "Montserrat, sans-serif",
        fontSize: "0.68rem",
        fontWeight: 500,
        color,
        whiteSpace: "nowrap",
      }}
    >
      <Icon style={{ width: 11, height: 11 }} strokeWidth={2} />
      {label}
    </span>
  );
}

// ─── stat card ────────────────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 100,
        padding: "16px 20px",
        background: CREAM,
        border: `1px solid ${BORDER}`,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "2rem",
          color,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: BROWN,
          opacity: 0.65,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── pagination ───────────────────────────────────────────────────
function Pagination({
  page, total, perPage, onChange,
}: {
  page: number; total: number; perPage: number; onChange: (p: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  if (pages <= 1) return null;

  const btnStyle = (active: boolean, disabled: boolean): React.CSSProperties => ({
    width: 32,
    height: 32,
    borderRadius: 3,
    border: `1px solid ${active ? GOLD : BORDER}`,
    background: active ? GOLD : "transparent",
    color: active ? "#fff" : BROWN,
    fontFamily: "Montserrat, sans-serif",
    fontSize: "0.72rem",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.35 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.15s, border-color 0.15s",
  });

  // show at most 5 page numbers
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const end   = Math.min(pages, start + 4);
  const nums  = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 16,
        borderTop: `1px solid ${BORDER}`,
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      <span
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.68rem",
          color: BROWN,
          opacity: 0.6,
        }}
      >
        Page {page} sur {pages} · {total} réponse{total > 1 ? "s" : ""}
      </span>

      <div style={{ display: "flex", gap: 4 }}>
        <button style={btnStyle(false, page === 1)} onClick={() => page > 1 && onChange(page - 1)} disabled={page === 1}>
          <ChevronLeft style={{ width: 14, height: 14 }} />
        </button>
        {start > 1 && (
          <>
            <button style={btnStyle(page === 1, false)} onClick={() => onChange(1)}>1</button>
            {start > 2 && <span style={{ padding: "0 2px", color: BROWN, opacity: 0.4, alignSelf: "center", fontSize: "0.8rem" }}>…</span>}
          </>
        )}
        {nums.map((n) => (
          <button key={n} style={btnStyle(page === n, false)} onClick={() => onChange(n)}>{n}</button>
        ))}
        {end < pages && (
          <>
            {end < pages - 1 && <span style={{ padding: "0 2px", color: BROWN, opacity: 0.4, alignSelf: "center", fontSize: "0.8rem" }}>…</span>}
            <button style={btnStyle(page === pages, false)} onClick={() => onChange(pages)}>{pages}</button>
          </>
        )}
        <button style={btnStyle(false, page === pages)} onClick={() => page < pages && onChange(page + 1)} disabled={page === pages}>
          <ChevronRight style={{ width: 14, height: 14 }} />
        </button>
      </div>
    </div>
  );
}

// ─── data table ───────────────────────────────────────────────────
const COLS_DESKTOP = [
  { key: "nom",      label: "Nom",            w: "18%" },
  { key: "tel",      label: "Téléphone",       w: "14%" },
  { key: "presence", label: "Présence",        w: "11%" },
  { key: "company",  label: "Accompagnement",  w: "15%" },
  { key: "count",    label: "Acc.",            w: "6%"  },
  { key: "note",     label: "Note",            w: "26%" },
  { key: "audio",    label: "Message vocal",   w: "10%" },
];

const COLS_TABLET = [
  { key: "nom",      label: "Nom",            w: "22%" },
  { key: "presence", label: "Présence",        w: "14%" },
  { key: "company",  label: "Accompagnement",  w: "18%" },
  { key: "count",    label: "Acc.",            w: "8%"  },
  { key: "note",     label: "Note",            w: "26%" },
  { key: "audio",    label: "Message",         w: "12%" },
];

const COLS_MOBILE = [
  { key: "nom",      label: "Nom",            w: "35%" },
  { key: "presence", label: "Présence",        w: "25%" },
  { key: "count",    label: "Acc.",            w: "12%" },
  { key: "audio",    label: "Msg",             w: "28%" },
];

function GuestTable({ rows }: { rows: GuestRow[] }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 }>({ key: "nom", dir: 1 });
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const COLS = isMobile ? COLS_MOBILE : isTablet ? COLS_TABLET : COLS_DESKTOP;

  // sort
  const sorted = [...rows].sort((a, b) => {
    const va = sort.key === "nom"      ? guestName(a)
             : sort.key === "presence" ? guestPresence(a)
             : sort.key === "count"    ? Number(guestCount(a))
             : guestName(a);
    const vb = sort.key === "nom"      ? guestName(b)
             : sort.key === "presence" ? guestPresence(b)
             : sort.key === "count"    ? Number(guestCount(b))
             : guestName(b);
    if (va < vb) return -sort.dir;
    if (va > vb) return sort.dir;
    return 0;
  });

  const pageRows = sorted.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const toggleSort = (key: string) =>
    setSort((s) => s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 });

  const thStyle = (key: string): React.CSSProperties => ({
    padding: "12px 14px",
    paddingTop: isMobile ? "9px" : "12px",
    paddingBottom: isMobile ? "9px" : "12px",
    paddingLeft: isMobile ? "8px" : "14px",
    paddingRight: isMobile ? "8px" : "14px",
    textAlign: "left",
    fontFamily: "Montserrat, sans-serif",
    fontSize: isMobile ? "0.55rem" : "0.62rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: SAGE,
    fontWeight: 500,
    cursor: ["nom", "presence", "count"].includes(key) ? "pointer" : "default",
    userSelect: "none",
    whiteSpace: "nowrap",
    borderBottom: `1px solid ${BORDER}`,
    background: "#FDF9F0",
  });

  const tdStyle: React.CSSProperties = {
    padding: "11px 14px",
    paddingTop: isMobile ? "8px" : "11px",
    paddingBottom: isMobile ? "8px" : "11px",
    paddingLeft: isMobile ? "8px" : "14px",
    paddingRight: isMobile ? "8px" : "14px",
    fontFamily: "Montserrat, sans-serif",
    fontSize: isMobile ? "0.65rem" : "0.75rem",
    color: "#6B5C3E",
    borderBottom: `1px solid ${BORDER}`,
    verticalAlign: "middle",
  };

  const sortIcon = (key: string) => {
    if (sort.key !== key) return <span style={{ opacity: 0.25, marginLeft: 4 }}>↕</span>;
    return <span style={{ marginLeft: 4, color: GOLD }}>{sort.dir === 1 ? "↑" : "↓"}</span>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ overflowX: "auto", borderRadius: 4, border: `1px solid ${BORDER}`, WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: isMobile ? 280 : 720 }}>
          <colgroup>
            {COLS.map((c) => <col key={c.key} style={{ width: c.w }} />)}
          </colgroup>
          <thead>
            <tr>
              {COLS.map((c) => (
                <th
                  key={c.key}
                  style={thStyle(c.key)}
                  onClick={() => ["nom", "presence", "count"].includes(c.key) && toggleSort(c.key)}
                >
                  {c.label}
                  {["nom", "presence", "count"].includes(c.key) && sortIcon(c.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ ...tdStyle, textAlign: "center", padding: "32px", opacity: 0.5 }}>
                  Aucune réponse enregistrée.
                </td>
              </tr>
            ) : (
              pageRows.map((g, idx) => (
                <motion.tr
                  key={g.id ?? idx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25 }}
                  style={{
                    background: idx % 2 === 0 ? "#FFFDF7" : CREAM,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(224,197,160,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#FFFDF7" : CREAM)}
                >
                  {/* Nom */}
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{guestName(g)}</td>
                  {/* Téléphone (hidden on mobile) */}
                  {!isMobile && <td style={{ ...tdStyle, opacity: 0.75 }}>{guestPhone(g)}</td>}
                  {/* Présence */}
                  <td style={tdStyle}><PresenceBadge value={guestPresence(g)} /></td>
                  {/* Accompagnement (hidden on mobile) */}
                  {!isMobile && <td style={{ ...tdStyle, opacity: 0.8 }}>{guestCompany(g)}</td>}
                  {/* Nb acc. */}
                  <td style={{ ...tdStyle, textAlign: "center" }}>{guestCount(g)}</td>
                  {/* Note (hidden on mobile & tablet) */}
                  {!isMobile && !isTablet && (
                  <td
                    style={{
                      ...tdStyle,
                      maxWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      opacity: 0.7,
                    }}
                    title={g.note || ""}
                  >
                    {g.note || <span style={{ opacity: 0.3 }}>—</span>}
                  </td>
                  )}
                  {/* Audio */}
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    {g.message_vocal_url ? (
                      <a
                        href={g.message_vocal_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          color: SAGE,
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.68rem",
                          textDecoration: "none",
                          padding: "4px 8px",
                          border: `1px solid ${SAGE}50`,
                          borderRadius: 20,
                        }}
                      >
                        <Volume2 style={{ width: 11, height: 11 }} />
                        Écouter
                      </a>
                    ) : (
                      <span style={{ opacity: 0.25, fontSize: "0.7rem" }}>—</span>
                    )}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} total={sorted.length} perPage={ROWS_PER_PAGE} onChange={setPage} />
    </div>
  );
}

// ─── locked view ─────────────────────────────────────────────────
function LockedView({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [storedHash, setStoredHash] = useState(null);

  // On charge le hash UNE FOIS au montage du composant
  useEffect(() => {
    const fetchHash = async () => {
      const { data } = await supabase
        .from('app_config')
        .select('value')
        .eq('key', 'portal_password')
        .single();
      if (data) setStoredHash(data.value);
    };
    fetchHash();
  }, []);


  // Dans LockedView
const attempt = async () => {
  if (!storedHash) return;

  // 1. VÉRIFICATION LOCALE (Instantanée)
  // On utilise la fonction 'crypt' côté client si possible, 
  // sinon, on garde le RPC mais on améliore l'UX :
  
  const { data: isValid, error } = await supabase.rpc('verify_password', {
    input_password: value,
    config_key: 'portal_password'
  });

  if (error || !isValid) {
    setError("Mot de passe incorrect.");
    setShake(true); 
    setValue("");
    inputRef.current?.focus();
    return;
  }

  // 2. DÉVERROUILLAGE IMMÉDIAT (UX fluide)
  // On déverrouille l'UI avant même que l'auth soit terminée
  onUnlock(); 

  // 3. AUTHENTIFICATION EN ARRIÈRE-PLAN
  supabase.auth.signInWithPassword({
    email: import.meta.env.VITE_ADMIN_EMAIL,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
  }).then(({ error }) => {
    if (error) console.error("Erreur session admin:", error.message);
  });
};

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "rgba(224,197,160,0.14)",
          border: "1px solid rgba(224,197,160,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <KeyRound style={{ width: 28, height: 28, color: GOLD }} strokeWidth={1.5} />
      </motion.div>

      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: SAGE }}>
          Portail sécurisé
        </p>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 400, color: "#6B5C3E", lineHeight: 1.2 }}>
          Accès Administration
        </h2>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", color: "#9B8B6E", lineHeight: 1.7, maxWidth: 300, margin: "0 auto" }}>
          Espace réservé à l'équipe organisatrice du mariage. Saisissez votre mot de passe pour continuer.
        </p>
      </div>

      <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, #E0C5A0, transparent)" }} />

      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, -3, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        style={{ width: "100%", maxWidth: 300, display: "flex", flexDirection: "column", gap: 12 }}
      >
        <div style={{ position: "relative" }}>
          <input
            ref={inputRef}
            type="password"
            placeholder="Mot de passe"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            style={{
              width: "100%", padding: "13px 46px 13px 16px",
              fontFamily: "Montserrat, sans-serif", fontSize: "0.82rem",
              color: "#6B5C3E", background: CREAM,
              border: `1px solid ${error ? "#C08060" : "rgba(224,197,160,0.55)"}`,
              borderRadius: 3, outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => { e.target.style.borderColor = SAGE; e.target.style.boxShadow = "0 0 0 3px rgba(163,177,138,0.12)"; }}
            onBlur={(e) => { e.target.style.borderColor = error ? "#C08060" : "rgba(224,197,160,0.55)"; e.target.style.boxShadow = "none"; }}
          />
          <KeyRound style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#C8B898", pointerEvents: "none" }} strokeWidth={1.5} />
        </div>

        <div style={{ minHeight: 18 }}>
          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", color: "#B06040", textAlign: "center" }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={attempt}
          style={{
            width: "100%", padding: "13px 0",
            fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#fff", background: "linear-gradient(135deg, #E0C5A0, #C9A878)",
            border: "none", borderRadius: 3, cursor: "pointer",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Accéder
        </button>
      </motion.div>
    </div>
  );
}

// ─── unlocked view ────────────────────────────────────────────────
function UnlockedView({ onLock }: { onLock: () => void }) {
  const [guests, setGuests] = useState<GuestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  


  const load = async () => {
    setLoading(true); setError("");
    try {
      const { data, error: err } = await (supabase as any)
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw err;
      setGuests((data as GuestRow[]) || []);
    } catch (e: any) {
      setError(e?.message || "Erreur lors du chargement.");
    } finally {
      setLoading(false);
    }
  };

  // Dans UnlockedView
useEffect(() => {
  const init = async () => {
    // Vérification de sécurité : sommes-nous bien authentifiés ?
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      load();
    } else {
      setError("Non autorisé. Veuillez vous reconnecter.");
      setLoading(false);
    }
  };
  init();
}, []);

  const total     = guests.length;
  const confirmed = guests.filter((g) => ["oui","yes"].includes((guestPresence(g)).toLowerCase())).length;
  const declined  = guests.filter((g) => ["non","no"].includes((guestPresence(g)).toLowerCase())).length;
  const pending   = total - confirmed - declined;
  const totalPax  = guests.reduce((sum, g) => sum + 1 + Number(guestCount(g)), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
    >
      {/* header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "rgba(163,177,138,0.14)",
            border: "1px solid rgba(163,177,138,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ShieldCheck style={{ width: 22, height: 22, color: SAGE }} strokeWidth={1.5} />
          </div>
          <div>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: SAGE, marginBottom: 4 }}>
              Accès autorisé
            </p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", fontWeight: 400, color: "#6B5C3E", lineHeight: 1 }}>
              Tableau de bord — Réponses RSVP
            </h2>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={load}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 3,
              border: `1px solid ${BORDER}`, background: "transparent",
              cursor: "pointer", fontFamily: "Montserrat, sans-serif",
              fontSize: "0.68rem", letterSpacing: "0.1em", color: BROWN,
              opacity: loading ? 0.5 : 1,
            }}
          >
            <RefreshCw style={{ width: 12, height: 12 }} />
            Actualiser
          </button>
          <button
            onClick={onLock}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "Montserrat, sans-serif", fontSize: "0.68rem",
              letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8A888",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = BROWN)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8A888")}
          >
            <LogOut style={{ width: 13, height: 13 }} strokeWidth={1.5} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <StatCard label="Réponses" value={total}     color="#6B5C3E" />
        <StatCard label="Confirmés" value={confirmed} color={SAGE}   />
        <StatCard label="Déclinés"  value={declined}  color="#B06050" />
        <StatCard label="En attente" value={pending}  color={GOLD}   />
        <StatCard label="Personnes totales" value={totalPax} color="#7A8F6A" />
      </div>

      <div style={{ width: "100%", height: 1, background: `linear-gradient(to right, transparent, ${BORDER}, transparent)` }} />

      {/* table / states */}
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0", gap: 10 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw style={{ width: 18, height: 18, color: GOLD }} />
          </motion.div>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", color: BROWN, opacity: 0.6 }}>
            Chargement des réponses…
          </span>
        </div>
      ) : error ? (
        <div style={{ padding: "24px", textAlign: "center", color: "#B06050", fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem" }}>
          {error}
        </div>
      ) : (
        <GuestTable rows={guests} />
      )}
    </motion.div>
  );
}

// ─── main export ──────────────────────────────────────────────────
export function BridesmaidsPortal() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "0 16px" }}>
      <motion.div
        layout
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          width: "100%",
          maxWidth: unlocked ? 1100 : 520,
          background: "#FFFBF0",
          borderRadius: 8,
          padding: unlocked ? "40px 40px" : "52px 44px",
          boxShadow: "0 8px 40px rgba(100,75,30,0.08), 0 1px 4px rgba(100,75,30,0.05)",
          border: `1px solid ${BORDER}`,
          transition: "max-width 0.5s ease, padding 0.3s ease",
        }}
      >
        <AnimatePresence mode="wait">
          {unlocked ? (
            <motion.div key="unlocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <UnlockedView onLock={() => setUnlocked(false)} />
            </motion.div>
          ) : (
            <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <LockedView onUnlock={() => setUnlocked(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
