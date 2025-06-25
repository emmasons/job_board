export function analyzeResume(text: string) {
  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();
  const wordCount = cleanText.split(/\s+/).length;

  const email = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i)?.[0] || "Not found";
  const phone = text.match(/\b\+?[0-9][0-9\-\s()]{7,}\b/)?.[0] || "Not found";

  const criteria = {
    contact_info: {
      regex: /(\b\d{10}\b|\b\w+@\w+\.\w+\b)/,
      description: "Include valid contact information (email and phone number)."
    },
    experience: {
      regex: /\b(experience|work history|employment)\b/i,
      description: "List relevant work experience clearly."
    },
    education: {
      regex: /\b(education|degree|university|college)\b/i,
      description: "Mention educational qualifications explicitly."
    },
    skills: {
      regex: /\b(skills|proficient|technologies|competencies)\b/i,
      description: "Highlight relevant skills in a dedicated section."
    },
    achievements: {
      regex: /\b(achievements|accomplishments|awards|recognition)\b/i,
      description: "Showcase significant achievements or awards."
    }
  };

  const insights: string[] = [];
  let matchedCriteriaCount = 0;

  for (const key in criteria) {
    const { regex, description } = criteria[key];
    if (regex.test(text)) {
      matchedCriteriaCount++;
    } else {
      insights.push(description);
    }
  }

  const hardSkills = [
    // --- Information Technology ---
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
    "SQL", "MongoDB", "AWS", "Docker", "Git", "HTML", "CSS", "DevOps", "Scrum", "Agile",

    // --- Healthcare ---
    "Phlebotomy", "Patient Care", "Clinical Research", "CPR", "EMR", "Nursing", "Vitals Monitoring",
    "Surgery Assistance", "Medical Terminology", "Medication Administration", "Health Records Management",

    // --- Education ---
    "Curriculum Development", "Lesson Planning", "Classroom Management", "IEPs", "Online Teaching",
    "Assessment Tools", "Special Education", "Child Development", "STEM Instruction",

    // --- Business & Admin ---
    "Microsoft Office", "Data Entry", "Calendar Management", "Record Keeping",
    "Scheduling", "Administrative Support", "Email Correspondence", "Office Management",

    // --- Finance & Accounting ---
    "QuickBooks", "Financial Reporting", "Bookkeeping", "Payroll", "Tax Preparation",
    "Budgeting", "Accounts Payable", "Accounts Receivable", "Auditing", "Excel",

    // --- Sales & Marketing ---
    "CRM", "Salesforce", "Lead Generation", "Negotiation", "Cold Calling", "Digital Marketing",
    "SEO", "Google Ads", "Copywriting", "Campaign Management", "Market Research",

    // --- Engineering ---
    "AutoCAD", "SolidWorks", "Blueprint Reading", "3D Modeling", "Matlab", "Thermodynamics",
    "Project Estimation", "Quality Control", "LEAN Manufacturing",

    // --- Construction & Trade ---
    "Carpentry", "Plumbing", "Masonry", "Electrical Wiring", "HVAC", "Blueprint Interpretation",
    "Site Supervision", "Safety Compliance", "Welding", "Roofing",

    // --- Logistics & Supply Chain ---
    "Inventory Management", "Warehouse Operations", "Shipping", "Fleet Management", 
    "Procurement", "Order Fulfillment", "Supply Chain Planning", "Forklift Operation",

    // --- Customer Service ---
    "Call Handling", "Conflict Resolution", "CRM Tools", "POS Systems", "Upselling",
    "Complaint Handling", "Live Chat Support", "Product Knowledge",

    // --- Hospitality & Food ---
    "Food Preparation", "Barista", "Mixology", "Table Setting", "Housekeeping",
    "Guest Relations", "Reservation Management", "Catering", "Cash Handling",

    // --- Creative & Design ---
    "Adobe Photoshop", "Illustrator", "InDesign", "UI/UX Design", "Branding", "Wireframing",
    "Video Editing", "Canva", "Sketch", "Typography",

    // --- Legal ---
    "Legal Research", "Case Management", "Contract Drafting", "Litigation Support",
    "Paralegal", "Compliance", "Court Filing",

    // --- Agriculture ---
    "Crop Management", "Animal Husbandry", "Irrigation", "Fertilizer Application",
    "Farm Equipment Operation", "Soil Sampling", "Greenhouse Management"
  ];


  const foundSkills = hardSkills.filter(skill => lowerText.includes(skill.toLowerCase()));

  // Define known structured sections
  const knownSections = [
    "summary", "objective", "profile", "about", "experience", "education",
    "skills", "contact", "projects", "certifications", "references"
  ];
  const foundSections = knownSections.filter(section => lowerText.includes(section));

  // --- 🔍 Improved Parse Rate Logic ---
  const structuralScore = [
    email !== "Not found" ? 1 : 0,
    phone !== "Not found" ? 1 : 0,
    foundSections.length >= 5 ? 1 : 0,
    foundSkills.length >= 5 ? 1 : 0,
    text.includes("•") || text.includes("●") || text.includes("- ") ? 1 : 0 // bullet points or structure
  ];

  const parseRateRaw = (structuralScore.reduce((a, b) => a + b, 0) / structuralScore.length) * 100;

  // --- Final Scoring ---
  const contentScore = (matchedCriteriaCount / Object.keys(criteria).length) * 100;
  const atsScore = Math.round((contentScore * 0.7) + (parseRateRaw * 0.3));

  if (!lowerText.includes("summary") && !lowerText.includes("objective") && !lowerText.includes("profile") && !lowerText.includes("about")) {
    insights.push("Add a professional summary or objective.");
  }
  if (foundSkills.length < 3) {
    insights.push("Include more hard skills relevant to your target job.");
  }

  return {
    success: true,
    email,
    phone,
    wordCount,
    score: `${contentScore.toFixed(2)}%`,
    atsScore: `${atsScore}%`,
    parseRate: `${parseRateRaw.toFixed(1)}%`,
    foundSkills,
    foundSections,
    insights
  };
}
