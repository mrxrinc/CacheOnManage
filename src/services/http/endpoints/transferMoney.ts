import HttpService from "../base";

class TransferMoneyProvider extends HttpService {
  constructor() {
    super({ suffix: "api/v1" });
  }

  /**
   * transfer money
   *
   * @async
   * @version 1.0.0
   */

  public transferMoney(data: any) {
    return this.httpService.post("accounts/transfer", data);
  }
}
const TransferMoney = new TransferMoneyProvider();

export default TransferMoney;
