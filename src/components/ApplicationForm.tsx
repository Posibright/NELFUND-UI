import { useState } from 'react';
import { Drawer } from 'vaul';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, User, BookOpen, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success("Application Submitted Successfully!");
        // Reset form or close drawer logic would go here
      }, 2000);
    }
  };

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-green-700/40 flex items-center justify-center gap-2 group w-full sm:w-auto">
           Apply Now
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[85vh] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Application Form</h2>
                <p className="text-gray-500 text-sm">Phase 1 Beneficiary Enrollment</p>
                
                {/* Progress Bar */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-green-600' : 'w-2 bg-gray-200'}`} />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <User className="w-5 h-5 text-green-600" /> Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">NIN (National Identity Number)</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="11-digit NIN" maxLength={11} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input required type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="080..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="you@example.com" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-600" /> Program Selection
                    </h3>
                    
                    <div className="space-y-4">
                       <label className="block p-4 border rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all group">
                         <input type="radio" name="track" className="peer sr-only" required />
                         <div className="flex items-center justify-between">
                           <div>
                             <h4 className="font-semibold text-gray-900 group-hover:text-green-700">Digital Technology</h4>
                             <p className="text-sm text-gray-500">Software, Data, Design</p>
                           </div>
                           <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:border-green-600 peer-checked:bg-green-600" />
                         </div>
                       </label>

                       <label className="block p-4 border rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all group">
                         <input type="radio" name="track" className="peer sr-only" required />
                         <div className="flex items-center justify-between">
                           <div>
                             <h4 className="font-semibold text-gray-900 group-hover:text-green-700">Construction Services</h4>
                             <p className="text-sm text-gray-500">Plumbing, Electrical, Masonry</p>
                           </div>
                           <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:border-green-600 peer-checked:bg-green-600" />
                         </div>
                       </label>

                       <label className="block p-4 border rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all group">
                         <input type="radio" name="track" className="peer sr-only" required />
                         <div className="flex items-center justify-between">
                           <div>
                             <h4 className="font-semibold text-gray-900 group-hover:text-green-700">Fashion & Design</h4>
                             <p className="text-sm text-gray-500">Tailoring, Textile Arts</p>
                           </div>
                           <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:border-green-600 peer-checked:bg-green-600" />
                         </div>
                       </label>
                    </div>

                    <div className="mt-4">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">State of Residence</label>
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                        <option>Select State</option>
                        <option>Lagos</option>
                        <option>Abuja (FCT)</option>
                        <option>Kano</option>
                        <option>Rivers</option>
                        {/* Add more states */}
                      </select>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Review Application</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Please confirm that all details provided are accurate. False information may lead to disqualification.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-xl text-left text-sm space-y-2 max-w-sm mx-auto">
                      <p><span className="font-semibold text-gray-700">Note:</span> By clicking submit, you agree to the Terms of Service and Privacy Policy of the NELFUND program.</p>
                    </div>
                  </motion.div>
                )}

                <div className="pt-6 flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : step === 3 ? 'Submit Application' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
