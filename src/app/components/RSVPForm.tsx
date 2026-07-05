import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  type FormDataType = {
    name: string;
    attendance: string;
    phone: string;
    company: string;
    members: number;
    note: string;
    voiceFile: File | null;
  };

  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    attendance: '',
    phone: '',
    company: 'alone',
    members: 0,
    note: '',
    voiceFile: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend
    // If sending files, you'd use FormData and POST to an API endpoint
    console.log('RSVP Submitted:', {
      ...formData,
      voiceFileName: formData.voiceFile?.name ?? null,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-[#E0C5A0] p-12 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-[#A3B18A]/20 flex items-center justify-center">
              <CheckCircle2 className="w-14 h-14 text-[#A3B18A]" />
            </div>
          </div>
          <h3
            className="text-4xl text-[#A3B18A]"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Merci infiniment!
          </h3>

          <p
            className="text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}
          >
            Votre présence illuminera notre jour spécial. À très bientôt!
          </p>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-[#E0C5A0] p-8 max-w-2xl mx-auto">
      <h2
        className="text-4xl text-center text-[#A3B18A] mb-8"
        style={{ fontFamily: 'Great Vibes, cursive' }}
      >
        Confirmez votre présence
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Attendance */}
        <div className="space-y-3">
          <Label style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}>
            Will you be with us?
          </Label>
          <RadioGroup
            value={formData.attendance}
            onValueChange={(value) => setFormData({ ...formData, attendance: value })}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="cursor-pointer" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="idk" id="idk" />
              <Label htmlFor="idk" className="cursor-pointer" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                I don't know yet
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="cursor-pointer" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}>
            Full name
          </Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-[#E0C5A0]/50 focus:border-[#A3B18A]"
          />
        </div>

        {/* Phone / WhatsApp */}
        <div className="space-y-2">
          <Label htmlFor="phone" style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}>
            Phone / WhatsApp
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+33 6 12 34 56 78"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border-[#E0C5A0]/50 focus:border-[#A3B18A]"
          />
        </div>

        {/* Coming alone or with company */}
        <div className="space-y-3">
          <Label style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}>
            Coming alone or with company?
          </Label>
          <RadioGroup
            value={formData.company}
            onValueChange={(value) => setFormData({ ...formData, company: value })}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alone" id="alone" />
              <Label htmlFor="alone" className="cursor-pointer" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Alone
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="with" id="with" />
              <Label htmlFor="with" className="cursor-pointer" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                With company
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Members joining you (conditional) */}
        {formData.company === 'with' && (
          <div className="space-y-2">
            <Label htmlFor="members" style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}>
              Members joining you?
            </Label>
            <Input
              id="members"
              type="number"
              min={1}
              value={formData.members || ''}
              onChange={(e) => setFormData({ ...formData, members: Number(e.target.value) })}
              className="border-[#E0C5A0]/50 focus:border-[#A3B18A] w-36"
            />
          </div>
        )}

        {/* Note (optional) */}
        <div className="space-y-2">
          <Label htmlFor="note" style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}>
            Note (optional)
          </Label>
          <Textarea
            id="note"
            placeholder="Any details you'd like to share"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="border-[#E0C5A0]/50 focus:border-[#A3B18A] min-h-[80px]"
          />
        </div>

        {/* Voice message (optional) */}
        <div className="space-y-2">
          <Label htmlFor="voice" style={{ fontFamily: 'Montserrat, sans-serif', color: '#8B7355' }}>
            Voice message (optional)
          </Label>
          <Input
            id="voice"
            type="file"
            accept="audio/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, voiceFile: e.target.files ? e.target.files[0] : null })
            }
            className="border-[#E0C5A0]/50 focus:border-[#A3B18A]"
          />
          {formData.voiceFile && (
            <p className="text-sm text-muted-foreground">Selected: {formData.voiceFile.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#E0C5A0] hover:bg-[#D2B48C] text-white text-lg py-6"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Confirm my attendance
        </Button>
      </form>
    </Card>
  );
}
