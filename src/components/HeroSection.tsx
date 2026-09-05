import {
  BookOpen,
  Briefcase,
  Award,
  Calendar,
  MessageCircle,
  Bell,
  ArrowRight,
  FileText,
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: string) => void;
}

const stats = [
  { value: '50,000+', label: 'Notes & PYQs' },
  { value: '1,200+', label: 'Internships' },
  { value: '300+', label: 'Scholarships' },
  { value: '10', label: 'Universities' },
];

const features = [
  {
    icon: BookOpen,
    title: 'Notes & PYQs',
    description: 'Semester-wise notes, previous year question papers & study material shared by seniors.',
    view: 'resources',
    comingSoon: false,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hoverBorder: 'hover:border-blue-300',
  },
  {
    icon: Briefcase,
    title: 'Internships & Jobs',
    description: 'Curated internships and job openings for college students across all domains.',
    view: 'internships',
    comingSoon: false,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-300',
  },
  {
    icon: Award,
    title: 'Scholarships',
    description: 'Government and private scholarships filtered by eligibility, category and state.',
    view: 'scholarships',
    comingSoon: false,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    hoverBorder: 'hover:border-amber-300',
  },
  {
    icon: Calendar,
    title: 'Attendance Tracker',
    description: 'Track your attendance subject-wise and get alerts before you go below 75%.',
    view: 'attendance',
    comingSoon: true,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    hoverBorder: 'hover:border-violet-200',
  },
  {
    icon: MessageCircle,
    title: 'Campus Forum',
    description: 'Anonymous confessions, campus gossip, advice and real talk from students like you.',
    view: 'forum',
    comingSoon: false,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    hoverBorder: 'hover:border-pink-300',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Get notified about exams, results, deadlines and college events via email.',
    view: 'alerts',
    comingSoon: false,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    hoverBorder: 'hover:border-orange-300',
  },
];

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-[#0c8ee9]/10 text-[#0c8ee9] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          <FileText className="w-4 h-4" />
          Built for Indian College Students
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-tight tracking-tight max-w-4xl mx-auto">
          Everything a College Student Needs.{' '}
          <span className="text-[#0c8ee9]">One Place.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-5 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Free notes, PYQs, internships, scholarships, exam alerts and a safe space to talk.
          Built for Indian students.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('resources')}
            className="flex items-center gap-2 px-7 py-3.5 bg-[#0f172a] text-white text-base font-semibold rounded-lg hover:bg-[#1e3a5f] transition-colors shadow-sm"
          >
            Find Study Material
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('internships')}
            className="flex items-center gap-2 px-7 py-3.5 border-2 border-[#0f172a] text-[#0f172a] text-base font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Browse Internships
          </button>
        </div>

        {/* Stat Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-gray-50 border border-gray-200 rounded-xl px-6 py-3.5 min-w-[130px]"
            >
              <span className="text-2xl font-extrabold text-[#0f172a]">{stat.value}</span>
              <span className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">
              Everything under one roof
            </h2>
            <p className="mt-2 text-gray-500 text-base">
              Six pillars powering your college journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.view}
                  onClick={() => !feature.comingSoon && onNavigate(feature.view)}
                  disabled={feature.comingSoon}
                  className={`group relative text-left bg-white border-2 ${feature.border} ${
                    feature.comingSoon
                      ? 'cursor-default opacity-80'
                      : `cursor-pointer ${feature.hoverBorder} hover:shadow-md`
                  } rounded-2xl p-6 transition-all duration-200`}
                >
                  {/* Coming Soon badge */}
                  {feature.comingSoon && (
                    <span className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 ${
                      !feature.comingSoon ? 'group-hover:scale-110' : ''
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#0f172a] mb-1.5">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>

                  {/* Arrow hint on hover */}
                  {!feature.comingSoon && (
                    <div
                      className={`mt-4 flex items-center gap-1 text-xs font-semibold ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                    >
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
