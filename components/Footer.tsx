"use client";
import { Logo } from "./navbar/Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-primary py-8">
      <MaxWidthWrapper className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2 text-white">
          <h2 className="text-lg font-bold">
            Infinite Talent Limited European Job Portal
          </h2>
          <div className="inline-flex bg-white p-2">
            <Logo />
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Infinite Talent Limited
          </p>
        </div>
        <div className="space-y-2 text-white">
          <h2 className="text-lg font-bold">Contact us</h2>
          <Link href="#" className="inline-flex items-center gap-2">
            Contact Infinite Helpdesk
            <ChevronRight className="h-4 w-4" />
          </Link>
          <p className="">Follow us</p>
          <ul>
            <li>
              <Link
                href="#"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="pajamas:twitter" className="h-4 w-4" />
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="pajamas:linkedin" className="h-4 w-4" />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="ic:baseline-facebook" className="h-4 w-4" />
                Facebook
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2 text-white">
          <h2 className="text-lg font-bold">About us</h2>
          <div className="flex flex-col">
            <Link
              href="#"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              About Infinte Talent Limited
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              Blog
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
