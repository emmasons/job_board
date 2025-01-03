"use client";
import { Logo } from "./navbar/Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { SubscriptionForm } from "@/components/forms/subscription/SubscriptionForm";
import { SUBSCRIPTION_TYPE } from "@prisma/client";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-primary/70 py-8">
      <MaxWidthWrapper className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="space-y-2 text-white">
          <h2 className="text-xl">
            Jobs Connect <br /> Limited Job Portal
          </h2>
          <div className="inline-flex">
            <Logo />
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Jobs Connect Limited
          </p>
        </div>
        <div className="space-y-2 text-white">
          <h2 className="text-lg font-bold">Contact us</h2>
          <Link href="#" className="inline-flex items-center gap-2">
            Contact Jobs Connect Helpdesk
            {/* <ChevronRight className="h-4 w-4" /> */}
          </Link>
          <p className="">Follow us</p>
          <ul>
            <li>
              <Link
                href="https://x.com/job_connects"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="pajamas:twitter" className="h-4 w-4" />
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="http://www.linkedin.com/in/job-connect-506024322"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="pajamas:linkedin" className="h-4 w-4" />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/jobsconnect20/"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="mdi:instagram" className="h-4 w-4" />
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/profile.php?id=61563736538661"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="ic:baseline-facebook" className="h-4 w-4" />
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me/+971503984645"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon
                  icon="akar-icons:whatsapp-fill"
                  className="h-4 w-4 text-green-500"
                />
                WhatsApp
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2 text-white">
          <h2 className="text-lg font-bold">About us</h2>
          <div className="flex flex-col">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              About Jobs Connect
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/FAQs"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              FAQs
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              Blog
            </Link>
          </div>
        </div>
        <div className="space-y-2 text-white">
          <h2 className="text-lg font-bold">Subscribe to our newsletter</h2>
          <SubscriptionForm type={SUBSCRIPTION_TYPE.NEWSLETTER} />
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
