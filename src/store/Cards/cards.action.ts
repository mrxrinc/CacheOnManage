import * as types from "./cards.constants";
import { Action } from "../../store/index.reducer";

class Actions {
  public callCardInfo(status: string): Action<string> {
    return {
      type: types.CALLCARTINFO,
      payload: status,
    };
  }
}
const CardsActions = new Actions();

export default CardsActions;
