const {useMemo, useState} = React;
const h = React.createElement;

const indianColleges = [
  {min: 650, name: "Maulana Azad Medical College", city: "New Delhi", type: "Government", cutoff: "650+", fees: "Low annual tuition", seats: "High competition"},
  {min: 625, name: "VMMC & Safdarjung Hospital", city: "New Delhi", type: "Government", cutoff: "625+", fees: "Low annual tuition", seats: "Strong clinical exposure"},
  {min: 590, name: "Government Medical College", city: "Nagpur", type: "Government", cutoff: "590+", fees: "Moderate tuition", seats: "State quota dependent"},
  {min: 545, name: "Ramaiah Medical College", city: "Bengaluru", type: "Private", cutoff: "545+", fees: "Higher tuition", seats: "Counselling dependent"},
  {min: 500, name: "Kalinga Institute of Medical Sciences", city: "Bhubaneswar", type: "Deemed", cutoff: "500+", fees: "Higher tuition", seats: "All India counselling"},
  {min: 430, name: "DY Patil Medical College", city: "Pune", type: "Deemed", cutoff: "430+", fees: "Premium tuition", seats: "Management options"},
  {min: 350, name: "Private MBBS Counselling Pool", city: "Multiple cities", type: "Private", cutoff: "350+", fees: "Budget varies", seats: "Needs expert review"},
  {min: 1, name: "BDS, Allied Health, and Abroad MBBS Track", city: "India and abroad", type: "Alternative", cutoff: "Below typical MBBS cutoff", fees: "Flexible", seats: "High-fit alternatives"}
];

const abroadUniversities = [
  {country: "Russia", city: "Kazan", name: "Kazan Federal University", fees: 520000, indianStudents: 950, duration: "6 years", agents: ["Aarav Mehta", "Nisha Rao", "Kabir Sharma"]},
  {country: "Russia", city: "Moscow", name: "Pirogov Russian National Research Medical University", fees: 680000, indianStudents: 620, duration: "6 years", agents: ["Nisha Rao", "Ishaan Verma", "Meera Singh"]},
  {country: "Georgia", city: "Tbilisi", name: "Tbilisi State Medical University", fees: 610000, indianStudents: 780, duration: "6 years", agents: ["Kabir Sharma", "Meera Singh", "Aarav Mehta"]},
  {country: "Georgia", city: "Batumi", name: "Batumi Shota Rustaveli State University", fees: 470000, indianStudents: 360, duration: "6 years", agents: ["Ishaan Verma", "Nisha Rao", "Meera Singh"]},
  {country: "Kazakhstan", city: "Almaty", name: "Kazakh National Medical University", fees: 410000, indianStudents: 1100, duration: "5 years", agents: ["Aarav Mehta", "Kabir Sharma", "Ishaan Verma"]},
  {country: "Uzbekistan", city: "Tashkent", name: "Tashkent Medical Academy", fees: 390000, indianStudents: 840, duration: "6 years", agents: ["Meera Singh", "Aarav Mehta", "Nisha Rao"]},
  {country: "Kyrgyzstan", city: "Bishkek", name: "Kyrgyz State Medical Academy", fees: 330000, indianStudents: 1250, duration: "5 years", agents: ["Kabir Sharma", "Ishaan Verma", "Nisha Rao"]},
  {country: "Nepal", city: "Kathmandu", name: "Kathmandu Medical College", fees: 780000, indianStudents: 430, duration: "5.5 years", agents: ["Aarav Mehta", "Meera Singh", "Ishaan Verma"]}
];

