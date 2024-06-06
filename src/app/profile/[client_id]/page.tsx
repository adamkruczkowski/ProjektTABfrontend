"use client";

import MyAxios from "@/app/lib/axios";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ClientProfileParams {
  params: any;
}
interface ClientDataType {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  login: string;
  phone: string;
  bakingAccounts: {
    id: string;
    number: string;
    amount: number;
    blocked: string;
  }[];
  logins: {
    id: string;
    successful: boolean;
    dateTime: string;
  }[];
}

const ClientProfile = ({ params }: ClientProfileParams) => {
  const { client_id } = params;
  const [clientData, setClientData] = useState<null | ClientDataType>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    setProfileLoading(true);
    MyAxios.get(`api/Client/${client_id}`).then((res) => {
      console.log(res.data);
      setClientData(res.data);
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
          <div className="flex flex-row gap-6">
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
      </div>
    );
  }
};

export default ClientProfile;
