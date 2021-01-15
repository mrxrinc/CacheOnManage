import axios from "axios";
import { BASE_URL } from "config";
import AsyncStorage from "@react-native-community/async-storage";
import { TransferMoney } from "constants/types";
const qs = require("qs");
var FormData = require("form-data");

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
AsyncStorage.getItem("token").then((token) => {
  instance.defaults.headers.authorization = `Bearer ${token}`;
});

export const sendVerifyCode = (phone: any, nationalCode: any) =>
  instance.post(
    "/api/v1/onboarding/otp",
    { mobile: phone, nationalCode: nationalCode },
    {
      headers: {
        authorization: null,
      },
    }
  );

export const checkVerifyCode = (phone: any, verifyCode: any) =>
  instance.post(
    "/api/v1/onboarding/verify-otp",
    { mobile: phone, otp: verifyCode },
    {
      headers: {
        authorization: null,
        client_id: "bhVxQSbv4iaY7Vf3jNHs4vLOt8Ea",
        client_secret: "3PUOsWx0kxH6dkblLc0o7CPloTga",
      },
    }
  );
export const login = (userName: any, password: any, isChild: boolean) =>
  instance.post(
    "/api/v1/users/login",
    {
      username: userName,
      password: password,
      child: isChild,
    },
    {
      headers: {
        authorization: null,
      },
    }
  );

