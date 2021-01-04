export type HomeHeaderType = {
  id?: number;
  nickname?: string;
  balance?: string;
  avatar?: string;
  homePage?: boolean;
  title?: string;
  children?: React.ReactNode;
  hasBack?: boolean;
};

export type BalanceCardType = {
  id: number;
  nickname: string;
  balance: number;
  liable: number;
  avatar: string;
  onPress?: (T: any) => void;
  children?: JSX.Element;
};

export type InputType = {
  title?: string;
  value?: string | number;
  placeholder?: string;
  customStyle?: any;
  hasUnit?: boolean;
  maxLength?: number;
  boxMode?: boolean;
  keyboardType?: string;
  onChangeText: (T: string) => void;
};
export type TransferMoney = {
  transferFrom: number;
  transferTo: number;
  amount: number;
  description: string;
};
export type InvoiceData = {
  title: string;
  date: number;
  amount: number;
  titleColor?: string;
  boxMode?: boolean;
  remainingAmount: number;
  withdraw: boolean;
};
