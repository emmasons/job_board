// components/home.tsx
import Link from "next/link";
import { Home as HomeIcon } from "lucide-react"; // Adjust import if you use a different icon library

const Common: React.FC = () => {
  return (
    <div className="flex">
      <Link
        href="/"
        className="flex items-center rounded-lg p-4 text-sm font-medium text-gray-700 hover:text-orange-500"
      >
        HOME
      </Link>
      <Link
        href="/find-candidates"
        className="flex items-center rounded-lg p-4 text-sm font-medium text-gray-700 hover:text-orange-500 uppercase"
      >
        Find candidates
      </Link>
    </div>
  );
};

export default Common;
