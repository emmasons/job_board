import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/log2.png"
      alt="Logo"
      height={90}
      width={120}
      className="h-[80px] w-auto p-4"
    />
  );
};
