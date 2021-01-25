import HttpService from "../base";
import { AddTarget } from "types/saving";
class SavingServiceProvider extends HttpService {
  constructor() {
    super({ suffix: "api/v1" });
  }

  /**
   * fetching the Saving list data
   *
   * @async
   * @version 1.0.0
   */

  public fetchSavingList() {
    return this.httpService.get("savings");
  }

  /**
   * add target
   *
   * @async
   * @version 1.0.0
   */

  public addTarget(data: AddTarget) {
    return this.httpService.post("savings", data);
  }

  /**
   * update target
   *
   * @async
   * @version 1.0.0
   */

  public updateTarget(id: AddTarget) {
    return this.httpService.put("savings", id);
  }

  /**
   * finish target
   *
   * @async
   * @version 1.0.0
   */

  public finishTarget(id: number) {
    return this.httpService.post(`savings/${id}`);
  }
  /**
   * delete target
   *
   * @async
   * @version 1.0.0
   */

  public deleteTarget(id: number) {
    return this.httpService.delete(`savings/${id}`);
  }

  /**
   * transfer money to target
   *
   * @async
   * @version 1.0.0
   */

  public transferMoneyToTarget(data: any) {
    return this.httpService.post("savings/transfer", data);
  }
}
const SavingService = new SavingServiceProvider();

export default SavingService;
