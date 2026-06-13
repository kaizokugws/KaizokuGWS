export interface Franchise {
  id: string;
  name: string;
  tag: string;
  games: string[];
  accentColor: string;
}

export const franchises: Franchise[] = [
  {
    id: "assassins-creed",
    name: "Assassin's Creed",
    tag: "assassins-creed",
    games: [
      "ac-mirage", "ac-valhalla", "ac-odyssey", "ac-origins",
      "ac-syndicate", "ac-unity", "ac-4-black-flag", "ac-rogue",
      "ac-3", "ac-revelations", "ac-brotherhood", "ac-2", "ac-1"
    ],
    accentColor: "#c8a84b",
  },
  {
    id: "fromsoftware",
    name: "FromSoftware",
    tag: "fromsoftware",
    games: [
      "elden-ring",
      "elden-ring-nightreign",
      "sekiro",
      "dark-souls-3",
      "dark-souls-remastered",
      "dark-souls-2-scholar-of-the-first-sin",
    ],
    accentColor: "#b04a2f",
  },
  {
    id: "rockstar",
    name: "Rockstar Games",
    tag: "rockstar",
    games: [
      "rdr2",
      "gta-5-enhanced",
      "gta-v",
      "gta-4",
      "gta-san-andreas",
      "gta-vice-city",
    ],
    accentColor: "#f97316",
  },
  {
    id: "silent-hill",
    name: "Silent Hill",
    tag: "silent-hill",
    games: ["silent-hill-2-remake", "silent-hill-f", "silent-hill-homecoming"],
    accentColor: "#7c3aed",
  },
  {
    id: "tomb-raider",
    name: "Tomb Raider",
    tag: "tomb-raider",
    games: [
      "shadow-of-the-tomb-raider", "rise-of-the-tomb-raider", "tomb-raider-goty"
    ],
    accentColor: "#16a34a",
  },
  {
    id: "watch-dogs",
    name: "Watch Dogs",
    tag: "watch-dogs",
    games: ["watch-dogs-legion", "watch-dogs-2", "watch-dogs"],
    accentColor: "#0ea5e9",
  },
  {
    id: "far-cry",
    name: "Far Cry",
    tag: "far-cry",
    games: ["far-cry-6", "far-cry-5", "far-cry-3"],
    accentColor: "#eab308",
  },
  {
    id: "horizon",
    name: "Horizon",
    tag: "horizon",
    games: ["horizon-forbidden-west", "horizon-zero-dawn"],
    accentColor: "#06b6d4",
  },
  {
    id: "forza",
    name: "Forza Horizon",
    tag: "forza",
    games: ["forza-horizon-6", "forza-horizon-5", "forza-horizon-4", "forza-horizon-3", "forza-motorsport", "forza-motorsport-7"],
    accentColor: "#3b82f6",
  },
  {
    id: "spider-man",
    name: "Spider-Man",
    tag: "spider-man",
    games: [
      "spider-man-remastered",
      "spider-man-miles-morales",
      "spider-man-2",
      "the-amazing-spider-man",
      "the-amazing-spider-man-2",
    ],
    accentColor: "#dc2626",
  },
  {
    id: "mafia",
    name: "Mafia",
    tag: "mafia",
    games: ["mafia-definitive-edition", "mafia-2-definitive-edition", "mafia-3-definitive-edition"],
    accentColor: "#6b4423",
  },
  {
    id: "doom",
    name: "DOOM",
    tag: "doom",
    games: ["doom-eternal"],
    accentColor: "#991b1b",
  },
  {
    id: "resident-evil",
    name: "Resident Evil",
    tag: "resident-evil",
    games: [
      "resident-evil-2-remake", "resident-evil-3-remake", "resident-evil-4-remake",
      "resident-evil-5", "resident-evil-6", "resident-evil-7-biohazard",
      "resident-evil-8-village", "resident-evil-hd-remaster", "re0-hd-remaster"
    ],
    accentColor: "#8b0000",
  },
  {
    id: "dying-light",
    name: "Dying Light",
    tag: "dying-light",
    games: [
      "dying-light-2015", "dying-light-2", "dying-light-the-following",
      "dying-light-the-beast", "dying-light-definitive-edition"
    ],
    accentColor: "#f59e0b",
  },
  {
    id: "star-wars",
    name: "Star Wars",
    tag: "star-wars",
    games: [
      "star-wars-jedi-fallen-order", "star-wars-jedi-survivor",
      "star-wars-battlefront", "star-wars-battlefront-ii",
      "star-wars-battlefront-classic-collection", "star-wars-battlefront-2-classic",
      "star-wars-dark-forces", "star-wars-bounty-hunter",
      "star-wars-jedi-power-battles", "star-wars-squadrons",
      "lego-star-wars-skywalker-saga"
    ],
    accentColor: "#ffd700",
  },
  {
    id: "batman",
    name: "Batman",
    tag: "batman",
    games: ["batman-arkham-asylum", "batman-arkham-city", "batman-arkham-knight", "batman-arkham-origins", "batman-the-enemy-within", "gotham-knights"],
    accentColor: "#fbbf24",
  },
  {
    id: "god-of-war",
    name: "God of War",
    tag: "god-of-war",
    games: ["god-of-war-2018", "god-of-war-ragnarok"],
    accentColor: "#0ea5e9",
  },
  {
    id: "final-fantasy",
    name: "Final Fantasy",
    tag: "final-fantasy",
    games: ["final-fantasy-xvi", "final-fantasy-xv", "final-fantasy-pixel-remaster"],
    accentColor: "#6b21a8",
  },
  {
    id: "nfs",
    name: "Need for Speed",
    tag: "nfs",
    games: [
      "nfs-heat", "nfs-rivals", "nfs-carbon-remastered",
      "nfs-most-wanted-2005-remastered", "nfs-most-wanted-2005",
      "nfs-most-wanted-2012", "nfs-hot-pursuit-remastered", "nfs-payback", "nfs-the-run", "nfs-undercover", "nfs-undercover-remastered"
    ],
    accentColor: "#ef4444",
  },
  {
    id: "alan-wake",
    name: "Alan Wake",
    tag: "alan-wake",
    games: ["alan-wake-2", "alan-wake-remastered", "alan-wake", "alan-wakes-american-nightmare"],
    accentColor: "#f97316",
  },
  {
    id: "ninja-gaiden",
    name: "Ninja Gaiden",
    tag: "ninja-gaiden",
    games: ["ninja-gaiden-4", "ninja-gaiden-2-black", "ninja-gaiden-master-collection", "ninja-gaiden-ragebound"],
    accentColor: "#22c55e",
  },
  {
    id: "vampire-masquerade",
    name: "Vampire: The Masquerade",
    tag: "vampire",
    games: ["vampire-bloodlines-2", "vampire-bloodlines"],
    accentColor: "#dc2626",
  },
  {
    id: "dark-pictures",
    name: "The Dark Pictures Anthology",
    tag: "dark-pictures",
    games: ["man-of-medan", "the-devil-in-me"],
    accentColor: "#7c3aed",
  },
  {
    id: "death-stranding",
    name: "Death Stranding",
    tag: "death-stranding",
    games: ["death-stranding", "death-stranding-2"],
    accentColor: "#4FD1FF",
  },
];
