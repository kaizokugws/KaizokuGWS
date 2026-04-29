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
    id: "nfs",
    name: "Need for Speed",
    tag: "nfs",
    games: [
      "nfs-most-wanted-2005-remastered", "nfs-most-wanted-2005", 
      "nfs-most-wanted-2012"
    ],
    accentColor: "#ef4444",
  },
  {
    id: "forza",
    name: "Forza Horizon",
    tag: "forza",
    games: ["forza-horizon-5", "forza-horizon-4"],
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
    id: "uncharted",
    name: "Uncharted",
    tag: "uncharted",
    games: ["uncharted-legacy-of-thieves-collection"],
    accentColor: "#d4a017",
  },
  {
    id: "mafia",
    name: "Mafia",
    tag: "mafia",
    games: ["mafia-definitive-edition", "mafia-3-definitive-edition"],
    accentColor: "#6b4423",
  },
  {
    id: "doom",
    name: "DOOM",
    tag: "doom",
    games: ["doom-eternal"],
    accentColor: "#991b1b",
  },
];
