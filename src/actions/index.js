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