export interface BillPayment {
  qrGuidId: string;
  terminalId: string;
  amount: string;
  data: any;
  message: string;
  hasError: boolean;
}

export interface MobileTopUp {
  amount: string;
  data: any;
  message: string;
  hasError: boolean;
}
