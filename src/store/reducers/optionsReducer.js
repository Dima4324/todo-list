const optionsInitialState = {
	valueInput: "",
	isSorted: false,
	isLoading: false
}

export const optionsReducer = (state = optionsInitialState, action) => {
	const { type, payload } = action

	switch (type) {
		case "SET_LOADING": {
			return {
				...state,
				loading: true
			}
		}
		case "SET_VALUE_INPUT": {
			return {
				...state,
				valueInput: payload
			}
		}
		case "SET_IS_LOADING": {
			return {
				...state,
				isLoading: payload
			}
		}
		case "SET_IS_SORTED": {
			return {
				...state,
				isSorted: payload
			}
		}
		default: {
			return state;
		}
	}
}