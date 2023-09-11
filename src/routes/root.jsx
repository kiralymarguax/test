import {
  Form,
  Link,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { createTournament, getTournaments } from "../utils/utilsTournaments";

export async function action() {
    const tournament = await createTournament();
    return { tournament };
  }

export async function loader() {
    const tournaments = await getTournaments();
    return { tournaments };
  }
export default function Root() {
    const { tournaments } = useLoaderData();
    return (
      <>
        <div id="sidebar">
          <h1>React Router Tournaments</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search tournaments"
                placeholder="Search"
                type="search"
                name="q"
              />
              
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
          {tournaments.length ? (
            <ul>
              {tournaments.map((tournament) => (
                <li key={tournament.id}>
                  <Link to={`tournaments/${tournament.id}`}>
                    {tournament.first || tournament.last ? (
                      <>
                        {tournament.first} {tournament.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {tournament.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No tournaments</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"></div>
        <Outlet />
      </>
    );
  }
  