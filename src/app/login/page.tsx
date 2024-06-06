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
import { useState } from "react";
import MyAxios from "../lib/axios";
import { LOCAL_STORAGE, URL_PATHS } from "@/constants/enums";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleReset = () => {
    setLogin("");
    setPassword("");
  };

  const handleSubmit = async () => {
    MyAxios.post("api/Authentication/login", {
      login,
      password,
    })
      .then((res) => {
        localStorage.setItem(LOCAL_STORAGE.LOGGED_CLIENT_ID, res.data.id);
        router.push(`${URL_PATHS.PROFILE}/${res.data.id}`);
        // 2FA HERE
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        setShowError(true);
      });
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
