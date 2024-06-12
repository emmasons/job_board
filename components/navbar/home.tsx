// components/home.tsx
import Link from "next/link";
import { Home as HomeIcon } from "lucide-react"; // Adjust import if you use a different icon library

const Home: React.FC = () => {
  return (
    <Link href="/" className="font-medium p-4 flex items-center rounded-lg text-gray-700 hover:text-orange-500 text-sm">
      {/* <HomeIcon className="mr-2 h-5 w-5" /> */}
      HOME
    </Link>
  );
};

export default Home;