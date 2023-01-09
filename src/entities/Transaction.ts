export enum enumCard {
  CREDIT_CARD = 1,
  DEBIT_CARD = 2,
}

export interface propsTransaction {
  value: number;
  desc: string;
  payment_method: enumCard;
  card_number: string;
  owner_card: string;
  expiration_date_card: string;
  cvv: number;
}

export class Transaction {
  private props: propsTransaction;

  set setCardNumber(card_number: string) {
    let digits = "";

    const tam = card_number.length;

    for (let i = tam - 4; i < tam; i++) {
      digits += card_number[i];
    }

    this.props.card_number = digits;
  }

  get getProps() {
    return this.props;
  }

  constructor(props: propsTransaction) {
    this.props = props;
    this.setCardNumber = props.card_number;
  }
}
