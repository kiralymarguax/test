import{redirect}from "react-router-dom";
import { deleteTournament } from "../tournaments";

export async function action({ params }) {
    throw new Error("oh dang");
    await deleteTournament(params.tournamentId);
    return redirect("/");
}