
import { 
  Form, 
  useLoaderData,
  useFetcher,
 } from "react-router-dom";
import { getTournament } from "../utils/utilsTournaments";

export async function loader({ params }) {
  const tournament = await getTournament(params.tournamentId);
  return { tournament };
}


export default function Tournament() {
  console.log(useLoaderData())
    const { tournament:userTournament } = useLoaderData();
  const tournament = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div id="tournament">
      <div>
        <img
          key={tournament.avatar}
          src={tournament.avatar || null}
        />
      </div>

      <div>
        <h1>
          {tournament.first || tournament.last ? (
            <>
              {tournament.first} {tournament.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite tournament={tournament} />
        </h1>

        {tournament.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${tournament.twitter}`} rel="noreferrer"
            >
              {tournament.twitter}
            </a>
          </p>
        )}

        {tournament.notes && <p>{tournament.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
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
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ tournament }) {
  // yes, this is a `let` for later
  let favorite = tournament.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
