import { motion } from "motion/react";
import Celebrons from '../../assets/images/Celebrons.webp';
import Notre from '../../assets/images/Notre.webp';
import Amour from '../../assets/images/Amour.webp';

const cards = [
  {
    word: "Célébrons",
    photo: Celebrons,
    delay: 0,
    floatOffset: 6,     // px amplitude for floating
    floatDuration: 4.2, // seconds
  },
  {
    word: "notre",
    photo: Notre,
    delay: 0.15,
    floatOffset: 9,
    floatDuration: 3.7,
  },
  {
    word: "amour",
    photo: Amour,
    delay: 0.3,
    floatOffset: 7,
    floatDuration: 4.8,
  },
];

export function AlbumSouvenirs() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: card.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* card shell */}
            <div
              className="bg-white rounded-sm p-4 flex flex-col items-center"
              style={{
                boxShadow: "0 4px 24px rgba(100,75,30,0.1), 0 1px 4px rgba(100,75,30,0.06)",
              }}
            >
              {/* title */}
              <p
                className="mb-4 tracking-widest text-center"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.05rem",
                  color: "#A3B18A",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {card.word}
              </p>

              {/* floating image */}
              <div className="w-full overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
                <motion.img
                  src={card.photo}
                  alt={card.word}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  animate={{ y: [-card.floatOffset / 2, card.floatOffset / 2, -card.floatOffset / 2] }}
                  transition={{
                    duration: card.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.delay * 0.5,
                  }}
                  style={{ scale: 1.06 }} // slight scale so float doesn't clip edges
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* decorative tagline */}
      <motion.p
        className="text-center mt-10"
        style={{
          fontFamily: "Great Vibes, cursive",
          fontSize: "2.2rem",
          color: "#E0C5A0",
          opacity: 0.7,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Haythem & Islem · 2027
      </motion.p>
    </div>
  );
}