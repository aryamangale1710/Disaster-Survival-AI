// ═══════════════════════════════════════════════════════════════════
// 🌊 Disaster Survival AI — Knowledge Base
// Comprehensive offline survival knowledge for emergency situations
// Based on WHO/CRED EM-DAT Disaster Classification Framework
// ═══════════════════════════════════════════════════════════════════

import { whoClassification, extendedNaturalDisasters, whoStatistics } from './who-disasters.js';
import { manMadeDisasters, warAndConflict, biologicalHazards } from './who-manmade-conflict.js';

export const knowledgeBase = {
  // WHO/CRED Classification Taxonomy
  classification: whoClassification,
  whoStatistics,

  // Man-Made / Technological Disasters
  manMadeDisasters,

  // Armed Conflict & War Consequences
  warAndConflict,

  // Biological Hazards
  biologicalHazards,

  // ─────────────────────────────────────────────────────────────────
  // FIRST AID PROCEDURES
  // ─────────────────────────────────────────────────────────────────
  firstAid: {
    cpr: {
      title: "CPR (Cardiopulmonary Resuscitation)",
      icon: "❤️",
      severity: "critical",
      steps: [
        { step: 1, action: "CHECK RESPONSIVENESS", detail: "Tap the person's shoulder firmly and shout 'Are you okay?' Look for signs of breathing — chest movement, sounds, or airflow. If unresponsive and not breathing normally, begin CPR immediately." },
        { step: 2, action: "CALL FOR HELP", detail: "If someone is nearby, tell them to call emergency services. If alone, call before starting CPR if possible. Put phone on speaker." },
        { step: 3, action: "POSITION THE PERSON", detail: "Place the person flat on their back on a firm surface. Kneel beside their chest. Remove any bulky clothing from their chest area." },
        { step: 4, action: "BEGIN CHEST COMPRESSIONS", detail: "Place the heel of one hand on the center of the chest (on the breastbone). Place your other hand on top, interlocking fingers. Keep arms straight. Push hard and fast — at least 2 inches deep, at a rate of 100-120 compressions per minute. Let the chest fully recoil between compressions." },
        { step: 5, action: "GIVE RESCUE BREATHS (if trained)", detail: "After 30 compressions, tilt the head back, lift the chin, pinch the nose shut. Give 2 rescue breaths, each lasting about 1 second. Watch for chest rise. If chest doesn't rise, re-tilt and try again." },
        { step: 6, action: "CONTINUE CYCLES", detail: "Continue cycles of 30 compressions and 2 breaths. Do not stop until: the person starts breathing, professional help arrives, you are too exhausted to continue, or an AED becomes available." }
      ]
    },
    bleeding: {
      title: "Severe Bleeding Control",
      icon: "🩸",
      severity: "critical",
      steps: [
        { step: 1, action: "APPLY DIRECT PRESSURE", detail: "Use a clean cloth, bandage, or clothing. Press firmly on the wound with your palm. Do NOT remove the cloth if it soaks through — add more layers on top." },
        { step: 2, action: "ELEVATE THE WOUND", detail: "If possible, raise the injured area above the level of the heart. This helps reduce blood flow to the wound." },
        { step: 3, action: "APPLY A TOURNIQUET (if needed)", detail: "For life-threatening limb bleeding that won't stop with pressure: Apply a tourniquet 2-3 inches above the wound (never on a joint). Tighten until bleeding stops. Note the time of application. Do NOT remove once applied." },
        { step: 4, action: "TREAT FOR SHOCK", detail: "Have the person lie down with legs elevated (if no spinal injury suspected). Keep them warm with blankets. Talk to them reassuringly. Monitor breathing." },
        { step: 5, action: "DO NOT", detail: "Do NOT remove objects embedded in wounds. Do NOT apply a tourniquet to the neck or torso. Do NOT give the person anything to eat or drink." }
      ]
    },
    burns: {
      title: "Burn Treatment",
      icon: "🔥",
      severity: "high",
      steps: [
        { step: 1, action: "STOP THE BURNING", detail: "Remove the person from the heat source. Remove clothing and jewelry near the burn (unless stuck to skin). For chemical burns, brush off dry chemicals first, then flush with water." },
        { step: 2, action: "COOL THE BURN", detail: "Run cool (not cold) water over the burn for 10-20 minutes. Do NOT use ice, butter, or toothpaste. Do NOT break blisters." },
        { step: 3, action: "ASSESS SEVERITY", detail: "1st degree (red, painful): Self-care possible. 2nd degree (blisters, very painful): May need medical care. 3rd degree (white/charred, may not hurt): EMERGENCY — seek help immediately." },
        { step: 4, action: "COVER THE BURN", detail: "Apply a sterile, non-stick bandage loosely. Do NOT wrap tightly. For large burns, use a clean sheet." },
        { step: 5, action: "MANAGE PAIN", detail: "Over-the-counter pain medication if available. Keep the person hydrated. Watch for signs of shock." }
      ]
    },
    fractures: {
      title: "Fracture & Bone Injury",
      icon: "🦴",
      severity: "high",
      steps: [
        { step: 1, action: "IMMOBILIZE THE AREA", detail: "Do NOT try to straighten or realign the bone. Keep the injured area still. Support it in the position you found it." },
        { step: 2, action: "CREATE A SPLINT", detail: "Use rigid materials (sticks, boards, rolled magazines). Pad the splint with soft material. Secure above and below the fracture with cloth strips. Do NOT tie too tightly — check circulation." },
        { step: 3, action: "REDUCE SWELLING", detail: "Apply ice wrapped in cloth (not directly on skin) for 20 minutes on, 20 minutes off. Elevate the injured area if possible." },
        { step: 4, action: "WATCH FOR COMPLICATIONS", detail: "Check for numbness, tingling, or blue/pale skin below the injury (poor circulation). If an open fracture (bone visible), cover with sterile dressing and control bleeding." },
        { step: 5, action: "MANAGE PAIN", detail: "Keep the person still and comfortable. Offer pain medication if available. Do NOT give food or drink if surgery may be needed." }
      ]
    },
    choking: {
      title: "Choking Response",
      icon: "😰",
      severity: "critical",
      steps: [
        { step: 1, action: "ASSESS THE SITUATION", detail: "Can the person cough, speak, or breathe? If YES: Encourage forceful coughing. Do NOT interfere. If NO (silent choking, clutching throat): Act immediately." },
        { step: 2, action: "PERFORM ABDOMINAL THRUSTS (Heimlich)", detail: "Stand behind the person, wrap your arms around their waist. Make a fist with one hand, place it above the navel and below the ribcage. Grasp your fist with the other hand. Give quick, upward thrusts." },
        { step: 3, action: "FOR LARGE PERSONS/PREGNANT", detail: "Position your hands on the center of the chest (on the breastbone). Perform chest thrusts instead of abdominal thrusts." },
        { step: 4, action: "IF PERSON BECOMES UNCONSCIOUS", detail: "Lower them to the ground carefully. Begin CPR. Before each rescue breath, check the mouth for the object — remove if visible. Do NOT do a blind finger sweep." },
        { step: 5, action: "FOR INFANTS (under 1 year)", detail: "Place face-down on your forearm, supporting the head. Give 5 back blows between shoulder blades. Turn over, give 5 chest thrusts with 2 fingers on the breastbone. Repeat until object is expelled." }
      ]
    },
    shock: {
      title: "Shock Treatment",
      icon: "⚡",
      severity: "critical",
      steps: [
        { step: 1, action: "RECOGNIZE SHOCK SIGNS", detail: "Pale, clammy skin. Rapid, weak pulse. Rapid, shallow breathing. Confusion or anxiety. Nausea or vomiting. Dilated pupils. Weakness or fatigue." },
        { step: 2, action: "POSITION THE PERSON", detail: "Lay them on their back. Elevate legs 12 inches (unless head, neck, back, or leg injury). If vomiting, turn them on their side." },
        { step: 3, action: "MAINTAIN BODY TEMPERATURE", detail: "Cover with blankets or coats. Place something under them to insulate from the ground. Do NOT apply direct heat." },
        { step: 4, action: "PROVIDE COMFORT", detail: "Loosen tight clothing. Do NOT give food or drink. Talk calmly and reassuringly. Monitor breathing and pulse continuously." },
        { step: 5, action: "TREAT THE CAUSE", detail: "Control any bleeding. Immobilize any fractures. Address any other injuries. Keep the person as calm and still as possible." }
      ]
    },
    waterPurification: {
      title: "Emergency Water Purification",
      icon: "💧",
      severity: "medium",
      steps: [
        { step: 1, action: "BOILING (MOST RELIABLE)", detail: "Bring water to a rolling boil for at least 1 minute (3 minutes at altitudes above 6,500 ft). Let cool before drinking. This kills most pathogens." },
        { step: 2, action: "CHEMICAL TREATMENT", detail: "Add 2 drops of unscented liquid bleach (6-8% sodium hypochlorite) per liter of clear water. Stir well and let stand for 30 minutes. Water should have a slight chlorine smell." },
        { step: 3, action: "SOLAR DISINFECTION (SODIS)", detail: "Fill clear plastic bottles with water. Place in direct sunlight for at least 6 hours (2 days if cloudy). UV radiation kills bacteria and viruses." },
        { step: 4, action: "IMPROVISED FILTRATION", detail: "Layer materials in a container: gravel on top, then sand, then charcoal (from campfire), then more sand. Pour water through slowly. This removes particles but still needs purification." },
        { step: 5, action: "FINDING WATER SOURCES", detail: "Morning dew on plants. Rain collection. Streams (flowing water is safer than still). Dig in muddy areas and let sediment settle. Avoid water near industrial areas." }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────
  // DISASTER-SPECIFIC GUIDES
  // ─────────────────────────────────────────────────────────────────
  disasters: {
    earthquake: {
      title: "Earthquake Survival",
      icon: "🏚️",
      color: "#ff6b35",
      during: [
        "DROP to your hands and knees immediately",
        "Take COVER under sturdy furniture or against an interior wall",
        "HOLD ON until shaking stops",
        "If outdoors: Move to an open area away from buildings, trees, power lines",
        "If driving: Pull over, set parking brake, stay in vehicle",
        "Do NOT run outside during shaking",
        "Do NOT stand in doorways (this is a myth)"
      ],
      after: [
        "Expect aftershocks — drop, cover, hold each time",
        "Check yourself and others for injuries",
        "Check for gas leaks (smell, hissing sound) — if found, leave immediately",
        "Check water, electric, and gas for damage",
        "Do NOT use elevators",
        "If trapped: Signal by tapping on pipes or walls. Use a whistle if available",
        "Stay away from damaged buildings",
        "Check for structural damage before re-entering buildings"
      ],
      supplies: ["Water (1 gallon per person per day)", "Non-perishable food", "Flashlight & batteries", "First aid kit", "Whistle", "Wrench/pliers (to turn off gas)", "Dust masks", "Sturdy shoes"]
    },
    flood: {
      title: "Flood Survival",
      icon: "🌊",
      color: "#0077b6",
      during: [
        "Move to higher ground IMMEDIATELY",
        "Do NOT walk through moving water — 6 inches can knock you down",
        "Do NOT drive through flooded roads — 12 inches can carry a vehicle",
        "If trapped in a building: Go to the highest floor",
        "Do NOT go into the attic (you can become trapped)",
        "Signal for help from a window or roof",
        "Avoid electrical equipment and downed power lines",
        "Turn off utilities at main switches if safe to do so"
      ],
      after: [
        "Wait for official all-clear before returning home",
        "Document damage with photos before cleaning",
        "Do NOT drink tap water until cleared by authorities",
        "Watch for contaminated water, gas leaks, electrical damage",
        "Wear protective clothing during cleanup",
        "Be aware of weakened roads, bridges, and buildings",
        "Discard food that has been in contact with flood water",
        "Watch for snakes and insects displaced by flooding"
      ],
      supplies: ["Life jackets/flotation devices", "Waterproof bag for documents", "Water purification supplies", "Rope", "Rubber boots", "Battery-powered radio", "Signal mirror/whistle"]
    },
    fire: {
      title: "Wildfire / Building Fire",
      icon: "🔥",
      color: "#e63946",
      during: [
        "GET OUT immediately — do not stop for belongings",
        "Feel doors before opening — if hot, use another exit",
        "Stay LOW — smoke rises, cleaner air is near the floor",
        "Cover mouth and nose with wet cloth",
        "If clothes catch fire: STOP, DROP, and ROLL",
        "Close doors behind you to slow fire spread",
        "Use stairs, NEVER elevators",
        "If trapped: Seal door cracks with wet towels, signal from window"
      ],
      after: [
        "Do NOT re-enter damaged buildings",
        "Watch for hot spots and flare-ups",
        "Check for structural damage before entering",
        "Wear N95 masks — ash and smoke are toxic",
        "Document all damage for insurance",
        "Be cautious of fire-weakened trees and poles",
        "Check for damaged gas and electrical lines",
        "Wet down debris to prevent dust/ash spread"
      ],
      supplies: ["N95 respirator masks", "Goggles", "Long clothing (cotton, not synthetic)", "Fire extinguisher", "Fire blanket", "Escape ladder (multi-story)", "Emergency whistle"]
    },
    hurricane: {
      title: "Hurricane Survival",
      icon: "🌀",
      color: "#7209b7",
      during: [
        "Stay indoors — away from windows, skylights, glass doors",
        "Go to an interior room on the lowest floor (closet, bathroom)",
        "If flooding starts, go to the highest floor BUT not the attic",
        "Do NOT go outside during the eye of the storm — winds will return",
        "Turn refrigerator to coldest setting (in case of power loss)",
        "Fill bathtub with water for emergency use",
        "Keep emergency supplies and important documents with you",
        "Monitor battery-powered radio for updates"
      ],
      after: [
        "Wait for official all-clear before going outside",
        "Watch for downed power lines — report them immediately",
        "Do NOT wade through standing water",
        "Avoid damaged buildings and bridges",
        "Document damage with photos",
        "Be alert for tornadoes — they often follow hurricanes",
        "Use generators OUTDOORS only — never inside",
        "Boil water until authorities confirm water is safe"
      ],
      supplies: ["Hurricane shutters/plywood for windows", "Sandbags", "Tarps", "Water (enough for 7 days)", "Battery-powered radio", "Cash (ATMs won't work)", "Full tank of gas", "Important documents in waterproof bag"]
    },
    tornado: {
      title: "Tornado Survival",
      icon: "🌪️",
      color: "#fca311",
      during: [
        "Go to the LOWEST FLOOR immediately (basement is best)",
        "Get under sturdy furniture or cover yourself with a mattress",
        "Stay away from windows, doors, and exterior walls",
        "Protect your head and neck with your arms",
        "If in a mobile home: LEAVE immediately and go to a sturdy shelter",
        "If outdoors: Lie flat in a ditch or low area, cover your head",
        "If in a car: Do NOT try to outrun it — park, duck down below windows",
        "Do NOT seek shelter under highway overpasses"
      ],
      after: [
        "Watch for fallen power lines and broken gas lines",
        "Check for injuries — provide first aid where needed",
        "Stay away from damaged buildings",
        "Do NOT use candles (gas leaks) — use flashlights",
        "Watch for broken glass and nails",
        "Be alert for additional tornadoes",
        "Take photos of damage for insurance",
        "Help neighbors, especially the elderly and disabled"
      ],
      supplies: ["Helmet or hard hat", "Sturdy shoes", "Flashlight", "Battery-powered weather radio", "Blankets/sleeping bags", "First aid kit", "Whistle", "Work gloves"]
    },
    // ── WHO Extended Natural Disasters ──
    ...extendedNaturalDisasters
  },

  // ─────────────────────────────────────────────────────────────────
  // EVACUATION CHECKLISTS
  // ─────────────────────────────────────────────────────────────────
  evacuation: {
    essentials: {
      title: "Essential Evacuation Items",
      items: [
        { name: "Water", detail: "1 gallon per person per day, minimum 3 days", priority: "critical" },
        { name: "Food", detail: "Non-perishable, easy-to-prepare items for 3 days", priority: "critical" },
        { name: "Medications", detail: "Prescription medications, first aid supplies", priority: "critical" },
        { name: "Documents", detail: "IDs, insurance, bank records in waterproof bag", priority: "critical" },
        { name: "Phone + charger", detail: "Portable battery pack, car charger", priority: "high" },
        { name: "Cash", detail: "Small bills and coins — ATMs won't work", priority: "high" },
        { name: "Flashlight", detail: "With extra batteries", priority: "high" },
        { name: "Radio", detail: "Battery or crank-powered weather radio", priority: "high" },
        { name: "Clothing", detail: "One change per person, sturdy shoes", priority: "medium" },
        { name: "Blankets", detail: "Or sleeping bags for warmth", priority: "medium" },
        { name: "Tools", detail: "Multi-tool, wrench, duct tape", priority: "medium" },
        { name: "Sanitation", detail: "Toilet paper, trash bags, soap, hand sanitizer", priority: "medium" }
      ]
    },
    pets: {
      title: "Pet Evacuation",
      items: [
        { name: "Pet carriers", detail: "One per animal, labeled with your contact info", priority: "critical" },
        { name: "Pet food & water", detail: "3-day supply with bowls", priority: "critical" },
        { name: "Medications", detail: "Pet prescriptions and medical records", priority: "critical" },
        { name: "Leashes & harnesses", detail: "Even for normally indoor pets", priority: "high" },
        { name: "Pet ID", detail: "Collar with tags, recent photos", priority: "high" },
        { name: "Comfort items", detail: "Familiar toy or blanket to reduce stress", priority: "medium" }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────
  // SOS SIGNALS
  // ─────────────────────────────────────────────────────────────────
  sos: {
    visual: [
      { method: "Mirror Signal", detail: "Reflect sunlight toward rescuers. Flash 3 times, pause, repeat." },
      { method: "Fire Signal", detail: "Build 3 fires in a triangle (international distress signal). Add green vegetation for smoke." },
      { method: "Ground Signals", detail: "Create large X or SOS with rocks, logs, or bright colored items. Make at least 10 feet tall." },
      { method: "Flashlight", detail: "Flash SOS in Morse code: 3 short, 3 long, 3 short. Repeat." },
      { method: "Clothing", detail: "Hang brightly colored clothing in open areas visible from the air." }
    ],
    audio: [
      { method: "Whistle", detail: "3 blasts is the universal distress signal. Pause 1 minute, repeat." },
      { method: "Banging", detail: "Bang on pipes, walls, or any hard surface in groups of 3." },
      { method: "Voice", detail: "Shout 'HELP' in groups of 3 to conserve energy. Shout only when you hear rescuers nearby." }
    ],
    morse: {
      sos: "... --- ... (3 short, 3 long, 3 short)",
      help: ".... . .-.. .--.",
      description: "SOS is the universal distress signal. Can be signaled with light, sound, or any on/off method."
    }
  },

  // ─────────────────────────────────────────────────────────────────
  // SHELTER BUILDING
  // ─────────────────────────────────────────────────────────────────
  shelter: {
    types: [
      {
        name: "Debris Hut",
        when: "Cold weather, forested areas",
        steps: [
          "Find a long, sturdy ridge pole (about 9-12 feet)",
          "Prop one end on a stump or rock, the other on the ground",
          "Lean branches along both sides at 45-degree angles",
          "Cover with leaves, pine needles, or brush (2-3 feet thick)",
          "Add a leaf bed inside for insulation from the ground",
          "Make the entrance small enough to block wind"
        ]
      },
      {
        name: "Snow Cave",
        when: "Winter conditions, deep snow",
        steps: [
          "Find a deep snowbank or large snowdrift",
          "Dig an entrance tunnel angling upward",
          "Carve out a sleeping chamber higher than the entrance (warm air rises)",
          "Poke a ventilation hole in the ceiling with a stick",
          "Make the entrance small to retain heat",
          "Smooth the ceiling to prevent dripping"
        ]
      },
      {
        name: "Emergency Tarp Shelter",
        when: "You have a tarp or large plastic sheet",
        steps: [
          "Find two trees about 10 feet apart",
          "Tie a rope between them at about chest height",
          "Drape the tarp over the rope to form an A-frame",
          "Secure the edges with rocks, logs, or stakes",
          "Angle the opening away from the wind",
          "Add a ground cover of leaves or pine needles for insulation"
        ]
      }
    ]
  }
};

export default knowledgeBase;
