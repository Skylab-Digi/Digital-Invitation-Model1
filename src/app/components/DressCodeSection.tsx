import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const colorPalette = [
  { name: 'Ivoire', color: '#FFFBF0' },
  { name: 'Sable', color: '#D2B48C' },
  { name: 'Sauge', color: '#A3B18A' },
  { name: 'Champagne', color: '#E0C5A0' },
  { name: 'Rose Blush', color: '#F5E6E8' },
  { name: 'Beige Lin', color: '#E8DCC4' },
];

export function DressCodeSection() {
  return (
    <div id="dress-code" className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Sparkles className="w-6 h-6 text-[#E0C5A0]" />
          <h2
            className="text-5xl text-[#A3B18A]"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Chic Balnéaire
          </h2>
          <Sparkles className="w-6 h-6 text-[#E0C5A0]" />
        </motion.div>
        <p
          className="text-base max-w-2xl mx-auto"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
        >
          Nous vous invitons à adopter une tenue 'Chic Balnéaire' pour cette journée au bord de l'eau.
        </p>
      </div>

      {/* Color Palette */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center gap-3 mb-12"
      >
        {colorPalette.map((color, index) => (
          <motion.div
            key={color.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: color.color }}
            />
            <span
              className="text-xs"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
            >
              {color.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Dress Code Details */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Women's Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-[#E0C5A0]/30"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FFFBF0] flex items-center justify-center">
              <span className="text-2xl">👗</span>
            </div>
            <h3
              className="text-3xl text-[#A3B18A]"
              style={{ fontFamily: 'Great Vibes, cursive' }}
            >
              Pour Elle
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4
                className="font-medium mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Options de tenue:
              </h4>
              <ul
                className="list-disc list-inside space-y-1 text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                <li>Robe longue fluide</li>
                <li>Robe midi élégante</li>
                <li>Combinaison raffinée</li>
                <li>Matières: lin, soie, coton léger</li>
              </ul>
            </div>

            <div>
              <h4
                className="font-medium mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Couleurs suggérées:
              </h4>
              <p
                className="text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Pastels doux, beiges, rose blush, ivoire, champagne, sauge
              </p>
            </div>

            <div>
              <h4
                className="font-medium mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Chaussures:
              </h4>
              <p
                className="text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Sandales élégantes, compensées ou talons bloc (pensez au sable!)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Men's Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-[#E0C5A0]/30"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FFFBF0] flex items-center justify-center">
              <span className="text-2xl">🤵</span>
            </div>
            <h3
              className="text-3xl text-[#A3B18A]"
              style={{ fontFamily: 'Great Vibes, cursive' }}
            >
              Pour Lui
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4
                className="font-medium mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Options de tenue:
              </h4>
              <ul
                className="list-disc list-inside space-y-1 text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                <li>Costume en lin léger</li>
                <li>Chino + chemise élégante</li>
                <li>Blazer décontracté + pantalon</li>
                <li>Cravate optionnelle</li>
              </ul>
            </div>

            <div>
              <h4
                className="font-medium mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Couleurs suggérées:
              </h4>
              <p
                className="text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Crème, beige, lin naturel, bleu chambray, taupe
              </p>
            </div>

            <div>
              <h4
                className="font-medium mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Chaussures:
              </h4>
              <p
                className="text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
              >
                Mocassins en cuir, derbies claires, ou chaussures bateau élégantes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
