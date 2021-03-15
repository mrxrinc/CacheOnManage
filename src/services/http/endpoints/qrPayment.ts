import { QrPayment } from "types/qrPayment";
import HttpService from "../base";

class QRPaymentServiceProvider extends HttpService {
  constructor() {
    super({ suffix: "api/v1/charging-payment" });
  }

  /**
   * fetching the fetchQrInquiry data
   *
   * @async
   * @version 1.0.0
   */

  public fetchQrInquiry(data: string) {
    return this.httpService.post("qr-inquiry", data);
  }

  public fetchQrPayment(data: QrPayment) {
    return this.httpService.post("qr-payment", data);
  }
}
const QRPaymentService = new QRPaymentServiceProvider();

export default QRPaymentService;