const agentProfiles = {
  "Aarav Mehta": {
    rating: "4.9",
    city: "Delhi counselling desk",
    phone: "919876543210",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    bestFor: "Budget planning",
    experience: "8 years",
    admits: "1,240+ admits",
    response: "Replies in 6 min",
    language: "Hindi, English",
    strength: "Compares total cost, hostel, and city safety before shortlisting."
  },
  "Nisha Rao": {
    rating: "4.8",
    city: "South India student desk",
    phone: "919812345670",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bestFor: "Parent counselling",
    experience: "7 years",
    admits: "980+ admits",
    response: "Replies in 9 min",
    language: "English, Telugu",
    strength: "Strong at parent calls, documentation clarity, and intake timelines."
  },
  "Kabir Sharma": {
    rating: "4.7",
    city: "Visa and documents lead",
    phone: "919701234568",
    photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80",
    bestFor: "Visa process",
    experience: "6 years",
    admits: "760+ admits",
    response: "Replies in 12 min",
    language: "Hindi, Punjabi",
    strength: "Best for checklist-driven students who want document risk reduced."
  },
  "Ishaan Verma": {
    rating: "4.8",
    city: "Russia and CIS expert",
    phone: "919654321780",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
    bestFor: "Russia/CIS",
    experience: "9 years",
    admits: "1,510+ admits",
    response: "Replies in 5 min",
    language: "Hindi, English",
    strength: "Knows Indian-student density, climate fit, and clinical exposure."
  },
  "Meera Singh": {
    rating: "4.9",
    city: "Georgia admissions desk",
    phone: "919889900112",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bestFor: "Georgia options",
    experience: "8 years",
    admits: "1,120+ admits",
    response: "Replies in 7 min",
    language: "English, Hindi",
    strength: "Great for students comparing university recognition and city lifestyle."
  }
};

function unique(values) {
  return [...new Set(values)].sort();
}

