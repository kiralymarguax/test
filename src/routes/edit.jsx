import "bootstrap/dist/css/bootstrap.min.css";
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from "react";
import { Button, } from "react-bootstrap";
import {
  // Form,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { updateTournament } from "../utils/utilsTournaments";

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateTournament(params.tournamentId, updates);
    return redirect(`/tournaments/${params.tournamentId}`);
}

export default function EditTournament() {
    const { tournament } =useLoaderData();
    const navigate = useNavigate();
    const [tournamentName, setTournamentName] = useState("")
    const [error, setError] = useState({})
    useState(()=>{
        const error = {}
        if (!(tournamentName.length<2)){
            error.tournamentName="Tournament name should not be more than 50"
        }
        setError(error)
    },[tournamentName])

    return (
        <div>
           <Formik
      initialValues={{
        promoType:[
          {
            bonusSpin:"",
            tournament:"",
          },
        ],
        name: '',
        code: '',
        startTime: '',
        endTime:'',
        autoOptIn:"",
        toggle: false,
        checked: [],
        operator:"",
        participant:"",
        game:"",
        Prize: [
          {
            rankingType:"",
            rankingPosition:"",
            isMonetary:"",
            prizeAmount:"",
          },
        ],
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    
    >
       <Form method="post" id="tournament-form">
        <Field>
          <option>Bonus Spin</option>
          <option>Tournament</option>
        </Field>

<h4>Tournament Set Up Form</h4>

           <Field as="select" name="PromoType">
             <option value="red">Bonus Spin</option>
             <option value="green">Tournament</option>
           </Field>

           <label htmlFor="name">Tournament Name</label>
          <Field id="name" name="name" placeholder="Tournament Name" />

          <label htmlFor="code">Tournament Code</label>
          <Field id="code" name="coe" placeholder="Tournament Code" />
          <label htmlFor="name">Tournament Start Date</label>
          <Field placeholder="Start Date/Time" aria-label="End Date/Time" type="datetime-local"name="Spin.date"/>

          <label htmlFor="name">Tournament End Date</label>
          <input placeholder="End Date/Time" aria-label="End Date/Time" type="datetime-local" name="Spin.date"/>

          <label htmlFor="name">Spin Start/End Date</label>
          <Field placeholder="Start Date/Time" aria-label="End Date/Time" type="datetime-local"name="Spin.date"/>

          <label htmlFor="name">Spin End Date</label>
          <input placeholder="End Date/Time" aria-label="End Date/Time" type="datetime-local" name="Spin.date"/>

          <label htmlFor="name">Participants</label>
          <Field id="participants" name="participants" placeholder="Participants" type="txt"/>

          <label htmlFor="name">Auto Opt In</label>
          <label>Yes <Field type="radio" name="picked" value="Yes" /></label>
            <label> No<Field type="radio" name="picked" value="No" /></label>

            <label>
            <Field type="checkbox" name="toggle" />
            {`${values.toggle}`}
          </label>

          <div id="checkbox-group">Prize Pool</div>
          <div role="group" aria-labelledby="checkbox-group">
            <label>
              <Field type="checkbox" name="checked" value="Ranking Type" />
              Ranking Type
            </label>
            <label>
              <Field type="checkbox" name="checked" value="Ranking Position" />
              Ranking Position
            </label>
            <label>
              <Field type="checkbox" name="checked" value="Is Monetary" />
              Is Monetary
            </label>
          </div>

          <button type="submit">Submit</button>
{/* <p>
<span>Tournament</span>
<input className="input-space"
  placeholder="Tournament Name"
  aria-label="Tournament name"
  type="text"
  name="name"
  value={tournamentName}
  onChange={(e)=>setTournamentName(e.target.value)}
  defaultValue={tournament.name}
/>
{error.tournamentName&&<span>{error.tournamentName}</span>}
<input
  placeholder="Tournament Code"
  aria-label="Tournament Code"
  type="text"
  name="Code"
  defaultValue={tournament.code}
/>
</p>

<label>
<span>Date</span>
<input className="input-space"
      placeholder="Start Date/Time"
      aria-label="Start Date/Time"
      type="datetime-local"
      name="startTime"
      defaultValue={tournament.date}
/>
    <input
      placeholder="End Date/Time"
      aria-label="End Date/Time"
      type="datetime-local"
      name="date"
      defaultValue={tournament.date}
    />
    
</label>
<span>Spin Date/Time</span>
<input className="input-space"
placeholder="Start Date/Time"
aria-label="End Date/Time"
type="datetime-local"
name="Spin.date"
defaultValue={tournament.date}
/>
<input
placeholder="End Date/Time"
aria-label="End Date/Time"
type="datetime-local"
name="Spin.date"
/>
<label>
<span>Operator</span>
<input
className="input-space"
placeholder="Site ID"
aria-label="Operator Name"
type="text"
name="operator" 
defaultValue={tournament.operator} 
/>

</label>
<span>Auto Opt In</span>


<span>Games</span>
<input
className="input-space"
placeholder="qualifying Games"
aria-label="Games"
type="text"
name="Game"
defaultValue={tournament.name}
/>
<p>
<span>Participants</span>
<input
className="input-space"
placeholder="Number of Participants"
aria-label="Number of Participants"/>
<input
className="input-space"
placeholder="Number of Participants"
aria-label="Number of Participants"
name="participants"
defaultValue={tournament.name}
/>

</p>
<label>
</label>
<p>
<button type="submit">Save</button>
<button 
type="button"
onClick={() =>{
  navigate(-1);
}}
>
  Cancel
  </button>
</p> */}
</Form>
    </Formik>

       
        </div>
      );
    }
    
