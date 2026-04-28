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
    games: ["elden-ring", "sekiro", "dark-souls-3", "nioh-2", "wo-long"],
    accentColor: "#b04a2f",
  },
  {
    id: "gta",
    name: "Grand Theft Auto",
    tag: "gta",
    games: ["gta-5-enhanced", "gta-v", "gta-4", "gta-san-andreas", "gta-vice-city"],
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
];
