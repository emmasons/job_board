type Props = {
  date: string;
  category: string;
};

const AuthorDate = ({ date, category }: Props) => {
  return (
    <span className="flex items-center">
      <p className="me-2 text-[0.7rem] text-slate-600">{date}</p>
      <p className="text-[0.7rem] uppercase">{category}</p>
    </span>
  );
};

export default AuthorDate;
