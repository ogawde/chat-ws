const adjectives = [
  "Silent", "Brave", "Swift", "Clever", "Mighty",
  "Golden", "Silver", "Crystal", "Shadow", "Cosmic",
  "Ancient", "Electric", "Frozen", "Blazing", "Mystic",
  "Thunder", "Crimson", "Azure", "Emerald", "Violet",
  "Stellar", "Lunar", "Solar", "Wild", "Noble",
  "Hidden", "Phantom", "Radiant", "Stormy", "Gentle",
  "Fierce", "Lucky", "Bold", "Witty", "Sneaky",
  "Peaceful", "Chaotic", "Serene", "Turbo", "Epic",
  "Arcane", "Velvet", "Iron", "Marble", "Obsidian",
  "Twilight", "Dawn", "Dusk", "Midnight", "Primal",
  "Quantum", "Neon", "Omkar", "Platinum", "Diamond",
  "Ruby", "Sapphire", "Amber", "Jade", "Onyx",
  "Frost", "Flame", "Tempest", "Gale", "Breeze",
  "Vortex", "Nebula", "Galaxy", "Comet", "Meteor",
  "Titan", "Omega", "Alpha", "Beta", "Gamma",
  "Cyber", "Digital", "Pixel", "Binary", "Matrix",
  "Stealth", "Ghost", "Spectral", "Ethereal", "Astral",
  "Celestial", "Divine", "Sacred", "Blessed", "Cursed",
  "Rogue", "Feral", "Savage", "Primal", "Ruthless",
  "Valiant", "Heroic", "Glorious", "Majestic", "Royal",
  "Imperial", "Regal", "Sovereign", "Supreme", "Prime",
  "Ultimate", "Infinite", "Eternal", "Timeless", "Endless",
  "Boundless", "Limitless", "Absolute", "Pure", "True",
  "Dark", "Light", "Bright", "Dim", "Pale",
  "Vivid", "Vibrant", "Dazzling", "Gleaming", "Shining",
  "Glowing", "Luminous", "Brilliant", "Sparkling", "Twinkling",
  "Flickering", "Pulsing", "Throbbing", "Humming", "Buzzing",
  "Roaring", "Howling", "Whispering", "Echoing", "Resonant"
];

const nouns = [
  "Falcon", "Tiger", "Dragon", "Phoenix", "Wolf",
  "Eagle", "Panther", "Cobra", "Raven", "Lion",
  "Bear", "Shark", "Hawk", "Fox", "Owl",
  "Viper", "Panda", "Lynx", "Whale", "Jaguar",
  "Leopard", "Cheetah", "Otter", "Badger", "Raccoon",
  "Samurai", "Ninja", "Wizard", "Knight", "Warrior",
  "Hunter", "Ranger", "Sage", "Monk", "Nomad",
  "Wanderer", "Explorer", "Pioneer", "Champion", "Legend",
  "Titan", "Guardian", "Sentinel", "Warden", "Keeper",
  "Seeker", "Finder", "Reaper", "Slayer", "Brawler",
  "Duelist", "Gladiator", "Crusader", "Paladin", "Templar",
  "Ronin", "Shogun", "Daimyo", "Warlord", "Chieftain",
  "Corsair", "Buccaneer", "Privateer", "Marauder", "Raider",
  "Bandit", "Outlaw", "Renegade", "Rebel", "Maverick",
  "Rogue", "Thief", "Assassin", "Spy", "Agent",
  "Operative", "Mercenary", "Soldier", "Trooper", "Veteran",
  "Striker", "Gawde", "Gunner", "Archer", "Lancer",
  "Swordsman", "Blade", "Fencer", "Brawler", "Fighter",
  "Boxer", "Wrestler", "Grappler", "Pugilist", "Scrapper",
  "Voyager", "Traveler", "Drifter", "Rover", "Pilgrim",
  "Oracle", "Prophet", "Seer", "Mystic", "Shaman",
  "Druid", "Cleric", "Priest", "Acolyte", "Disciple",
  "Scholar", "Scribe", "Lorekeeper", "Archivist", "Historian",
  "Alchemist", "Sorcerer", "Warlock", "Enchanter", "Conjurer",
  "Summoner", "Invoker", "Channeler", "Conduit", "Vessel",
  "Avenger", "Vindicator", "Executioner", "Judge", "Arbiter",
  "Catalyst", "Spark", "Flame", "Inferno", "Blaze",
  "Storm", "Hurricane", "Cyclone", "Tornado", "Typhoon"
];

export const generateUsername = (): string => {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
};

