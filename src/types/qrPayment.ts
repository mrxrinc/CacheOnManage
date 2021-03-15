export interface QrPayment {
  qrGuidId: string;
  terminalId: string;
  amount: string;
}

export interface QrPaymentResult {
  data: QrPaymentResultData;
  hasError: boolean;
  message?: string;
}
interface QrPaymentResultData {
  amount: string;
  date: string;
  description: string;
  followupNumber: string;
}
