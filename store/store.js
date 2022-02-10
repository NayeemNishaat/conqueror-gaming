import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export default function useStore(shouldListen = true) {
	const setState = useState()[1];

	const dispatch = function (actionType, payload) {
		const newState = actions[actionType](globalState, payload);
		globalState = { ...globalState, ...newState };

		for (const listener of listeners) {
			listener(globalState);
		}
	};

	useEffect(() => {
		if (shouldListen) listeners.push(setState);

		return () => {
			if (shouldListen)
				listeners.filter((listener) => listener !== setState);
		};
	}, [setState, shouldListen]);

	return [globalState, dispatch];
}

export const initStore = function (userActions, initialState) {
	if (initialState) globalState = { ...globalState, ...initialState };

	actions = { ...actions, ...userActions };
};
