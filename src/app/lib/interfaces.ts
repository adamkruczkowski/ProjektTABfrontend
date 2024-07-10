export interface ClientDataType {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  login: string;
  phone: string;
  bakingAccounts: BankingAccountSimpleType[];
  logins: {
    id: string;
    successful: boolean;
    dateTime: string;
  }[];
}

export interface BankingAccountSimpleType {
  id: string;
  number: string;
  amount: number;
  blocked: boolean;
}

export interface BankingAccountType {
  id: string;
  number: string;
  amount: number;
  blocked: boolean;
  client: ClientSimpleType;
}

export interface ClientSimpleType {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  login: string;
  phone: string;
}

export interface TranscationType {
  id: string;
  title: string;
  balance_before: number;
  amount: number;
  createdAt: Date;
  sender: BankingAccountType;
  recipient: BankingAccountType;
}
