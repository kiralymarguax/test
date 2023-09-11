import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getTournaments(query) {
  await fakeNetwork(`getTournaments:${query}`);
  let tournaments = await localforage.getItem("tournaments");
  if (!tournaments) tournaments = [];
  if (query) {
    tournaments = matchSorter(tournaments, query, { keys: ["first", "last"] });
  }
  return tournaments.sort(sortBy("last", "createdAt"));
}

export async function createTournament() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let tournament = { id, createdAt: Date.now() };
  let tournaments = await getTournaments();
  tournaments.unshift(tournament);
  await set(tournaments);
  return tournament;
}

export async function getTournament(id) {
  await fakeNetwork(`tournament:${id}`);
  let tournaments = await localforage.getItem("tournaments");
  let tournament = tournaments.find(tournament => tournament.id === id);
  return tournament ?? null;
}

export async function updateTournament(id, updates) {
  await fakeNetwork();
  let tournaments = await localforage.getItem("tournaments");
  let tournament = tournaments.find(tournament => tournament.id === id);
  if (!tournament) throw new Error("No tournament found for", id);
  Object.assign(tournament, updates);
  await set(tournaments);
  return tournament;
}

export async function deleteTournament(id) {
  let tournaments = await localforage.getItem("tournaments");
  let index = tournaments.findIndex(tournament => tournament.id === id);
  if (index > -1) {
    tournaments.splice(index, 1);
    await set(tournaments);
    return true;
  }
  return false;
}

function set(tournaments) {
  return localforage.setItem("tournaments", tournaments);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}