export default (isLoading = false, action) => {
  if (action.type === "LOADING") return action.payload;
  return isLoading;
};
