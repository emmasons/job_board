import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/logo3.png"
      alt="Logo"
      height={100}
      width={110}
      className="h-[130px] w-auto p-1"
    />
  );
};
