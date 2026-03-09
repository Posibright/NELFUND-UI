import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, User, BookOpen, Briefcase } from 'lucide-react';

export function Eligibility() {
  const [step, setStep] = useState(1);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <section id="apply" className="py-24 bg-green-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Your Eligibility</h2>
            <p className="text-gray-600">Take a quick assessment to see if you qualify for the NELFUND Livelihood Activation Program.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar Steps */}
            <div className="bg-green-900 text-white p-8 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-green-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-8">Application Steps</h3>
                 <div className="space-y-6">
                    <StepIndicator current={step} step={1} label="Personal Info" icon={User} />
                    <StepIndicator current={step} step={2} label="Education" icon={BookOpen} />
                    <StepIndicator current={step} step={3} label="Track Selection" icon={Briefcase} />
                 </div>
               </div>
               
               <div className="relative z-10 text-xs text-green-300 mt-8">
                 * All fields are required for accurate assessment.
               </div>
            </div>

            {/* Form Area */}
            <div className="p-8 md:w-2/3 flex flex-col">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-grow flex flex-col"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
                    <div className="space-y-4 flex-grow">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Enter your full name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">National Identification Number (NIN)</label>
                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="11-digit NIN" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input type="date" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State of Origin</label>
                            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white">
                               <option>Select State</option>
                               <option>Lagos</option>
                               <option>Abuja</option>
                               <option>Kano</option>
                               <option>Rivers</option>
                            </select>
                         </div>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button onClick={nextStep} className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all">
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-grow flex flex-col"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Educational Background</h3>
                    <div className="space-y-4 flex-grow">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white">
                           <option>SSCE / WAEC</option>
                           <option>OND / NCE</option>
                           <option>HND / BSc</option>
                           <option>None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="School or University Name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                        <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="YYYY" />
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button onClick={prevStep} className="text-gray-600 hover:text-gray-900 font-medium px-4 py-3 transition-all">
                        Back
                      </button>
                      <button onClick={nextStep} className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all">
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                   <motion.div 
                   key="step3"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="flex-grow flex flex-col"
                 >
                   <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Preferred Track</h3>
                   <div className="space-y-4 flex-grow">
                     <p className="text-gray-600 text-sm mb-4">Based on your profile, you are eligible for the following tracks. Select one.</p>
                     
                     <div className="grid grid-cols-1 gap-3">
                        <label className="relative border border-gray-200 p-4 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all flex items-center gap-4 group">
                           <input type="radio" name="track" className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300" />
                           <div className="flex-grow">
                              <h4 className="font-bold text-gray-900 group-hover:text-green-800">Digital Technology</h4>
                              <p className="text-xs text-gray-500">Web Dev, Data Analysis</p>
                           </div>
                           <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                        </label>
                        
                        <label className="relative border border-gray-200 p-4 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all flex items-center gap-4 group">
                           <input type="radio" name="track" className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300" />
                           <div className="flex-grow">
                              <h4 className="font-bold text-gray-900 group-hover:text-green-800">Construction Services</h4>
                              <p className="text-xs text-gray-500">Carpentry, Plumbing</p>
                           </div>
                           <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                        </label>

                        <label className="relative border border-gray-200 p-4 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all flex items-center gap-4 group">
                           <input type="radio" name="track" className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300" />
                           <div className="flex-grow">
                              <h4 className="font-bold text-gray-900 group-hover:text-green-800">Fashion & Design</h4>
                              <p className="text-xs text-gray-500">Tailoring, Textile</p>
                           </div>
                           <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                        </label>
                     </div>

                   </div>
                   <div className="mt-8 flex justify-between">
                     <button onClick={prevStep} className="text-gray-600 hover:text-gray-900 font-medium px-4 py-3 transition-all">
                       Back
                     </button>
                     <button onClick={() => setStep(4)} className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-green-700/30">
                       Submit Application
                     </button>
                   </div>
                 </motion.div>
                )}

                {step === 4 && (
                   <motion.div 
                   key="step4"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex-grow flex flex-col items-center justify-center text-center py-12"
                 >
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-bounce">
                     <Check className="w-10 h-10" />
                   </div>
                   <h3 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                   <p className="text-gray-600 max-w-sm mb-8">
                     Thank you for applying to the NELFUND Livelihood Activation Portal. Your application ID is <span className="font-mono font-bold text-gray-900">NEL-2026-X892</span>.
                   </p>
                   <button onClick={() => setStep(1)} className="text-green-700 font-semibold hover:text-green-800 underline">
                     Start Another Application
                   </button>
                 </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepIndicator({ current, step, label, icon: Icon }: { current: number, step: number, label: string, icon: any }) {
  const isActive = current === step;
  const isCompleted = current > step;

  return (
    <div className={`flex items-center gap-4 transition-all ${isActive ? 'opacity-100' : 'opacity-60'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
        ${isActive ? 'bg-white text-green-800 border-white scale-110 shadow-lg' : ''}
        ${isCompleted ? 'bg-green-600 text-white border-green-600' : ''}
        ${!isActive && !isCompleted ? 'border-green-400 text-green-100' : ''}
      `}>
        {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
      </div>
      <div className="flex-grow">
        <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-green-100'}`}>{label}</p>
        {isActive && <p className="text-xs text-green-300">In Progress</p>}
      </div>
    </div>
  );
}
