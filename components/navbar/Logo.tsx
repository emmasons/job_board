import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/Jobs Connect logo 2 .png"
      alt="Logo"
      height={140}
      width={140}
      className="h-[180px] w-auto p-4"
    />
  );
};
