export interface SavingListData {}

export interface AddTarget {
  title: string;
  targetAmount: string;
  weeklySavings: string;
  targetDate: string;
}
export interface SelectedTargetsData {
  targets: any[];
}

export interface DeleteTarget {
  childId: number;
  targetId: number;
}
