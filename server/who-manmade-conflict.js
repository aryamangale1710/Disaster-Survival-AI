// ═══════════════════════════════════════════════════════════════════
// 💣 Man-Made / Technological Disasters & Armed Conflict
// WHO/CRED Classification — Technological + Societal Hazards
// ═══════════════════════════════════════════════════════════════════

export const manMadeDisasters = {
  nuclear: {
    title: "Nuclear / Radiological Emergency",
    icon: "☢️",
    color: "#ffbe0b",
    category: "technological",
    description: "Release of radioactive materials from nuclear plants, dirty bombs, or transport accidents. WHO principle: 'Get Inside, Stay Inside, Stay Tuned.' Radiation exposure decreases rapidly with distance and shielding.",
    during: [
      "GET INSIDE the nearest sturdy building IMMEDIATELY — concrete and brick provide best shielding",
      "STAY INSIDE for at least 24 hours or until authorities say it is safe",
      "Move to the CENTER of the building — away from windows and exterior walls",
      "Close and lock all windows and doors",
      "Turn OFF ventilation systems, air conditioners, and fans that bring in outside air",
      "SEAL gaps under doors and around windows with damp towels or plastic sheeting",
      "If you were OUTSIDE during the event: remove ALL outer clothing carefully without shaking",
      "Place contaminated clothing in a plastic bag and seal it — leave it outside",
      "SHOWER thoroughly with soap and water — do NOT use conditioner (it binds radioactive particles)",
      "Wash hair with shampoo only — scrub skin gently, do NOT scrub hard (keeps skin intact)",
      "Blow nose and wipe eyes/ears with wet cloth",
      "STAY TUNED to official emergency broadcasts for instructions"
    ],
    after: [
      "Follow official decontamination procedures",
      "Do NOT eat or drink anything that was outdoors and uncovered during the event",
      "Sealed/canned food that was indoors is safe",
      "Follow potassium iodide (KI) instructions ONLY if directed by authorities — do NOT self-prescribe",
      "Monitor for radiation sickness symptoms: nausea, vomiting, diarrhea, skin burns (may take hours to appear)",
      "Mark contaminated areas and avoid them",
      "Follow official guidance on evacuation zones and exclusion areas",
      "Keep records of potential exposure for medical professionals"
    ],
    shelterEffectiveness: [
      "Open air: 0% protection",
      "Wooden house: ~30% reduction",
      "Basement of wooden house: ~60% reduction",
      "Concrete/brick building: ~80% reduction",
      "Basement of concrete building: ~95-99% reduction",
      "Purpose-built fallout shelter: ~99%+ reduction"
    ],
    supplies: ["Plastic sheeting and duct tape", "N95 masks or wet cloth", "Sealed water supply", "Canned food with manual opener", "Battery radio (AM/FM)", "Plastic bags (for contaminated items)", "Potassium iodide (if recommended by authorities)", "Change of clothes in sealed bag"]
  },

  chemicalSpill: {
    title: "Chemical Spill / Toxic Release",
    icon: "⚗️",
    color: "#06d6a0",
    category: "technological",
    description: "Release of toxic chemicals from industrial facilities, transport accidents, or deliberate acts. Can produce toxic gases, liquids, or particulates. According to WHO IHR guidelines, countries must have core capacity to detect and respond to chemical events.",
    during: [
      "Move UPWIND, UPHILL, and UPSTREAM from the chemical source",
      "Many toxic gases are HEAVIER than air — they settle in low-lying areas, valleys, basements",
      "Cover your mouth and nose with WET cloth — breathe through it",
      "If told to SHELTER-IN-PLACE: go inside, close ALL windows and doors",
      "Turn OFF all ventilation, air conditioning, and fans",
      "Seal gaps around doors and windows with wet towels, plastic sheeting, or duct tape",
      "Move to an UPPER FLOOR interior room with fewest windows",
      "Do NOT touch or walk through spilled materials",
      "If chemical is on your skin: remove contaminated clothing IMMEDIATELY",
      "Flush affected skin with large amounts of running water for 15-20 minutes",
      "If chemical is in eyes: flush with clean water for at least 15 minutes",
      "Do NOT induce vomiting if a chemical was swallowed — call poison control if available"
    ],
    after: [
      "Do NOT return to the area until authorities declare it safe",
      "Seek medical attention if you experience: breathing difficulty, chest pain, blurred vision, burning skin",
      "Tell medical personnel WHAT chemical you were exposed to if known",
      "Decontaminate yourself: shower with soap and water, wash hair",
      "Bag and discard contaminated clothing — do NOT wash it with other clothes",
      "Ventilate your shelter by opening windows and doors once the all-clear is given",
      "Do NOT eat or drink anything that may have been contaminated",
      "Monitor for delayed symptoms — some chemical exposures have delayed effects (hours to days)"
    ],
    supplies: ["N95/P100 respirator masks", "Chemical-resistant gloves (nitrile)", "Sealed goggles", "Plastic sheeting and duct tape", "Bottled water (sealed)", "AM/FM radio", "First aid kit", "Change of clothes in sealed bag"]
  },

  industrialAccident: {
    title: "Industrial Accident / Explosion",
    icon: "🏭",
    color: "#8338ec",
    category: "technological",
    description: "Explosions, structural collapses, or hazardous material releases from factories, refineries, mining operations, or warehouses. Can cause blast injuries, fires, toxic releases, and structural collapse in surrounding areas.",
    during: [
      "If explosion occurs: DROP and take COVER under sturdy furniture",
      "Protect your head with your arms — flying debris is the primary killer",
      "If building is damaged: GET OUT immediately using stairs, never elevators",
      "Check for fires before opening doors — feel the door with the back of your hand",
      "If trapped under debris: cover mouth with cloth, tap on pipes/walls to signal rescuers",
      "Do NOT use matches or lighters — gas leaks may be present",
      "Move AWAY from the damaged area — at least 300 meters (1000 feet)",
      "If near a fire: stay low to avoid smoke — crawl if necessary",
      "Be aware of SECONDARY explosions — move perpendicular to the blast direction"
    ],
    after: [
      "Check yourself and others for injuries — treat life-threatening conditions first",
      "Watch for signs of structural instability — cracking sounds, tilting buildings",
      "Report any strong chemical smells, gas leaks, or unusual colors of smoke",
      "Do NOT re-enter damaged buildings for belongings",
      "If you have physical symptoms (coughing, skin irritation, eye burning): seek medical attention",
      "Follow official instructions about evacuation zones",
      "Document injuries and exposure for medical and legal purposes",
      "Monitor news for information about what chemicals/materials were involved"
    ],
    supplies: ["Hard hat or helmet", "N95 masks", "Work gloves", "Safety goggles", "Sturdy boots", "First aid kit", "Flashlight", "Whistle"]
  },

  terrorism: {
    title: "Terrorism / Mass Violence / Active Threat",
    icon: "🚨",
    color: "#e63946",
    category: "societal",
    description: "Deliberate acts of violence including bombings, active shooter situations, vehicle attacks, and other mass casualty events. WHO emphasizes the importance of community resilience and immediate bystander response in saving lives.",
    activeThreats: {
      principle: "RUN — HIDE — FIGHT (in that order)",
      run: [
        "Have an escape route in mind — always know your exits",
        "Evacuate whether or not others agree to follow",
        "Leave your belongings behind",
        "Help others escape if possible but do NOT let them slow you down",
        "Call emergency services when you are SAFE",
        "Keep your hands visible when approaching law enforcement"
      ],
      hide: [
        "If you cannot run: find a place to hide where the attacker is less likely to find you",
        "Hide behind large, solid objects (concrete walls, heavy furniture)",
        "Lock or barricade doors — use furniture, equipment, anything heavy",
        "Silence your phone — vibrate mode is still audible",
        "Turn off lights and stay away from windows",
        "Remain as quiet as possible",
        "Do NOT hide in groups — spread out if possible"
      ],
      fight: [
        "LAST RESORT ONLY — when your life is in imminent danger",
        "Act with maximum aggression",
        "Use improvised weapons: fire extinguisher, chair, scissors, hot liquid",
        "Commit to your actions — hesitation is dangerous",
        "Work as a team if others are present"
      ]
    },
    blastInjury: {
      types: [
        "Primary: pressure wave damage to lungs, ears, bowels (blast lung is immediately life-threatening)",
        "Secondary: injuries from flying debris, shrapnel, glass",
        "Tertiary: injuries from being thrown by the blast wave",
        "Quaternary: burns, crush injuries, inhalation injuries, psychological trauma"
      ],
      immediateFirstAid: [
        "Control severe bleeding FIRST — use direct pressure, tourniquets if needed",
        "Open airway — tilt head back, lift chin",
        "Cover open chest wounds with sealed dressing (plastic wrap or tape on 3 sides)",
        "Do NOT remove embedded objects",
        "Treat for shock — keep warm, elevate legs if possible",
        "Monitor breathing — blast lung can cause delayed respiratory failure"
      ]
    },
    supplies: ["First aid kit with tourniquets", "Hemostatic gauze", "Emergency whistle", "Phone with emergency contacts", "Portable charger"]
  },

  hazmat: {
    title: "HAZMAT Incident",
    icon: "☣️",
    color: "#fb8500",
    category: "technological",
    description: "Any situation involving hazardous materials — chemical, biological, radiological, or nuclear (CBRN). WHO IHR 2005 mandates countries develop detection and response capacities for all CBRN events.",
    identification: [
      "Diamond-shaped placards on vehicles indicate hazardous materials and type",
      "Stay at LEAST 300 meters (1000 feet) from any HAZMAT scene",
      "Use binoculars to identify placards if possible — do NOT approach",
      "Colored smoke or unusual fog may indicate chemical release",
      "Multiple people collapsing in the same area may indicate invisible toxic gas",
      "Dead vegetation or animals near a spill site indicate toxic contamination"
    ],
    zones: [
      "HOT ZONE (Exclusion): Contaminated area — ONLY trained HAZMAT teams enter",
      "WARM ZONE (Decontamination): Where victims are decontaminated before medical care",
      "COLD ZONE (Support): Safe area for command, medical treatment, and public"
    ],
    selfDecontamination: [
      "Move away from the contaminated area to fresh air",
      "Remove ALL clothing — cut off over the head, do NOT pull over face if possible",
      "Place clothing in plastic bag and seal it",
      "Flush entire body with large amounts of WATER — lukewarm if available",
      "Wash with soap if available — work from head to toe",
      "Do NOT use bleach or harsh chemicals on skin",
      "Pay special attention to hair, skin folds, under nails",
      "Put on clean clothing or wrap in clean sheet/blanket",
      "Seek medical evaluation even if feeling fine — many exposures have delayed effects"
    ],
    supplies: ["N95/P100 masks", "Sealed goggles", "Nitrile gloves (double-layer)", "Plastic sheeting", "Duct tape", "Trash bags (for contaminated items)", "Sealed water bottles", "Change of clothes"]
  }
};

