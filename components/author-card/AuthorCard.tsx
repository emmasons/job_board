import me from "@/public/logo.png";
import Image from "next/image";

type Props = {
  date?: string;
  author?: string;
};

const AuthorCard = ({ date, author }: Props) => {
  return (
    <div className="inline-flex w-fit flex-col gap-4 rounded-xl bg-slate-200 p-2">
      <div>
        <Image
          src={me}
          width={60}
          height={60}
          alt="Author Image"
          className="h-auto w-auto object-contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold">{author || "Infinite Talent ltd."}</h4>
        <p className="text-[0.8rem] text-slate-500">{date}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
