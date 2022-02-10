import { initStore } from "./store";

const configureProductStore = function () {
	const actions = {
		setProduct: (state, payload) => ({ ...state, ...payload })
	};

	initStore(actions, {});
};

export default configureProductStore;
