export interface SavingListData {
  totalAmount: string;
  weeklySavings: string;
  targets: TargetsData[];
  childId: number;
  allowance: number | string;
  childName: string;
}

export interface AddTarget {
  title: string;
  targetAmount: string | number;
  weeklySavings: string | number;
  targetDate: string;
  childId?: number;
}
export interface EditTargetData extends AddTarget {
  id?: number;
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
