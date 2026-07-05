import { useState, useEffect } from 'react';

export function CountdownTimer() {
  const weddingDate = new Date('2027-10-27T00:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 py-6">
      <div className="text-center">
        <div className="text-4xl md:text-6xl text-[#E0C5A0] font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {timeLeft.days}
        </div>
        <div className="text-xs md:text-sm text-[#A3B18A] uppercase tracking-widest mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Jours
        </div>
      </div>
      <div className="text-3xl md:text-5xl text-[#E0C5A0] font-light">:</div>
      <div className="text-center">
        <div className="text-4xl md:text-6xl text-[#E0C5A0] font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {timeLeft.hours}
        </div>
        <div className="text-xs md:text-sm text-[#A3B18A] uppercase tracking-widest mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Heures
        </div>
      </div>
      <div className="text-3xl md:text-5xl text-[#E0C5A0] font-light">:</div>
      <div className="text-center">
        <div className="text-4xl md:text-6xl text-[#E0C5A0] font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {timeLeft.minutes}
        </div>
        <div className="text-xs md:text-sm text-[#A3B18A] uppercase tracking-widest mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Minutes
        </div>
      </div>
    </div>
  );
}
