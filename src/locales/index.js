import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// resources
import persianLocales from "./persian/translation";

const resources = {
	fa: {
		qrPayment: persianLocales,
	},

};

i18n.use(initReactI18next)
	.init({
		resources,
		ns: ["qrPayment"],

		defaultNS: "qrPayment",
		lng: "fa",
		fallbackLng: "fa", // use fa if detected lng is not available
	
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n;


// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// console.log("18888")
// i18n.use(initReactI18next)
//   .init({
// 	lng: "fa",
//     fallbackLng: 'fa',
//     debug: true,

//     interpolation: {
//       escapeValue: false, 
//     },
//   });

// export default i18n;