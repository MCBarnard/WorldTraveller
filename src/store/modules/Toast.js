const Toast = {
    state: {
        toast: {
            // busy, error, success and hidden
            toastState: "busy",
        }
    },
    getters: {
        toastState: state => state.toast.toastState,
    },
    mutations: {
        SET_TOAST_STATE (state, data) {
            state.toast.toastState = data;
        },
    },
    actions: {
        ACTION_SET_TOAST_STATE ({ commit }, data) {
            commit("SET_TOAST_STATE", data);
        },
    }
};

export default Toast;