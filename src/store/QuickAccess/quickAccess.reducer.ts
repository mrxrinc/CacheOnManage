import {
	QUICKACCESS_ROOT_PAGE,
	QUICKACCESS_OPERATORNAME,
	QUICKACCESS_CHILDPHONE,
	SAGAS_BILLPAYMNET,
	BILLPAYMENT,
	QUICKACCESS_MOBILETOPUP,
	QUICKACCESS_SAGAS_MOBILETOPUP,
} from "./quickAccess.constants";
const INSTIAL_STATE = {
	rootPage: "mnp",
	operatorName: "",
	childPhone: "",
	paymentResult: {
		data: {},
		hasError: false,
	},
};
export default (state = INSTIAL_STATE, action: any) => {
	switch (action.type) {
		case QUICKACCESS_ROOT_PAGE:
			return { ...state, rootPage: action.payload };
		case QUICKACCESS_OPERATORNAME:
			return { ...state, operatorName: action.payload };
		case QUICKACCESS_CHILDPHONE:
			return { ...state, childPhone: action.payload };
		case QUICKACCESS_CHILDPHONE:
			return { ...state, childPhone: action.payload };
		case BILLPAYMENT:
			return { ...state, paymentResult: action.payload };

		case QUICKACCESS_MOBILETOPUP:
			return { ...state, paymentResult: action.payload };
		default:
			return state;
	}
};
