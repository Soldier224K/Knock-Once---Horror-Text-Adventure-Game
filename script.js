let G = {
  name:        "Subject",
  dread:       10,
  safety:      50,
  node:        "start",
  history:     [],
  lastAction:  "—",
  timerEnd:    0,
  timerRAF:    null,
  typing:      null,
  pendingNext: null,
  audioOn:     false,
};

const ROMAN = ["I","II","III"];
const ICONS = { survived:"⚗", taken:"☠", default:"⚔" };

const S = {

  /* ──────────────── CHAPTER 1 ──────────────── */

  "start": {
    ch:"I", feel:"NORMAL",
    eyebrow:"YOUR APARTMENT · SHIVAJI NAGAR, MUMBAI",
    title:"11:00 PM",
    text:`Tuesday. Third floor. Lift broken since January.\n\nYou are making chai when the knocking begins.\n\nThree. Precise. Patient.\nEach separated by exactly the same interval — like someone counting.\n\nYou stand at the stove and wait for four and five and six.\n\nThey do not come.`,
    choices:[
      { num:"I",   text:"Look through the peephole.",        icon:"👁",
        cTitle:"THE OBSERVER",
        cHex:"👁",
        cProse:`You press your eye to the glass.\n\nA woman. Forties. Blue salwar. Hands clasped.\n\nShe is looking down. Then — without a sound from you — she tilts her head up and looks directly into the peephole.\n\nYou did not move. You did not breathe.\n\nShe knows you are there.`,
        cFlavour:"Something watches back…",
        cDelta:"[ DREAD +8 ]",
        fx:{d:8}, next:"peephole" },
      { num:"II",  text:"Call out — 'Who is there?'",        icon:"🗣",
        cTitle:"YOUR OWN NAME",
        cHex:"🗣",
        cProse:`Silence for three seconds.\n\nThen she says your full name — "[NAME]" — in a voice that is almost your mother's.\n\nAlmost.\n\nYou have told no one you would be alone tonight.`,
        cFlavour:"How does she know?",
        cDelta:"[ DREAD +15 ]",
        fx:{d:15}, next:"call_out" },
      { num:"III", text:"Return to the chai. Ignore it.",     icon:"🍵",
        cTitle:"THE BALCONY",
        cHex:"🍵",
        cProse:`The knocking stops at 11:03 PM.\n\nYou exhale.\nYou pour the chai.\n\nAt 11:07 PM it starts again.\n\nFrom the balcony.\n\nYou live on the third floor.`,
        cFlavour:"There is no ledge out there.",
        cDelta:"[ DREAD +20 · SAFETY –12 ]",
        fx:{d:20,s:-12}, next:"ignore" }
    ]
  },

  "peephole": {
    ch:"I", feel:"UNEASY",
    eyebrow:"FRONT DOOR",
    title:"11:01 PM",
    text:`She is still there.\n\nMiddle-aged. Plain. Standing with the specific patience of someone who has done this before.\n\nShe does not knock again. She does not call out.\n\nShe simply waits — and looks at the exact spot where your eye is pressed to the glass.\n\nAfter thirty seconds she smiles.\nAll teeth.\nEyes unchanged.`,
    choices:[
      { num:"I",   text:"Call Mrs. Nair — she knows everyone.",  icon:"📱",
        cTitle:"MRS. NAIR",
        cHex:"📱",
        cProse:`Mrs. Nair picks up on the second ring.\nShe has been in bed since nine.\n\nYou describe the woman. A pause.\n\n"Lock your door," she says quietly. "All bolts. Do not open for anyone."\n\nYou wait for the rest. She hangs up.`,
        cFlavour:"She knew immediately.",
        cDelta:"[ SAFETY +10 · DREAD +8 ]",
        fx:{s:10,d:8}, next:"locked_door" },
      { num:"II",  text:"Open the door — she looks harmless.", icon:"🚪",
        cTitle:"SHE IS ALREADY SMILING",
        cHex:"🚪",
        cProse:`You open the door.\n\nShe is already smiling.\n\nShe says your name.\n\nYou step back. That is the last voluntary movement you make.`,
        cFlavour:"You should not have opened it.",
        cDelta:"[ SAFETY –60 ]",
        fx:{s:-60}, next:"end_door_bad" },
      { num:"III", text:"Take a photo through the peephole.", icon:"📷",
        cTitle:"WHAT THE PHOTO SHOWS",
        cHex:"📷",
        cProse:`You open the camera. Hold it to the glass.\n\nThe photograph develops in your gallery.\n\nThe corridor is empty.\n\nBut through the lens of the camera — not through the peephole — you see her.\nClearly.\nLooking directly into your lens.`,
        cFlavour:"Cameras see what eyes cannot.",
        cDelta:"[ DREAD +22 · SAFETY +5 ]",
        fx:{d:22,s:5}, next:"camera_anomaly" }
    ]
  },

  "call_out": {
    ch:"I", feel:"UNEASY",
    eyebrow:"FRONT DOOR",
    title:"11:02 PM",
    text:`She said your name.\n\n"[NAME]."\n\nYou stand in the hallway with the chai cooling in your hand and try to think of who could know that name — your full name, the name you never use, that isn't on any app or form.\n\nYour mother. Your father. Two cousins.\nNone of them would knock without calling first.\n\nNone of them knock like that.`,
    choices:[
      { num:"I",   text:"Lock all four bolts and the chain.",  icon:"🔒",
        cTitle:"BOLTED SHUT",
        cHex:"🔒",
        cProse:`All four bolts. The chain. You step back.\n\nSix minutes of silence.\n\nThen — behind you.\nInside.\n\nThe kitchen tap turns on.`,
        cFlavour:"You locked the door. Not the flat.",
        cDelta:"[ SAFETY +12 · DREAD +14 ]",
        fx:{s:12,d:14}, next:"tap_inside" },
      { num:"II",  text:"Open the door — it must be family.", icon:"🚪",
        cTitle:"NOT YOUR FAMILY",
        cHex:"🚪",
        cProse:`You open the door.\n\nShe is already smiling.`,
        cFlavour:"A mistake you cannot undo.",
        cDelta:"[ SAFETY –60 ]",
        fx:{s:-60}, next:"end_door_bad" },
      { num:"III", text:"Call your mother to check.",          icon:"☎️",
        cTitle:"YOUR MOTHER ANSWERS",
        cHex:"☎️",
        cProse:`Your mother is in Nashik. She picks up immediately.\n\n"Are you all right? I was about to call you."\n\nShe hasn't spoken to anyone about you today.\nShe doesn't know the name of any tutor or neighbour.\n\nWhile you are on the call, the knocking starts again.\nSame rhythm.\nFrom inside the bathroom.`,
        cFlavour:"She was going to call you.",
        cDelta:"[ DREAD +18 · SAFETY +6 ]",
        fx:{d:18,s:6}, next:"bathroom_knock" }
    ]
  },

  "ignore": {
    ch:"I", feel:"FRIGHTENED",
    eyebrow:"BACK BALCONY",
    title:"11:07 PM",
    text:`You go to the balcony door.\nYou do not open it.\n\nThrough the glass: the street below, the orange glow of a single streetlight, a dog asleep on the pavement.\n\nNormal things.\n\nThen you look down.\n\nOn the balcony floor — between your door and the railing — there is one wet footprint.\nFacing inward.\nAs if someone stepped off the railing and came toward you.`,
    choices:[
      { num:"I",   text:"Turn on every light in the flat.",   icon:"💡",
        cTitle:"WHAT THE LIGHT REVEALS",
        cHex:"💡",
        cProse:`Every switch. The flat blazes.\n\nLiving room: clear.\nBathroom: clear.\n\nKitchen — your chai cup is in the sink.\nYou left it on the counter.\n\nThe bedroom door is closed.\nYou left it open this morning.`,
        cFlavour:"Something moved your cup.",
        cDelta:"[ DREAD +16 · SAFETY +5 ]",
        fx:{d:16,s:5}, next:"bedroom_door" },
      { num:"II",  text:"Grab keys and leave immediately.",   icon:"🏃",
        cTitle:"THE STAIRWELL",
        cHex:"🏃",
        cProse:`Keys. Phone. You run.\n\nStairwell. Second floor landing.\n\nYou stop.\n\nThe woman is standing at the top of the stairs — your floor — behind where you just came from.\n\nShe raises one hand and waves.`,
        cFlavour:"She got there before you.",
        cDelta:"[ DREAD +22 ]",
        fx:{d:22}, next:"stairwell" },
      { num:"III", text:"Call the building watchman.",        icon:"📞",
        cTitle:"WATCHMAN KIRAN",
        cHex:"📞",
        cProse:`Kiran picks up. You describe the footprint.\n\nHe comes up in four minutes.\nHe examines the balcony. He looks at the railing.\n\n"Ma'am," he says carefully. "The railing. Come and see."\n\nOn the outside of the railing — pressed into the rust — four finger marks. Gripping inward. From below.`,
        cFlavour:"Something climbed up.",
        cDelta:"[ DREAD +18 · SAFETY +14 ]",
        fx:{d:18,s:14}, next:"kiran_finds" }
    ]
  },

  /* ──────────────── CHAPTER 2 ──────────────── */

  "locked_door": {
    ch:"II", feel:"WATCHFUL",
    eyebrow:"YOUR HALLWAY",
    title:"11:04 PM",
    text:`You lock every bolt. You put the chain on.\nYou stand in the hallway and watch the door.\n\nFour minutes of nothing.\n\nThen the knocking begins again.\n\nThree. The same interval. But now it is coming from inside.\n\nFrom behind the bathroom door.`,
    choices:[
      { num:"I",   text:"Call the police.",  icon:"🚨",
        cTitle:"OFFICERS EN ROUTE",
        cHex:"🚨",
        cProse:`The operator is calm. Officers dispatched. Five minutes.\n\n"Stay on the line," she says. "Do not open any doors."\n\nYou stay on the line.\n\nAt the three-minute mark, the bathroom door opens.\n\nThe operator says: "Get out now."`,
        cFlavour:"She hears it too.",
        cDelta:"[ SAFETY +18 · DREAD +12 ]",
        fx:{s:18,d:12}, next:"police_called" },
      { num:"II",  text:"Grab a knife from the kitchen.", icon:"🔪",
        cTitle:"THE MIRROR",
        cHex:"🔪",
        cProse:`You go to the kitchen. Open the drawer.\n\nBehind you: the bathroom door opens.\nYou spin. Empty.\n\nOn the bathroom mirror, written in something that has dried dark:\n\nYour address.\nYour full address.\nWith the flat number.`,
        cFlavour:"She knew this before she arrived.",
        cDelta:"[ DREAD +28 · SAFETY –8 ]",
        fx:{d:28,s:-8}, next:"mirror_msg" },
      { num:"III", text:"Text Mrs. Nair — ask what she knows.", icon:"💬",
        cTitle:"WHAT MRS. NAIR KNOWS",
        cHex:"💬",
        cProse:`She replies in under ten seconds.\n\n"Do not look her in the eyes. Do not say her name out loud."\n\nA second message: "She has been in that building before."\n\nA third, four minutes later: "I am sorry I didn't warn you sooner."`,
        cFlavour:"She has been waiting to say this.",
        cDelta:"[ DREAD +20 · SAFETY +10 ]",
        fx:{d:20,s:10}, next:"nair_warns" }
    ]
  },

  "camera_anomaly": {
    ch:"II", feel:"DISTURBED",
    eyebrow:"HALLWAY · CAMERA ROLL",
    title:"11:03 PM",
    text:`You have a photograph of a woman only your camera can see.\n\nYou look at it for a long time.\n\nHer face is clear. Detailed. Completely ordinary. You would pass her on the street without a second thought.\n\nYou zoom in on her eyes.\n\nThey are not looking at the lens.\nThey are looking at something behind you — reflected, dimly, in the glass of the peephole.\n\nThere is a shape behind you in the reflection.`,
    choices:[
      { num:"I",   text:"Look behind you.", icon:"😰",
        cTitle:"THE SHAPE",
        cHex:"😰",
        cProse:`You turn around.\n\nThe hallway is empty.\n\nBut on the wall behind you — at exactly the height of your head — there is a handprint pressed into the paint.\n\nFacing you.\n\nFresh.`,
        cFlavour:"It was right behind you.",
        cDelta:"[ DREAD +25 · SAFETY –10 ]",
        fx:{d:25,s:-10}, next:"handprint" },
      { num:"II",  text:"Lock the door and call the police.", icon:"🚨",
        cTitle:"WISE CHOICE",
        cHex:"🚨",
        cProse:`Four bolts. Chain. Call connected.\n\nYou send the photograph to the operator.\n\nA pause. She asks you to hold.\n\nWhen she returns: "We have a report matching that description from this building. Eighteen months ago. Flat 2B. I'm sending someone now."`,
        cFlavour:"This has happened before.",
        cDelta:"[ SAFETY +22 · DREAD +10 ]",
        fx:{s:22,d:10}, next:"police_called" }
    ]
  },

  "tap_inside": {
    ch:"II", feel:"WRONG",
    eyebrow:"YOUR KITCHEN",
    title:"11:06 PM",
    text:`The tap runs for forty seconds.\nThen it stops.\n\nYou stand in the hallway and do not go to the kitchen.\n\nThe refrigerator hums. A motorcycle passes below.\n\nFrom the bedroom: a drawer opening. Closing. Opening. Closing.\n\nNot random. The rhythm of someone searching.`,
    choices:[
      { num:"I",   text:"Get out through the front door.",  icon:"🏃",
        cTitle:"THE STAIRWELL",
        cHex:"🏃",
        cProse:`You throw the bolts and run.\n\nStairwell. Ground floor. Street.\n\nYou are outside in twenty-five seconds.\n\nYou look up at your window.\nYour bedroom light is on.\nYou did not turn it on.`,
        cFlavour:"The light was not on when you left.",
        cDelta:"[ SAFETY +22 ]",
        fx:{s:22}, next:"escape_street" },
      { num:"II",  text:"Shout to Mr. Pillai across the hall.", icon:"🗣",
        cTitle:"MR. PILLAI OPENS HIS DOOR",
        cHex:"🗣",
        cProse:`You throw open your front door and shout.\n\nMr. Pillai — retired, 68, hard of hearing — opens his door thirty seconds later.\n\nHe takes one look at your face.\n\n"Come inside," he says immediately.\nHe does not ask why.`,
        cFlavour:"He does not ask why.",
        cDelta:"[ SAFETY +25 · DREAD –8 ]",
        fx:{s:25,d:-8}, next:"pillai_shelter" }
    ]
  },

  "bathroom_knock": {
    ch:"II", feel:"AFRAID",
    eyebrow:"YOUR BATHROOM DOOR",
    title:"11:09 PM",
    text:`Your mother is still on the line.\n\nThree knocks. From inside your bathroom.\nThe same rhythm as the front door.\n\nShe hears it. "What was that?"\n\nYou say: nothing. A branch on the window.\nYou are on the third floor.\nThere are no trees this side of the building.\n\nThe knocking stops.\nThe bathroom light — which you left off — turns on.`,
    choices:[
      { num:"I",   text:"Tell Mum what's happening. Stay on the call.", icon:"☎️",
        cTitle:"SHE CALLS THE POLICE",
        cHex:"☎️",
        cProse:`Your mother calls the local station from her mobile while staying on the line with you.\n\nYou stand in the hallway and watch the bathroom door.\n\nThe light stays on for three minutes.\nThen goes out.\n\nOfficers arrive in eight minutes. They search the flat.\nThey find the bathroom window open. Second floor height — not reachable from the ground.\n\n"No signs of entry," they say.`,
        cFlavour:"Open windows on upper floors.",
        cDelta:"[ SAFETY +30 ]",
        fx:{s:30}, next:"police_arrive" },
      { num:"II",  text:"Open the bathroom door.",  icon:"🚪",
        cTitle:"EMPTY. ALMOST.",
        cHex:"🚪",
        cProse:`Empty.\n\nToothbrush. Towel. Your shampoo.\n\nThe window is open. You always keep it closed.\n\nOn the ledge of the window — facing inward, as if placed deliberately — is a stone. Flat. Smooth.\n\nEngraved on it in shallow, careful cuts: your name.`,
        cFlavour:"She made this before she knocked.",
        cDelta:"[ DREAD +35 · SAFETY –5 ]",
        fx:{d:35,s:-5}, next:"the_stone" }
    ]
  },

  "bedroom_door": {
    ch:"II", feel:"AFRAID",
    eyebrow:"YOUR BEDROOM · CLOSED DOOR",
    title:"11:10 PM",
    text:`You stand three metres from the bedroom door.\n\nThe light under the door hasn't moved.\nNo shadow. No sound.\n\nYou count to sixty.\n\nThe light goes out.\n\nThe door opens by itself — six inches — and stays there.\nIn the gap: darkness.\nAnd from somewhere inside: the sound of breathing.`,
    choices:[
      { num:"I",   text:"Go in. You have to know.", icon:"🔦",
        cTitle:"WHAT IS ON YOUR BED",
        cHex:"🔦",
        cProse:`You enter.\n\nEmpty.\n\nBut on your bed, arranged with deliberate care:\nYour passport.\nYour spare key.\nA photograph of you — taken through this window, four days ago.\n\nYou are standing at the window, looking out.\nBehind you in the photograph, slightly out of focus:\n\nShe is there.\nAlready inside.\nAlready smiling.`,
        cFlavour:"Four days ago.",
        cDelta:"[ DREAD +28 · SAFETY –8 ]",
        fx:{d:28,s:-8}, next:"photograph" },
      { num:"II",  text:"Do not look in. Leave the flat.",  icon:"🏃",
        cTitle:"YOU RAN",
        cHex:"🏃",
        cProse:`You turn and go.\n\nYou do not take anything.\nYou do not look behind you.\n\nYou are on the street in thirty seconds.\nYou call the police from the chai stall on the corner.\n\nWhen you look up at your window:\nThe bedroom light is on again.`,
        cFlavour:"You made the right choice.",
        cDelta:"[ SAFETY +25 ]",
        fx:{s:25}, next:"escape_street" }
    ]
  },

  "stairwell": {
    ch:"II", feel:"TERRIFIED",
    eyebrow:"SECOND FLOOR STAIRWELL",
    title:"11:08 PM",
    text:`She is at the top of the stairs.\n\nYour floor. The floor you just came from.\nBehind you.\n\nThe fluorescent light above her flickers.\n\nShe waves — small, deliberate — the way you would greet someone you have been waiting a long time to see.\n\nThe ground floor exit is one flight below you.\nYou can run.`,
    choices:[
      { num:"I",   text:"Run for the ground floor exit.", icon:"⬇",
        cTitle:"THE STREET",
        cHex:"⬇",
        cProse:`You take the stairs three at a time.\n\nGround floor. Metal door. You hit the bar and burst through.\n\nAutorickshaws. A chai stall. A street dog. A man eating vada pav.\n\nOrdinary, beautiful, real.\n\nYou do not look back.`,
        cFlavour:"The street is the safest place.",
        cDelta:"[ SAFETY +28 ]",
        fx:{s:28}, next:"escape_street" },
      { num:"II",  text:"You freeze. Your legs do not move.", icon:"😰",
        cTitle:"SHE WALKS TOWARD YOU",
        cHex:"😰",
        cProse:`She begins to walk down the stairs.\n\nNot hurrying.\nShe knows you cannot move.\n\nThe light above her stops flickering.\nIt goes out.`,
        cFlavour:"Fear is her tool.",
        cDelta:"[ SAFETY –45 ]",
        fx:{s:-45}, next:"end_freeze_bad" },
      { num:"III", text:"Bang on the nearest flat door.", icon:"✊",
        cTitle:"FLAT 2A OPENS",
        cHex:"✊",
        cProse:`You hammer on the door of Flat 2A.\n\nA man opens it — young, student, earbuds around his neck.\n\nHe sees your face and steps back.\n"Come in — come in — what happened?"\n\nYou get inside. He bolts the door.\n\nYou look through his peephole at the stairwell.\n\nEmpty.`,
        cFlavour:"She left when you found shelter.",
        cDelta:"[ SAFETY +20 · DREAD +6 ]",
        fx:{s:20,d:6}, next:"student_shelter" }
    ]
  },

  "kiran_finds": {
    ch:"II", feel:"DISTURBED",
    eyebrow:"BACK BALCONY",
    title:"11:12 PM",
    text:`Watchman Kiran is a careful man. He photographs the finger marks on the railing with his own phone.\n\nThen he straightens up and looks at you.\n\n"Ma'am. I need to tell you something. The family in 1B — they moved out last month. Said a woman kept appearing on their balcony. Second floor."\n\nHe pauses. "I didn't file a report. I am sorry."\n\nFrom inside your flat: the sound of a door closing.`,
    choices:[
      { num:"I",   text:"You and Kiran search the flat together.", icon:"🔦",
        cTitle:"WHAT YOU FIND",
        cHex:"🔦",
        cProse:`Every room. Together. Kiran goes first.\n\nThe flat is empty.\n\nIn the bedroom, the wardrobe door is open. You always keep it shut.\n\nHanging inside your clothes — between two shirts — is a single garment. Plain. Blue salwar.\n\nNot yours.\n\nThe fabric is damp.`,
        cFlavour:"She was inside. Before you got home.",
        cDelta:"[ DREAD +30 · SAFETY +8 ]",
        fx:{d:30,s:8}, next:"salwar_found" },
      { num:"II",  text:"Call the police immediately.", icon:"🚨",
        cTitle:"OFFICERS ARRIVE",
        cHex:"🚨",
        cProse:`Officers in eleven minutes. Two of them.\n\nKiran shows them the photograph of the finger marks.\n\nThey search the flat. They find it empty.\nBut in the bathroom: the window, which you always keep closed, is open. And on the sill: a wet footprint, facing inward.\n\n"We'll file a report," they say. "Change your locks."`,
        cFlavour:"Evidence. At last.",
        cDelta:"[ SAFETY +25 ]",
        fx:{s:25}, next:"police_arrive" }
    ]
  },

  /* ──────────────── CHAPTER 3 ──────────────── */

  "police_called": {
    ch:"III", feel:"ANXIOUS",
    eyebrow:"WAITING FOR OFFICERS",
    title:"11:15 PM",
    text:`The operator stays on the line.\nOfficers three minutes out.\n\nYou stand in the hallway with your back to the front door, facing the corridor.\n\nAll is still.\n\nThen, from the bedroom: footsteps.\n\nSlow. Measured. Coming down the corridor toward you.\n\nThe operator hears it. She stops speaking.`,
    choices:[
      { num:"I",   text:"Leave the flat now — stairwell.", icon:"🏃",
        cTitle:"INTO THE STAIRWELL",
        cHex:"🏃",
        cProse:`You throw the bolts and run.\n\nYou are in the stairwell when you hear the blue lights below.\n\nTwo officers taking the stairs toward you.\n\n"Are you the one who called?" the younger one asks.\n\nYou are shaking too much to answer but you nod.\n\nThey go past you. Into your flat.\n\nThe sounds stop.`,
        cFlavour:"You made it out.",
        cDelta:"[ SAFETY +30 ]",
        fx:{s:30}, next:"end_police_survived" },
      { num:"II",  text:"Hold your ground — they're almost here.", icon:"⏳",
        cTitle:"SHE IS IN THE HALLWAY",
        cHex:"⏳",
        cProse:`The footsteps stop.\n\nThen the bedroom door opens fully.\n\nYou see her in the hallway.\nThe woman from outside.\nShe is inside.\n\nShe has been inside the whole time.\n\n"Get out," the operator says clearly. "GET OUT NOW."\n\nYou run.`,
        cFlavour:"She was already there.",
        cDelta:"[ DREAD +30 · SAFETY –10 ]",
        fx:{d:30,s:-10}, next:"escape_street" }
    ]
  },

  "mirror_msg": {
    ch:"III", feel:"HORRIFIED",
    eyebrow:"BATHROOM MIRROR",
    title:"11:16 PM",
    text:`Your address. Your full address. Flat number, building name, pin code.\n\nWritten in your handwriting.\n\nYou have never written this. You have never written like this.\n\nThe bathroom window is open.\nYou are on the third floor.\n\nYou wipe it.\n\nUnder the writing:\nA list. Seven names. Yours at the top, crossed out.\n\nThe sixth name: Mrs. Nair.`,
    choices:[
      { num:"I",   text:"Call Mrs. Nair immediately.", icon:"📱",
        cTitle:"WRONG VOICE",
        cHex:"📱",
        cProse:`Three rings. Four.\n\nA voice answers. It is not Mrs. Nair.\n\nIt is the voice that said your name through the front door.\n\n"You should have opened it the first time," she says.\n\nThe bathroom light goes out.\n\nYou run.`,
        cFlavour:"She has Mrs. Nair's phone.",
        cDelta:"[ DREAD +40 · SAFETY –20 ]",
        fx:{d:40,s:-20}, next:"escape_last_chance" },
      { num:"II",  text:"Photograph the list and leave.", icon:"📸",
        cTitle:"EVIDENCE IN YOUR HAND",
        cHex:"📸",
        cProse:`You photograph the mirror.\n\nThen you leave. You do not stop. You go through the front door and down the stairs without looking behind you.\n\nStreet. Chai stall. Stranger's phone. Police.\n\nWhen the officers search the flat, the mirror is clean.\n\nBut your photograph shows the list clearly.\n\nThe names are real.`,
        cFlavour:"The photograph cannot lie.",
        cDelta:"[ SAFETY +20 ]",
        fx:{s:20}, next:"end_evidence_survived" },
      { num:"III", text:"Drop everything and run.", icon:"🏃",
        cTitle:"BAREFOOT. RUNNING.",
        cHex:"🏃",
        cProse:`You do not take anything.\nNot the phone. Not the keys. Not the photograph.\n\nYou run down three flights in bare feet and out into the street.\n\nYou are shaking. You are safe.\nYou are never going back.`,
        cFlavour:"Some things you leave behind.",
        cDelta:"[ SAFETY +15 ]",
        fx:{s:15}, next:"escape_street" }
    ]
  },

  "nair_warns": {
    ch:"III", feel:"GRAVE",
    eyebrow:"YOUR HALLWAY · 11:18 PM",
    title:"WHAT MRS. NAIR KNOWS",
    text:`A fourth message:\n\n"Her name is not important. What is important: she knocks three times and she waits. If you do not open, she finds another way in. She has been doing this for years in these buildings. Shivaji Nagar. Govandi. Dharavi. Always third floor. Always alone."\n\nA fifth message:\n\n"Call the police. And then get out. Don't stay to let them in. She leaves when there are too many people."`,
    choices:[
      { num:"I",   text:"Call the police and leave immediately.", icon:"🚨",
        cTitle:"YOU LISTENED",
        cHex:"🚨",
        cProse:`You call. You leave.\n\nYou are at the building entrance when the patrol car arrives.\n\nYou tell them everything. Including the texts from Mrs. Nair.\n\nThey search your flat. In the bathroom: the window is open. A footprint on the sill.\n\nThey knock on Mrs. Nair's door.\n\nNo answer. She is not home.`,
        cFlavour:"Where is Mrs. Nair?",
        cDelta:"[ SAFETY +35 ]",
        fx:{s:35}, next:"end_police_survived" },
      { num:"II",  text:"Go check on Mrs. Nair.", icon:"🚪",
        cTitle:"FLAT 3D",
        cHex:"🚪",
        cProse:`Her flat is thirty metres down the corridor.\n\nYou knock.\n\nThe door is unlocked.\n\nYou push it open.\n\nThe flat is neat. A cup of tea on the table. Warm.\n\nOn the kitchen mirror: the same list. The same handwriting.\n\nMrs. Nair's name — the sixth — is now crossed out.`,
        cFlavour:"You were too late.",
        cDelta:"[ DREAD +40 · SAFETY –10 ]",
        fx:{d:40,s:-10}, next:"nair_gone" }
    ]
  },

  "handprint": {
    ch:"III", feel:"PANICKING",
    eyebrow:"YOUR HALLWAY",
    title:"11:19 PM",
    text:`A handprint. Pressed into the paint. Still wet.\n\nYou touch it without meaning to.\n\nCold. Much colder than the wall.\n\nFrom the bedroom: your phone, which you left on the bed, begins to ring.\n\nYou look at the screen through the open doorway.\n\nUnknown number.\n\nThree rings. Stops. Starts again.`,
    choices:[
      { num:"I",   text:"Answer it.", icon:"📱",
        cTitle:"WHAT THE VOICE SAYS",
        cHex:"📱",
        cProse:`You answer.\n\nBreathing. Then:\n\n"I'm already inside."\n\nYou drop the phone.\nYou run for the front door.\n\nIt opens before you reach it.`,
        cFlavour:"Never answer unknown numbers.",
        cDelta:"[ SAFETY –50 ]",
        fx:{s:-50}, next:"end_inside_bad" },
      { num:"II",  text:"Leave the phone. Get out.", icon:"🏃",
        cTitle:"YOU LEAVE IT",
        cHex:"🏃",
        cProse:`You do not touch the phone.\n\nYou go straight to the front door, throw the bolts, and go.\n\nDown the stairs. Out into the street.\nYou call the police from the chai stall.\n\nWhen officers search the flat, your phone is gone.\n\nNot stolen. It is on the balcony, placed neatly on the railing. Screen facing up.\n\nThe last call received: 11:21 PM. Duration: 0 seconds. Your own number.`,
        cFlavour:"A call from yourself.",
        cDelta:"[ SAFETY +20 ]",
        fx:{s:20}, next:"escape_street" }
    ]
  },

  "photograph": {
    ch:"III", feel:"NAUSEATED",
    eyebrow:"YOUR BEDROOM",
    title:"11:20 PM",
    text:`A photograph of you. Taken through your own window. Four days ago.\n\nBehind you, slightly out of focus, slightly smiling:\n\nShe is already in the room.\n\nYou do not remember this. You do not remember standing at the window four days ago.\n\nYou do not remember inviting anyone in.\n\nUnder the photograph, in the same careful handwriting as the mirror:\n\n"Next time, open the door."`,
    choices:[
      { num:"I",   text:"Take the photograph and leave.", icon:"📸",
        cTitle:"EVIDENCE",
        cHex:"📸",
        cProse:`You take the photograph.\nYou leave everything else.\n\nStreet. Police. Report.\n\nThe officers look at the photograph for a long time.\n\n"We'll need to keep this," they say.\n\nYou never get it back.\nYou are not sure you want it.`,
        cFlavour:"Proof that she was there.",
        cDelta:"[ SAFETY +15 ]",
        fx:{s:15}, next:"end_evidence_survived" },
      { num:"II",  text:"Look more closely at her face.", icon:"🔍",
        cTitle:"SHE IS BEHIND YOU",
        cHex:"🔍",
        cProse:`You bring the photograph close to your face.\n\nShe is smiling. Directly at the camera.\nHer eyes are clear.\n\nThen you realise:\nShe is not behind the person in the photograph.\n\nShe is behind you.\n\nRight now.\n\nSomething touches your shoulder.`,
        cFlavour:"You should not have looked.",
        cDelta:"[ SAFETY –60 ]",
        fx:{s:-60}, next:"end_touch_bad" }
    ]
  },

  "pillai_shelter": {
    ch:"III", feel:"SAFER",
    eyebrow:"FLAT 3B · MR. PILLAI",
    title:"11:14 PM",
    text:`His flat smells like old newspapers and incense.\n\nHe makes you sit. He doesn't ask questions.\nHe calls the police himself, matter-of-factly, the way a man calls for a plumber.\n\nWhile you wait, you look through his peephole at your front door.\n\nYour front door is open.\n\nYou locked it. You put the chain on.\nIt is standing open.\n\nNo one comes out.`,
    choices:[
      { num:"I",   text:"Wait for the police here.", icon:"🚨",
        cTitle:"OFFICERS CLEAR THE FLAT",
        cHex:"🚨",
        cProse:`Six minutes. Three officers.\n\nThey search your flat thoroughly.\n\nEmpty. Every room. Every cupboard.\nThe bathroom window is open. On the floor: a single wet footprint facing the window. As if she left the way she came.\n\n"We'll file a report," they say. "Do you have somewhere to stay tonight?"`,
        cFlavour:"She left through the window.",
        cDelta:"[ SAFETY +35 ]",
        fx:{s:35}, next:"end_police_survived" },
      { num:"II",  text:"Ask Mr. Pillai what he knows.", icon:"👴",
        cTitle:"MR. PILLAI SPEAKS",
        cHex:"👴",
        cProse:`He is quiet for a moment.\n\n"She came the first time three years ago. Flat 3A — before you moved in. The family opened the door. They were gone in a month."\n\n"Flat 2B. Eighteen months ago. Same knocking. They didn't call anyone. The wife saw something on the balcony."\n\nHe looks at his hands.\n\n"I should have told the building committee. I am sorry, child."`,
        cFlavour:"This has happened before.",
        cDelta:"[ DREAD +20 · SAFETY +8 ]",
        fx:{d:20,s:8}, next:"end_police_survived" }
    ]
  },

  "student_shelter": {
    ch:"III", feel:"SHAKEN",
    eyebrow:"FLAT 2A",
    title:"11:11 PM",
    text:`The student's name is Arjun. He is studying for UPSC. His flat has three deadbolts.\n\nHe makes you sit and gives you water.\n\n"I've heard the knocking," he says. "Three times this week from the corridor. Always late. Always the same rhythm."\n\nHe pauses. "I never opened my door."\n\nFrom outside: nothing. The stairwell is silent.\n\nYour phone buzzes. Unknown number.`,
    choices:[
      { num:"I",   text:"Don't answer. Call the police.", icon:"🚨",
        cTitle:"GOOD CALL",
        cHex:"🚨",
        cProse:`You call the police. Arjun stays with you.\n\nOfficers arrive in nine minutes. They search both floors.\n\nThey find her in the stairwell between the second and third floors.\n\nShe does not speak. She does not resist.\n\nShe gives a name to the officers.\nIt matches three missing persons reports from Govandi, Dharavi, Andheri.\n\nThe cases are reopened.`,
        cFlavour:"They find her.",
        cDelta:"[ SAFETY +40 ]",
        fx:{s:40}, next:"end_caught" },
      { num:"II",  text:"Answer the unknown call.", icon:"📱",
        cTitle:"THREE KNOCKS",
        cHex:"📱",
        cProse:`You answer.\n\nSilence.\n\nThen: three knocks.\n\nComing from Arjun's front door.\n\nFrom inside the flat.`,
        cFlavour:"She does not need you to open the door.",
        cDelta:"[ DREAD +35 · SAFETY –20 ]",
        fx:{d:35,s:-20}, next:"escape_last_chance" }
    ]
  },

  "salwar_found": {
    ch:"III", feel:"COLD",
    eyebrow:"YOUR BEDROOM · WARDROBE",
    title:"11:22 PM",
    text:`A blue salwar. Damp. Hanging between your shirts.\n\nKiran photographs it without touching it.\n\nHe calls the police.\n\nWhile you wait in the hallway, you notice something else.\n\nIn the pocket of the salwar — visible because the fabric is wet and clinging — the rectangular shape of a phone.`,
    choices:[
      { num:"I",   text:"Take the phone from the pocket.", icon:"📱",
        cTitle:"HER PHONE",
        cHex:"📱",
        cProse:`The screen lights up as you touch it.\n\nA message thread. No name — just a number.\n\nThe last message, sent eleven minutes ago:\n\n"She found it. I'm leaving."\n\nThe message before that, sent four days ago:\n\n"I put the things on the bed. She doesn't suspect."`,
        cFlavour:"She was watching for days.",
        cDelta:"[ DREAD +25 · SAFETY +10 ]",
        fx:{d:25,s:10}, next:"end_evidence_survived" },
      { num:"II",  text:"Leave the phone for the police.", icon:"🚨",
        cTitle:"FORENSIC EVIDENCE",
        cHex:"🚨",
        cProse:`Kiran stops you from touching it.\n\n"Let them find it," he says. "As it is."\n\nOfficers arrive. They bag the garment with the phone inside.\n\n"This is very useful," the senior officer says quietly.\n\nThey find her number in the building's visitor log from three months ago. She signed in as a relative of Flat 1B.\n\nThe cases from Govandi are reopened.`,
        cFlavour:"The phone is evidence.",
        cDelta:"[ SAFETY +30 ]",
        fx:{s:30}, next:"end_caught" }
    ]
  },

  "the_stone": {
    ch:"III", feel:"SHATTERED",
    eyebrow:"BATHROOM WINDOWSILL",
    title:"11:21 PM",
    text:`Your name in stone.\n\nCarefully engraved. Not scratched — carved. With time. With intention.\n\nShe made this before she ever knocked.\n\nShe planned to leave it here.\n\nYou look at it for thirty seconds and then you understand:\nThis is not a warning.\nThis is a gift.\n\nThe kind you leave for someone before you take them somewhere they won't come back from.`,
    choices:[
      { num:"I",   text:"Take the stone and run.", icon:"🏃",
        cTitle:"EVIDENCE IN HAND",
        cHex:"🏃",
        cProse:`You take it.\nYou run.\nYou are in the street in twenty seconds.\n\nThe police photograph the stone.\nThe carving matches tools found in a storage locker in Andheri registered to a name that matches three missing persons reports.\n\nThe cases are reopened.`,
        cFlavour:"You brought them proof.",
        cDelta:"[ SAFETY +25 ]",
        fx:{s:25}, next:"end_evidence_survived" },
      { num:"II",  text:"Put it back and get out.", icon:"🏃",
        cTitle:"LEAVE EVERYTHING",
        cHex:"🏃",
        cProse:`You leave it exactly as you found it.\n\nYou leave everything.\n\nYou run and you call from the street and when the officers come they find the stone and the open window and the footprint.\n\nThey call it significant.\nYou call it the night you decided you would never live alone again.`,
        cFlavour:"Smart. Leave it for them to find.",
        cDelta:"[ SAFETY +20 ]",
        fx:{s:20}, next:"end_police_survived" }
    ]
  },

  /* ──────────────── CHAPTER 4 — TRANSITIONS ──────────────── */

  "nair_gone": {
    ch:"IV", feel:"BROKEN",
    eyebrow:"FLAT 3D",
    title:"11:30 PM",
    text:`The tea is warm. The flat is neat.\n\nMrs. Nair keeps a clean home.\n\nHer reading glasses are on the kitchen table, folded neatly beside a library book — a bookmark halfway through. She does not leave things unfinished.\n\nYou call the police.\nYou call her daughter.\n\nHer daughter does not answer.\n\nYou wait in the corridor until the officers arrive.\n\nYou do not go back inside either flat.`,
    choices:[
      { num:"I",   text:"Give the officers Mrs. Nair's texts.", icon:"📱",
        cTitle:"THE MESSAGES",
        cHex:"📱",
        cProse:`You show them everything.\n\nThe officers read the texts. They call their senior.\n\nThe building is swept. Roof to ground.\n\nThey find a door to the old service stairwell — the one that was supposed to be sealed — standing open.\n\nOn the steps: wet footprints going up.\n\nAnd coming back down.`,
        cFlavour:"She used the sealed stairwell.",
        cDelta:"[ SAFETY +20 ]",
        fx:{s:20}, next:"end_police_survived" }
    ]
  },

  "police_arrive": {
    ch:"IV", feel:"RELIEF",
    eyebrow:"YOUR FLAT · OFFICERS ON SCENE",
    title:"12:10 AM",
    text:`Two officers. Methodical.\n\nThey go room by room. You wait in the doorway.\n\nThe bathroom window is open. A wet footprint on the sill, facing inward. The officer photographs it without touching it.\n\nThey search the wardrobe, under the bed, behind the water heater.\n\nEmpty. She is gone.\n\n"Do you have somewhere to stay tonight?" the senior one asks.\n\nYou nod. You already have your phone out to call your cousin.\n\n"We'll file the report. Change your locks in the morning. Install a camera if you can."\n\nHe hands you a card with a case number.\n\nYou look at it for a long time.`,
    choices:[
      { num:"I", text:"Give them everything — texts, photos, the full account.", icon:"📋",
        cTitle:"ON RECORD",
        cHex:"📋",
        cProse:`You tell them everything. The three knocks. The name she said. The peephole. The balcony.\n\nThey take notes. They ask questions. The junior officer keeps glancing at the bathroom window.\n\n"This matches something from 2B," the senior says quietly to his partner. Then, to you: "We'll follow up."\n\nThey don't tell you what happened in 2B.\n\nYou don't ask. You are not sure you want to know.`,
        cFlavour:"The case file gets thicker.",
        cDelta:"[ SAFETY +15 ]",
        fx:{s:15}, next:"end_police_survived" },
      { num:"II", text:"Ask them what happened in Flat 2B.", icon:"❓",
        cTitle:"WHAT HAPPENED IN 2B",
        cHex:"❓",
        cProse:`He looks at his partner. A pause that lasts a half-second too long.\n\n"A family reported a disturbance. Eighteen months ago. Third floor."\n\n"What happened to them?"\n\nAnother pause.\n\n"They moved out," he says. "Shortly after."\n\nHe closes his notebook. He will not meet your eyes.\n\nYou understand that 'moved out' is doing a lot of work in that sentence.`,
        cFlavour:"They moved out shortly after.",
        cDelta:"[ DREAD +15 · SAFETY +10 ]",
        fx:{d:15,s:10}, next:"end_police_survived" }
    ]
  },

  "escape_street": {
    ch:"IV", feel:"ALIVE",
    eyebrow:"SHIVAJI NAGAR · THE STREET",
    title:"11:45 PM",
    text:`You are standing outside.\n\nA rickshaw ticks by. The chai stall on the corner has one last customer.\n\nYou call the police from your phone. You tell them everything.\n\nYou look up at your window.\nThird floor. Light on. Curtain moved aside.\n\nSomeone at the glass.\nLooking down at you.\n\nThe shape does not move when the police car arrives.\n\nWhen officers enter the building, the flat is empty.\nThe window is open.\nOn the sill: one handprint, pressing outward. As if holding on before letting go.`,
    choices:[
      { num:"I",   text:"Give a full statement and go to your cousin's.", icon:"🏠",
        cTitle:"THE MORNING",
        cHex:"🏠",
        cProse:`You give the statement. You are at your cousin's by 1 AM.\n\nYou change the locks the next morning. You install a camera intercom.\n\nYou never see her again.\n\nThe case is filed as criminal trespass. No arrest is made.\n\nYou think about the list on the mirror sometimes — the six names under yours, none of them crossed out.`,
        cFlavour:"It is over. For now.",
        cDelta:"[ SAFETY +10 ]",
        fx:{s:10}, next:"end_escape_survived" }
    ]
  },

  "escape_last_chance": {
    ch:"IV", feel:"DESPERATE",
    eyebrow:"ONE LAST CHANCE",
    title:"11:55 PM",
    text:`You have one chance.\n\nThe front door of wherever you are.\nOpen it. Run. Do not stop.`,
    choices:[
      { num:"I",   text:"Run. Right now. Don't stop.", icon:"🏃",
        cTitle:"YOU MAKE IT",
        cHex:"🏃",
        cProse:`You run.\n\nYou get out.\n\nYou call the police from the street.\n\nYou are shaking. You are safe.\n\nYou do not sleep that night.`,
        cFlavour:"You survived.",
        cDelta:"[ SAFETY +15 ]",
        fx:{s:15}, next:"end_escape_survived" }
    ]
  },

  /* ──────────────── ENDINGS ──────────────── */

  "end_police_survived": {
    isEnd:true, type:"survived",
    stamp:"CASE CLOSED",
    verdict:"SURVIVED",
    sub:"You called for help. You didn't wait.",
    prose:`The police search your flat for forty minutes.\n\nNothing found. No signs of forced entry. Bathroom window noted as possible access point. Forensics are called.\n\nYou stay at your cousin's place in Powai. You change the locks. You get an intercom.\n\nYou never know her name. The case sits open.\n\nSometimes you think about the list on the mirror — the six names under yours. You look one up once, out of a compulsion you cannot explain. A missing persons report, six months old.\n\nYou close the browser. You don't look up the others.\n\nBut you check your door every night before bed. You always will.`
  },

  "end_escape_survived": {
    isEnd:true, type:"survived",
    stamp:"CASE CLOSED",
    verdict:"SURVIVED",
    sub:"You got out. You didn't look back.",
    prose:`The street was the safest place you could be.\n\nYou gave your statement. The officers were thorough. The case was filed.\n\nYou moved out within three weeks. Fourth floor. Better building. Guard at the gate. Intercom that works.\n\nYou kept the habit of looking before you answered.\nYou still ask who is there, even when you think you know.\n\nThree months later, in a different neighbourhood, you heard a sound that stopped you cold: three knocks, deliberate, patient.\n\nFrom your neighbour's door. Their daughter, locked out, impatient.\n\nNormal.\n\nYou breathed for the first time in ninety seconds.`
  },

  "end_evidence_survived": {
    isEnd:true, type:"survived",
    stamp:"CASE NOTED",
    verdict:"SURVIVED",
    sub:"You saw it clearly. That is why you made it.",
    prose:`You brought evidence.\n\nThat was the difference.\n\nThe police took what you gave them seriously. They cross-referenced it with two other cases. They opened a file with a name at the top — not hers, since they never caught her, but a description, a pattern, a methodology.\n\nThird floor. Alone. Three knocks.\n\nThe list on the mirror still bothers you. The other six names. You gave them to the police. They said they would look into it.\n\nYou have to believe that they did.`
  },

  "end_caught": {
    isEnd:true, type:"survived",
    stamp:"SUSPECT DETAINED",
    verdict:"CAUGHT",
    sub:"Because of you, she cannot do this to anyone else.",
    prose:`They found her.\n\nShe was taken to the station. She did not speak for nine hours. When she finally gave a name, it didn't match any records.\n\nBut her fingerprints matched a partial from Flat 2B, eighteen months ago. And her face matched a description from Govandi. And Dharavi. And two cases in Andheri that were never connected before.\n\nShe was charged. She was remanded.\n\nYou gave your statement twice. The second time, a detective told you quietly that three families had been asking about a woman matching this description for over a year.\n\nBecause of you, they would finally get an answer.`
  },

  "end_door_bad": {
    isEnd:true, type:"taken",
    stamp:"CASE UNSOLVED",
    verdict:"TAKEN",
    sub:"You opened the door.",
    prose:`She is standing in the hallway.\n\nShe says your name — "[NAME]" — and steps forward. You step back.\n\nYour neighbours report that your flat has been silent for three days before anyone checks. The kettle is still on. The chai has long gone cold.\n\nThe front door is locked from the inside.\n\nThe police find no signs of struggle. No signs of a second person. Your phone, your keys, your passport — all present. Your shoes are in the hall.\n\nThe case is filed as unexplained disappearance.\n\nThe file stays open.`
  },

  "end_freeze_bad": {
    isEnd:true, type:"taken",
    stamp:"CASE UNSOLVED",
    verdict:"TAKEN",
    sub:"Fear stopped you.",
    prose:`She walked down toward you and you could not move.\n\nThe light went out.\n\nThe building watchman found your shoes on the second-floor landing the next morning. Placed side by side, neatly, as if you removed them before going somewhere comfortable.\n\nThe CCTV footage from the stairwell shows only you.\nAlone.\nWalking upward.`
  },

  "end_inside_bad": {
    isEnd:true, type:"taken",
    stamp:"CASE UNSOLVED",
    verdict:"TAKEN",
    sub:"She was already inside.",
    prose:`The front door opens before you reach it.\n\nYou cannot explain, afterward, what you saw. You try. The officers write down what you say carefully.\n\nBut you are the only witness.\n\nAnd some of what you describe — the door opening by itself, the voice from the phone, the shape in the hallway — does not appear in any report filed that night.\n\nBecause no report was filed that night.\n\nBecause no one knew to file one.`
  },

  "end_touch_bad": {
    isEnd:true, type:"taken",
    stamp:"CASE UNSOLVED",
    verdict:"TAKEN",
    sub:"You should not have looked closer.",
    prose:`The photograph falls from your hands.\n\nYou turn around.\n\nShe is in the doorway of your own bedroom.\n\nShe smiles with all her teeth.\n\nShe reaches out her hand.\n\nA welfare check is filed after four days. Your flat is exactly as you left it. Except the photograph on the bed is gone.\n\nAnd on the windowsill, pressed in something that dried dark, are two handprints — one yours, one smaller — side by side, facing out.`
  },

};

