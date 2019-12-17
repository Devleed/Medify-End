// Responsible for creating actions to update state

import * as firebase from "firebase";
import _ from "lodash";

// update loading state
export const isLoading = isLoading => {
  return { type: "LOADING", payload: isLoading };
};

// update search result
export const searchFor = async term => {
  const snap = await firebase
    .database()
    .ref()
    .child("medicines")
    .once("value");
  let result = "not found";
  _.forIn(snap.val(), val => {
    _.forIn(val, (val, key) => {
      if (
        key.toLowerCase() === term.toLowerCase() ||
        val.formula.toLowerCase() === term.toLowerCase()
      ) {
        result = { name: key, ...val };
        return false;
      }
    });
  });
  return result;
};

// gets matching results from database
export const getSimilarResults = async (term = "") => {
  term = term.split("");
  const snap = await firebase
    .database()
    .ref()
    .child("medicines")
    .once("value");
  const matchedResults = [];
  _.forIn(snap.val(), val => {
    _.forIn(val, (value, key) => {
      key = key.split("");
      let formula = value.formula.split("");
      if (
        term
          .slice(0, 2)
          .join("")
          .concat(term.slice(term.length - 2, term.length).join(""))
          .toLowerCase() ===
          key
            .slice(0, 2)
            .join("")
            .concat(key.slice(key.length - 2, key.length).join(""))
            .toLowerCase() ||
        term
          .slice(0, 2)
          .join("")
          .concat(term.slice(term.length - 2, term.length).join(""))
          .toLowerCase() ===
          formula
            .slice(0, 2)
            .join("")
            .concat(formula.slice(formula.length - 2, formula.length).join(""))
            .toLowerCase()
      ) {
        matchedResults.push({ name: key.join(""), ...value });
      }
    });
  });
  console.log(matchedResults);
  return matchedResults;
};

// update single selected med
export const getSingleMed = async (type = "", med = "") => {
  const snap = await firebase
    .database()
    .ref()
    .child("medicines")
    .child(type)
    .child(med)
    .once("value");
  return { name: med, ...snap.val() };
};

export const getMeds = async (type = null, limit = 5) => {
  const snap = await firebase
    .database()
    .ref()
    .child("medicines")
    .child(type)
    .limitToFirst(limit)
    .once("value");
  return { [type]: snap.val() };
};

// update substitute meds based on formula
export const getSubstituteMeds = async (formula = null) => {
  const snap = await firebase
    .database()
    .ref()
    .child("medicines")
    .once("value");
  let result = {};
  _.forIn(snap.val(), val => {
    _.forIn(val, (val, key) => {
      if (val.formula.toLowerCase() === formula.toLowerCase()) {
        result[key] = { name: key, ...val };
      }
    });
  });
  return { ...result };
};
