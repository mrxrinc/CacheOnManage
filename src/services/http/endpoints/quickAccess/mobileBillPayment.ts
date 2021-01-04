import { BillPayment } from "types/quickAccess";
import HttpService from "../../base";

class MobileBillPaymentServiceProvider extends HttpService {
  constructor() {
    super({ suffix: "api/v1/payments" });
  }

  /**
   * fetching the fetchMobilBillPayment
   *
   * @async
   * @version 1.0.0
   */

  public fetchMobileBillPayment(data: BillPayment) {
    console.log("fetchMobileBillPayment>> data is", data);
    return this.httpService.post("bill", data);
  }
}
const MobileBillPaymentService = new MobileBillPaymentServiceProvider();

export default MobileBillPaymentService;
