import { combineReducers } from "redux";
// Reducers
import user from "./User/user.reducer";
import saving from "./Saving/saving.reducer";
import home from "./Home/home.reducer";
import earning from "./Earning/earning.reducer";
import qrPayment from "./QRPayment/qrPayment.reducer";
import mobileTopUp from "./MobileTopUp/mobileTopUp.reducer";
import quickAccess from "./QuickAccess/quickAccess.reducer";
import cards from "./Cards/cards.reducer";
import invoice from "./Invoice/invoice.reducer";
import transferMoney from "./TransferMoney/transferMoney.reducer";

export interface StateNetwork {
  user: any;
  saving: any;
  home: any;
  earning: any;
  qrPayment: any;
  mobileTopUp: any;
  quickAccess: any;
  cards: any;
  invoice: any;
  transferMoney: any;
}

export interface Action<P = any> {
  type: string;
  payload?: P;
}

// Combine all reducers together to control by redux reducers observer.
const rootReducer = combineReducers({
  user,
  saving,
  home,
  earning,
  qrPayment,
  mobileTopUp,
  quickAccess,
  cards,
  invoice,
  transferMoney,
});
export default rootReducer;
