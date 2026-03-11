import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, MapPin, Calendar, Globe,
  BadgeCheck, ChevronDown, Zap, Brain, Scissors, Sparkles,
  Clock, Users, FileCheck, ShieldCheck, CalendarCheck, Briefcase, Layers, GraduationCap, Star
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import ossapLogo from "../assets/ossap-tvee logo.png";

const TRACKS = [
  {
    id: "solar",
    title: "Solar Installation",
    description: "Install, maintain, and troubleshoot solar energy systems for residential and commercial applications.",
    icon: <Zap className="w-6 h-6" />,
    iconBg: "bg-amber-100 text-amber-600",
    accent: "border-l-amber-400",
    image: "https://images.unsplash.com/photo-1626793369994-a904d2462888?auto=format&fit=crop&q=80&w=800",
    features: ["NAPTIN-aligned curriculum", "Hands-on lab sessions", "Job placement support"],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Gain foundational AI skills, data literacy, and automation tools for the modern digital economy.",
    icon: <Brain className="w-6 h-6" />,
    iconBg: "bg-blue-100 text-blue-600",
    accent: "border-l-blue-400",
    image: "https://images.unsplash.com/photo-1564707944519-7a116ef3841c?auto=format&fit=crop&q=80&w=800",
    features: ["Data literacy fundamentals", "AI tools & automation", "Freelance readiness"],
  },
  {
    id: "makeup",
    title: "Makeup Artistry",
    description: "Master professional makeup techniques for events, photography, film, and the beauty industry.",
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: "bg-pink-100 text-pink-600",
    accent: "border-l-pink-400",
    image: "https://images.unsplash.com/photo-1600637070413-0798fafbb6c7?auto=format&fit=crop&q=80&w=800",
    features: ["Professional techniques", "Event & bridal makeup", "Beauty business skills"],
  },
  {
    id: "fashion",
    title: "Fashion Design",
    description: "Develop skills in garment construction, textile design, and building a sustainable fashion business.",
    icon: <Scissors className="w-6 h-6" />,
    iconBg: "bg-purple-100 text-purple-600",
    accent: "border-l-purple-400",
    image: "https://images.unsplash.com/photo-1744808336885-c6b2425c3f1e?auto=format&fit=crop&q=80&w=800",
    features: ["Garment construction", "Textile & pattern design", "Fashion entrepreneurship"],
  },
];

const ELIGIBILITY = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Valid Identification",
    desc: "You must have valid NIN and BVN identification details to apply for this program.",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Age 18 – 45 Years",
    desc: "Applicants must be between 18 and 45 years old at the time of application.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Nigerian Citizen",
    desc: "You must be a citizen of the Federal Republic of Nigeria.",
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    title: "Demonstrates Financial Need",
    desc: "You must not be in a position to independently fund this training.",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Create Account", desc: "Register with your email address and mobile number. Verify with OTP." },
  { num: "02", title: "Eligibility Check", desc: "Confirm your state of residence, age, and citizenship status." },
  { num: "03", title: "Personal Details & ID", desc: "Provide your personal information and verify your NIN & BVN." },
  { num: "04", title: "Select Your Trade", desc: "Choose one priority trade and describe your prior experience." },
  { num: "05", title: "Upload Documents", desc: "Upload your passport photo, certificate, and proof of residence." },
  { num: "06", title: "Review & Submit", desc: "Confirm your details and receive a unique Application ID." },
];

const FAQS = [
  {
    q: "Is there a cost for this training program?",
    a: "NELFUND covers the full cost of training for all selected beneficiaries. There are no upfront tuition or registration fees for those chosen through the competitive selection process.",
  },
  {
    q: "Where is the SKILL UP program available?",
    a: "The SKILL UP program launched its pilot in Oyo State and is expanding nationwide. Nigerian citizens across all states are encouraged to apply.",
  },
  {
    q: "Can I apply for more than one skill track?",
    a: "No. Each applicant may only apply for a single primary skill track. This ensures focused training and better outcomes.",
  },
  {
    q: "Do I need prior experience in my chosen trade?",
    a: "No prior formal experience is required. However, you will be asked to describe any informal or apprenticeship experience (Recognition of Prior Learning).",
  },
  {
    q: "What documents will I need to apply?",
    a: "You will need your NIN, BVN, a recent passport photograph, proof of residence (utility bill, bank statement, or LGA letter), and optionally your highest educational certificate.",
  },
  {
    q: "How will I know if I have been shortlisted?",
    a: "If you are shortlisted, you will receive both an SMS and an email notification to the contact details provided during registration.",
  },
];

