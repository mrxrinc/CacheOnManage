import HttpService from "../base";

class InvoiceServiceProvider extends HttpService {
  constructor() {
    super({ suffix: "api/v1" });
  }

  /**
   * fetching the Invoice list data
   *
   * @async
   * @version 1.0.0
   */

  public fetchInvoiceList() {
    return this.httpService.get("accounts/invoice");
  }
}

const InvoiceService = new InvoiceServiceProvider();

export default InvoiceService;