function formatInr(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function digitsOnly(value) {
  return value.replace(/\D/g, "");
}

function Header({goTo}) {
  return h("header", {className: "topbar"},
    h("button", {className: "brand brand-button", type: "button", onClick: () => goTo("home"), "aria-label": "GlobalConnectEducation home"},
      h("span", {className: "brand-mark"}, "GC"),
      h("span", null, "GlobalConnectEducation")
    ),
    h("nav", {className: "topnav", "aria-label": "Primary navigation"},
      h("button", {type: "button", onClick: () => goTo("home")}, "Predictor"),
      h("button", {type: "button", onClick: () => goTo("results")}, "India"),
      h("button", {type: "button", onClick: () => goTo("abroad")}, "MBBS Abroad")
    )
  );
}

function Hero({marksInput, setMarksInput, submitMarks, goTo}) {
  const marks = Number(marksInput);
  const isDirty = marksInput.length > 0;
  const isValid = Number.isFinite(marks) && marks >= 1 && marks <= 720;
  const note = isValid
    ? "Your score is ready. See India matches and a stronger abroad pathway."
    : "Type your NEET score from 1 to 720. No phone number needed.";

  return h("section", {id: "home", className: "hero page-view active"},
    h("div", {className: "hero-media"}),
    h("div", {className: "hero-scrim"}),
    h("div", {className: "hero-content"},
      h("div", {className: "hero-copy-block"},
        h("p", {className: "eyebrow"}, "NEET 2026 college predictor"),
        h("h1", null, "Know your MBBS options before counselling pressure starts."),
        h("p", {className: "hero-copy"}, "Enter your NEET marks once. Get a realistic India shortlist, then compare abroad MBBS options by budget, country, city, university, Indian-student presence, and agent support."),
        h("div", {className: "trust-strip", "aria-label": "Service trust signals"},
          h("span", null, "Government, private, deemed and abroad routes"),
          h("span", null, "Budget-first shortlisting"),
          h("span", null, "Agent profiles with decision factors")
        )
      ),
      h("form", {
        className: "predictor-panel",
        noValidate: true,
        onSubmit: (event) => {
          event.preventDefault();
          if (isValid) submitMarks(marks);
        }
      },
        h("div", {className: "panel-heading"},
          h("p", null, "Free score check"),
          h("strong", null, "Takes less than 10 seconds")
        ),
        h("label", {htmlFor: "neetMarks"}, "NEET marks out of 720"),
        h("div", {className: "marks-row"},
          h("input", {
            id: "neetMarks",
            name: "neetMarks",
            type: "text",
            pattern: "[0-9]*",
            maxLength: "3",
            placeholder: "Example: 436",
            inputMode: "numeric",
            autoComplete: "off",
            value: marksInput,
            onChange: (event) => setMarksInput(digitsOnly(event.target.value).slice(0, 3))
          }),
          h("button", {type: "submit", disabled: !isValid}, "Check colleges now")
        ),
        h("p", {className: `form-note ${isDirty && !isValid ? "error" : ""}`}, note),
        h("button", {className: "secondary-link", type: "button", onClick: () => goTo("graduation")}, "I want MBBS abroad options instead")
      )
    )
  );
}

function AbroadPush({goTo}) {
  return h("aside", {className: "abroad-push", "aria-labelledby": "abroadPushTitle"},
    h("div", null,
      h("p", {className: "eyebrow"}, "Abroad route opens more choices"),
      h("h2", {id: "abroadPushTitle"}, "Not sure India MBBS will fit your score or budget?"),
      h("p", null, "See countries, cities, fees, Indian-student numbers, and counsellors before you decide.")
    ),
    h("button", {className: "abroad-cta", type: "button", onClick: () => goTo("graduation")}, "Compare MBBS abroad now")
  );
}

function CollegeCard({college}) {
  return h("article", {className: "college-card"},
    h("div", {className: "tag-row"},
      h("span", {className: "tag"}, college.type),
      h("span", {className: "tag"}, college.cutoff)
    ),
    h("h3", null, college.name),
    h("dl", {className: "details"},
      h("div", null, h("strong", null, "Location: "), college.city),
      h("div", null, h("strong", null, "Fees: "), college.fees),
      h("div", null, h("strong", null, "Seat note: "), college.seats)
    )
  );
}

function Results({marks, goTo}) {
  const colleges = useMemo(() => {
    if (!marks) return indianColleges.filter((college) => college.min <= 500).slice(0, 6);
    const matches = indianColleges.filter((college) => marks >= college.min).slice(0, 6);
    return matches.length ? matches : indianColleges.slice(-3);
  }, [marks]);

  return h("section", {id: "results", className: "page-view results-view active", "aria-labelledby": "resultsTitle"},
    h("div", {className: "section-shell"},
      h("div", {className: "section-heading"},
        h("p", {className: "eyebrow"}, "India college matches"),
        h("h2", {id: "resultsTitle"}, "Colleges matched to ", h("span", null, marks ? `${marks} marks` : "a sample 500 mark profile")),
        h("p", null, "Use this as a first-pass counselling shortlist. Final admission depends on category, state quota, round, seat matrix, and official counselling rules.")
      ),
      h(AbroadPush, {goTo}),
      h("div", {className: "college-grid", "aria-live": "polite"}, colleges.map((college) => h(CollegeCard, {key: college.name, college})))
    )
  );
}

function GraduationStep({graduation, setGraduation, goTo}) {
  const [attempted, setAttempted] = useState(false);
  const years = ["2027", "2026", "2025", "2024", "2023", "Before 2023"];

  return h("section", {id: "graduation", className: "page-view form-step active", "aria-labelledby": "graduationTitle"},
    h("div", {className: "form-card"},
      h("p", {className: "eyebrow"}, "Step 1 of 2"),
      h("h2", {id: "graduationTitle"}, "Your qualifying year"),
      h("form", {
        noValidate: true,
        onSubmit: (event) => {
          event.preventDefault();
          setAttempted(true);
          if (graduation) goTo("budget");
        }
      },
        h("label", {htmlFor: "graduationYear"}, "Year"),
        h("select", {id: "graduationYear", value: graduation, onChange: (event) => setGraduation(event.target.value), required: true},
          h("option", {value: ""}, "Select year"),
          years.map((year) => h("option", {key: year, value: year}, year))
        ),
        h("p", {className: `form-note ${attempted && !graduation ? "error" : ""}`}, attempted && !graduation ? "Please select your year." : "We use this to check intake eligibility and document readiness."),
        h("button", {className: "primary-btn", type: "submit"}, "Continue")
      )
    )
  );
}

function BudgetStep({budgetInput, setBudgetInput, setBudget, goTo}) {
  const [attempted, setAttempted] = useState(false);
  const budget = Number(budgetInput);
  const isValid = Number.isFinite(budget) && budget >= 100000;

  return h("section", {id: "budget", className: "page-view form-step active", "aria-labelledby": "budgetTitle"},
    h("div", {className: "form-card"},
      h("p", {className: "eyebrow"}, "Step 2 of 2"),
      h("h2", {id: "budgetTitle"}, "Your yearly tuition budget"),
      h("form", {
        noValidate: true,
        onSubmit: (event) => {
          event.preventDefault();
          setAttempted(true);
          if (isValid) {
            setBudget(budget);
            goTo("abroad");
          }
        }
      },
        h("label", {htmlFor: "budgetInput"}, "Budget in INR"),
        h("input", {
          id: "budgetInput",
          type: "text",
          pattern: "[0-9]*",
          inputMode: "numeric",
          autoComplete: "off",
          placeholder: "Example: 450000",
          value: budgetInput,
          onChange: (event) => setBudgetInput(digitsOnly(event.target.value).slice(0, 8)),
          required: true
        }),
        h("p", {className: `form-note ${attempted && !isValid ? "error" : ""}`}, attempted && !isValid ? "Please enter at least INR 1,00,000 per year." : "This filters tuition fees first. Living cost can be added in the next version."),
        h("button", {className: "primary-btn", type: "submit"}, "Find universities")
      )
    )
  );
}

function Abroad({budget, goTo, openAgents}) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [universityName, setUniversityName] = useState("");

  const countries = unique(abroadUniversities.map((university) => university.country));
  const cities = unique(abroadUniversities.filter((university) => !country || university.country === country).map((university) => university.city));
  const universities = unique(abroadUniversities.filter((university) => (!country || university.country === country) && (!city || university.city === city)).map((university) => university.name));
  const filtered = abroadUniversities.filter((university) => {
    const countryOk = !country || university.country === country;
    const cityOk = !city || university.city === city;
    const universityOk = !universityName || university.name === universityName;
    const budgetOk = !budget || university.fees <= budget;
    return countryOk && cityOk && universityOk && budgetOk;
  });

  return h("section", {id: "abroad", className: "page-view abroad-view active", "aria-labelledby": "abroadTitle"},
    h("div", {className: "section-shell"},
      h("div", {className: "section-heading split-heading"},
        h("div", null,
          h("p", {className: "eyebrow"}, "Abroad university finder"),
          h("h2", {id: "abroadTitle"}, "Compare MBBS abroad by country, city, and budget"),
          h("p", null, budget ? `Showing universities within ${formatInr(budget)} yearly tuition budget.` : "Choose filters to compare universities that fit your profile.")
        ),
        h("button", {className: "ghost-btn", type: "button", onClick: () => goTo("home")}, "Start over")
      ),
      h("div", {className: "filters", "aria-label": "Abroad university filters"},
        h("label", null, "Country",
          h("select", {
            value: country,
            onChange: (event) => {
              setCountry(event.target.value);
              setCity("");
              setUniversityName("");
            }
          },
            h("option", {value: ""}, "All countries"),
            countries.map((value) => h("option", {key: value, value}, value))
          )
        ),
        h("label", null, "City",
          h("select", {
            value: city,
            onChange: (event) => {
              setCity(event.target.value);
              setUniversityName("");
            }
          },
            h("option", {value: ""}, "All cities"),
            cities.map((value) => h("option", {key: value, value}, value))
          )
        ),
        h("label", null, "University",
          h("select", {value: universityName, onChange: (event) => setUniversityName(event.target.value)},
            h("option", {value: ""}, "All universities"),
            universities.map((value) => h("option", {key: value, value}, value))
          )
        )
      ),
      h("div", {className: "university-grid", "aria-live": "polite"},
        filtered.length
          ? filtered.map((university) => h(UniversityCard, {key: university.name, university, openAgents}))
          : h("article", {className: "university-card"},
              h("h3", null, "No exact match found"),
              h("p", {className: "details"}, "Increase the budget or clear filters to see more universities.")
            )
      )
    )
  );
}

