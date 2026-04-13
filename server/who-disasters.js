// ═══════════════════════════════════════════════════════════════════
// 🌍 WHO Disaster Classification & Extended Natural Disasters
// Based on WHO/CRED EM-DAT Classification Framework
// ═══════════════════════════════════════════════════════════════════

export const whoClassification = {
  natural: {
    geophysical: ['Earthquake', 'Volcanic Eruption', 'Landslide', 'Avalanche', 'Tsunami'],
    hydrological: ['Flood', 'Flash Flood', 'Storm Surge', 'Coastal Flood'],
    meteorological: ['Hurricane/Cyclone/Typhoon', 'Tornado', 'Blizzard/Winter Storm', 'Severe Storm', 'Hailstorm'],
    climatological: ['Drought', 'Extreme Heat/Heatwave', 'Wildfire', 'Cold Wave'],
    biological: ['Epidemic/Pandemic', 'Insect Infestation', 'Animal Incident'],
    extraterrestrial: ['Meteor/Asteroid Impact', 'Solar Flare/Geomagnetic Storm']
  },
  technological: {
    industrial: ['Chemical Spill', 'Nuclear/Radiological', 'Factory Explosion', 'Mine Collapse', 'Oil Spill'],
    transport: ['Aviation', 'Maritime', 'Rail', 'Road'],
    infrastructure: ['Dam Failure', 'Building Collapse', 'Bridge Collapse', 'Power Grid Failure']
  },
  societal: {
    conflict: ['Armed Conflict/War', 'Civil Unrest', 'Insurgency'],
    deliberate: ['Terrorism', 'Mass Violence', 'Bioterrorism', 'Cyberattack on Infrastructure'],
    displacement: ['Refugee Crisis', 'Internal Displacement', 'Forced Migration']
  }
};

