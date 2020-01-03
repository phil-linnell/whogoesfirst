import getRandom from "../utils/getRandom";

function generateTeams() {
  const players = ["dom", "kelv", "kitt", "phil"];
  const factions = ["thegn", "housecarl", "norse", "berserker"];
  let results = [];

  players.map(name => {
    const faction = getRandom(factions);
    results.push({ name, faction });
    const index = factions.indexOf(faction);
    if (index > -1) {
      factions.splice(index, 1);
    }
  });
  return results;
}
