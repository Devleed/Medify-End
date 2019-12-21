export default (state = [], action) => {
  switch (action.type) {
    case "MED_NAMES":
      return action.payload;
    default:
      return state; 
  }
};
