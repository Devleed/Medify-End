export default (med = null, action) => {
  switch (action.type) {
    case "GET_MED":
      return action.payload;
    default:
      return med;
  }
};
