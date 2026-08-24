import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, 
  HelpCircle, ArrowLeft, Lock, RefreshCw, Sparkles, Award, ExternalLink, Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CyberAwarenessProps {
  onBackToHome: () => void;
}

export const CyberAwarenessModule: React.FC<CyberAwarenessProps> = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState<'simulation' | 'teachable_moment' | 'quiz' | 'completed'>('simulation');
  
  // Dummy form inputs (Never sent or stored - purely for simulated interaction)
  const [simName, setSimName] = useState('');
  const [simRoll, setSimRoll] = useState('');
  const [simPhone, setSimPhone] = useState('');
  const [simGuardian, setSimGuardian] = useState('');

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState(0);

  const quizQuestions = [
    {
      q: 'A campus email with the subject "URGENT: Semester Registration Cancelled in 2 Hours" asks you to update personal details. What should you check first?',
      options: [
        'Immediately fill the form because of the 2-hour deadline.',
        'Check the actual sender address and verify on the official university portal via SSO.',
        'Forward the email to all your classmates to warn them.',
        'Reply with your guardian contact details.'
      ],
      correct: 1,
      explanation: 'Scammers use artificial urgency (e.g. "2 hours left") to induce panic. Legitimate university registrars never cancel registrations without official notifications in your authenticated portal.'
    },
    {
      q: 'Why should you never enter guardian phone numbers or dates of birth on unauthenticated web forms?',
      options: [
        'It only takes up space on your phone.',
        'Attackers use personal family records for social engineering and secondary SIM/OTP fraud.',
        'The registrar office already has that information printed on paper.',
        'It makes the form load slower.'
      ],
      correct: 1,
      explanation: 'Secondary PII (guardian numbers, DOB, photos) enables attackers to conduct targeted voice-phishing (vishing) against parents claiming campus emergencies.'
    },
    {
      q: 'What is the safest way to report a suspicious email or link on your campus?',
      options: [
        'Click the unsubscribe button inside the suspicious email.',
        'Forward the email headers to the official University IT Security Desk (ciso@university.edu).',
        'Post a screenshot on social media.',
        'Delete the email without telling anyone.'
      ],
      correct: 1,
      explanation: 'Forwarding the email with headers to your campus IT Security Helpdesk allows security engineers to block the phishing domain university-wide.'
    }
  ];

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Instantly discard all inputs
    setSimName('');
    setSimRoll('');
    setSimPhone('');
    setSimGuardian('');

    // 2. Immediately transition to the Teachable Moment
    setCurrentStep('teachable_moment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectQuizAnswer = (optionIdx: number) => {
    if (selectedAnswers[currentQuestion] !== undefined) return;

    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIdx });
    if (optionIdx === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentStep('completed');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c9561e', '#166534', '#d97706', '#17191c']
      });
    }
  };

  const restartDrill = () => {
    setCurrentStep('simulation');
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper-200 text-ink font-sans">
      
      {/* Top Banner */}
      <div className="bg-ink text-paper-100 border-b-2 border-ink py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 bg-paper-100 text-ink hover:bg-cjpOrange hover:text-white transition-colors border-2 border-ink font-bold flex items-center gap-1.5 shadow-brutal-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO MAIN PORTAL</span>
            </button>
            <span className="font-display text-base font-bold text-white uppercase tracking-wider">
              CAMPUS CYBER-AWARENESS LAB // DRILL #2026.04
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-cjpGreen text-white px-2 py-0.5 font-bold uppercase text-[10px]">
              SAFE ENVIRONMENT // ZERO PII STORED
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* STEP 1: SIMULATED PHISHING EXERCISE */}
        {currentStep === 'simulation' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Notice header */}
            <div className="bg-paper-100 border-2 border-ink p-4 shadow-brutal-sm flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-cjpOrange font-bold">
                <Info className="w-4 h-4" />
                <span>INTERACTIVE SECURITY DRILL FOR UNIVERSITY STUDENTS</span>
              </div>
              <span className="text-ink-light">STEP 1 OF 3</span>
            </div>

            {/* The Simulated Scenario Card */}
            <div className="brutal-card bg-paper-50 border-4 border-ink p-6 sm:p-8 shadow-brutal-xl">
              
              {/* Fake Urgent Banner (Red Flag 1) */}
              <div className="bg-red-600 text-white p-3 border-2 border-ink flex items-center justify-between gap-3 font-mono text-xs font-bold mb-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>URGENT: SEMESTER ADMISSION CLEARANCE DEADLINE EXPIRING TODAY!</span>
                </div>
                <span className="bg-white text-red-700 px-2 py-0.5 text-[10px] uppercase">
                  TIME LEFT: 01h 42m
                </span>
              </div>

              {/* Header */}
              <div className="border-b-2 border-ink pb-4 mb-6">
                <div className="font-mono text-xs text-ink-light uppercase font-bold">
                  NATIONAL HIGHER EDUCATION CLEARANCE PORTAL [SIMULATION]
                </div>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-ink uppercase tracking-tight mt-1">
                  MANDATORY STUDENT &amp; GUARDIAN RE-VERIFICATION
                </h2>
                <p className="text-sm font-sans text-ink-muted mt-1">
                  All undergraduate and postgraduate scholars must verify their identity and family contact details to avoid immediate course debarment.
                </p>
              </div>

              {/* Simulated Form */}
              <form onSubmit={handleSimulatedSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={simName}
                      onChange={(e) => setSimName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      className="w-full bg-white border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                      Campus Roll / Student ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={simRoll}
                      onChange={(e) => setSimRoll(e.target.value)}
                      placeholder="e.g. CC-2026-CS4891"
                      className="w-full bg-white border-2 border-ink px-3 py-2 text-sm font-mono font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                      Student Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={simPhone}
                      onChange={(e) => setSimPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full bg-white border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-red-600 mb-1 flex items-center justify-between">
                      <span>Primary Guardian Mobile Number *</span>
                      <span className="text-[10px] font-mono text-red-500 font-normal">🚩 RED FLAG</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={simGuardian}
                      onChange={(e) => setSimGuardian(e.target.value)}
                      placeholder="+91 98765 11111"
                      className="w-full bg-white border-2 border-ink px-3 py-2 text-sm font-sans font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 bg-paper-100 border-2 border-ink font-mono text-[11px] text-ink-muted">
                  🔒 By clicking Submit, you agree to immediately authenticate with unencrypted form storage.
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full brutal-btn bg-red-600 text-white hover:bg-ink py-3.5 text-base flex items-center justify-center gap-2 shadow-brutal font-display uppercase tracking-wider"
                  >
                    <span>SUBMIT RE-VERIFICATION NOW →</span>
                  </button>
                </div>
              </form>

            </div>

            <div className="text-center font-mono text-xs text-ink-light">
              💡 <em>Clicking submit will test your awareness reflexes and reveal what warning signs were present.</em>
            </div>

          </div>
        )}

        {/* STEP 2: IMMEDIATE TEACHABLE MOMENT REVEAL */}
        {currentStep === 'teachable_moment' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Safety Reassurance Card */}
            <div className="brutal-card bg-cjpGreen text-white p-6 sm:p-8 border-4 border-ink shadow-brutal-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white text-cjpGreen border-2 border-ink flex items-center justify-center font-bold shrink-0 shadow-brutal-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-paper-200 block">
                    CAMPUS CYBERSECURITY DEBRIEF
                  </span>
                  <h2 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
                    YOU JUST ENCOUNTERED A SIMULATED PHISHING HOOK!
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-paper-100 mt-1 font-medium">
                    <strong>Your account is 100% safe.</strong> No personal information was recorded or stored.
                  </p>
                </div>
              </div>
            </div>

            {/* Red Flag Inspector Breakdown */}
            <div className="brutal-card bg-paper-50 border-4 border-ink p-6 sm:p-8 shadow-brutal-lg space-y-6">
              <div className="border-b-2 border-ink pb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpOrange block mb-1">
                  SECURITY ANATOMY ANALYSIS
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink uppercase">
                  4 RED FLAGS YOU SHOULD NEVER IGNORE:
                </h3>
              </div>

              <div className="space-y-4 font-sans">
                
                <div className="p-4 bg-paper-100 border-2 border-ink flex items-start gap-3.5">
                  <span className="font-display font-bold text-2xl text-cjpOrange leading-none">01</span>
                  <div>
                    <h4 className="font-display font-bold text-lg text-ink uppercase">
                      ARTIFICIAL URGENCY &amp; PANIC TACTICS
                    </h4>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      Phrases like <em>"Deadline expiring in 2 hours"</em> or <em>"Immediate course debarment"</em> are engineered to make you act impulsively before checking legitimacy.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-paper-100 border-2 border-ink flex items-start gap-3.5">
                  <span className="font-display font-bold text-2xl text-cjpOrange leading-none">02</span>
                  <div>
                    <h4 className="font-display font-bold text-lg text-ink uppercase">
                      EXCESSIVE PII &amp; GUARDIAN CONTACT HARVESTING
                    </h4>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      Legitimate university exams and registrars communicate through official student emails. They never ask for parent phone numbers or dates of birth on unauthenticated web forms.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-paper-100 border-2 border-ink flex items-start gap-3.5">
                  <span className="font-display font-bold text-2xl text-cjpOrange leading-none">03</span>
                  <div>
                    <h4 className="font-display font-bold text-lg text-ink uppercase">
                      LACK OF UNIVERSITY CENTRAL SINGLE SIGN-ON (SSO)
                    </h4>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      Real university portals (CollegeCentre, Canvas, Moodle) always authenticate via central SAML/OAuth Single Sign-On with Multi-Factor Authentication (MFA), not random open inputs.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-paper-100 border-2 border-ink flex items-start gap-3.5">
                  <span className="font-display font-bold text-2xl text-cjpOrange leading-none">04</span>
                  <div>
                    <h4 className="font-display font-bold text-lg text-ink uppercase">
                      DOMAIN &amp; CERTIFICATE DISCREPANCIES
                    </h4>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      Always inspect the browser address bar. Phishing forms use deceptive subdomains or `.xyz / .site` lookalike URLs instead of the official `.edu / .ac.in / .edu.in` domain.
                    </p>
                  </div>
                </div>

              </div>

              {/* Transition to Quiz CTA */}
              <div className="pt-4 border-t-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-xs text-ink-light">
                  Ready to test your instincts and claim your Cyber-Shield badge?
                </span>
                <button
                  onClick={() => setCurrentStep('quiz')}
                  className="w-full sm:w-auto brutal-btn bg-cjpOrange text-white hover:bg-ink px-8 py-3.5 text-base flex items-center justify-center gap-2 shadow-brutal uppercase font-display"
                >
                  <span>START 60-SECOND QUIZ</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: INTERACTIVE 60-SECOND QUIZ */}
        {currentStep === 'quiz' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="bg-paper-100 border-2 border-ink p-4 shadow-brutal-sm flex items-center justify-between font-mono text-xs">
              <span className="font-bold uppercase text-cjpOrange">
                QUESTION {currentQuestion + 1} OF {quizQuestions.length}
              </span>
              <span className="text-ink font-bold">
                SCORE: {quizScore} / {quizQuestions.length}
              </span>
            </div>

            <div className="brutal-card bg-paper-50 border-4 border-ink p-6 sm:p-8 shadow-brutal-xl">
              
              <h3 className="font-display font-bold text-xl sm:text-2xl text-ink uppercase leading-snug mb-6">
                {quizQuestions[currentQuestion].q}
              </h3>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestion] === idx;
                  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
                  const isCorrect = idx === quizQuestions[currentQuestion].correct;

                  let btnStyle = 'bg-paper-100 hover:bg-paper-200 text-ink border-ink';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-cjpGreen text-white border-ink font-bold shadow-brutal-sm';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-red-600 text-white border-ink font-bold';
                    } else {
                      btnStyle = 'bg-paper-100 text-ink-muted border-ink/40 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectQuizAnswer(idx)}
                      className={'w-full p-4 border-2 text-left font-sans text-sm sm:text-base transition-all flex items-center justify-between gap-3 ' + btnStyle}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {selectedAnswers[currentQuestion] !== undefined && (
                <div className="mt-6 p-4 bg-paper-100 border-2 border-ink font-sans text-sm space-y-2 animate-in fade-in duration-150">
                  <div className="font-mono text-xs font-bold uppercase text-cjpOrange">
                    {selectedAnswers[currentQuestion] === quizQuestions[currentQuestion].correct 
                      ? '✓ CORRECT REFLEX!' 
                      : '✕ INCORRECT CHOICE — HERE IS WHY:'}
                  </div>
                  <p className="text-ink-muted leading-relaxed">
                    {quizQuestions[currentQuestion].explanation}
                  </p>
                  
                  <div className="pt-2 text-right">
                    <button
                      onClick={handleNextQuestion}
                      className="brutal-btn bg-ink text-paper-100 hover:bg-cjpOrange px-6 py-2.5 text-xs font-mono font-bold uppercase"
                    >
                      {currentQuestion < quizQuestions.length - 1 ? 'NEXT QUESTION →' : 'VIEW COMPLETION CERTIFICATE ★'}
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* STEP 4: COMPLETION CERTIFICATE & REPORTING PROTOCOL */}
        {currentStep === 'completed' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            <div className="brutal-card bg-paper-50 border-4 border-ink p-6 sm:p-10 shadow-brutal-xl text-center space-y-6">
              
              <div className="w-20 h-20 bg-cjpOrange text-white border-2 border-ink mx-auto flex items-center justify-center shadow-brutal">
                <Award className="w-12 h-12" />
              </div>

              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-cjpGreen bg-cjpGreen-tint px-3 py-1 border border-cjpGreen/30 inline-block mb-2">
                  ★ DRILL COMPLETED SUCCESSFULLY ★
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ink uppercase tracking-tight">
                  CAMPUS CYBER-SHIELD CERTIFIED
                </h2>
                <p className="font-sans text-base text-ink-muted max-w-md mx-auto mt-2">
                  You scored <strong className="text-ink">{quizScore} of {quizQuestions.length}</strong> on the student phishing awareness simulation.
                </p>
              </div>

              {/* Digital Certificate Seal */}
              <div className="p-6 bg-paper-100 border-2 border-dashed border-ink max-w-lg mx-auto font-mono text-xs space-y-2">
                <div className="font-display font-bold text-lg text-ink uppercase">
                  COLLEGECENTRE SECURITY READINESS PLEDGE
                </div>
                <div className="text-ink-light">
                  ISSUE REF: CC-SEC-2026-AWARENESS // VERIFIED
                </div>
                <div className="text-cjpGreen font-bold pt-1">
                  ✓ TRAINED TO RECOGNIZE URGENCY &amp; PII HARVESTING SCAMS
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={restartDrill}
                  className="brutal-btn bg-paper-200 text-ink hover:bg-paper-100 px-6 py-3 text-sm flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>RETRY DRILL</span>
                </button>
                <button
                  onClick={onBackToHome}
                  className="brutal-btn bg-cjpOrange text-white hover:bg-ink px-8 py-3 text-sm flex items-center gap-2 shadow-brutal"
                >
                  <span>RETURN TO UNIVERSITY PORTAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};