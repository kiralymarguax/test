import { useEffect } from "react";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { createTournament, getTournaments } from "../utils/utilsTournaments";


export async function action() {
    const tournament = await createTournament();
    return redirect(`/tournaments/${tournament.id}/edit`);
  }

export async function loader({request}) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
    const tournaments = await getTournaments(q);
    return { tournaments, q };
  }
  
export default function Root() {
  const { tournaments, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = 
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
    return (
      <>
        <div id="sidebar">
          <h1>Tournaments</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search tournaments"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) =>{
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
          {tournaments.length ? (
            <ul>
              {tournaments.map((tournament) => (
                <li key={tournament.id}>
                  <NavLink
                    to={`tournaments/${tournament.id}`}
                    className={({ isActive, isPending }) =>
                     `${isActive
                      ? "active" : ""
                    } 
                    ${isPending? 
                      "pending" : ""}
                      `}
                    >
                      <Link to={`tournaments/${tournament.id}`}>
                    {tournament.name || tournament.code ? (
                      <>
                        {tournament.name} {tournament.code}
                      </>
                    ) : (
                      <i>No Tournament</i>
                    )}{" "}
                    {tournament.favorite && <span>★</span>}
                  </Link>
                  </NavLink>
                  {/* <a href="#" onClick={()=>handleClick(tournament)}> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Tournaments</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
        ></div>
        <Outlet />
      </>
    );
  }
  