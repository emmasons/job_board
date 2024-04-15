import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      height={100}
      width={130}
      className="h-[40px] w-auto"
    />
  );
};
