import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

export function About() {
  const benefits = [
    "Certified starter-kits for all participants",
    "Expert-led training sessions",
    "Post-training mentorship",
    "Access to NELFUND loan opportunities",
    "Networking with industry leaders"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering the Next Generation of <span className="text-green-700">Skilled Professionals</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              The Livelihood Activation Portal is a strategic initiative by OSSAP-TVEE and NELFUND designed to bridge the skills gap in Nigeria. We provide practical, hands-on training that translates directly to employability and entrepreneurship.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our program is more than just a workshop; it's a comprehensive career launchpad that equips you with the tools, certification, and financial backing needed to succeed in today's economy.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1565490129165-bd6a24996c25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwYWZyaWNhbiUyMHVuaXZlcnNpdHklMjBzdHVkZW50cyUyMHZvY2F0aW9uYWwlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NzI0ODI2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Students" 
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <div className="bg-green-100 p-6 rounded-2xl">
                  <h4 className="text-3xl font-bold text-green-800 mb-1">5k+</h4>
                  <p className="text-green-700 font-medium">Graduates</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-900 p-6 rounded-2xl text-white">
                  <h4 className="text-3xl font-bold mb-1">98%</h4>
                  <p className="text-gray-400 font-medium">Employment Rate</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1688240817677-d28b8e232dd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXJwZW50ZXIlMjB3b3Jrc2hvcCUyMGFmcmljYW58ZW58MXx8fHwxNzcyNDgyNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Workshop" 
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
