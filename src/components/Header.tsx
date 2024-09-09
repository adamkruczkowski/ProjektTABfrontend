"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCAL_STORAGE, URL_PATHS } from "@/constants/enums";
import { COMMON } from "@/constants/texts";
import CompanyLogoIcon from "./icons/CompanyLogoIcon";

// TO DO! Poki co navbar jest mixem miedzy userem zalogowanym i nie xd

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE.LOGGED_CLIENT_ID)) {
    } else {
    }
  }, []);

  const menuItems = [COMMON.MY_ACC, COMMON.TRANSFERS];

  const logoutHandler = () => {
    localStorage.removeItem(LOCAL_STORAGE.LOGGED_CLIENT_ID);
    router.replace(URL_PATHS.LOGIN);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-default-50">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={Link} href={URL_PATHS.ROOT}>
          <CompanyLogoIcon size={24} className="mr-2 text-primary" />
          <p className="font-bold text-2xl text-default-900">
            {COMMON.COMPANY_NAME}
          </p>
        </NavbarBrand>
      </NavbarContent>
      {localStorage.getItem(LOCAL_STORAGE.LOGGED_CLIENT_ID) && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={pathname.includes(URL_PATHS.PROFILE)}>
            <Link
              href={`${URL_PATHS.PROFILE}/${localStorage.getItem(
                LOCAL_STORAGE.LOGGED_CLIENT_ID
              )}`}
            >
              {COMMON.MY_ACC}
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname.includes(URL_PATHS.TRANSFERS)}>
            <Link
              href={`${URL_PATHS.TRANSFERS}/${localStorage.getItem(
                LOCAL_STORAGE.LOGGED_CLIENT_ID
              )}`}
              aria-current="page"
            >
              {COMMON.TRANSFERS}
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {!localStorage.getItem(LOCAL_STORAGE.LOGGED_CLIENT_ID) && (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="default"
                href={URL_PATHS.LOGIN}
                variant="flat"
              >
                {COMMON.LOGIN}
              </Button>
            </NavbarItem>
            {/* <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href={URL_PATHS.SIGN_UP}
                variant="flat"
              >
                {COMMON.SIGNUP}
              </Button>
            </NavbarItem> */}
          </>
        )}
        {localStorage.getItem(LOCAL_STORAGE.LOGGED_CLIENT_ID) && (
          <NavbarItem>
            <Button
              as={Link}
              color="danger"
              // href={URL_PATHS.LOGIN}
              variant="flat"
              onClick={logoutHandler}
            >
              {COMMON.LOGOUT}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="foreground" className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
