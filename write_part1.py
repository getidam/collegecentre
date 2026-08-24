import React, { useState, useRef } from 'react';
import { 
  User, Phone, Upload, Users, ShieldCheck, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, 
  Printer, RefreshCw, Mail, Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudentDataCollectionProps {
  onBackToHome?: () => void;
}

export const StudentDataCollection: React.FC<StudentDataCollectionProps> = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'Male',
    bloodGroup: 'O+',
    photoUrl: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    guardianName: '',
    guardianRelation: 'Father',
    guardianPhone: '',
    degreeProgram: 'B.Tech - Computer Science & Engineering',
    admissionYear: '2026',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File size must be under 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
        setErrors(prev => {
          const updated = { ...prev };
          delete updated.photo;
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.photoUrl) newErrors.photo = 'Student photograph is required';
    } else if (step === 2) {
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
      if (!formData.address.trim()) newErrors.address = 'Residential address is required';
    } else if (step === 3) {
      if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
      if (!formData.guardianPhone.trim() || formData.guardianPhone.length < 10) newErrors.guardianPhone = 'Valid 10-digit guardian phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }
    setIsSubmitting(true);
    const autoId = 'CC-REG-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(autoId);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#c9561e', '#17191c', '#166534', '#d97706'],
      });
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };
