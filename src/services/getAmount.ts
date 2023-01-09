import { HttpResponse, ok, serverError } from "../helpers";

export interface IsaldoInfo {
  available: number;
  waiting_funds: number;
}

export interface IgetSaldoRepository {
  get(): Promise<IsaldoInfo>;
}

interface IgetSaldo {
  execute(): Promise<HttpResponse<IsaldoInfo | string>>;
}

export class getAmount implements IgetSaldo {
  constructor(private readonly getSaldoRepository: IgetSaldoRepository) {}
  async execute(): Promise<HttpResponse<IsaldoInfo | string>> {
    try {
      const saldos = await this.getSaldoRepository.get();

      return ok<IsaldoInfo>({
        available: saldos.available,
        waiting_funds: saldos.waiting_funds,
      });
    } catch (e) {
      return serverError();
    }
  }
}
