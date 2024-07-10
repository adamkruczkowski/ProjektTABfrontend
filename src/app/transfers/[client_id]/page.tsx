"use client";

import MyAxios from "@/app/lib/axios";
import { BankingAccountSimpleType, ClientDataType } from "@/app/lib/interfaces";
import { Slider } from "@nextui-org/slider";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE, URL_PATHS } from "@/constants/enums";
import { useRouter } from "next/navigation";

interface TransfersParams {
  params: any;
}

const Transfer = ({ params }: TransfersParams) => {
  const { client_id } = params;
  const [clientData, setClientData] = useState<ClientDataType | null>(null);
  const [bankingAccounts, setBankingAccounts] = useState<
    BankingAccountSimpleType[]
  >([]);
  const [selectedAccount, setSelectedAccount] =
    useState<BankingAccountSimpleType | null>(null);
  const [title, setTitle] = useState<string>("");
  const [recipientBAId, setRecipientBAId] = useState<string>("");
  const [balanceBefore, setBalanceBefore] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [senderBAId, setSenderBAId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();

  const resetHandler = () => {
    setBalanceBefore("");
    setAmount("");
    setTitle("");
    setSenderBAId("");
    setRecipientBAId("");
    setShowSuccessMessage(false);
    window.location.reload();
  };

  useEffect(() => {
    MyAxios.get(`api/Client/${client_id}`)
      .then((res) => {
        setClientData(res.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych klienta:", error);
      });
  }, [client_id]);

  useEffect(() => {
    MyAxios.get(`api/BankingAccount/all/${client_id}`)
      .then((res) => {
        setBankingAccounts(res.data);

        // Ustawienie domyślnych wartości na puste
        setBalanceBefore("");
        setAmount("");

        // Ustawienie pierwszego konta jako domyślne, jeśli lista nie jest pusta
        if (res.data.length > 0) {
          setSelectedAccount(res.data[0]);
        }
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania listy kont bankowych:", error);
      });
  }, [client_id]);

  const handleAccountChange = (selectedAccountNumber: string) => {
    const account = bankingAccounts.find(
      (acc) => acc.number === selectedAccountNumber
    );
    if (account) {
      setSelectedAccount(account);
      setBalanceBefore(account.amount.toString()); // Ustawiamy balanceBefore jako amount wybranego konta
      setSenderBAId(account.id.toString()); // Ustawiamy senderBAId na id wybranego konta
      setShowError(false); // Resetowanie błędu przy zmianie konta
      setErrorMessage(""); // Wyczyszczenie komunikatu o błędzie
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setShowError(false);
    setErrorMessage("");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setShowError(false); // Resetowanie błędu przy zmianie tytułu
    setErrorMessage(""); // Wyczyszczenie komunikatu o błędzie
  };

  const handleRecipientBAIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipientBAId(e.target.value);
    setShowError(false); // Resetowanie błędu przy zmianie odbiorcy
    setErrorMessage(""); // Wyczyszczenie komunikatu o błędzie
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount.toString());
    const parsedBalanceBefore = parseFloat(balanceBefore.toString());
    const isAmountValid = !isNaN(parsedAmount) && isFinite(parsedAmount);

    if (
      !isAmountValid ||
      parsedAmount <= 0 ||
      parsedAmount > parsedBalanceBefore
    ) {
      setErrorMessage(
        "Podana kwota musi być liczbą większą od 0 i nie większą niż stan konta."
      );
      setShowError(true);
      return;
    }

    setLoading(true);
    setShowError(false); // Resetowanie błędu przed wysłaniem danych

    MyAxios.post("api/Transactions", {
      balance_before: parsedBalanceBefore,
      amount: parsedAmount,
      title,
      sender_BAid: senderBAId,
      recipient_BAId: recipientBAId,
    })
      .then((res) => {
        setShowSuccessMessage(true);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        setShowError(true);
      })
      .finally(() => setLoading(false));
  };

  const handleReturnToProfile = () => {
    router.push(`${URL_PATHS.PROFILE}/${client_id}`);
  };

  if (clientData) {
    return (
      <>
        <div className="my-3">
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl">Utwórz nowy przelew</h3>
          </div>
        </div>
        <Card style={{ width: "90%", margin: "10px auto" }}>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <h1 className="font-bold text-xl">Wybierz konto</h1>
                <Select
                  className="max-w-xs"
                  onChange={(e) => handleAccountChange(e.target.value)}
                >
                  {bankingAccounts
                    .filter((ba) => !ba.blocked)
                    .map((account) => (
                      <SelectItem key={account.number} value={account.number}>
                        {account.number}
                      </SelectItem>
                    ))}
                </Select>
              </div>

              {selectedAccount && (
                <>
                  <div style={{ marginBottom: "10px" }}>
                    <p>Saldo konta:</p>
                    <Input
                      isReadOnly
                      type="text"
                      value={balanceBefore}
                      required
                      fullWidth
                    />
                  </div>
                </>
              )}

              <div style={{ marginBottom: "10px" }}>
                <Input
                  type="text"
                  placeholder="Kwota przelewu"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  type="text"
                  placeholder="Tytuł przelewu"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  type="text"
                  placeholder="Identyfikator konta odbiorcy"
                  value={recipientBAId}
                  onChange={(e) => setRecipientBAId(e.target.value)}
                  required
                  fullWidth
                />
              </div>

              <Button
                variant="solid"
                type="submit"
                color="primary"
                disabled={loading}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                {loading ? (
                  "Wysyłanie..."
                ) : (
                  <p className="text-white font-bold">Wyślij przelew</p>
                )}
              </Button>

              {showError && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "10px" }}
                >
                  {errorMessage}
                </div>
              )}

              {showSuccessMessage && (
                <div
                  style={{
                    color: "white",
                    fontSize: "14px",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {/* <Button
                    variant="solid"
                    type="submit"
                    onClick={handleReturnToProfile}
                    style={{ flex: 1 }}
                  >
                    <p className="text-white font-bold">Powrót do profilu</p>
                  </Button> */}
                  <Button
                    variant="solid"
                    type="submit"
                    onClick={resetHandler}
                    style={{ flex: 1 }}
                  >
                    <p className="text-white font-bold">
                      Wyślij kolejny przelew
                    </p>
                  </Button>
                </div>
              )}
            </form>
          </CardBody>
        </Card>
      </>
    );
  }

  return <div>Loading...</div>;
};

export default Transfer;
