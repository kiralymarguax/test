//Types
const ADD_TOURNAMENT = "ADD_TOURNAMENT"
const DELETE_TOURNAMENT = "DELETE_TOURNAMENT"
//actions
export const addTournament = tournament => ({
    type: ADD_TOURNAMENT,
    payload: tournament
})

export const deleteTournament = tournamentId => ({
    type: DELETE_TOURNAMENT,
    payload: tournamentId
})
//initial state
const initialState = {tournament:{}}
let id=1
//reducer 
const tournamentReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TOURNAMENT :
            const newTournament= {...action.payload, id}
            return{...state, tournament:{newTournament.id, newTournament}}
        case DELETE_TOURNAMENT : return state
        default: return state
    }
}
export default tournamentReducer;