export const extendedNaturalDisasters = {
  tsunami: {
    title: "Tsunami Survival",
    icon: "🌊",
    color: "#023e8a",
    category: "geophysical",
    description: "A series of ocean waves caused by underwater earthquakes, volcanic eruptions, or landslides. Waves can reach 30+ meters and travel at 800 km/h across open ocean.",
    warningSignsNatural: [
      "Strong earthquake felt near the coast — this IS your warning",
      "Sudden unusual recession of water from the shoreline (ocean pulling back)",
      "A loud roar like a freight train coming from the ocean",
      "Unusual ocean behavior — rapid rise or fall of coastal waters"
    ],
    during: [
      "If near coast and feel a STRONG earthquake: Move to high ground IMMEDIATELY — do NOT wait for an official warning",
      "Get to ground at least 30 meters (100 feet) above sea level or 3 km (2 miles) inland",
      "If caught in the water: Grab onto something that floats — a door, tree, anything",
      "Do NOT go to the beach to watch — tsunami waves are not surfable, they are walls of debris",
      "Move to upper floors of reinforced concrete buildings if you cannot reach high ground",
      "Stay away from rivers and streams — tsunamis travel up waterways",
      "A tsunami is NOT a single wave — multiple waves can arrive over hours",
      "The first wave is often NOT the largest — stay on high ground"
    ],
    after: [
      "Do NOT return to low-lying areas until authorities give an all-clear",
      "Stay away from flooded and damaged areas — debris, contaminated water, downed power lines",
      "Avoid wading in floodwater — it may be electrically charged or contain sharp debris",
      "Be aware of secondary hazards: fires from ruptured gas lines, contaminated water",
      "Check for injuries and provide first aid where possible",
      "Expect aftershocks if the tsunami was earthquake-generated",
      "Do NOT drink tap water until authorities confirm safety — salt water contaminates freshwater",
      "Document damage with photos for insurance/aid purposes"
    ],
    supplies: ["Emergency whistle", "Life jacket", "Waterproof document bag", "Portable radio", "Water purification tablets", "High-calorie emergency food", "Bright-colored clothing for visibility"]
  },

  volcano: {
    title: "Volcanic Eruption Survival",
    icon: "🌋",
    color: "#d62828",
    category: "geophysical",
    description: "Volcanic eruptions can produce lava flows, pyroclastic flows (superheated gas and rock moving at 700 km/h), ash fall, lahars (volcanic mudflows), and toxic gases.",
    during: [
      "Evacuate IMMEDIATELY if authorities order it — pyroclastic flows are unsurvivable",
      "If caught in ash fall: Cover mouth and nose with damp cloth or N95 mask",
      "Protect your eyes — wear goggles or glasses, NOT contact lenses",
      "Seek indoor shelter — close all windows, doors, and ventilation",
      "If outdoors: Move perpendicular to the direction of lava/mudflow, seek high ground",
      "Do NOT cross bridges over river valleys during eruption — lahars follow rivers",
      "If driving: Avoid driving in heavy ash — it clogs engines and reduces visibility to zero",
      "Protect electronics and water supplies from ash contamination",
      "Stay upwind of the volcano whenever possible"
    ],
    after: [
      "Wear N95 masks outdoors — volcanic ash contains glass particles that damage lungs",
      "Clear heavy ash from roofs — accumulation can cause structural collapse (wet ash is extremely heavy)",
      "Do NOT drive unless absolutely necessary — ash damages engines",
      "Avoid low-lying areas and river valleys — lahars can occur for months after eruption",
      "Do NOT drink open water sources — ash contaminates water with fluoride and heavy metals",
      "Monitor for respiratory symptoms: coughing, wheezing, shortness of breath",
      "Keep animals indoors and provide clean water",
      "Follow authorities regarding safe zones — volcanic activity can resume without warning"
    ],
    supplies: ["N95 or P100 respirator masks (multiple)", "Sealed goggles", "Long-sleeved clothing", "Plastic sheeting to seal windows", "Clean water supply (sealed)", "Car air filter (spare)", "Battery-powered radio"]
  },

  landslide: {
    title: "Landslide / Mudslide Survival",
    icon: "⛰️",
    color: "#774936",
    category: "geophysical",
    description: "Mass movement of rock, earth, or debris down a slope. Often triggered by heavy rainfall, earthquakes, volcanic eruptions, or human activity. Can move at speeds over 50 km/h.",
    warningSigns: [
      "New cracks or bulges in ground, roads, or foundations",
      "Tilting trees, utility poles, or fences on hillsides",
      "Unusual sounds: rumbling, trees cracking, boulders knocking together",
      "Springs or seeps appearing in new locations on slopes",
      "Sudden increase or decrease in stream water flow",
      "Water turning muddy — upstream landslide may have occurred",
      "Doors or windows sticking for the first time",
      "Staircase cracks in plaster or ground"
    ],
    during: [
      "If you suspect imminent landslide: EVACUATE immediately — do not wait",
      "Move away from the path of the slide at a RIGHT ANGLE to the flow direction",
      "If escape is not possible: Curl into a tight ball and protect your head",
      "Move to upper floors of building if unable to evacuate",
      "Stay away from rivers, streams, and low-lying drainage areas",
      "If driving: Watch for collapsed pavement, mud, fallen rocks — do NOT cross flowing mud",
      "Listen for unusual sounds — rumbling or cracking indicates approaching debris",
      "Do NOT try to outrun a debris flow downhill — move laterally to higher ground"
    ],
    after: [
      "Stay away from the slide area — additional slides can occur",
      "Check for injured or trapped persons near the slide — do NOT enter the deposit directly",
      "Report broken utility lines (gas, water, electric) to authorities",
      "Avoid river valleys and low-lying areas — flooding may follow landslides",
      "Check foundation and surrounding land for damage before re-entering buildings",
      "Watch for flooding — landslides can dam rivers, creating dangerous lakes that can burst",
      "Replant damaged ground as soon as possible to prevent erosion",
      "Document damage with photos for insurance/aid"
    ],
    supplies: ["Sturdy hiking boots", "Hard hat or helmet", "Rope", "Flashlight", "First aid kit", "Whistle", "Work gloves", "Dust mask"]
  },

  drought: {
    title: "Drought Survival",
    icon: "☀️",
    color: "#e09f3e",
    category: "climatological",
    description: "Extended period of below-average precipitation causing water shortage. WHO classifies drought as a slow-onset disaster that can affect millions and last months to years. Leads to water scarcity, crop failure, malnutrition, and disease.",
    waterConservation: [
      "Fix all leaks immediately — a dripping faucet wastes 75 liters per day",
      "Collect and reuse greywater (sink, shower) for plants and flushing",
      "Take short showers (under 3 minutes) instead of baths",
      "Only run washing machines and dishwashers with full loads",
      "Water gardens early morning or late evening to reduce evaporation",
      "Use mulch around plants to retain soil moisture",
      "Collect rainwater when available using clean containers",
      "Store emergency water: 4 liters per person per day minimum"
    ],
    healthRisks: [
      "Dehydration — drink water regularly even if not thirsty",
      "Heatstroke — linked to drought periods with extreme temperatures",
      "Water-borne disease — as water supplies shrink, contamination risk increases",
      "Malnutrition — crop failure leads to food shortage and rising prices",
      "Respiratory illness — increased dust and particulate matter",
      "Mental health — anxiety, depression from prolonged stress and economic loss",
      "Vector-borne diseases — standing water concentrates, increasing mosquito breeding"
    ],
    during: [
      "Follow all local water restrictions — penalties may apply",
      "Prioritize drinking water over other uses",
      "Monitor local water quality reports — contamination risk increases in drought",
      "Reduce meat consumption — livestock require enormous water resources",
      "Store water safely: clean, sealed containers, rotated every 6 months",
      "Create shade structures for livestock and pets",
      "Monitor elderly and children for dehydration signs",
      "Plan for potential evacuation if water supplies become critically low"
    ],
    after: [
      "Do NOT immediately over-water gardens — soil may not absorb water properly",
      "Check for ground settling and foundation cracks from soil shrinkage",
      "Continue water conservation practices — recovery takes time",
      "Watch for flash flood risk — dry ground does not absorb sudden rain well",
      "Ensure water sources are tested before drinking — drought concentrates contaminants",
      "Monitor food prices and stock essential non-perishables",
      "Seek mental health support if needed — drought stress is real and valid"
    ],
    supplies: ["Large water storage containers (sealed)", "Water purification system", "Drought-resistant food supplies", "Electrolyte supplements", "Sunscreen and hats", "Dust masks"]
  },

  heatwave: {
    title: "Extreme Heat / Heatwave Survival",
    icon: "🌡️",
    color: "#ff5400",
    category: "climatological",
    description: "Prolonged period of excessively hot weather. WHO reports heat kills more people globally than any other weather event. Most vulnerable: elderly, children, outdoor workers, people with chronic illness.",
    recognizeHeatIllness: {
      heatExhaustion: {
        symptoms: ["Heavy sweating", "Weakness or fatigue", "Cold, pale, clammy skin", "Nausea or vomiting", "Fast but weak pulse", "Muscle cramps", "Dizziness", "Headache"],
        treatment: ["Move to a cool place immediately", "Lie down and loosen clothing", "Apply cool wet cloths to as much skin as possible", "Sip cool water slowly", "If vomiting continues, seek medical help immediately"]
      },
      heatstroke: {
        symptoms: ["Body temperature above 40°C (104°F)", "Hot, RED, DRY skin (no sweating)", "Rapid, strong pulse", "Confusion or unconsciousness", "Throbbing headache", "Seizures"],
        treatment: ["THIS IS A LIFE-THREATENING EMERGENCY", "Cool the person rapidly — immerse in cold water or ice bath if possible", "Move to coolest area available", "DO NOT give fluids if unconscious", "Apply ice packs to neck, armpits, and groin", "Fan while misting with cool water", "Monitor breathing — be ready for CPR"]
      }
    },
    during: [
      "Stay indoors during peak heat (10 AM – 4 PM)",
      "Drink water BEFORE you feel thirsty — minimum 2-3 liters per day",
      "NEVER leave children or pets in parked vehicles — interior reaches 70°C in minutes",
      "Wear loose, light-colored, lightweight clothing",
      "Apply wet towels to neck, wrists, and ankles for rapid cooling",
      "Close curtains/blinds on sun-facing windows",
      "Take cool showers multiple times per day",
      "Check on elderly neighbors, those living alone, and those without AC",
      "Avoid alcohol and caffeine — they accelerate dehydration",
      "Eat light meals — digestion generates body heat",
      "If no AC: go to public cooling centers, libraries, or malls"
    ],
    after: [
      "Continue hydrating — heat effects can be delayed",
      "Watch for signs of heat illness for 24-48 hours after exposure",
      "Rest in cool environments before resuming normal activity",
      "Check on vulnerable community members",
      "Report any heat-related deaths or illness to health authorities"
    ],
    supplies: ["Electrolyte drinks/powder", "Portable fans (battery-powered)", "Spray bottles for misting", "UV-protective clothing", "Wide-brimmed hat", "Sunscreen SPF 50+", "Cooling towels", "Thermometer"]
  },

  winterStorm: {
    title: "Winter Storm / Blizzard Survival",
    icon: "❄️",
    color: "#90e0ef",
    category: "meteorological",
    description: "Severe winter weather with heavy snowfall, ice accumulation, and dangerously cold temperatures. Blizzards combine snow, wind (56+ km/h), and low visibility. Hypothermia can kill within hours.",
    during: [
      "STAY INDOORS unless absolutely necessary",
      "If you must go outside: wear multiple loose layers, cover ALL exposed skin",
      "Layer clothing: base layer (wicking), insulation layer (wool/fleece), outer layer (windproof)",
      "Protect extremities: insulated gloves, warm socks, face covering, hat covering ears",
      "If stranded in a car: stay in the vehicle, run engine 10 min per hour for heat (crack window for ventilation)",
      "Tie a brightly colored cloth to your car antenna for visibility",
      "Keep moving fingers and toes to maintain circulation",
      "Eat regularly — your body needs fuel to generate heat",
      "Do NOT eat snow directly — it lowers body temperature; melt it first",
      "Watch for frostbite signs: numbness, white/grayish patches on skin, especially fingers, toes, nose, ears"
    ],
    hypothermia: {
      signs: ["Shivering (stops in severe hypothermia — this is WORSE)", "Confusion and drowsiness", "Slurred speech", "Loss of coordination", "Slow, shallow breathing", "Weak pulse"],
      treatment: [
        "Move person to warm shelter immediately",
        "Remove any wet clothing — replace with dry layers",
        "Warm the CENTER of the body FIRST: chest, neck, head, groin",
        "Use skin-to-skin contact under blankets if no other heat source",
        "Give warm (not hot) beverages if conscious — NO alcohol",
        "Do NOT rub or massage cold extremities — can cause cardiac arrest",
        "Handle gently — rough handling can trigger heart arrhythmia"
      ]
    },
    after: [
      "Check pipes for freezing/bursting — leave faucets dripping in extreme cold",
      "Clear snow from roof vents, furnace exhaust, and gas meters",
      "Watch for ice dams on roof — can cause structural damage",
      "Be aware of black ice on roads — extremely slippery and invisible",
      "Check on neighbors, especially elderly and those living alone",
      "Be cautious of carbon monoxide — never use generators, grills, or camp stoves indoors"
    ],
    supplies: ["Extra blankets/sleeping bags", "Hand/body warmers", "Insulated waterproof boots", "Ice scraper and shovel", "Sand/kitty litter for traction", "Extra food and water (pipes may freeze)", "Carbon monoxide detector", "Backup heating fuel"]
  },

  avalanche: {
    title: "Avalanche Survival",
    icon: "🏔️",
    color: "#caf0f8",
    category: "geophysical",
    description: "Rapid flow of snow down a slope. Can travel at 130+ km/h and bury victims under meters of snow. 90% of avalanche victims are triggered by the victim's own party. Survival rate drops to 50% after 15 minutes of burial.",
    prevention: [
      "Check avalanche forecasts before entering backcountry",
      "Avoid slopes of 30-45 degrees — highest avalanche risk angle",
      "Travel one at a time across avalanche-prone slopes",
      "Watch for warning signs: recent avalanche activity, cracking sounds, hollow-sounding snow",
      "Carry proper equipment: avalanche beacon, probe, shovel"
    ],
    during: [
      "If caught: try to move to the SIDE of the avalanche — do NOT run downhill",
      "Grab onto trees or rocks if possible",
      "If swept away: 'swim' using backstroke motion to stay on surface",
      "As the snow slows: create an AIR POCKET in front of your face with your hands — this is critical",
      "Take a deep breath BEFORE the snow settles to expand your chest",
      "Try to push a hand above the surface",
      "CONSERVE oxygen — do NOT yell unless you hear rescuers directly above you",
      "Spit to determine which direction is up (gravity pulls saliva down)"
    ],
    after: [
      "If not buried: immediately search for victims — time is critical",
      "Use avalanche beacons to locate buried victims",
      "Probe systematically in likely burial areas (below the debris)",
      "Dig quickly — survival decreases rapidly after 15 minutes",
      "Once found: clear airway first, then remove from snow",
      "Treat for hypothermia immediately",
      "Be aware of secondary avalanche risk — post lookout while searching"
    ],
    supplies: ["Avalanche transceiver/beacon", "Collapsible probe", "Compact shovel", "ABS airbag pack", "Whistle", "Helmet"]
  }
};

export const whoStatistics = {
  overview: "According to WHO and CRED EM-DAT data, disasters affect an average of 350 million people annually worldwide.",
  keyFacts: [
    "Between 2000-2024, disasters killed over 1.2 million people and affected 4.2 billion (many multiple times)",
    "Floods and storms account for 80% of all naturally-triggered disaster events",
    "Heatwaves are the deadliest meteorological hazard — often underreported",
    "90% of disaster-related deaths occur in low- and middle-income countries",
    "Climate-related disasters have increased 83% compared to the prior 20-year period",
    "Armed conflict displaced over 100 million people globally as of 2024",
    "Epidemics and pandemics can cause more deaths than all other disaster types combined",
    "Technological disasters account for approximately 15% of all recorded disasters"
  ]
};
