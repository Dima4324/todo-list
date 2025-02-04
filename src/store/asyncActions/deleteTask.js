import { ACTIONS_TYPE } from "./actionsType"
export const deleteTask = (endpoint, id) => {
	return async (dispatch) => {
		dispatch({
			type: ACTIONS_TYPE.SET_IS_LOADING,
			payload: true
		})
		try {
			await fetch(`${endpoint}/${id}`, {
				method: "DELETE"
			})
			dispatch({ type: ACTIONS_TYPE.DELETE_TASK, payload: id })

		} catch (err) {
			console.error(err)
		} finally {
			dispatch({
				type: ACTIONS_TYPE.SET_IS_LOADING,
				payload: false
			})
		}
	}
}