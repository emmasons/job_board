import Link from "next/link";
import { FileText as BlogsIcon } from "lucide-react";

const BlogsDropdown: React.FC = () => {
  return (
    <div className="group relative">
      <Link
        href="/blog"
        className="px-4 pb-7 text-sm font-medium text-gray-700 hover:border-b-4 hover:border-indigo-600 hover:text-orange-500"
      >
        {/* <Link href="/blog" className="font-medium flex items-center px-4 pb-7 text-gray-700 hover:text-orange-500 text-sm"> */}
        {/* <BlogsIcon className="mr-2 h-5 w-5"/> */}
        BlOGS
      </Link>
      <div className="absolute left-0 mt-7 hidden w-48 bg-white shadow-lg group-hover:block group-hover:border-t-4 group-hover:border-indigo-400 ">
        <ul className="py-2">
          <li>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
            >
              All Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
            >
              Top News
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
            >
              Jobs search
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
            >
              Career advice
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
            >
              Work Abroad
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogsDropdown;