function showScreen(id) {
  document.querySelectorAll('.gscreen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ═══════════════════════════════════════════════════════════
//  START / RESTART
// ═══════════════════════════════════════════════════════════
function startGame() {
  const first = (document.getElementById('playerFirst').value.trim()  || 'Subject');
  const last  = (document.getElementById('playerLast').value.trim());
  G.name = last ? `${first} ${last}` : first;

  G.dread = 10; G.safety = 50;
  G.node = 'start'; G.history = []; G.lastAction = '—'; G.pendingNext = null;
  clearTimer();

  // Start audio
  audioStart();

  // Chapter splash then game
  const node = S['start'];
  showChapterSplash(node.ch, node.feel, () => {
    showScreen('screen-game');
    renderNode('start');
  });
}

function restartGame() {
  clearTimer();
  audioStop();
  showScreen('screen-landing');
}

function goLanding() {
  clearTimer();
  audioStop();
  showScreen('screen-landing');
}


function showChapterSplash(ch, feel, cb) {
  const chNums = {'I':'CHAPTER I','II':'CHAPTER II','III':'CHAPTER III','IV':'CHAPTER IV'};
  document.getElementById('ch-number').textContent = chNums[ch] || 'CHAPTER I';

  // feel with bold word
  const words = feel.split(' ');
  const last = words.pop();
  document.getElementById('ch-feel').innerHTML = `YOU FEEL <strong>${last}</strong>`;

  showScreen('screen-chapter');
  setTimeout(() => { if (cb) cb(); }, 2200);
}


function renderNode(nodeId) {
  const node = S[nodeId];
  if (!node) { console.error('Missing node:', nodeId); return; }
  G.node = nodeId;

  // If it's an ending, show ending directly
  if (node.isEnd) {
    triggerEnding(node);
    return;
  }

  document.getElementById('game-ch-text').textContent =
    ({'I':'CHAPTER I','II':'CHAPTER II','III':'CHAPTER III','IV':'CHAPTER IV'}[node.ch] || 'CHAPTER I');

  updateHUD();

  document.getElementById('scene-eyebrow').textContent = node.eyebrow || '';
  document.getElementById('scene-title').textContent   = node.title   || '';

  const az = document.getElementById('action-zone');
  az.style.display = 'none';

  clearTyping();
  const el = document.getElementById('story-prose');
  el.textContent = '';

  const text = (node.text || '').replace(/\[NAME\]/g, G.name);

  typewrite(text, el, () => {
    if (node.choices && node.choices.length > 0) {
      az.style.display = 'flex';
    }
  });
}

const HUD_SVGS = {
  calm: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  tense:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5" stroke-width="2"/><line x1="12" y1="19" x2="12" y2="22" stroke-width="2"/></svg>`,
  dread:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff2020" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="4" fill="rgba(232,0,42,.3)"/><circle cx="12" cy="12" r="2" fill="rgba(232,0,42,.8)"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke-width="2"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke-width="2"/><line x1="19.78" y1="4.22" x2="17.66" y2="6.34" stroke-width="2"/><line x1="6.34" y1="17.66" x2="4.22" y2="19.78" stroke-width="2"/></svg>`
};

function updateHUD() {
  const d = clamp(G.dread,  0, 100);
  const s = clamp(G.safety, 0, 100);
  document.getElementById('dread-fill').style.width  = d + '%';
  document.getElementById('safety-fill').style.width = s + '%';
  document.getElementById('dread-num').textContent   = Math.round(d);
  document.getElementById('safety-num').textContent  = Math.round(s);

  const hex = document.getElementById('gem-hex');
  if      (d > 75) hex.innerHTML = HUD_SVGS.dread;
  else if (d > 45) hex.innerHTML = HUD_SVGS.tense;
  else             hex.innerHTML = HUD_SVGS.calm;
}


function showChoices() {
  const node = S[G.node];
  if (!node || !node.choices || !node.choices.length) return;

  const deck = document.getElementById('cards-deck');
  deck.innerHTML = '';

  node.choices.forEach((ch, i) => {
    const card = makeCard(ch, i);
    deck.appendChild(card);
  });

  showScreen('screen-choices');
  startTimer(30);
}


function makeCard(choice, idx) {
  const card = document.createElement('div');
  card.className = 'tarot-card';
  card.innerHTML = `
    ${makeSVGEye()}
    <div class="card-b1"></div>
    <div class="card-b2"></div>
    <div class="card-corner cc-tl"></div>
    <div class="card-corner cc-tr"></div>
    <div class="card-corner cc-bl"></div>
    <div class="card-corner cc-br"></div>
    <div class="card-top-arch"></div>
    <div class="card-numeral">${ROMAN[idx] || idx+1}</div>
    <div class="card-option-badge">
      <span class="option-badge-text">OPTION ${ROMAN[idx] || idx+1}</span>
    </div>
    <div class="card-sep"></div>
    <div class="card-eye-wrap">${eyeSVG()}</div>
    <div class="card-choice-text">${choice.text}</div>
    <button class="card-choose-btn" onclick="selectChoice(${idx}); event.stopPropagation();">CHOOSE</button>
  `;
  card.onclick = () => selectChoice(idx);
  return card;
}

// SVG eye: almond shape + radiating spokes from center
function eyeSVG() {
  const W = 200, H = 200, cx = 100, cy = 100;
  const eyeRx = 88, eyeRy = 46;
  const spokeCount = 18;
  const innerR = 14, outerR = 42;
  const hexR = 52;

  // Build eye path (two arcs = almond)
  const eyePath = `M ${cx-eyeRx},${cy}
    Q ${cx},${cy-eyeRy} ${cx+eyeRx},${cy}
    Q ${cx},${cy+eyeRy} ${cx-eyeRx},${cy} Z`;

  // Build spokes
  let spokes = '';
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i / spokeCount) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * innerR;
    const y1 = cy + Math.sin(angle) * innerR;
    const x2 = cx + Math.cos(angle) * outerR;
    const y2 = cy + Math.sin(angle) * outerR;
    spokes += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(232,0,42,.5)" stroke-width="1"/>`;
  }

  // Hexagon around pupil
  let hexPts = '';
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 2 * Math.PI - Math.PI / 6;
    hexPts += `${(cx + Math.cos(a)*hexR).toFixed(1)},${(cy + Math.sin(a)*hexR).toFixed(1)} `;
  }

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <!-- outer eye almond -->
    <path d="${eyePath}" fill="none" stroke="rgba(232,0,42,.65)" stroke-width="1.2"/>
    <!-- inner eye almond smaller -->
    <path d="M ${cx-eyeRx*.6},${cy}
      Q ${cx},${cy-eyeRy*.55} ${cx+eyeRx*.6},${cy}
      Q ${cx},${cy+eyeRy*.55} ${cx-eyeRx*.6},${cy} Z"
      fill="none" stroke="rgba(232,0,42,.35)" stroke-width="1"/>
    <!-- hexagon -->
    <polygon points="${hexPts}" fill="none" stroke="rgba(232,0,42,.45)" stroke-width="1"/>
    <!-- spokes -->
    ${spokes}
    <!-- pupil dot -->
    <circle cx="${cx}" cy="${cy}" r="5" fill="rgba(232,0,42,.85)" />
    <circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="rgba(232,0,42,.55)" stroke-width="1"/>
    <!-- horizontal cross-hair -->
    <line x1="${cx-eyeRx}" y1="${cy}" x2="${cx-eyeRx*.6}" y2="${cy}" stroke="rgba(232,0,42,.3)" stroke-width="1"/>
    <line x1="${cx+eyeRx*.6}" y1="${cy}" x2="${cx+eyeRx}" y2="${cy}" stroke="rgba(232,0,42,.3)" stroke-width="1"/>
  </svg>`;
}

function makeSVGEye() { return ''; } // placeholder — eye is in card-eye-wrap


function selectChoice(idx) {
  clearTimer();
  const node = S[G.node];
  if (!node || !node.choices) return;
  const choice = node.choices[idx];
  if (!choice) return;

  // Apply effects
  if (choice.fx) {
    if (choice.fx.d) G.dread  = clamp(G.dread  + choice.fx.d, 0, 100);
    if (choice.fx.s) G.safety = clamp(G.safety + choice.fx.s, 0, 100);
  }

  G.lastAction = choice.text;
  G.history.push({ node: G.node, choice: choice.text });
  G.pendingNext = choice.next;

  // Build display card
  const displayCard = makeCard(choice, idx);
  document.getElementById('display-card-holder').innerHTML = '';
  document.getElementById('display-card-holder').appendChild(displayCard);

  // Fill consequence screen — SVG icon, not emoji
  document.getElementById('cseq-hexicon').innerHTML = resolveHexIcon(choice.cHex || '');
  document.getElementById('cseq-title').textContent    = choice.cTitle   || 'THE OUTCOME';
  document.getElementById('cseq-flavour').textContent  = choice.cFlavour || '';
  document.getElementById('cseq-delta').textContent    = choice.cDelta   || '';

  const proseEl = document.getElementById('cseq-prose');
  proseEl.textContent = '';

  showScreen('screen-consequence');

  const text = (choice.cProse || '').replace(/\[NAME\]/g, G.name);
  typewrite(text, proseEl, null);
}

function continueStory() {
  if (!G.pendingNext) return;
  const nextId = G.pendingNext;
  G.pendingNext = null;

  const next = S[nextId];
  if (!next) return;

  if (next.isEnd) {
    triggerEnding(next);
    return;
  }

  // Check if chapter changes
  const curr = S[G.node];
  const chChange = curr && next.ch && curr.ch !== next.ch;

  if (chChange) {
    showChapterSplash(next.ch, next.feel, () => {
      showScreen('screen-game');
      renderNode(nextId);
    });
  } else {
    showScreen('screen-game');
    renderNode(nextId);
  }
}


function triggerEnding(node) {
  const score = calcScore();
  const bad = node.type === 'taken';

  document.getElementById('case-stamp').textContent  = node.stamp   || 'CASE CLOSED';
  document.getElementById('case-stamp').className    = 'case-stamp ' + (bad ? 'unsolved' : '');
  document.getElementById('ending-verdict').textContent = node.verdict || 'END';
  document.getElementById('ending-verdict').className   = 'ending-verdict ' + (bad ? 'bad' : '');
  document.getElementById('ending-rule').className      = 'ending-rule ' + (bad ? 'bad' : '');
  document.getElementById('ending-sub').textContent     = node.sub   || '';
  document.getElementById('ending-prose').textContent = (node.prose || '').replace(/\[NAME\]/g, G.name);
  document.getElementById('final-score').textContent    = score;

  saveScore(node.verdict || 'END', node.type || 'unknown', score);
  showScreen('screen-ending');
}

function calcScore() {
  return Math.max(0, Math.round(G.safety * 2 - G.dread + G.history.length * 8));
}


function startTimer(seconds) {
  clearTimer();
  G.timerEnd = Date.now() + seconds * 1000;

  function tick() {
    const rem = G.timerEnd - Date.now();
    if (rem <= 0) {
      document.getElementById('timer-val').textContent = '00:00';
      document.getElementById('tf-left').style.width = '0%';
      document.getElementById('tf-right').style.width = '0%';
      // Auto-select first choice on timeout
      selectChoice(0);
      return;
    }
    const pct = (rem / (seconds * 1000)) * 100;
    const secs = Math.ceil(rem / 1000);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    document.getElementById('timer-val').textContent = `${mm}:${ss}`;
    document.getElementById('tf-left').style.width  = pct + '%';
    document.getElementById('tf-right').style.width = pct + '%';

    // Turn red at 10s
    const color = secs <= 10 ? '#ff2020' : 'var(--red)';
    document.getElementById('tf-left').style.background = color;
    document.getElementById('tf-right').style.background = color;

    G.timerRAF = requestAnimationFrame(tick);
  }
  G.timerRAF = requestAnimationFrame(tick);
}

function clearTimer() {
  if (G.timerRAF) cancelAnimationFrame(G.timerRAF);
  G.timerRAF = null;
  document.getElementById('timer-val').textContent = '00:30';
  document.getElementById('tf-left').style.width = '100%';
  document.getElementById('tf-right').style.width = '100%';
  document.getElementById('tf-left').style.background = 'var(--red)';
  document.getElementById('tf-right').style.background = 'var(--red)';
}


function saveScore(outcome, type, score) {
  try {
    const KEY = 'knock_once_v3';
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    data.unshift({ name: G.name, outcome, type, score, last: G.lastAction });
    data.splice(25);
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch(e){}
}

function showLeaderboard() {
  const tbody = document.getElementById('lb-body');
  try {
    const data = JSON.parse(localStorage.getItem('knock_once_v3') || '[]');
    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="4" class="lb-empty">No cases on file yet.</td></tr>';
    } else {
      tbody.innerHTML = data.map(r => `
        <tr>
          <td>${esc(r.name)}</td>
          <td><span class="${r.type==='survived'?'badge-survived':'badge-taken'}">${esc(r.outcome)}</span></td>
          <td>${r.score}</td>
          <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.last)}</td>
        </tr>`).join('');
    }
  } catch(e) {
    tbody.innerHTML = '<tr><td colspan="4" class="lb-empty">Archive unavailable.</td></tr>';
  }
  showScreen('screen-leaderboard');
}


const PLAYLIST = ['aud-knock','aud-ambient','aud-pad','aud-scream'];
let audIdx = 0;
let audShuffled = [];
let audCurrent = null;

function shufflePlaylist() {
  const rest = ['aud-ambient','aud-pad','aud-scream'].sort(() => Math.random()-.5);
  audShuffled = ['aud-knock', ...rest];
}

function audioStart() {
  if (G.audioOn) return; // already playing
  G.audioOn = true;
  updateAudioBtn();
  shufflePlaylist();
  audIdx = 0;
  playTrack(audShuffled[0]);
}

function audioStop() {
  G.audioOn = false;
  updateAudioBtn();
  PLAYLIST.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.pause(); el.currentTime = 0; }
  });
  audCurrent = null;
}

function playTrack(id) {
  // Stop previous
  PLAYLIST.forEach(pid => {
    if (pid !== id) {
      const el = document.getElementById(pid);
      if (el) { el.pause(); el.currentTime = 0; }
    }
  });
  const el = document.getElementById(id);
  if (!el) return;
  audCurrent = el;
  el.volume = id === 'aud-scream' ? 0.5 : 0.35;
  el.currentTime = 0;
  el.play().catch(()=>{});

  el.onended = () => {
    if (!G.audioOn) return;
    audIdx = (audIdx + 1) % audShuffled.length;
    // Re-shuffle when we've gone through full cycle
    if (audIdx === 0) shufflePlaylist();
    playTrack(audShuffled[audIdx]);
  };
}

function toggleAudio() {
  if (G.audioOn) {
    audioStop();
  } else {
    audioStart();
  }
}

function updateAudioBtn() {
  const on  = document.getElementById('ico-sound-on');
  const off = document.getElementById('ico-sound-off');
  if (!on || !off) return;
  on.style.display  = G.audioOn ? '' : 'none';
  off.style.display = G.audioOn ? 'none' : '';
  document.getElementById('audio-btn').style.opacity = G.audioOn ? '1' : '0.5';
}

// SVG icons for consequence hex (replaces all emojis)
const CSEQ_ICONS = {
  eye: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  voice:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  cup: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  door:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><path d="M3 3h18v18H3zM9 3v18"/><circle cx="14" cy="12" r="1" fill="var(--red)"/></svg>`,
  phone:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.16 6.16l.76-.76a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  cam: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><path d="M23 7 16 12l7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  bolt:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  skull:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><path d="M12 2a9 9 0 0 1 9 9c0 3.87-2.44 7.17-6 8.48V21H9v-1.52C5.44 18.17 3 14.87 3 11a9 9 0 0 1 9-9z"/><line x1="9" y1="17" x2="9" y2="21"/><line x1="15" y1="17" x2="15" y2="21"/><circle cx="9" cy="11" r="1" fill="var(--red)"/><circle cx="15" cy="11" r="1" fill="var(--red)"/></svg>`,
  run: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><circle cx="13" cy="4" r="2"/><path d="m15 9-3 3-3-3"/><path d="m9 15 3-3"/><path d="m12 12 4 4"/><path d="M9 19l-3 2"/><path d="m12 16 3 4"/></svg>`,
  key: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><circle cx="7" cy="13" r="4"/><line x1="10.5" y1="10" x2="21" y2="21"/><line x1="18" y1="13.5" x2="21" y2="10.5"/></svg>`,
  warn:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  default:`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="1.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
};

// Map old emoji cHex codes to SVG keys
function resolveHexIcon(code) {
  const map = {
    '👁':'eye','🗣':'voice','🍵':'cup','🚪':'door','📱':'phone',
    '📷':'cam','☎️':'phone','🔒':'bolt','🚨':'warn','🔪':'key',
    '🏃':'run','💡':'bolt','💬':'phone','😰':'warn','🔦':'eye',
    '⬇':'run','✊':'bolt','📞':'phone','👴':'eye','📸':'cam',
    '❓':'warn','☠':'skull','⚚':'skull','default':'default'
  };
  return CSEQ_ICONS[map[code] || 'default'] || CSEQ_ICONS.default;
}

function typewrite(text, el, cb) {
  clearTyping();
  el.textContent = '';
  let i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i];
      const ch = text[i];
      const delay = (ch === '.' || ch === '\n') ? 70 : (ch === ',' || ch === ';') ? 38 : 22;
      i++;
      G.typing = setTimeout(tick, delay);
    } else {
      G.typing = null;
      if (cb) cb();
    }
  }
  tick();
}

function clearTyping() {
  if (G.typing) clearTimeout(G.typing);
  G.typing = null;
}


function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function esc(s) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(s || ''));
  return d.innerHTML;
}


document.addEventListener('DOMContentLoaded', () => {
  // Enter on last-name field starts game
  ['playerFirst','playerLast'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') startGame(); });
  });
});
