import { SiMoneygram } from "react-icons/si";

const CompanyLogoIcon = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return <SiMoneygram size={size && size} className={className && className} />;
};

export default CompanyLogoIcon;
