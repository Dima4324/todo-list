const initialState = {
	currentPlayer: 'X',
	isGameEnded: false,
	isDraw: false,
	field: ['', '', '', '', '', '', '', '', ''],
}

export const appReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "SET_USER":
			return {
				...state,
				currentPlayer: payload
			};
		case "SET_WINNER":
			return {
				...state,
				isGameEnded: payload,
			}
		case "SET_GAME_ENDED":
			return {
				...state,
				isGameEnded: payload
			};
		case "SET_IS_DRAW":
			return {
				...state,
				isDraw: payload
			}
		case "SET_FIELD":
			return {
				...state,
				field: payload
			}
		case "RESET_FIELD":
			return {
				...state,
				...initialState
			}
		default:
			return state;
	}
}