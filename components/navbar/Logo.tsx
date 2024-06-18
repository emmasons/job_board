import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/log2.png"
      alt="Logo"
      height={110}
      width={140}
      className="h-[98px] w-auto p-4"
    />
  );
};
