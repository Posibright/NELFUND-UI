import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import nelfundLogo from "../assets/nelfund-logo.png";
import ossapLogo from "../assets/ossap-tvee logo.png";

export function Footer() {
  const year = new Date().getFullYear();

  const links = [
    {
      title: "Program",
      items: [
        { name: "About SKILL UP", href: "/#about" },
        { name: "Priority Trades", href: "/#tracks" },
        { name: "Eligibility", href: "/#eligibility" },
        { name: "How to Apply", href: "/#how-it-works" },
      ],
    },
    {
      title: "Applicants",
      items: [
        { name: "Apply Now", href: "/apply" },
        { name: "Sign In", href: "/auth" },
        { name: "Track Application", href: "/auth" },
        { name: "Check Eligibility", href: "/#eligibility" },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "FAQs", href: "/#faq" },
        { name: "Help Center", href: "#" },
        { name: "NIN/BVN Assistance", href: "#" },
        { name: "Contact NELFUND", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        {/* Top Grid */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img src={nelfundLogo.src} alt="NELFUND" className="w-9 h-9 object-contain rounded-lg bg-white p-0.5" />
              <div>
                <div className="text-sm font-bold text-white leading-none">NELFUND</div>
                <div className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase mt-0.5">SKILL UP</div>
              </div>
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed">
              A Federal Government of Nigeria initiative providing fully-funded vocational skills training to eligible Nigerian youth.
            </p>
            <div className="mt-4 flex items-center gap-3 pt-4 border-t border-white/5">
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest">In partnership with</span>
              <img src={ossapLogo.src} alt="OSSAP-TVEE" className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-500 hover:bg-emerald-700 hover:text-white transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {links.map((section, i) => (
            <div key={i}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a
                      href={item.href}
                      className="text-sm text-neutral-500 hover:text-emerald-400 transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
              <a href="tel:+234800000000" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                +234 800 000 0000
              </a>
              <a href="mailto:info@nelfund.gov.ng" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                info@nelfund.gov.ng
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Federal Secretariat Complex, Abuja
              </div>
            </div>
            <div className="flex flex-wrap gap-5 items-center text-xs text-neutral-600">
              <button className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-emerald-400 transition-colors">Terms of Service</button>
              <button className="hover:text-emerald-400 transition-colors">Accessibility</button>
              <span className="text-neutral-700">© {year} NELFUND Nigeria</span>
            </div>
          </div>
          <p className="text-xs text-neutral-700 mt-5">
            NELFUND SKILL UP is an initiative by the Federal Government of Nigeria. All applications are subject to eligibility verification and quota constraints. This portal is open to eligible Nigerian citizens during the current program phase.
          </p>
        </div>
      </div>
    </footer>
  );
}
