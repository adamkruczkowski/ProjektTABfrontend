"use client";

import MyAxios from "@/app/lib/axios";
import {
  BankingAccountSimpleType,
  TranscationType,
} from "@/app/lib/interfaces";
import BankingAccount from "@/components/profile/BankingAccount";
import TransactionItem from "@/components/transfers/TransactionItem";
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface BankingAccountPageParams {
  params: any;
}

const BankingAccountPage = ({ params }: BankingAccountPageParams) => {
  const { bankacc_id } = params;
  const [loadingPage, setLoadingPage] = useState(false);
  const [bankAccData, setBankAccData] = useState<BankingAccountSimpleType>();
  const [transactions, setTransactions] = useState<TranscationType[]>();

  useEffect(() => {
    setLoadingPage(true);
    MyAxios.get(`api/BankingAccount/${bankacc_id}`).then((res) => {
      setBankAccData(res.data);
    });
  }, []);

  useEffect(() => {
    MyAxios.get(`api/Transactions/BankingAccount/all/${bankacc_id}`).then(
      (res) => {
        console.log(res.data);
        setTransactions(res.data);
      }
    );
    setLoadingPage(false);
  }, [bankAccData]);

  const handleDownload = async () => {
    window.location.href = `https://localhost:7171/api/Transactions/GeneratePDF/${bankacc_id}`;
    try {
      const response = await MyAxios.get(
        `api/Transactions/GeneratePDF/${bankacc_id}`
      );
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  if (loadingPage) {
    return <Spinner />;
  }

  if (bankAccData) {
    return (
      <div className="w-full flex-1 my-3">
        <h2 className="text-xl font-bold text-center">Twoje konto bankowe</h2>
        <BankingAccount
          id={bankAccData.id}
          number={bankAccData.number}
          blocked={bankAccData.blocked}
          amount={bankAccData.amount}
        />
        <Button color="default" onPress={handleDownload} variant="flat">
          Pobierz wyciąg z tego konta
        </Button>
        <h2 className="text-xl font-bold text-center mt-4">
          Historia transakcji
        </h2>
        <div className="flex flex-col gap-1">
          {transactions?.map((t) => (
            <TransactionItem
              key={t.id}
              userBaNumber={bankAccData.number}
              title={t.title}
              createdAt={t.createdAt}
              balanceBefore={t.balance_before}
              amount={t.amount}
              sender={t.sender}
              recipient={t.recipient}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default BankingAccountPage;
