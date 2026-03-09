import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck,
  AlertCircle, User, MapPin, Zap, Brain, Scissors, Sparkles,
  Upload, Eye, XCircle, Loader2, FileText, X, BadgeCheck
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// --- Constants ---
const OYO_LGAS = [
  "Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda",
  "Ibadan North", "Ibadan North-East", "Ibadan North-West",
  "Ibadan South-East", "Ibadan South-West", "Ibarapa Central",
  "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin",
  "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North",
  "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole",
  "Ona-Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West",
  "Saki East", "Saki West", "Surulere",
];

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
  "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
  "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara",
];

const TRADES = [
  { id: "solar", label: "Solar Installation", icon: <Zap className="w-5 h-5" />, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { id: "ai", label: "Artificial Intelligence (AI)", icon: <Brain className="w-5 h-5" />, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { id: "makeup", label: "Makeup Artistry", icon: <Sparkles className="w-5 h-5" />, color: "text-pink-600 bg-pink-50 border-pink-200" },
  { id: "fashion", label: "Fashion Design", icon: <Scissors className="w-5 h-5" />, color: "text-purple-600 bg-purple-50 border-purple-200" },
];

const STEPS = [
  { id: 0, title: "Eligibility", icon: <BadgeCheck className="w-4 h-4" /> },
  { id: 1, title: "Personal Info", icon: <User className="w-4 h-4" /> },
  { id: 2, title: "Skill Selection", icon: <Zap className="w-4 h-4" /> },
  { id: 3, title: "Financial", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 4, title: "Documents", icon: <Upload className="w-4 h-4" /> },
  { id: 5, title: "Review", icon: <Eye className="w-4 h-4" /> },
];

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  error?: string;
}

// --- Helper ---
function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

// --- Input Component ---
function FormInput({ label, required, error, hint, children }: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-neutral-700 flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
      {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
}

const inputClass = "w-full h-11 px-4 rounded-lg border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all text-sm bg-white";
const selectClass = inputClass + " appearance-none cursor-pointer";
const readonlyClass = "w-full h-11 px-4 rounded-lg border border-neutral-100 bg-neutral-50 text-neutral-500 text-sm cursor-not-allowed";

export function Apply() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId] = useState(() => `SKU-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);

  // Step 1: Eligibility
  const [stateOfResidence, setStateOfResidence] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [eligibilityErrors, setEligibilityErrors] = useState<string[]>([]);

  // Step 2: Personal Info
  const [personal, setPersonal] = useState({
    surname: "", firstName: "", otherNames: "", gender: "",
    email: "applicant@email.com", phone: "+234 800 000 0000",
    street: "", city: "", lga: "", nin: "", bvn: "",
  });
  const [ninStatus, setNinStatus] = useState<"idle" | "verifying" | "verified" | "failed">("idle");
  const [bvnStatus, setBvnStatus] = useState<"idle" | "verifying" | "verified" | "failed">("idle");
  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({});

  // Step 3: Skill Selection
  const [selectedTrade, setSelectedTrade] = useState("");
  const [priorExperience, setPriorExperience] = useState("");

  // Step 4: Financial
  const [canFundSelf, setCanFundSelf] = useState<"yes" | "no" | "">("");
  const [literacyDeclared, setLiteracyDeclared] = useState(false);

  // Step 5: Documents
  const [passportPhoto, setPassportPhoto] = useState<UploadedFile | null>(null);
  const [educationalCert, setEducationalCert] = useState<UploadedFile | null>(null);
  const [proofOfResidence, setProofOfResidence] = useState<UploadedFile | null>(null);

  // Step 6: Review
  const [finalDeclaration, setFinalDeclaration] = useState(false);

  const passportRef = useRef<HTMLInputElement>(null);
  const certRef = useRef<HTMLInputElement>(null);
  const residenceRef = useRef<HTMLInputElement>(null);

  // --- Verify NIN/BVN Mock ---
  function verifyNin() {
    if (personal.nin.length !== 11) {
      toast.error("NIN must be exactly 11 digits.");
      return;
    }
    setNinStatus("verifying");
    setTimeout(() => {
      setNinStatus("verified");
      toast.success("NIN verified successfully.");
    }, 2000);
  }

  function verifyBvn() {
    if (personal.bvn.length !== 11) {
      toast.error("BVN must be exactly 11 digits.");
      return;
    }
    setBvnStatus("verifying");
    setTimeout(() => {
      setBvnStatus("verified");
      toast.success("BVN verified successfully.");
    }, 2000);
  }

  // --- File Upload Handler ---
  function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (f: UploadedFile | null) => void,
    allowedTypes: string[],
    optional?: boolean
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedTypes.includes(ext)) {
      setter({ file, name: file.name, size: formatFileSize(file.size), error: `Invalid file type. Allowed: ${allowedTypes.join(", ").toUpperCase()}` });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setter({ file, name: file.name, size: formatFileSize(file.size), error: "File exceeds 2MB size limit." });
      return;
    }
    setter({ file, name: file.name, size: formatFileSize(file.size) });
  }

  // --- Step Validation ---
  function validateStep1(): boolean {
    const errors: string[] = [];
    if (!stateOfResidence) { errors.push("Please select your state of residence."); }
    else if (stateOfResidence !== "Oyo") {
      errors.push(`The SKILL UP Pilot application is currently only open to residents of Oyo State. Please check back for future phases in your state.`);
    }
    if (!dateOfBirth) { errors.push("Please enter your date of birth."); }
    else {
      const age = calculateAge(dateOfBirth);
      if (age < 18 || age > 45) errors.push(`Your age (${age}) does not meet the 18–45 years eligibility requirement.`);
    }
    if (!citizenship) { errors.push("Please select your citizenship status."); }
    else if (citizenship === "Other") errors.push("Only Nigerian citizens are eligible for this program.");
    setEligibilityErrors(errors);
    return errors.length === 0;
  }

  function validateStep2(): boolean {
    const errors: Record<string, string> = {};
    if (!personal.surname) errors.surname = "Surname is required.";
    if (!personal.firstName) errors.firstName = "First name is required.";
    if (!personal.gender) errors.gender = "Please select a gender.";
    if (!personal.street) errors.street = "Street address is required.";
    if (!personal.city) errors.city = "City is required.";
    if (!personal.lga) errors.lga = "Please select your LGA.";
    if (!personal.nin || personal.nin.length !== 11) errors.nin = "A valid 11-digit NIN is required.";
    if (!personal.bvn || personal.bvn.length !== 11) errors.bvn = "A valid 11-digit BVN is required.";
    if (ninStatus !== "verified") errors.nin = "NIN must be verified before proceeding.";
    if (bvnStatus !== "verified") errors.bvn = "BVN must be verified before proceeding.";
    setPersonalErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateStep3(): boolean {
    if (!selectedTrade) { toast.error("Please select a skill track."); return false; }
    if (priorExperience.trim().length < 20) { toast.error("Please describe your prior experience (at least 20 characters)."); return false; }
    return true;
  }

  function validateStep4(): boolean {
    if (canFundSelf !== "no") { toast.error("You must declare you cannot independently fund this training."); return false; }
    if (!literacyDeclared) { toast.error("Please confirm the literacy declaration."); return false; }
    return true;
  }

  function validateStep5(): boolean {
    if (!passportPhoto || passportPhoto.error) { toast.error("Please upload a valid passport photograph."); return false; }
    if (!proofOfResidence || proofOfResidence.error) { toast.error("Please upload proof of residence."); return false; }
    return true;
  }

  function handleNext() {
    const validators: Record<number, () => boolean> = {
      0: validateStep1, 1: validateStep2,
      2: validateStep3, 3: validateStep4, 4: validateStep5,
    };
    const validate = validators[currentStep];
    if (validate && !validate()) return;
    setCurrentStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setCurrentStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit() {
    if (!finalDeclaration) { toast.error("Please confirm the declaration before submitting."); return; }
    setIsSubmitted(true);
    toast.success("Application submitted successfully!");
  }

  // --- Success Screen ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-lg w-full bg-white rounded-2xl border border-neutral-100 shadow-xl p-12 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="text-xs text-emerald-700 font-bold uppercase tracking-widest mb-2">Submission Confirmed</div>
          <h2 className="text-3xl text-neutral-900 mb-4">Application Received!</h2>
          <p className="text-neutral-500 mb-6 leading-relaxed">
            Your SKILL UP application has been successfully submitted. Keep your Application ID safe — you will need it to track your application status.
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-6 py-4 mb-6">
            <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Your Application ID</div>
            <div className="text-2xl text-emerald-700 font-mono">{applicationId}</div>
          </div>
          <div className="text-sm text-neutral-500 mb-8 p-4 bg-blue-50 rounded-xl text-left border border-blue-100">
            <strong className="text-blue-800 block mb-1">What happens next?</strong>
            You will receive a confirmation SMS and email. If you are shortlisted, you will be notified via SMS and email with further instructions. Decisions are made on a rolling basis.
          </div>
          <Link href="/" className="inline-block w-full py-3 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const tradeObj = TRADES.find(t => t.id === selectedTrade);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Geo-Restriction Notice */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
        <div className="container mx-auto flex items-center gap-3 text-sm text-amber-800">
          <MapPin className="w-4 h-4 flex-shrink-0 text-amber-600" />
          <span><strong>Location Notice:</strong> This application is currently only open to residents of <strong>Oyo State</strong>. Your state of residence will be verified in Step 1.</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="text-emerald-700 text-xs font-bold uppercase tracking-widest mb-2">NELFUND SKILL UP Pilot</div>
          <h1 className="text-3xl text-neutral-900 mb-2">Application Form</h1>
          <p className="text-neutral-500 text-sm">Complete all required steps carefully. Your information will be verified against national databases.</p>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-4 mb-8 shadow-sm">
          <div className="flex items-center overflow-x-auto gap-1">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-1 min-w-max flex-1">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all flex-1 ${currentStep === idx
                    ? "bg-emerald-50 text-emerald-700"
                    : currentStep > idx
                      ? "bg-emerald-700/5 text-emerald-600"
                      : "text-neutral-400"
                  }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${currentStep > idx ? "bg-emerald-600 text-white"
                      : currentStep === idx ? "bg-emerald-700 text-white ring-4 ring-emerald-100"
                        : "bg-neutral-100 text-neutral-400"
                    }`}>
                    {currentStep > idx ? <CheckCircle2 className="w-4 h-4" /> : <span>{idx + 1}</span>}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[10px] uppercase tracking-wider opacity-60">Step {idx + 1}</div>
                    <div className="text-xs font-bold leading-none">{step.title}</div>
                  </div>
                </div>
                {idx < STEPS.length - 1 && <div className="h-px w-3 bg-neutral-200 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* ---- STEP 0: Eligibility ---- */}
              {currentStep === 0 && (
                <div className="p-8 lg:p-10">
                  <div className="mb-8">
                    <h2 className="text-xl text-neutral-900 mb-1">Step 1: Eligibility Screening</h2>
                    <p className="text-neutral-500 text-sm">Answer the following questions to confirm you meet the criteria for this program.</p>
                  </div>

                  {eligibilityErrors.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
                      {eligibilityErrors.map((e, i) => (
                        <div key={i} className="flex items-start gap-2 text-red-700 text-sm">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{e}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-6">
                    <FormInput label="State of Residence" required error={eligibilityErrors.find(e => e.includes("state")) ? " " : undefined}>
                      <select
                        value={stateOfResidence}
                        onChange={e => { setStateOfResidence(e.target.value); setEligibilityErrors([]); }}
                        className={selectClass}
                      >
                        <option value="">Select your state</option>
                        {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </FormInput>

                    <FormInput label="Date of Birth" required hint="You must be between 18 and 45 years old.">
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={e => { setDateOfBirth(e.target.value); setEligibilityErrors([]); }}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                        className={inputClass}
                      />
                    </FormInput>

                    <FormInput label="Citizenship Status" required>
                      <div className="flex gap-4">
                        {["Nigerian", "Other"].map(c => (
                          <label key={c} className={`flex items-center gap-3 px-5 py-3.5 rounded-lg border cursor-pointer flex-1 transition-all ${citizenship === c ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-neutral-200 hover:border-neutral-300"
                            }`}>
                            <input
                              type="radio"
                              value={c}
                              checked={citizenship === c}
                              onChange={() => { setCitizenship(c); setEligibilityErrors([]); }}
                              className="accent-emerald-600"
                            />
                            <span className="text-sm font-medium">{c}</span>
                          </label>
                        ))}
                      </div>
                    </FormInput>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-sm text-blue-800">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                    <span>Your eligibility will be cross-checked with your NIN/BVN records in the next step. Please ensure all information is accurate.</span>
                  </div>
                </div>
              )}

              {/* ---- STEP 1: Personal Info ---- */}
              {currentStep === 1 && (
                <div className="p-8 lg:p-10">
                  <div className="mb-8">
                    <h2 className="text-xl text-neutral-900 mb-1">Step 2: Personal Information & Identification</h2>
                    <p className="text-neutral-500 text-sm">Provide your details exactly as they appear on your government-issued ID documents.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Name Fields */}
                    <div className="p-5 bg-neutral-50 rounded-xl space-y-4 border border-neutral-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">Full Name</div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <FormInput label="Surname" required error={personalErrors.surname}>
                          <input value={personal.surname} onChange={e => setPersonal(p => ({ ...p, surname: e.target.value }))} className={inputClass} placeholder="e.g. Adesanya" />
                        </FormInput>
                        <FormInput label="First Name" required error={personalErrors.firstName}>
                          <input value={personal.firstName} onChange={e => setPersonal(p => ({ ...p, firstName: e.target.value }))} className={inputClass} placeholder="e.g. Oluwaseun" />
                        </FormInput>
                        <FormInput label="Other Names">
                          <input value={personal.otherNames} onChange={e => setPersonal(p => ({ ...p, otherNames: e.target.value }))} className={inputClass} placeholder="Middle name(s)" />
                        </FormInput>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormInput label="Gender" required error={personalErrors.gender}>
                        <select value={personal.gender} onChange={e => setPersonal(p => ({ ...p, gender: e.target.value }))} className={selectClass}>
                          <option value="">Select gender</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </FormInput>
                      <div /> {/* spacer */}
                      <FormInput label="Email Address" hint="Pre-filled from your account. Read-only.">
                        <input value={personal.email} readOnly className={readonlyClass} />
                      </FormInput>
                      <FormInput label="Phone Number" hint="Pre-filled from your account. Read-only.">
                        <input value={personal.phone} readOnly className={readonlyClass} />
                      </FormInput>
                    </div>

                    {/* Address */}
                    <div className="p-5 bg-neutral-50 rounded-xl space-y-4 border border-neutral-100">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">Residential Address (Oyo State)</div>
                      <FormInput label="Street Address" required error={personalErrors.street}>
                        <input value={personal.street} onChange={e => setPersonal(p => ({ ...p, street: e.target.value }))} className={inputClass} placeholder="House number & street name" />
                      </FormInput>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormInput label="City / Town" required error={personalErrors.city}>
                          <input value={personal.city} onChange={e => setPersonal(p => ({ ...p, city: e.target.value }))} className={inputClass} placeholder="e.g. Ibadan" />
                        </FormInput>
                        <FormInput label="Local Government Area (LGA)" required error={personalErrors.lga}>
                          <select value={personal.lga} onChange={e => setPersonal(p => ({ ...p, lga: e.target.value }))} className={selectClass}>
                            <option value="">Select LGA</option>
                            {OYO_LGAS.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </FormInput>
                      </div>
                    </div>

                    {/* NIN/BVN */}
                    <div className="p-5 bg-neutral-50 rounded-xl space-y-4 border border-neutral-100">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Identity Verification
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* NIN */}
                        <div className="space-y-1.5">
                          <label className="text-sm text-neutral-700">NIN (National ID Number) <span className="text-red-500">*</span></label>
                          <div className="flex gap-2">
                            <input
                              value={personal.nin}
                              onChange={e => { setPersonal(p => ({ ...p, nin: e.target.value.replace(/\D/g, "").slice(0, 11) })); setNinStatus("idle"); }}
                              placeholder="11 digits"
                              maxLength={11}
                              className={`${inputClass} flex-1 font-mono`}
                            />
                            <button
                              type="button"
                              onClick={verifyNin}
                              disabled={ninStatus === "verifying" || ninStatus === "verified"}
                              className={`px-4 rounded-lg text-sm font-bold transition-all flex-shrink-0 flex items-center gap-1.5 ${ninStatus === "verified" ? "bg-emerald-100 text-emerald-700 cursor-default"
                                  : ninStatus === "verifying" ? "bg-neutral-100 text-neutral-400 cursor-wait"
                                    : "bg-emerald-700 text-white hover:bg-emerald-600"
                                }`}
                            >
                              {ninStatus === "verifying" ? <Loader2 className="w-4 h-4 animate-spin" /> : ninStatus === "verified" ? <CheckCircle2 className="w-4 h-4" /> : null}
                              {ninStatus === "verified" ? "Verified" : ninStatus === "verifying" ? "..." : "Verify"}
                            </button>
                          </div>
                          {personalErrors.nin && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{personalErrors.nin}</p>}
                        </div>
                        {/* BVN */}
                        <div className="space-y-1.5">
                          <label className="text-sm text-neutral-700">BVN (Bank Verification Number) <span className="text-red-500">*</span></label>
                          <div className="flex gap-2">
                            <input
                              value={personal.bvn}
                              onChange={e => { setPersonal(p => ({ ...p, bvn: e.target.value.replace(/\D/g, "").slice(0, 11) })); setBvnStatus("idle"); }}
                              placeholder="11 digits"
                              maxLength={11}
                              className={`${inputClass} flex-1 font-mono`}
                            />
                            <button
                              type="button"
                              onClick={verifyBvn}
                              disabled={bvnStatus === "verifying" || bvnStatus === "verified"}
                              className={`px-4 rounded-lg text-sm font-bold transition-all flex-shrink-0 flex items-center gap-1.5 ${bvnStatus === "verified" ? "bg-emerald-100 text-emerald-700 cursor-default"
                                  : bvnStatus === "verifying" ? "bg-neutral-100 text-neutral-400 cursor-wait"
                                    : "bg-emerald-700 text-white hover:bg-emerald-600"
                                }`}
                            >
                              {bvnStatus === "verifying" ? <Loader2 className="w-4 h-4 animate-spin" /> : bvnStatus === "verified" ? <CheckCircle2 className="w-4 h-4" /> : null}
                              {bvnStatus === "verified" ? "Verified" : bvnStatus === "verifying" ? "..." : "Verify"}
                            </button>
                          </div>
                          {personalErrors.bvn && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{personalErrors.bvn}</p>}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400">Both NIN and BVN must be verified before you can proceed. Verification checks against NIMC and NIBSS databases.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- STEP 2: Skill Selection ---- */}
              {currentStep === 2 && (
                <div className="p-8 lg:p-10">
                  <div className="mb-8">
                    <h2 className="text-xl text-neutral-900 mb-1">Step 3: Skill Selection & Experience</h2>
                    <p className="text-neutral-500 text-sm">Select one priority trade. You may only apply for a single track.</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {TRADES.map(trade => (
                      <label
                        key={trade.id}
                        className={`flex items-center gap-5 p-5 rounded-xl border-2 cursor-pointer transition-all group ${selectedTrade === trade.id
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-neutral-100 hover:border-neutral-200 bg-white"
                          }`}
                      >
                        <input
                          type="radio"
                          name="trade"
                          value={trade.id}
                          checked={selectedTrade === trade.id}
                          onChange={() => setSelectedTrade(trade.id)}
                          className="sr-only"
                        />
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${trade.color}`}>
                          {trade.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-neutral-900 font-bold">{trade.label}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedTrade === trade.id ? "border-emerald-600 bg-emerald-600" : "border-neutral-300"
                          }`}>
                          {selectedTrade === trade.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm text-neutral-700">
                      Prior Experience / Recognition of Prior Learning (RPL) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={priorExperience}
                      onChange={e => setPriorExperience(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none transition-all text-sm resize-none"
                      placeholder={`Describe your existing experience in ${selectedTrade ? TRADES.find(t => t.id === selectedTrade)?.label : "your selected trade"}. Include years of informal apprenticeship, projects completed, tools used, or any self-taught knowledge.`}
                    />
                    <p className="text-xs text-neutral-400">{priorExperience.length} characters (minimum 20 required). No prior experience? Write "None" and explain what motivates you to learn this trade.</p>
                  </div>
                </div>
              )}

              {/* ---- STEP 3: Financial & Literacy ---- */}
              {currentStep === 3 && (
                <div className="p-8 lg:p-10">
                  <div className="mb-8">
                    <h2 className="text-xl text-neutral-900 mb-1">Step 4: Financial Need & Literacy Declaration</h2>
                    <p className="text-neutral-500 text-sm">This program is designed for individuals who cannot independently fund their training. Please answer honestly.</p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <div className="text-sm text-neutral-700 mb-4 font-medium">
                        Do you have sufficient means to fund this training independently? <span className="text-red-500">*</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {(["no", "yes"] as const).map(val => (
                          <label
                            key={val}
                            className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${canFundSelf === val
                                ? val === "yes" ? "border-red-400 bg-red-50" : "border-emerald-600 bg-emerald-50"
                                : "border-neutral-100 hover:border-neutral-200"
                              }`}
                          >
                            <input
                              type="radio"
                              name="fundSelf"
                              value={val}
                              checked={canFundSelf === val}
                              onChange={() => setCanFundSelf(val)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${canFundSelf === val ? (val === "yes" ? "border-red-500 bg-red-500" : "border-emerald-600 bg-emerald-600") : "border-neutral-300"
                              }`}>
                              {canFundSelf === val && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{val === "yes" ? "Yes, I can fund it" : "No, I cannot fund it"}</div>
                              <div className="text-xs text-neutral-400 mt-0.5">{val === "yes" ? "I have sufficient financial resources" : "I require financial support"}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {canFundSelf === "yes" && (
                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 text-sm text-amber-800">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                          <span>This program is designed for individuals with financial need. You may not be eligible. Please reconsider your response or contact NELFUND for guidance.</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-sm text-neutral-700 mb-3 font-medium">Basic Literacy Declaration <span className="text-red-500">*</span></div>
                      <label className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${literacyDeclared ? "border-emerald-600 bg-emerald-50" : "border-neutral-100 hover:border-neutral-200"
                        }`}>
                        <input
                          type="checkbox"
                          checked={literacyDeclared}
                          onChange={e => setLiteracyDeclared(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-neutral-300 accent-emerald-600 flex-shrink-0"
                        />
                        <span className="text-sm text-neutral-600 leading-relaxed">
                          I confirm that I possess sufficient basic literacy to participate in training activities, follow instructions, and engage in simple documentation or communication tasks associated with my selected trade.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- STEP 4: Documents ---- */}
              {currentStep === 4 && (
                <div className="p-8 lg:p-10">
                  <div className="mb-8">
                    <h2 className="text-xl text-neutral-900 mb-1">Step 5: Document Upload</h2>
                    <p className="text-neutral-500 text-sm">Upload the required documents. Max file size: 2MB per document.</p>
                  </div>

                  <div className="space-y-5">
                    {/* Passport Photo */}
                    <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm text-neutral-900 font-bold">Recent Passport Photograph <span className="text-red-500">*</span></div>
                          <div className="text-xs text-neutral-400">JPEG or PNG only · Max 2MB</div>
                        </div>
                        <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded-full font-bold">Required</span>
                      </div>
                      <input ref={passportRef} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => handleFileUpload(e, setPassportPhoto, ["jpg", "jpeg", "png"])} />
                      {passportPhoto ? (
                        <div className={`flex items-center gap-3 p-3 rounded-lg border ${passportPhoto.error ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                          <FileText className={`w-5 h-5 flex-shrink-0 ${passportPhoto.error ? "text-red-500" : "text-emerald-600"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{passportPhoto.name}</div>
                            <div className={`text-xs ${passportPhoto.error ? "text-red-500" : "text-neutral-400"}`}>{passportPhoto.error || passportPhoto.size}</div>
                          </div>
                          <button onClick={() => setPassportPhoto(null)} className="text-neutral-400 hover:text-red-500 flex-shrink-0"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => passportRef.current?.click()} className="w-full flex items-center justify-center gap-2 py-8 border-2 border-dashed border-neutral-200 rounded-lg text-sm text-neutral-400 hover:border-emerald-300 hover:text-emerald-600 transition-all">
                          <Upload className="w-5 h-5" /> Click to upload passport photo
                        </button>
                      )}
                    </div>

                    {/* Educational Certificate */}
                    <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm text-neutral-900 font-bold">Highest Educational Certificate / Statement of Result</div>
                          <div className="text-xs text-neutral-400">PDF, JPEG, or PNG · Max 2MB</div>
                        </div>
                        <span className="text-xs text-neutral-500 bg-neutral-200 px-2 py-0.5 rounded-full font-bold">Optional</span>
                      </div>
                      <input ref={certRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => handleFileUpload(e, setEducationalCert, ["pdf", "jpg", "jpeg", "png"])} />
                      {educationalCert ? (
                        <div className={`flex items-center gap-3 p-3 rounded-lg border ${educationalCert.error ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                          <FileText className={`w-5 h-5 flex-shrink-0 ${educationalCert.error ? "text-red-500" : "text-emerald-600"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{educationalCert.name}</div>
                            <div className={`text-xs ${educationalCert.error ? "text-red-500" : "text-neutral-400"}`}>{educationalCert.error || educationalCert.size}</div>
                          </div>
                          <button onClick={() => setEducationalCert(null)} className="text-neutral-400 hover:text-red-500 flex-shrink-0"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => certRef.current?.click()} className="w-full flex items-center justify-center gap-2 py-8 border-2 border-dashed border-neutral-200 rounded-lg text-sm text-neutral-400 hover:border-emerald-300 hover:text-emerald-600 transition-all">
                          <Upload className="w-5 h-5" /> Click to upload certificate (optional)
                        </button>
                      )}
                    </div>

                    {/* Proof of Residence */}
                    <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm text-neutral-900 font-bold">Proof of Residence <span className="text-red-500">*</span></div>
                          <div className="text-xs text-neutral-400">Utility bill, bank statement, or LGA letter · PDF, JPEG, or PNG · Max 2MB</div>
                        </div>
                        <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded-full font-bold">Required</span>
                      </div>
                      <input ref={residenceRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => handleFileUpload(e, setProofOfResidence, ["pdf", "jpg", "jpeg", "png"])} />
                      {proofOfResidence ? (
                        <div className={`flex items-center gap-3 p-3 rounded-lg border ${proofOfResidence.error ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                          <FileText className={`w-5 h-5 flex-shrink-0 ${proofOfResidence.error ? "text-red-500" : "text-emerald-600"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{proofOfResidence.name}</div>
                            <div className={`text-xs ${proofOfResidence.error ? "text-red-500" : "text-neutral-400"}`}>{proofOfResidence.error || proofOfResidence.size}</div>
                          </div>
                          <button onClick={() => setProofOfResidence(null)} className="text-neutral-400 hover:text-red-500 flex-shrink-0"><X className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => residenceRef.current?.click()} className="w-full flex items-center justify-center gap-2 py-8 border-2 border-dashed border-neutral-200 rounded-lg text-sm text-neutral-400 hover:border-emerald-300 hover:text-emerald-600 transition-all">
                          <Upload className="w-5 h-5" /> Click to upload proof of residence
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- STEP 5: Review & Submit ---- */}
              {currentStep === 5 && (
                <div className="p-8 lg:p-10">
                  <div className="mb-8">
                    <h2 className="text-xl text-neutral-900 mb-1">Step 6: Review & Submit</h2>
                    <p className="text-neutral-500 text-sm">Please review all your information carefully before submitting. You cannot edit after submission.</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {/* Eligibility Summary */}
                    <div className="bg-neutral-50 rounded-xl border border-neutral-100 overflow-hidden">
                      <div className="px-5 py-3 bg-neutral-100 text-xs font-bold uppercase tracking-wider text-neutral-500">Eligibility</div>
                      <div className="p-5 grid sm:grid-cols-3 gap-4 text-sm">
                        <div><div className="text-neutral-400 text-xs mb-1">State of Residence</div><div className="text-neutral-900">{stateOfResidence}</div></div>
                        <div><div className="text-neutral-400 text-xs mb-1">Date of Birth</div><div className="text-neutral-900">{dateOfBirth} <span className="text-neutral-400">(Age: {dateOfBirth ? calculateAge(dateOfBirth) : "–"})</span></div></div>
                        <div><div className="text-neutral-400 text-xs mb-1">Citizenship</div><div className="text-neutral-900">{citizenship}</div></div>
                      </div>
                    </div>

                    {/* Personal Info Summary */}
                    <div className="bg-neutral-50 rounded-xl border border-neutral-100 overflow-hidden">
                      <div className="px-5 py-3 bg-neutral-100 text-xs font-bold uppercase tracking-wider text-neutral-500">Personal Information</div>
                      <div className="p-5 grid sm:grid-cols-2 gap-4 text-sm">
                        <div><div className="text-neutral-400 text-xs mb-1">Full Name</div><div className="text-neutral-900">{[personal.surname, personal.firstName, personal.otherNames].filter(Boolean).join(" ")}</div></div>
                        <div><div className="text-neutral-400 text-xs mb-1">Gender</div><div className="text-neutral-900">{personal.gender}</div></div>
                        <div><div className="text-neutral-400 text-xs mb-1">Email</div><div className="text-neutral-900">{personal.email}</div></div>
                        <div><div className="text-neutral-400 text-xs mb-1">Phone</div><div className="text-neutral-900">{personal.phone}</div></div>
                        <div><div className="text-neutral-400 text-xs mb-1">LGA</div><div className="text-neutral-900">{personal.lga}, {personal.city}</div></div>
                        <div><div className="text-neutral-400 text-xs mb-1">NIN / BVN</div><div className="flex gap-3 items-center"><span className="text-neutral-900 font-mono">{personal.nin.slice(0, 4)}•••••{personal.nin.slice(-2)}</span><CheckCircle2 className="w-4 h-4 text-emerald-600" /></div></div>
                      </div>
                    </div>

                    {/* Trade Summary */}
                    <div className="bg-neutral-50 rounded-xl border border-neutral-100 overflow-hidden">
                      <div className="px-5 py-3 bg-neutral-100 text-xs font-bold uppercase tracking-wider text-neutral-500">Skill Selection</div>
                      <div className="p-5 text-sm">
                        <div className="flex items-center gap-3 mb-3">
                          {tradeObj && <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${tradeObj.color}`}>{tradeObj.icon}</div>}
                          <div className="text-neutral-900 font-bold">{tradeObj?.label}</div>
                        </div>
                        <div className="text-neutral-400 text-xs mb-1">Prior Experience</div>
                        <div className="text-neutral-600 text-sm leading-relaxed bg-white p-3 rounded-lg border border-neutral-100">{priorExperience || "–"}</div>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-neutral-50 rounded-xl border border-neutral-100 overflow-hidden">
                      <div className="px-5 py-3 bg-neutral-100 text-xs font-bold uppercase tracking-wider text-neutral-500">Financial & Literacy</div>
                      <div className="p-5 grid sm:grid-cols-2 gap-4 text-sm">
                        <div><div className="text-neutral-400 text-xs mb-1">Can Fund Independently</div><div className="text-neutral-900">{canFundSelf === "no" ? "No – Financial need confirmed" : canFundSelf}</div></div>
                        <div><div className="text-neutral-400 text-xs mb-1">Literacy Declaration</div><div className="flex items-center gap-1 text-emerald-700"><CheckCircle2 className="w-4 h-4" /> Confirmed</div></div>
                      </div>
                    </div>

                    {/* Documents Summary */}
                    <div className="bg-neutral-50 rounded-xl border border-neutral-100 overflow-hidden">
                      <div className="px-5 py-3 bg-neutral-100 text-xs font-bold uppercase tracking-wider text-neutral-500">Documents Uploaded</div>
                      <div className="p-5 space-y-2 text-sm">
                        {[
                          { label: "Passport Photograph", file: passportPhoto, required: true },
                          { label: "Educational Certificate", file: educationalCert, required: false },
                          { label: "Proof of Residence", file: proofOfResidence, required: true },
                        ].map((doc, i) => (
                          <div key={i} className="flex items-center gap-3">
                            {doc.file && !doc.file.error ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-neutral-300" />}
                            <span className="text-neutral-600">{doc.label}</span>
                            {doc.file && !doc.file.error ? <span className="text-neutral-400 text-xs">{doc.file.name}</span> : <span className="text-neutral-400 text-xs">{doc.required ? "Not uploaded" : "Not provided (optional)"}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Final Declaration */}
                  <label className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all mb-6 ${finalDeclaration ? "border-emerald-600 bg-emerald-50" : "border-neutral-200"}`}>
                    <input type="checkbox" checked={finalDeclaration} onChange={e => setFinalDeclaration(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-neutral-300 accent-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 leading-relaxed">
                      I hereby declare that all information provided in this application is true, accurate, and complete. I understand that providing false or misleading information may result in immediate disqualification and possible legal action. I agree to the{" "}
                      <button type="button" className="text-emerald-700 font-bold hover:underline">Data Privacy Policy</button>{" "}and{" "}
                      <button type="button" className="text-emerald-700 font-bold hover:underline">Terms & Conditions</button>.
                    </span>
                  </label>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between px-8 lg:px-10 py-6 border-t border-neutral-100 bg-neutral-50/50">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${currentStep === 0 ? "invisible" : "text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="text-xs text-neutral-400">
              Step {currentStep + 1} of {STEPS.length}
            </div>

            {currentStep === STEPS.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-2.5 bg-emerald-700 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
              >
                Submit Application <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-2.5 bg-emerald-700 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-neutral-400 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Secured by NELFUND Identity Management System · All data is encrypted
        </div>
      </div>
    </div>
  );
}
