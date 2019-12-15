export default (result = null, action) => {
  switch (action.type) {
    case "SEARCH_RESULT":
      return action.payload;
    default:
      return result;
  }
};
