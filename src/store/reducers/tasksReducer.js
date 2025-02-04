const tasksInitialState = []

export const tasksReducer = (state = tasksInitialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "SET_TASKS": {
			return state = [...payload]
		}
		case "CREATE_TASK": {
			return state = [payload, ...state]
		}
		case "UPDATE_TASK": {
			return state.map(task => task.id === payload.id ? payload : task)
		}
		case "DELETE_TASK": {
			return state = state.filter(task => task.id !== payload);
		}
		default: {
			return state;
		}
	}

}