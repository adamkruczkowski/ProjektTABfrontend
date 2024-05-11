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
} from "@nextui-org/react";
import { useState } from "react";

const Singup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="w-full max-w-xl my-4 h-fit">
      <CardHeader className="flex justify-center">
        <h4 className="text-xl font-bold text-center">{COMMON.SIGNUP}</h4>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 py-4">
        <Input type="text" label={PAGE_SIGNUP.NAME} />
        <Input type="text" label={PAGE_SIGNUP.SURNAME} />
        <Input type="number" label={PAGE_SIGNUP.AGE} />
        <Input type="phone" label={PAGE_SIGNUP.PHONE} />
        <Divider />
        <Input type="email" label={PAGE_SIGNUP.EMAIL} />
        <Input
          label={PAGE_SIGNUP.PASSWORD}
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
        <Input
          label={PAGE_SIGNUP.REP_PASS}
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
        <Button color="primary" className="text-default-50 font-bold">
          {COMMON.SIGNUP}
        </Button>
        <Button variant="light">{COMMON.RESET}</Button>
      </CardFooter>
    </Card>
  );
};

export default Singup;
