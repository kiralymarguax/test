import PropTypes from 'prop-types';
import { 
  Form, 
  useLoaderData,
  useFetcher,
 } from "react-router-dom";
import { getTournament, updateTournament } from "../tournaments";

export async function action({ request, params}) {
  let formData = await request.formData();
  return updateTournament(params.tournamentId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }) {
 if (params.tournamentId === undefined) {
  return { 
    tournament:{
      name: 'tournament name',
      code:  'tournament code',
      Participants: 'tournament participants',
      Brand: 'Site ID',
      Active: true,
      start: Date,
      end: Date,
    }, 
  }
}
 const tournament = await getTournament(params.tournamentId);
 if (!tournament){
  throw new Response("", {
    status: 404,
    statusText: "Not Found"
    });
 }
 return { 
  tournament
 };
}

export default function Tournament(){ {
  const { tournament } = useLoaderData()

  return (

    <div id="tournament">
      <div>
        <img
          key={tournament.Participants}
          src={tournament.Participants || null}
        />
      </div>

      <div>
        <h1>
          {tournament.name || tournament.code ? (
            <>
              {tournament.name} {tournament.code}
            </>
          ) : (
            <i>Tournament Set Up</i>
          )}{" "}
          <Active tournament={tournament} />
        </h1>

        {tournament.operator && (
          <p>

              {tournament.operator}
          
          </p>
        )}
       {tournament.start && tournament.end && (
        <p>
          {tournament.start} - {tournament.end}
        </p>
       )}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
          className=''  
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Submit</button>

          </Form>
        </div>
      </div>
    </div>
  );
   }
}

function Active({ tournament }) {
  const fetcher = useFetcher();
  let active = tournament.active;
  if (fetcher.formData) {
    active = fetcher.formData.get("active") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={active ? "false" : "true"}
        aria-label={
          active
            ? "Remove from actives"
            : "Add to actives"
        }

      >

        {active ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );

}
Active.propTypes = {

  tournament: PropTypes.object,
}