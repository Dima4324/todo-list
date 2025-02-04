import { ACTIONS_TYPE } from "./actionsType"
import { endpoints } from "../../api/config";

export const setTasks = () => {
	return async (dispatch) => {
		dispatch({
			type: ACTIONS_TYPE.SET_IS_LOADING,
			payload: true
		})
		try {
			const response = await fetch(endpoints.todos);
			const data = await response.json();
			const dataSort = data.sort((a, b) => b.id - a.id);
			dispatch({
				type: ACTIONS_TYPE.SET_TASKS,
				payload: dataSort
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
