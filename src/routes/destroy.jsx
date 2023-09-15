import { redirect } from "react-router-dom";
import { deleteTournament } from "../utils/utilsTournaments";

export async function action({ params }) {
    throw new Error("oh dang");
    await deleteTournament(params.tournamentId);
    return redirect("/");
}