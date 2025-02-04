const taskInitialState = {
	id: null,
	title: "",
}

export const taskReducer = (state = taskInitialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "SET_TASK": {
			return {
				...state,
				...payload
			}
		}
		default: {
			return state;
		}
	}
}