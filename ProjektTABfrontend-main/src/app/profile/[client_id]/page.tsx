"use client";

import MyAxios from "@/app/lib/axios";
import { BankingAccountSimpleType, ClientDataType } from "@/app/lib/interfaces";
import BankingAccount from "@/components/profile/BankingAccount";
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ClientProfileParams {
  params: any;
}

const ClientProfile = ({ params }: ClientProfileParams) => {
  const { client_id } = params;
  const [clientData, setClientData] = useState<null | ClientDataType>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [bankingAccounts, setBankingAccounts] = useState<
    BankingAccountSimpleType[]
  >([]);

  useEffect(() => {
    setProfileLoading(true);
    MyAxios.get(`api/Client/${client_id}`).then((res) => {
      setClientData(res.data);
    });
  }, []);

  useEffect(() => {
    MyAxios.get(`api/BankingAccount/all/${client_id}`).then((res) => {
      setBankingAccounts(res.data);
      console.log(res.data);
    });
    setProfileLoading(false);
  }, []);

  if (profileLoading) {
    return <Spinner />;
  }

  if (clientData) {
    return (
      <div className="w-full flex-1 my-3">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-xl">Twój Profil</h2>
          <div className="flex flex-row gap-6 mt-2">
            <div className="text-red-500">
              <p>Imię i nazwisko</p>
              <p>Login</p>
              <p>Email</p>
              <p>Numer telefonu</p>
              <p>ID</p>
              <p>Wiek</p>
            </div>
            <div>
              <p>{`${clientData.name} ${clientData.surname}`}</p>
              <p>{clientData.login}</p>
              <p>{clientData.email}</p>
              <p>{clientData.phone}</p>
              <p>{clientData.id}</p>
              <p>{clientData.age}</p>
            </div>
          </div>
        </div>

        <div className="my-5">
          <h2 className="text-center text-lg font-bold">Konta bankowe</h2>
          {bankingAccounts.map((ba) => (
            <BankingAccount
              key={ba.id}
              amount={ba.amount}
              blocked={ba.blocked}
              number={ba.number}
              id={ba.id}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default ClientProfile;