function UniversityCard({university, openAgents}) {
  return h("article", {className: "university-card"},
    h("div", {className: "tag-row"},
      h("span", {className: "tag"}, university.country),
      h("span", {className: "tag"}, university.city)
    ),
    h("h3", null, university.name),
    h("div", {className: "metric-grid"},
      h("div", {className: "metric"}, h("span", null, "Fees"), `${formatInr(university.fees)}/year`),
      h("div", {className: "metric"}, h("span", null, "Indian students"), `${university.indianStudents}+`),
      h("div", {className: "metric"}, h("span", null, "Duration"), university.duration),
      h("div", {className: "metric"}, h("span", null, "Agents"), `${university.agents.length} available`)
    ),
    h("button", {className: "agent-btn", type: "button", onClick: () => openAgents(university)}, "View agents")
  );
}

function AgentModal({university, closeModal}) {
  if (!university) return null;

  return h("div", {className: "modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "agentModalTitle"},
    h("div", {className: "modal-backdrop", onClick: closeModal}),
    h("div", {className: "modal-panel"},
      h("div", {className: "modal-head"},
        h("div", null,
          h("p", {className: "eyebrow"}, "Verified support"),
          h("h2", {id: "agentModalTitle"}, `Choose an agent for ${university.name}`)
        ),
        h("button", {className: "icon-btn", type: "button", onClick: closeModal, "aria-label": "Close agent list"}, "x")
      ),
      h("div", {className: "agent-scroller"},
        university.agents.map((agentName) => {
          const agent = agentProfiles[agentName];
          const message = encodeURIComponent(`Hi ${agentName}, I want guidance for ${university.name} via GlobalConnectEducation.`);
          return h("article", {className: "agent-card", key: agentName},
            h("div", {className: "agent-photo", style: {backgroundImage: `url('${agent.photo}')`}},
              h("span", {className: "rating"}, `${agent.rating} rating`)
            ),
            h("div", {className: "agent-body"},
              h("h3", null, agentName),
              h("p", {className: "agent-role"}, agent.city),
              h("div", {className: "agent-metrics"},
                h("span", null, agent.bestFor),
                h("span", null, agent.experience),
                h("span", null, agent.admits),
                h("span", null, agent.response),
                h("span", null, agent.language)
              ),
              h("p", {className: "agent-strength"}, agent.strength),
              h("a", {className: "whatsapp-btn", href: `https://wa.me/${agent.phone}?text=${message}`, target: "_blank", rel: "noopener"}, "Chat on WhatsApp")
            )
          );
        })
      )
    )
  );
}

function App() {
  const [view, setView] = useState("home");
  const [marksInput, setMarksInput] = useState("");
  const [marks, setMarks] = useState(null);
  const [graduation, setGraduation] = useState("");
  const [budgetInput, setBudgetInput] = useState("");
  const [budget, setBudget] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  function goTo(nextView) {
    if (nextView === "home") {
      setMarksInput("");
      setMarks(null);
      setGraduation("");
      setBudgetInput("");
      setBudget(null);
    }
    setSelectedUniversity(null);
    setView(nextView);
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  function submitMarks(value) {
    setMarks(value);
    setView("results");
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  return h(React.Fragment, null,
    h(Header, {goTo}),
    view === "home" && h(Hero, {marksInput, setMarksInput, submitMarks, goTo}),
    view === "results" && h(Results, {marks, goTo}),
    view === "graduation" && h(GraduationStep, {graduation, setGraduation, goTo}),
    view === "budget" && h(BudgetStep, {budgetInput, setBudgetInput, setBudget, goTo}),
    view === "abroad" && h(Abroad, {budget, goTo, openAgents: setSelectedUniversity}),
    h(AgentModal, {university: selectedUniversity, closeModal: () => setSelectedUniversity(null)})
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