export const warAndConflict = {
  title: "Armed Conflict & War — Civilian Survival",
  icon: "⚔️",
  description: "Comprehensive guidance for civilians caught in armed conflict, based on WHO Health EDRM Framework, ICRC guidelines, and International Humanitarian Law. Armed conflict is classified by WHO as a societal hazard causing complex humanitarian emergencies.",

  directHealthImpacts: {
    title: "Direct Health Impacts of War",
    icon: "💥",
    content: [
      "Blast injuries from explosive weapons — primary killer in modern conflicts",
      "Shrapnel and fragmentation wounds — often causes multiple penetrating injuries",
      "Burns from incendiary weapons and structural fires",
      "Crush injuries from building collapse under bombardment",
      "Gunshot wounds — require immediate hemorrhage control",
      "Landmine and UXO (unexploded ordnance) injuries — often limb-threatening",
      "Chemical weapon exposure — respiratory, dermal, and neurological effects"
    ],
    immediateFirstAid: [
      "MASSIVE HEMORRHAGE: Apply tourniquet for severe limb bleeding — note the time",
      "AIRWAY: Clear debris, tilt head back, lift chin — use recovery position if unconscious",
      "BREATHING: Seal open chest wounds with plastic wrap taped on 3 sides",
      "CIRCULATION: Apply direct pressure to bleeding wounds, pack deep wounds with cloth",
      "SHOCK: Keep the person warm, elevate legs, keep them talking and alert",
      "Do NOT remove shrapnel — stabilize in place and bandage around it",
      "Burns: Cool with water if available, cover loosely with clean cloth"
    ]
  },

  indirectHealthImpacts: {
    title: "Indirect Health Consequences (WHO Framework)",
    icon: "🏥",
    content: {
      healthSystemCollapse: [
        "Hospitals and clinics are destroyed or overwhelmed with casualties",
        "Medical supply chains are disrupted — critical shortages of medicines and blood",
        "Healthcare workers flee or are killed — loss of trained medical capacity",
        "Chronic disease management collapses — diabetes, heart disease, dialysis patients at extreme risk",
        "Maternal and child healthcare disruption — dramatically increases mortality",
        "Mental health services disappear when needed most"
      ],
      waterAndSanitation: [
        "Bombing damages water treatment plants, pipelines, and sewage systems",
        "Contamination of drinking water with sewage, chemicals, and debris",
        "Water is sometimes deliberately weaponized — cut off as siege tactic",
        "Lack of clean water leads to cholera, typhoid, hepatitis A outbreaks",
        "ALWAYS purify water in conflict zones — boil for 1 minute, chemical treatment, or filter",
        "Protect water sources from contamination — cover containers, use sealed storage"
      ],
      epidemics: [
        "Overcrowded shelters and displacement camps are breeding grounds for disease",
        "Routine vaccination programs collapse — measles, polio, other outbreaks follow",
        "Cholera and acute watery diarrhea spread rapidly through contaminated water",
        "Respiratory infections spread in overcrowded conditions",
        "Wound infections and sepsis when medical care is unavailable",
        "WHO rapid response teams can take weeks to deploy — self-care knowledge is critical"
      ],
      malnutrition: [
        "Agricultural production disrupted — fields mined, farmers displaced",
        "Food supply chains and markets destroyed",
        "Siege warfare deliberately restricts food access",
        "Children and pregnant women are most vulnerable",
        "Signs of severe malnutrition: edema/swelling, extreme wasting, skin lesions, apathy",
        "Prioritize calorie-dense foods when available — grains, oils, legumes"
      ]
    }
  },

  displacementSurvival: {
    title: "Displacement & Refugee Survival",
    icon: "🏕️",
    content: [
      "Register with UNHCR or local authorities as soon as possible to access aid",
      "Keep identity documents safe and waterproof — copies in separate locations",
      "In displacement camps maintain hygiene: wash hands frequently, use latrines properly",
      "Ensure children receive available vaccinations",
      "Boil or purify ALL drinking water — camp water may not be safe",
      "Watch for disease outbreaks: cholera (watery diarrhea), measles (rash+fever), respiratory infections",
      "Oral rehydration solution (ORS) for diarrhea: 1 liter clean water + 6 teaspoons sugar + ½ teaspoon salt",
      "Protect against mosquitoes — use bed nets if available, cover skin at dawn/dusk",
      "Keep children in sight at all times — risks of trafficking and violence increase in displacement",
      "Maintain social connections — community support is critical for mental health",
      "Store food properly — rodents and insects spread disease",
      "Know the location of medical facilities, water points, and distribution centers"
    ]
  },

  civilianProtection: {
    title: "Civilian Protection in Conflict Zones",
    icon: "🕊️",
    content: [
      "Under International Humanitarian Law, civilians MUST NOT be targeted",
      "Medical facilities, ambulances, and healthcare workers are PROTECTED — even in war",
      "The Red Cross/Red Crescent emblem indicates protected facilities",
      "White flags indicate surrender or ceasefire intent — they MUST be respected",
      "If bombing occurs: shelter in basement or lowest interior room of reinforced building",
      "Stay away from military targets: bases, checkpoints, weapons depots, government buildings",
      "Mark shelters clearly if possible — display civilian symbols",
      "Do NOT pick up unfamiliar objects — unexploded ordnance (UXO) can detonate",
      "Move during ceasefire or safe corridor periods when announced",
      "Humanitarian corridors may be established — follow official instructions for evacuation routes",
      "Keep a 'go bag' ready at all times with documents, water, food, medications",
      "Establish family communication plans and meeting points"
    ]
  },

  psychologicalImpact: {
    title: "Psychological Impact & Mental Health in Crisis",
    icon: "🧠",
    content: {
      normalReactions: [
        "Fear, anxiety, and hypervigilance are NORMAL responses to danger",
        "Difficulty sleeping, nightmares, and flashbacks",
        "Irritability and anger — often directed at loved ones",
        "Feeling numb or disconnected from reality",
        "Difficulty concentrating or making decisions",
        "Physical symptoms: headaches, stomach pain, rapid heartbeat",
        "Grief and sadness — for people, places, and life as it was"
      ],
      copingStrategies: [
        "Maintain routines as much as possible — they provide psychological stability",
        "Stay connected with family and community — isolation worsens trauma",
        "Physical movement: even stretching or walking helps reduce stress hormones",
        "Breathing exercises: breathe in for 4 counts, hold for 4, out for 4, hold for 4",
        "Limit exposure to violent imagery if possible — constant exposure increases trauma",
        "Talk about experiences if you feel ready — but do NOT force it",
        "Help others — purposeful action reduces feelings of helplessness",
        "Keep children informed in age-appropriate language — they sense danger regardless",
        "Acknowledge emotions without judgment — there is no 'correct' way to feel"
      ],
      seekHelpSigns: [
        "Inability to sleep for more than a few days",
        "Persistent intrusive thoughts or flashbacks that don't diminish",
        "Using alcohol or drugs to cope",
        "Feeling suicidal or wanting to harm yourself or others",
        "Complete withdrawal from all social contact",
        "Inability to care for basic needs (eating, hygiene)"
      ]
    }
  }
};

