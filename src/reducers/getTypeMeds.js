export default (state = {}, action) => {
  switch (action.type) {
    case "GET_MEDS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
