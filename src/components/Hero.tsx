import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Calendar, Award } from 'lucide-react';
import heroImage from 'figma:asset/f41fb83010b277a7924c0fb9e4f57b1cfe2b1f95.png'; // Using the provided image as background/context or primary visual

export function Hero() {
  return (
    <div className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l from-green-50 via-white to-white opacity-80" />
        <svg className="absolute bottom-0 left-0 w-full h-[600px] text-green-50 opacity-60" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div className="absolute top-20 right-[-100px] w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              Phase 1 Beneficiary Applications Open
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Livelihood <br />
              <span className="text-green-700">Activation Portal</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Fast-track training with certified starter-kits for Nigerian youth in technical and digital livelihoods. Gain skills and tools to unlock earning potential.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-green-700/40 flex items-center justify-center gap-2 group">
              Apply Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border-2 border-gray-200 hover:border-green-600 text-gray-700 hover:text-green-700 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center">
              Check Eligibility
            </button>
          </div>

          {/* Quick Stats/Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-700">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900">2 Weeks</h3>
              <p className="text-sm text-gray-500">Accelerated Training</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-700">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900">Fully Funded</h3>
              <p className="text-sm text-gray-500">Starter Kits Covered</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-700">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900">Certified</h3>
              <p className="text-sm text-gray-500">Competency Certificate</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10">
            {/* Using the user provided image as the main hero visual since it matches exactly what they want */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-xl">
              <img
                src={heroImage.src}
                alt="Nigerian Youth"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Gradient to make text readable if needed, or just artistic touch */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-green-100 flex items-center gap-3 z-20 max-w-[200px]"
            >
              <div className="bg-green-100 p-2 rounded-lg text-green-700">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Official Program</p>
                <p className="text-sm font-bold text-gray-900">NELFUND Verified</p>
              </div>
            </motion.div>
          </div>

          {/* Decorative shapes behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-50/50 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </div>
  );
}
