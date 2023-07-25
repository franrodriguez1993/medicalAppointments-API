export default class ResponseEntity {
  public status: Number;
  public msg: String;
  public data: Object;

  constructor(status: Number, msg: String, data: Object) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }
}
