import { ACTIONS_TYPE } from "./actionsType"

export const updateTask = (endpoint, data) => {
	return async (dispatch) => {
		dispatch({
			type: ACTIONS_TYPE.SET_IS_LOADING,
			payload: true
		})
		try {
			const response = await fetch(`${endpoint}/${data.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			})
			const jsonData = await response.json();
			dispatch({ type: ACTIONS_TYPE.UPDATE_TASK, payload: jsonData})
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