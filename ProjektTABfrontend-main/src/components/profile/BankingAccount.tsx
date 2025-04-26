import Link from "next/link";

interface BankingAccountProps {
  amount: number;
  blocked: boolean;
  number: string;
  id: string;
}

const BankingAccount = ({
  number,
  amount,
  blocked,
  id,
}: BankingAccountProps) => {
  return (
    <Link href={`/bankingAccount/${id}`}>
      <div className="flex flex-col bg-white rounded-lg m-1 p-3">
        <p className="font-bold">Numer konta:</p>
        <p className="text-2xl mb-2">{number}</p>
        <p className="font-bold">Środki:</p>
        <p
          className={
            blocked
              ? "font-bold text-gray-500 text-4xl mb-2"
              : "font-bold text-red-500 text-4xl mb-2"
          }
        >
          {amount.toFixed(2)} zł
        </p>
        <p className="font-bold">{blocked ? "ZABLOKOWANE" : ""}</p>
        <p className="text-xs self-end">ID konta: {id}</p>
      </div>
    </Link>
  );
};

export default BankingAccount;
