import { BankingAccountType } from "@/app/lib/interfaces";
import { MdOutlineCallReceived } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";

interface TransactionItemProps {
  balanceBefore: number;
  amount: number;
  sender: BankingAccountType;
  createdAt: Date;
  recipient: BankingAccountType;
  userBaNumber: string;
  title: string;
}

const TransactionItem = ({
  balanceBefore,
  amount,
  createdAt,
  sender,
  recipient,
  userBaNumber,
  title,
}: TransactionItemProps) => {
  const isSender = userBaNumber === sender.number;

  if (isSender) {
    return (
      <div className="bg-white rounded-lg p-3 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <MdArrowOutward size={40} color="red" />
          <div className="flex flex-col">
            <p>{`${new Date(createdAt).getFullYear()}-${(
              new Date(createdAt).getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${new Date(createdAt).getDate()} / ${new Date(
              createdAt
            ).getHours()}:${new Date(createdAt)
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}</p>
            <p className="text-center font-bold text-xs">Kwota:</p>
            <h3 className="font-bold text-xl">{amount.toFixed(2)} zł</h3>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold text-center">Tytuł przelewu:</p>
          <p>{`"${title}"`}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold text-center">Stan konta:</p>
          <div className="flex flex-row gap-2">
            <span className="text-xs font-bold text-center">przed:</span>
            <span className="text-xs font-bold text-center text-red-500">
              {balanceBefore.toFixed(2)} zł
            </span>
          </div>
          <div className="flex flex-row gap-7">
            <span className="text-xs font-bold text-center">po:</span>
            <span className="text-xs font-bold text-center text-red-500">
              {(balanceBefore - amount).toFixed(2)} zł
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-xs text-center">Przelano do:</p>
          <h4 className="text-sm">{`${recipient.client.name} ${recipient.client.surname}`}</h4>
          <h5 className="text-sm">{recipient.number}</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-3 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <MdOutlineCallReceived size={40} color="green" />
        <div className="flex flex-col">
          <p>{`${new Date(createdAt).getFullYear()}-${(
            new Date(createdAt).getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${new Date(createdAt).getDate()} / ${new Date(
            createdAt
          ).getHours()}:${new Date(createdAt).getMinutes()}`}</p>
          <p className="text-center font-bold text-xs">Kwota:</p>
          <h3 className="font-bold text-xl">{amount.toFixed(2)} zł</h3>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-bold text-center">Tytuł przelewu:</p>
        <p>{`"${title}"`}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-bold text-center">Stan konta:</p>
        <div className="flex flex-row gap-2">
          <span className="text-xs font-bold text-center">przed:</span>
          <span className="text-xs font-bold text-center text-green-500">
            {balanceBefore.toFixed(2)} zł
          </span>
        </div>
        <div className="flex flex-row gap-7">
          <span className="text-xs font-bold text-center">po:</span>
          <span className="text-xs font-bold text-center text-green-500">
            {(balanceBefore + amount).toFixed(2)} zł
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-xs text-center">Otrzymano od:</p>
        <h4 className="text-sm">{`${sender.client.name} ${sender.client.surname}`}</h4>
        <h5 className="text-sm">{sender.number}</h5>
      </div>
    </div>
  );
};

export default TransactionItem;
