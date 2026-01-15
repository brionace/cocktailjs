const GLASS_MAP = {
  AbsintheGlass: { key: "AbsintheGlass", display: "Absinthe" },
  BrandySnifterGlass: { key: "BrandySnifterGlass", display: "Brandy Snifter" },
  CollinsGlass: { key: "CollinsGlass", display: "Collins" },
  CopperMug: { key: "CopperMug", display: "Copper Mug" },
  CordialGlass: { key: "CordialGlass", display: "Cordial" },
  CoupeGlass: { key: "CoupeGlass", display: "Coupe" },
  DemitasseGlass: { key: "DemitasseGlass", display: "Demitasse" },
  FizzGlass: { key: "FizzGlass", display: "Fizz" },
  FluteGlass: { key: "FluteGlass", display: "Flute" },
  GobletGlass: { key: "GobletGlass", display: "Goblet" },
  Highball: { key: "Highball", display: "Highball" },
  HurricaneGlass: { key: "HurricaneGlass", display: "Hurricane" },
  IrishCoffeeGlass: { key: "IrishCoffeeGlass", display: "Irish Coffee" },
  JulepCup: { key: "JulepCup", display: "Julep Cup" },
  MargaritaGlass: { key: "MargaritaGlass", display: "Margarita" },
  MartiniGlass: { key: "MartiniGlass", display: "Martini" },
  NickAndNoraGlass: { key: "NickAndNoraGlass", display: "Nick & Nora" },
  ParfaitGlass: { key: "ParfaitGlass", display: "Parfait" },
  PilsnerGlass: { key: "PilsnerGlass", display: "Pilsner" },
  PintGlass: { key: "PintGlass", display: "Pint" },
  PousseCafeGlass: { key: "PousseCafeGlass", display: "Pousse-Cafe" },
  PunchGlass: { key: "PunchGlass", display: "Punch" },
  RocksGlass: { key: "RocksGlass", display: "Rocks" },
  ShotGlass: { key: "ShotGlass", display: "Shot" },
  SlingGlass: { key: "SlingGlass", display: "Sling" },
  SnifterGlass: { key: "SnifterGlass", display: "Snifter" },
  SourGlass: { key: "SourGlass", display: "Sour" },
  TankardGlass: { key: "TankardGlass", display: "Tankard" },
  TikiGlass: { key: "TikiGlass", display: "Tiki" },
  ToddyGlass: { key: "ToddyGlass", display: "Toddy" },
  WineGlass: { key: "WineGlass", display: "Wine" },
  Goblet: { key: "Goblet", display: "Goblet" },
  // fallback
  Unknown: { key: "Unknown", display: "Unknown" },
};

export function normalizeGlass(name) {
  if (!name) return "Unknown";
  const found = Object.keys(GLASS_MAP).find(
    (k) => k.toLowerCase() === String(name).toLowerCase()
  );
  return found || "Unknown";
}

export function listAvailableGlasses() {
  return Object.keys(GLASS_MAP);
}

// Garnish helpers
const GARNISH_MAP = {
  Basil: "Basil",
  Blackberry: "Blackberry",
  Cherry: "Cherry",
  Cinnamon: "Cinnamon",
  CucumberSlice: "CucumberSlice",
  EdibleFlower: "EdibleFlower",
  LemonSlice: "LemonSlice",
  LemonTwist: "LemonTwist",
  LimeSlice: "LimeSlice",
  LimeWedge: "LimeWedge",
  MintSprig: "MintSprig",
  Olive: "Olive",
  OrangeSlice: "OrangeSlice",
  OrangeTwist: "OrangeTwist",
  Peppercorn: "Peppercorn",
  PineappleSlice: "PineappleSlice",
  PineappleWedge: "PineappleWedge",
  Raspberry: "Raspberry",
  Rosemary: "Rosemary",
  Strawberry: "Strawberry",
  Umbrella: "Umbrella",
};

export function normalizeGarnish(name) {
  if (!name) return null;
  const found = Object.keys(GARNISH_MAP).find(
    (k) => k.toLowerCase() === String(name).toLowerCase()
  );
  return found || null;
}

export function listAvailableGarnishes() {
  return Object.keys(GARNISH_MAP);
}
