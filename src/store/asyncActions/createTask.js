import { ACTIONS_TYPE } from "./actionsType"
export const createTask = (endpoint, data) => {
	return async (dispatch) => {
		dispatch({
			type: ACTIONS_TYPE.SET_IS_LOADING,
			payload: true
		})
		try {
			const response = await fetch(`${endpoint}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			})

			const jsonData = await response.json()

			if (!response.ok) {
				throw new Error("Произошла ошибка")
			}
			dispatch({
				type: ACTIONS_TYPE.CREATE_TASK,
				payload: jsonData,
			})
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