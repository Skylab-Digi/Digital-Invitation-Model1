import { useState } from 'react';
import { motion } from 'motion/react';
import { EnvelopeEntrance } from './components/EnvelopeEntrance';
import { CountdownTimer } from './components/CountdownTimer';
import { Timeline } from './components/Timeline';
import { EventDetailsCards } from './components/EventDetailsCards';
import { BridesmaidsPortal } from './components/BridesmaidsPortal';
import { RSVPForm } from './components/RSVPForm';
import { DressCodeSection } from './components/DressCodeSection';
import { Button } from './components/reusable/button';
import { ArrowDown } from 'lucide-react';
import { AlbumSouvenirs } from './components/AlbumSouvenirs';
import WeddingImage from '../assets/images/wedding-bg.png';

function App() {
  const [showWebsite, setShowWebsite] = useState(false);

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp');
    rsvpSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!showWebsite) {
    return <EnvelopeEntrance onOpen={() => setShowWebsite(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FEFDF5]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${WeddingImage})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#FEFDF5]" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-4"
        >
          <p
            className="text-6xl md:text-8xl text-[#E0C5A0] mb-4"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Save the Date
          </p>
          
          <h1
            className="text-5xl md:text-7xl text-white mb-6"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Haythem & Islem
          </h1>

          <div className="text-4xl md:text-5xl text-white mb-6 font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            27.10.2027
          </div>

          <p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Deux âmes, une mer. Rejoignez-nous pour célébrer notre union.
          </p>
            <div style={{ backgroundColor: '#fffbf0de', padding: '5px', borderRadius: '20px' }}>
          <CountdownTimer />
            </div>
          <Button
            onClick={scrollToRSVP}
            size="lg"
            className="bg-[#E0C5A0] hover:bg-[#D2B48C] text-white px-8 py-6 text-lg mt-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Confirmer ma présence
            <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="ml-2 -translate-x-1/2"
          >
            <ArrowDown className="w-8 h-8 text-white/70" />
          </motion.div>
          </Button>
          
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#FEFDF5] to-[#FFFBF0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl text-[#A3B18A] mb-4"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Notre Histoire d'Amour
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
          >
            Un voyage de moments précieux qui nous ont menés jusqu'ici
          </p>
        </motion.div>
        <Timeline />
      </section>

      {/* Album Souvenirs Section */}
      <section className="py-20 px-4 bg-[#FEFDF5]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            className="text-5xl md:text-6xl text-[#A3B18A] mb-4"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Album Souvenirs
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
          >
            Quelques instants capturés en chemin
          </p>
        </motion.div>
        <AlbumSouvenirs/>
      </section>

      {/* Event Details Section */}
      <section className="py-20 px-4 bg-[#FFFBF0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl text-[#A3B18A] mb-4"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Informations Essentielles
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
          >
            Tout ce qu'il faut savoir pour célébrer avec nous
          </p>
        </motion.div>
        <EventDetailsCards />
      </section>

      {/* Dress Code Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#FFFBF0] to-[#FEFDF5]">
        <DressCodeSection />
      </section>

      {/* Bridesmaids Portal Section */}
      <section className="py-20 px-4 bg-[#FEFDF5]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <BridesmaidsPortal />
        </motion.div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-[#FEFDF5] to-[#FFFBF0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-6xl text-[#A3B18A] mb-4"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Répondez s'il vous plaît
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
          >
            Aidez-nous à préparer cette journée parfaite en confirmant votre présence
          </p>
        </motion.div>
        <RSVPForm />
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#FFFBF0] border-t border-[#E0C5A0]/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p
            className="text-3xl text-[#A3B18A]"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Avec tout notre amour
          </p>
          <p
            className="text-4xl text-[#E0C5A0]"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Haythem & Islem
          </p>
          <p
            className="text-sm text-[#A3B18A] pt-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            27 Octobre 2027 • Bord de Mer
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