export function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col">

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-neutral-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1582638423482-a90640357638?auto=format&fit=crop&q=80&w=1600)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-700/30 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-8">
              <MapPin className="w-3 h-3" />
              SKILL UP — Applications Open
            </div>
            <h1 className="text-5xl lg:text-6xl text-white mb-6 leading-[1.08] tracking-tight">
              Vocational Skills<br />
              <span className="text-emerald-400">Training for Nigerian</span><br />
              Citizens.
            </h1>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl leading-relaxed">
              The NELFUND SKILL UP Program, in partnership with the Office of the Senior Special Assistant to the President on Technical, Vocational, and Entrepreneurship Education (OSSAP-TVEE), provides comprehensive vocational training to empower individuals with practical skills for the future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply">
                <Button className="h-13 px-8 text-base bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#eligibility">
                <Button variant="outline" className="h-13 px-8 text-base border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Check Eligibility
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest">In collaboration with</span>
              <img src={ossapLogo.src} alt="OSSAP-TVEE" className="h-10 object-contain bg-white rounded-md px-3 py-1.5 opacity-100 shadow-sm" />
            </div>
            <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/10">
              {[
                { label: "Slots Available", value: "5,000+" },
                { label: "Skill Tracks", value: "4" },
                { label: "Target", value: "Nationwide" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl text-white">{s.value}</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                className={`relative overflow-hidden rounded-2xl border-l-4 ${track.accent} bg-white/5 backdrop-blur-sm border border-white/10 p-6 group hover:bg-white/10 transition-all`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${track.iconBg}`}>
                  {track.icon}
                </div>
                <div className="text-white font-bold text-sm">{track.title}</div>
                <div className="text-neutral-400 text-xs mt-1 leading-relaxed">{track.description.substring(0, 60)}...</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <div className="text-emerald-700 text-sm font-bold uppercase tracking-widest mb-3">Priority Trades</div>
            <h2 className="text-4xl text-neutral-900 mb-4">Choose Your Skill Track</h2>
            <p className="text-neutral-500 leading-relaxed">
              Select one priority trade from the four available in the SKILL UP Pilot. Each track offers fully-funded, structured training delivered by certified instructors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TRACKS.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${track.iconBg}`}>
                    {track.icon}
                  </div>
                  <h3 className="text-xl text-neutral-900 mb-2">{track.title}</h3>
                  <p className="text-neutral-500 text-sm mb-6 leading-relaxed">{track.description}</p>
                  <ul className="space-y-2 mb-6">
                    {track.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/apply?track=${track.id}`}
                    className="inline-flex items-center gap-2 text-emerald-700 text-sm font-bold hover:gap-3 transition-all"
                  >
                    Apply for this track <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section id="eligibility" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-emerald-700 text-sm font-bold uppercase tracking-widest mb-3">Eligibility</div>
              <h2 className="text-4xl text-neutral-900 mb-4">Do You Qualify?</h2>
              <p className="text-neutral-500 mb-10 leading-relaxed">
                The SKILL UP Pilot is designed to reach Nigerians who need it most. You must meet all four criteria to apply.
              </p>
              <div className="space-y-4">
                {ELIGIBILITY.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-5 p-5 bg-white rounded-xl border border-neutral-100"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-neutral-900 font-bold mb-0.5">{item.title}</div>
                      <p className="text-neutral-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-900 rounded-2xl p-10 text-white">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300 text-sm font-medium">Application Window Open</span>
              </div>
              <h3 className="text-2xl mb-3">Ready to Apply?</h3>
              <p className="text-emerald-200 text-sm leading-relaxed mb-8">
                The application process takes approximately 15–20 minutes. Ensure you have your NIN, BVN, and supporting documents ready before you begin.
              </p>

              <div className="space-y-3 mb-8">
                {["NIN (National ID Number)", "BVN (Bank Verification Number)", "Recent passport photograph", "Proof of residence", "Basic literacy (read & write)"].map((req, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {req}
                  </div>
                ))}
              </div>

              <Link href="/apply">
                <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  Start Application <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <p className="text-center text-xs text-emerald-400 mt-4">
                Join thousands of Nigerians building their future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-emerald-700 text-sm font-bold uppercase tracking-widest mb-3">Application Process</div>
            <h2 className="text-4xl text-neutral-900 mb-4">How to Apply</h2>
            <p className="text-neutral-500 max-w-xl mx-auto leading-relaxed">
              A simple, guided 6-step process ensures we capture the right information to process your application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-7 rounded-2xl bg-neutral-50 border border-neutral-100"
              >
                <div className="text-4xl text-neutral-100 font-black mb-4 font-mono">{step.num}</div>
                <h4 className="text-neutral-900 font-bold mb-2">{step.title}</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About NELFUND */}
      <section className="py-24 bg-neutral-950 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">About NELFUND</div>
              <h2 className="text-4xl mb-5">Nigeria Education Loan Fund</h2>
              <p className="text-neutral-400 leading-relaxed mb-6">
                NELFUND is a Federal Government of Nigeria initiative established to provide financial support to Nigerian students and youth. Through programs like SKILL UP, NELFUND bridges the gap between youth potential and economic opportunity.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-8">
                The SKILL UP Pilot is designed to upskill young Nigerians in emerging and in-demand trades — creating pathways to employment, entrepreneurship, and financial independence.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs text-neutral-600 uppercase tracking-widest">In collaboration with</span>
                <img src={ossapLogo.src} alt="OSSAP-TVEE" className="h-10 object-contain bg-white rounded-md px-3 py-1.5 opacity-100 shadow-sm" />
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[
                  { icon: <Users className="w-5 h-5" />, label: "Beneficiaries Targeted", value: "5,000+" },
                  { icon: <FileCheck className="w-5 h-5" />, label: "Govt. Backed", value: "NELFUND" },
                  { icon: <ShieldCheck className="w-5 h-5" />, label: "Initiative", value: "Federal" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-emerald-400 mb-2">{s.icon}</div>
                    <div className="text-2xl text-white mb-1">{s.value}</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1582638423482-a90640357638?auto=format&fit=crop&q=80&w=900"
                alt="NELFUND SKILL UP Training"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <div className="text-emerald-700 text-sm font-bold uppercase tracking-widest mb-3">FAQs</div>
            <h2 className="text-4xl text-neutral-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-500">Everything you need to know about the SKILL UP Pilot Program.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-neutral-100 rounded-xl bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-neutral-900 font-bold pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-neutral-600 text-sm leading-relaxed border-t border-neutral-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl text-white mb-4">Applications Are Now Open</h2>
          <p className="text-emerald-200 max-w-xl mx-auto mb-10 leading-relaxed">
            If you are a Nigerian citizen aged 18–45 with financial need, this opportunity is for you. Apply today — before slots run out.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply">
              <button className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/auth">
              <button className="px-8 py-4 bg-emerald-600 border border-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors">
                Sign In to My Application
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}