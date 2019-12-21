import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import isLoading from "./isLoading";
import getTypeMeds from "./getTypeMeds";
import getMed from "./getMed";
import getSearchResults from "./getSearchResult";
import getSubstitute from "./getSubstitute";
import medNames from "./allMedNames";

export default combineReducers({
  form: formReducer,
  isLoading,
  typeMedicines: getTypeMeds,
  selectedMed: getMed,
  searchResult: getSearchResults,
  formulaMeds: getSubstitute,
  medNames
});
