import { AUTHORS, COMMON } from "@/constants/texts";
import CompanyLogoIcon from "./icons/CompanyLogoIcon";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col mx-auto max-w-5xl my-8 gap-4">
        <div className="bg-default-300 w-full h-0.5" />
        <div className="flex px-4 items-center justify-around">
          <div className="flex items-center">
            <CompanyLogoIcon size={24} className="mr-2 text-default-400" />
            <h4 className="text-2xl font-bold sm:mr-8 text-default-400">
              {COMMON.COMPANY_NAME}
            </h4>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-default-400">
            <p>{AUTHORS.LP}</p>
            <p>{AUTHORS.BZ}</p>
            <p>{AUTHORS.LJ}</p>
            <p>{AUTHORS.JS}</p>
            <p>{AUTHORS.KK}</p>
            <p>{AUTHORS.AK}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
