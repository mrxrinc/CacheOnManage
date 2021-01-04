export interface QrPayment {
  qrGuidId: string;
  terminalId: string;
  amount: string;
}

export interface PaymentResult {
  amount: string;
  date: string;
  description: string;
  followupNumber: string;
  success: boolean;
}
