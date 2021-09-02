import {UPDATE} from '../constants/actionTypes'
import * as api from "../api";

export const updateAlert = (alert) => async (dispatch) => {
    try {
      const {data} = await api.upDateAlert(alert);
      dispatch({ type: UPDATE, payload: data });
    } catch (err) {
      console.log(err);
    }
  }