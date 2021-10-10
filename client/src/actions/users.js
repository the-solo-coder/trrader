import {UPDATE} from '../constants/actionTypes'
import * as api from "../api";

export const updateUser = (id, user) => async (dispatch) => {
    try {
      const {data} = await api.updateUser(id, user);
      dispatch({ type: UPDATE, payload: data });
    } catch (err) {
      console.log(err);
    }
  }