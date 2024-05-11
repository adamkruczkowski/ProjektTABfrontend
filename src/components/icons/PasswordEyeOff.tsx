import { IoEyeOff } from "react-icons/io5";

const PasswordEyeOff = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return <IoEyeOff size={size && size} className={className && className} />;
};

export default PasswordEyeOff;
