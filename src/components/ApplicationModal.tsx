import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, CheckCircle, Upload } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Beneficiary Application</h2>
              <p className="text-sm text-gray-500">Step {step} of {totalSteps}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 h-1">
            <div 
              className="bg-green-600 h-1 transition-all duration-500 ease-in-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Enter your last name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="+234..." />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Residential Address</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Street address, City, State" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Track & Qualification</h3>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Preferred Vocational Track</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Digital Technology', 'Construction', 'Fashion Design', 'Agriculture'].map((track) => (
                      <label key={track} className="relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-green-50 hover:border-green-200 transition-all group">
                        <input type="radio" name="track" className="peer w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300" />
                        <span className="ml-3 font-medium text-gray-700 peer-checked:text-green-800">{track}</span>
                        <div className="absolute inset-0 border-2 border-transparent peer-checked:border-green-500 rounded-xl pointer-events-none"></div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <label className="text-sm font-medium text-gray-700">Highest Education Level</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all bg-white">
                    <option>Secondary School Certificate (SSCE)</option>
                    <option>Ordinary National Diploma (OND)</option>
                    <option>Higher National Diploma (HND)</option>
                    <option>Bachelor's Degree (B.Sc)</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Almost There!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Please review your information. By clicking submit, you confirm that all details provided are accurate and verify your eligibility for the NELFUND program.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-2xl text-left max-w-md mx-auto mt-8 border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                      <Upload className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Upload ID Document</h4>
                      <p className="text-xs text-gray-500">NIN Slip, Voter's Card or Driver's License</p>
                    </div>
                  </div>
                  <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors">
                    Click to upload file
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="px-6 py-2.5 text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button 
              onClick={step === totalSteps ? onClose : nextStep}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-green-700/30 flex items-center gap-2"
            >
              {step === totalSteps ? 'Submit Application' : 'Continue'}
              {step !== totalSteps && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