export const dateOfBirth = (token: any, birthDate: any) =>
  instance.post(
    "/api/v1/onboarding/civil",
    { dob: birthDate },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const nationalIdSerial = (token: any, serialId: any) =>
  instance.post(
    "/api/v1/onboarding/civil-image",
    { nIdSerial: serialId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const setAddress = (token: any, postalCode: any, telephone: any) =>
  instance.post(
    "/api/v1/onboarding/address",
    {
      postalCode: postalCode,
      telephone: telephone,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const register = (token: any, data: any) =>
  instance.put("/api/v1/onboarding/password", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const uploadImg = (
  token: any,
  faceImg: any,
  backImg: any,
  frontImg: any
) =>
  instance.post(
    "/api/v1/onboarding/document",
    {
      selfie: faceImg,
      back: backImg,
      front: frontImg,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const getHomePageData = async (token: string) => {
  const profileResponse = await instance.get(
    `${BASE_URL}/api/v1/users/profile`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const cardsResponse = await instance.get(`${BASE_URL}/api/v1/users/home`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return {
    cards: cardsResponse.data,
    header: profileResponse.data,
  };
};

export const chargingPayments = (
  token: string,
  childId: number,
  paymentMethods: any
) =>
  instance.put(
    "/api/v1/charging-payment/settings",
    { childId, paymentMethods },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

type TopUpType = {
  sourcePan: string;
  amount: number;
  cvv2: number;
  expirationDate: string;
  password: string;
  dynamicPassword: string;
  userId: string;
};

export const topUp = (token: string, data: TopUpType) =>
  instance.post(`/api/v1/accounts/topup`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const harim = (token: string, sourcePan: any, amount: any) =>
  instance.post(
    "/api/v1/accounts/harim",
    {
      sourcePan: sourcePan,
      amount: amount,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const getLivenessText = (token: any) =>
  instance.get("/api/v1/onboarding/liveness", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const winkImg = (token: any, image: any) =>
  instance.post(
    "/api/v1/onboarding/liveness",
    {
      picture: "data:image/jpg;base64," + image,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const postOfficeInqury = (
  token: string,
  nid: string,
  birthDate: string
) =>
  instance.post(
    "/api/v1/common/inquiry",
    {
      nid,
      birthDate,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const addressInqury = (token: string, postalCode: string) =>
  instance.post(
    "/api/v1/common/inquiryAddress",
    {
      postalCode,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const addChild = (token: string, data: any) =>
  instance.post("/api/v1/users/add-child", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

// export const transferMoney = (token: string, data: TransferMoney) => {
//   return instance.post("/api/v1/accounts/transfer", data, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

export const getInvoice = (token: string) => {
  return instance.get("/api/v1/accounts/invoice", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getDebit = (token: string, id: any) => {
  return instance.get(`/api/v1/accounts/invoice/child/${id}/debit`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
export const getChildInfo = (token: any) =>
  instance.get("/api/v1/earnings/info", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
export const getDefaultTask = (token: any) =>
  instance.get("/api/v1/earnings/task/default", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
export const addAllowance = (token: string, data: any) =>
  instance.post("/api/v1/earnings/allowance", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const addNewTask = (token: string, data: any) =>
  instance.post("/api/v1/earnings/task", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const confirmTask = (token: string, data: any) =>
  instance.post("/api/v1/earnings/task/status", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const getSettingData = (token: any) =>
  instance.get("/api/v1/settings/info", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const setSettingData = (token: any, data: any) =>
  instance.put(
    "/api/v1/settings",
    {
      ...data,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const setChildrenSettingData = (token: any, data: any) =>
  instance.put(
    `/api/v1/settings/child/${data.id}`,
    {
      ...data,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export const setChildrenChangePassword = (token: any, data: any) =>
  instance.put(
    `/api/v1/settings/${data.id}/change-password`,
    {
      ...data,
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
export const signout = (token: any) =>
  instance.post(`/api/v1/users/logout`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const deleteChildTask = (token: string, childId: any) =>
  instance.delete(`/api/v1/earnings/task/${childId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const childStatusTask = (token: string, data: any) =>
  instance.post("/api/v1/earnings/task/status", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const childEditTask = (token: string, data: any, id: any) =>
  instance.put("/api/v1/earnings/task", data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

// export const getSavingInfo = (token: string) =>
//   instance.get("/api/v1/savings", {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
export const getChildHomeData = (token: string, childId: any) =>
  instance.get(`/api/v1/users/child-home/${childId ? childId : ""}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

// export const addTarget = (token: string, data: any) =>
//   instance.post(`/api/v1/savings`, data, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });

// export const transferMoneyToTarget = (token: string, data: any) =>
//   instance.post(`/api/v1/savings/transfer`, data, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });

// export const deleteTarget = (token: string, id: any) =>
//   instance.delete(`/api/v1/savings/${id}`, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });

// export const updateTarget = (token: string, id: number) =>
//   instance.put(`/api/v1/savings`, id, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });

// export const finishTarget = (token: string, id: number) =>
//   instance.post(`/api/v1/savings/${id}`, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });

// export const qrInquiry = (data: string) =>
//   instance.post(`api/v1/charging-payment/qr-inquiry`, data);

// export const qrPayment = (data: string) =>
//   instance.post(`api/v1/charging-payment/qr-payment`, data);

export const mobileTopUpPayment = (token: string, data: any) =>
  instance.post(`/api/v1/charging-payment/mobile-topup`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const getInternetPackages = (data: any) =>
  instance.post(`api/v1/payments/internet/inquiry`, data);

export const internetPackagesPayment = (token: string, data: any) =>
  instance.post(`api/v1/payments/internet`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const mobileBillInquiry = (token: string, data: any) =>
  instance.post(`/api/v1/payments/bill/inquiry`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const getChildsCardData = (token: string) =>
  instance.get(`/api/v1/cards/info`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const setOrderCard = (token: string, data: any) =>
  instance.post(`/api/v1/cards/order`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const setCardBlock = (token: string, data: any) =>
  instance.post(`/api/v1/cards/block/permanent`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
export const setCardActive = (token: string, data: any) =>
  instance.post(`/api/v1/cards/activate`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
export const setCardDeactivate = (token: string, data: any) =>
  instance.post(`/api/v1/cards/block/temporary`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const setNewPassword = (token: string, data: any) =>
  instance.put(`/api/v1/cards/pin`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const setUnblockTemporary = (token: string, data: any) =>
  instance.post(`/api/v1/cards/unblock/temporary`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
