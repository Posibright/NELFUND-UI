import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    track: '',
    nin: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      toast.success("Application Submitted Successfully!");
      onClose();
      setStep(1);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Application Form</h3>
                <p className="text-sm text-gray-500">Step {step} of 3</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-100">
              <div 
                className="h-full bg-green-600 transition-all duration-300 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-grow">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="+234..."
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Program Selection</h4>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Select Track</label>
                      <select
                        name="track"
                        value={formData.track}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="">Select a track...</option>
                        <option value="digital">Digital Technology</option>
                        <option value="construction">Construction Services</option>
                        <option value="fashion">Fashion & Design</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">NIN (National Identification Number)</label>
                      <input
                        type="text"
                        name="nin"
                        value={formData.nin}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter your 11-digit NIN"
                      />
                      <p className="text-xs text-gray-500">Required for verification.</p>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 text-center"
                  >
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                       <CheckCircle size={32} />
                     </div>
                     <h4 className="text-2xl font-bold text-gray-900">Review Application</h4>
                     <p className="text-gray-600">Please confirm your details before submitting.</p>
                     
                     <div className="bg-gray-50 p-4 rounded-xl text-left text-sm space-y-2 border border-gray-100">
                       <div className="flex justify-between border-b border-gray-200 pb-2">
                         <span className="text-gray-500">Name:</span>
                         <span className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</span>
                       </div>
                       <div className="flex justify-between border-b border-gray-200 pb-2">
                         <span className="text-gray-500">Email:</span>
                         <span className="font-medium text-gray-900">{formData.email}</span>
                       </div>
                       <div className="flex justify-between border-b border-gray-200 pb-2">
                         <span className="text-gray-500">Track:</span>
                         <span className="font-medium text-gray-900 capitalize">{formData.track}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-gray-500">NIN:</span>
                         <span className="font-medium text-gray-900">{formData.nin}</span>
                       </div>
                     </div>

                     <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                        <div className="text-center space-y-2">
                          <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-green-600 transition-colors" />
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold text-green-600">Click to upload</span> supporting documents
                          </div>
                          <p className="text-xs text-gray-500">PDF, JPG up to 5MB</p>
                        </div>
                     </div>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 transition-colors flex items-center gap-2 shadow-lg hover:shadow-green-700/30"
                >
                  Next Step <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-2 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 transition-colors flex items-center gap-2 shadow-lg hover:shadow-green-700/30"
                >
                  Submit Application
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
