import { useState, useEffect } from "react";

const globalState = {};
const listeners = [];
const actions = {};

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

const initStore = function (userActions, initialState) {
	if (initialState) globalState = { ...globalState, ...initialState };

	actions = { ...actions, userActions };
};
