"use client";

import PasswordEyeOff from "@/components/icons/PasswordEyeOff";
import PasswordEyeOn from "@/components/icons/PasswordEyeOn";
import { COMMON, PAGE_SIGNUP } from "@/constants/texts";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Snippet,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MyAxios from "../lib/axios";
import { LOCAL_STORAGE, URL_PATHS } from "@/constants/enums";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [is2FA, setIs2FA] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Fetch the 2FA status from the server
    const fetch2FAStatus = async () => {
      try {
        const response = await MyAxios.get("api/Authentication/is-2fa-enabled");
        setIs2FAEnabled(response.data.is2FAEnabled);
      } catch (error) {
        console.error("Error fetching 2FA status:", error);
      }
    };

    fetch2FAStatus();
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleReset = () => {
    setLogin("");
    setPassword("");
    setVerificationCode("");
    setIs2FA(false);
  };

  const handleSubmit = async () => {
    if (is2FA) {
      console.log(
        `Sending verification code: ${verificationCode}, Login: ${login}`
      );
      MyAxios.post("api/Authentication/verify-code", {
        login,
        code: verificationCode,
      })
        .then((res) => {
          localStorage.setItem(LOCAL_STORAGE.LOGGED_CLIENT_ID, res.data.id);
          router.push(`${URL_PATHS.PROFILE}/${res.data.id}`);
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
          setShowError(true);
        });
    } else {
      console.log("TEEEEST");
      MyAxios.post("api/Authentication/login", {
        login,
        password,
      })
        .then((res) => {
          if (is2FAEnabled) {
            setIs2FA(true);
            console.log(res);
          } else {
            localStorage.setItem(LOCAL_STORAGE.LOGGED_CLIENT_ID, res.data.id);
            router.push(`${URL_PATHS.PROFILE}/${res.data.id}`);
          }
        })
        .catch((err) => {
          let errorResponse = "An unknown error occurred";
        
          if (err?.response?.status === 401) {
            if (err?.response?.data === "Twoje konto zostało zablokowane") {
              errorResponse = "Twoje konto zostało zablokowane skontaktuj sie z administratorem";
            }
          } else if (err?.response?.status === 400) {
            if (err?.response?.data?.includes("Niepoprawne hasło")) {
              errorResponse = err?.response?.data || "Wrong credentials";
            }
          } 
        
          setErrorMessage(errorResponse);
          setShowError(true);
        });  
    }
  };

  return (
    <Card className="w-full max-w-xl my-4 h-fit">
      <CardHeader className="flex justify-center">
        <h4 className="text-xl font-bold text-center">{COMMON.LOGIN}</h4>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 py-4">
      {showError && (
        <Snippet symbol={""} disableCopy hideCopyButton color="danger">
          {errorMessage}
        </Snippet>
      )}
        {!is2FA ? (
          <>
            <Input
              type="text"
              label={PAGE_SIGNUP.LOGIN}
              value={login}
              onChange={(e) => {
                setShowError(false);
                setLogin(e.target.value);
              }}
            />
            <Input
              label={PAGE_SIGNUP.PASSWORD}
              value={password}
              onChange={(e) => {
                setShowError(false);
                return setPassword(e.target.value);
              }}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <PasswordEyeOff size={24} className="text-default-400" />
                  ) : (
                    <PasswordEyeOn size={24} className="text-default-400" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </>
        ) : (
          <Input
            type="text"
            label={PAGE_SIGNUP.FA}
            value={verificationCode}
            onChange={(e) => {
              setShowError(false);
              setVerificationCode(e.target.value);
            }}
          />
        )}
      </CardBody>
      <CardFooter className="flex flex-row-reverse gap-2 ">
        <Button
          color="primary"
          className="text-default-50 font-bold"
          onClick={handleSubmit}
        >
          {COMMON.LOGIN}
        </Button>
        <Button variant="light" onClick={handleReset}>
          {COMMON.RESET}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
