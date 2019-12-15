export default (result = {}, action) => {
  switch (action.type) {
    case "SUBSTITUE_MEDS":
      return { ...action.payload };
    default:
      return result;
  }
};
