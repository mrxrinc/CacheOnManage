import { MobileTopUp } from "types/quickAccess";
import HttpService from "../../base";

class MobileTopUpPaymentServiceProvider extends HttpService {
  constructor() {
    super({ suffix: "api/v1/charging-payment" });
  }

  /**
   * fetching the fetchMobilBillPayment
   *
   * @async
   * @version 1.0.0
   */

  public fetchMobileTopUpPayment(data: MobileTopUp) {
    return this.httpService.post("mobile-topup", data);
  }
}
const MobileTopUpPaymentService = new MobileTopUpPaymentServiceProvider();

export default MobileTopUpPaymentService;