export const biologicalHazards = {
  epidemic: {
    title: "Epidemic / Pandemic Response",
    icon: "🦠",
    color: "#2a9d8f",
    category: "biological",
    description: "Rapid spread of infectious disease affecting many people. WHO declares pandemics when epidemics spread globally. In disaster and conflict settings, epidemics are among the deadliest secondary effects.",
    prevention: [
      "Wash hands frequently with soap for at least 20 seconds",
      "Use alcohol-based hand sanitizer (60%+ alcohol) when water unavailable",
      "Avoid touching face — eyes, nose, and mouth are entry points",
      "Maintain distance (1-2 meters) from sick individuals",
      "Cover coughs and sneezes with elbow, not hands",
      "Wear masks in crowded/enclosed spaces during outbreak",
      "Disinfect frequently touched surfaces: doorknobs, phones, tables",
      "Get vaccinated when vaccines are available and recommended",
      "Avoid consuming raw/undercooked animal products during zoonotic outbreaks"
    ],
    improvPPE: [
      "Mask: multiple layers of tightly-woven cotton fabric — T-shirt material works",
      "Face shield: clear plastic folder or sheet tied with elastic",
      "Gloves: plastic bags as emergency gloves — secure with rubber bands",
      "Gown: large garbage bags with holes cut for head and arms",
      "Hand sanitizer DIY: 2/3 isopropyl alcohol (91%) + 1/3 aloe vera gel",
      "Proper use: put on gloves LAST, remove gloves FIRST, wash hands immediately after"
    ],
    oralRehydration: {
      title: "WHO Oral Rehydration Solution (ORS)",
      description: "For diarrheal diseases (cholera, dysentery) — dehydration is the primary killer",
      recipe: "Mix in 1 liter of CLEAN water: 6 level teaspoons of sugar + ½ level teaspoon of salt",
      instructions: [
        "Stir until dissolved",
        "Adults: drink at least 3 liters per day",
        "Children: sip frequently — at least ¼ cup after each loose stool",
        "Discard unused solution after 24 hours and make fresh",
        "Continue eating regular food alongside ORS"
      ]
    },
    quarantineGuidance: [
      "Separate sick individuals into their own room if possible",
      "Designate one caregiver — limit contact with others",
      "Caregiver should wear mask and gloves, wash hands frequently",
      "Provide separate eating utensils — wash with hot soapy water",
      "Ensure adequate ventilation in the sick person's room",
      "Monitor symptoms: temperature, breathing rate, consciousness",
      "Seek medical help if: difficulty breathing, persistent chest pain, confusion, inability to stay hydrated"
    ]
  },

  vectorBorne: {
    title: "Vector-Borne Disease Prevention",
    icon: "🦟",
    color: "#264653",
    category: "biological",
    description: "Diseases transmitted by mosquitoes, ticks, fleas, and other vectors. Account for 17% of all infectious diseases globally (WHO). Risk increases dramatically after floods, in displacement camps, and in tropical disaster zones.",
    diseases: [
      "Malaria (mosquito) — fever, chills, sweating, headache; can be fatal",
      "Dengue (mosquito) — high fever, severe headache, pain behind eyes, joint pain",
      "Zika (mosquito) — mild fever, rash; dangerous for pregnant women",
      "Chikungunya (mosquito) — fever with severe joint pain",
      "Yellow Fever (mosquito) — fever, liver damage (jaundice)",
      "Cholera (contaminated water) — profuse watery diarrhea, rapid dehydration",
      "Typhus (lice/fleas) — fever, headache, rash; common in overcrowded conditions",
      "Lyme Disease (ticks) — expanding red rash, flu-like symptoms"
    ],
    prevention: [
      "Use insect repellent on exposed skin — DEET 20-30% is most effective",
      "Wear long sleeves and long pants — tuck pants into socks in tick areas",
      "Sleep under insecticide-treated bed nets (ITNs)",
      "Eliminate standing water near shelters — mosquitoes breed in stagnant water",
      "Cover water storage containers",
      "Keep living areas clean — garbage attracts rodents which carry fleas",
      "Inspect body daily for ticks — remove with fine-tipped tweezers, pulling straight up",
      "Burn or bury garbage to reduce insect habitat",
      "Use mosquito coils or permethrin-treated clothing if available"
    ]
  }
};
