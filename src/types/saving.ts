export interface SavingListData {}

export interface AddTarget {
  title: string;
  targetAmount: string | number;
  weeklySavings: string | number;
  targetDate: string;
}
export interface SelectedTargetsData {
  targets: any[];
  childId: number;
  allowance: number | string;
  childName: string;
}

export interface DeleteTarget {
  childId: number;
  targetId: number;
}
export interface TargetsData {
  childId: number | null;
  id: number;
  paidAmount: number | string;
  state: string;
  targetAmount: number | string;
  targetDate: string;
  title: string;
  weeklySavings: number | string;
}
