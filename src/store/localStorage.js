export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const stateToSave = {};
        stateToSave.services = state.services;
        stateToSave.ui = state.ui;

        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem("state", serializedState);
    } catch (err) {
        console.error(err);
    }
};
