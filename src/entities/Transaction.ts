export enum enumCard {
  CREDIT_CARD = 1,
  DEBIT_CARD = 2,
}

interface propsTransaction {
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

    for (let i = card_number.length - 4; i < card_number.length; i++) {
      digits += card_number[i];
    }

    this.props.card_number = digits;
  }

  get getCardNumber() {
    return this.props.card_number;
  }

  constructor(props: propsTransaction) {
    this.props = props;
    this.setCardNumber = props.card_number;
  }
}
