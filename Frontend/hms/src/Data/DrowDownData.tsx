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


export {bloodGroups, bloodGroup, doctorSpecializations, doctorDepartments};