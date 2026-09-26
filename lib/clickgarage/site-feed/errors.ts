export class SiteFeedRequestError extends Error {
  public readonly status: number;

  public constructor(status: number, mensagem: string) {
    super(mensagem);
    this.name = "SiteFeedRequestError";
    this.status = status;
  }
}
