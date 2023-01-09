export enum enumStatus {
  PAID = 2,
  WAITING_FUNDS = 1,
}

interface propsCreatePayable {
  totalValue: number;
  status: enumStatus;
}

export interface propsPayable {
  totalValue: number;
  value?: number;
  status: enumStatus;
  fee?: number;
  date?: Date;
}

export class Payable {
  private props: propsPayable;

  set calcFee(value: number) {
    if (this.props.status == enumStatus.PAID) {
      this.props.fee = value * 0.03;
    } else {
      this.props.fee = value * 0.05;
    }
  }

  set calcValue(fee: number) {
    this.props.value = this.props.totalValue - fee;
  }

  get getProps() {
    return this.props;
  }

  set dateToPay(status: enumStatus) {
    const date = new Date();
    if (status == enumStatus.PAID) date.setDate(date.getDate());
    else date.setDate(date.getDate() + 30);
    this.props.date = date;
  }

  constructor(props: propsCreatePayable) {
    this.props = props;
    this.calcFee = this.props.totalValue;
    if (this.props.fee != undefined) this.calcValue = this.props.fee;
    this.dateToPay = props.status;
  }
}
