const bloodGroups = [
    { label: "A+", value: "A_POSITIVE" },
    { label: "A-", value: "A_NEGATIVE" },
    { label: "B+", value: "B_POSITIVE" },
    { label: "B-", value: "B_NEGATIVE" },
    { label: "AB+", value: "AB_POSITIVE" },
    { label: "AB-", value: "AB_NEGATIVE" },
    { label: "O+", value: "O_POSITIVE" },
    { label: "O-", value: "O_NEGATIVE" },
];
const bloodGroup: Record<string, string> = {
    "A_POSITIVE": "A+",
    "A_NEGATIVE": "A-",
    "B_POSITIVE": "B+",
    "B_NEGATIVE": "B-",
    "AB_POSITIVE": "AB+",
    "AB_NEGATIVE": "AB-",
    "O_POSITIVE": "O+",
    "O_NEGATIVE": "O-",
  };
const doctorSpecializations = ["General Physician", "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "Psychiatrist", "Gynecologist", "Orthopedic Surgeon", "ENT Specialist", "Ophthalmologist", "Oncologist", "Endocrinologist", "Gastroenterologist", "Urologist", "Nephrologist", "Pulmonologist"];
const doctorDepartments = ["General Medicine", "Cardiology", "Dermatology", "Neurology", "Pediatrics", "Psychiatry", "Gynecology", "Orthopedics", "ENT", "Ophthalmology", "Oncology", "Endocrinology", "Gastroenterology", "Urology", "Nephrology", "Pulmonology", "Radiology", "Anesthesiology", "Emergency Medicine", "Surgery"];
const appointmentReasons = [
  "General Consultation",
  "Follow-up Visit",
  "Routine Check-up",
  "Chronic Illness Management",
  "Prescription Refill",
  "Test Results Discussion",
  "Injury Evaluation",
  "Mental Health Counseling",
  "Vaccination",
  "Pre-surgery Evaluation",
  "Post-surgery Check-up",
  "Lab Test Recommendation",
  "Fever or Cold Symptoms",
  "Skin Rash or Allergy",
  "Headache or Migraine",
  "Blood Pressure Check",
  "Diabetes Management",
  "Pregnancy Consultation",
  "Menstrual Issues",
  "Child Wellness Check-up"
];
const symptoms = [
  "Fever",
  "Cough",
  "Shortness of breath",
  "Headache",
  "Fatigue",
  "Chest pain",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Loss of appetite",
  "Sore throat",
  "Runny nose",
  "Muscle pain",
  "Joint pain",
  "Dizziness",
  "Rashes",
  "Abdominal pain",
  "Chills",
  "Weight loss",
  "Swelling"
];

const tests = [
  "Complete Blood Count (CBC)",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Blood Sugar Test",
  "Urine Routine Test",
  "X-Ray Chest",
  "MRI Scan",
  "CT Scan",
  "ECG",
  "COVID-19 RT-PCR",
  "Thyroid Profile (T3, T4, TSH)",
  "Lipid Profile",
  "Hemoglobin Test",
  "Blood Pressure Monitoring",
  "Ultrasound Abdomen",
  "Pregnancy Test",
  "HIV Test",
  "Dengue Test",
  "Malaria Test",
  "Vitamin D Test"
];



const medicineFrequencies = [
  "1-0-0",
  "0-1-0",
  "0-0-1",
  "1-0-1",
  "1-1-0",
  "0-1-1",
  "1-1-1",
  "1-0-2",
  "2-0-2",
  "1-1-1-1"
];


export {bloodGroups, bloodGroup, doctorSpecializations, doctorDepartments,appointmentReasons, symptoms, tests, medicineFrequencies};