import { IoEye } from "react-icons/io5";

const PasswordEyeOn = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return <IoEye size={size && size} className={className && className} />;
};

export default PasswordEyeOn;
