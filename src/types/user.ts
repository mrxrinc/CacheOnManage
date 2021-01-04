export interface Login {
  username: string;
  password: string;
}

export interface LoginAction {
  data: Login;
  encryption: boolean;
}
