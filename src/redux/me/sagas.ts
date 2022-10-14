import { all, takeEvery } from "redux-saga/effects";
import actions from "./actions";

export default function* root() {
  yield all([
    // takeEvery(actions.GET_USER), GET_USER),
  ])
}