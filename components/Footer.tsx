"use client";
import { Logo } from "./navbar/Logo2";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { SubscriptionForm } from "@/components/forms/subscription/SubscriptionForm";
import { SUBSCRIPTION_TYPE } from "@prisma/client";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-primary/70 py-8">
      <MaxWidthWrapper className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="space-y-2 text-white">
          <div className="inline-flex">
            <Logo />
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Talentra Limited
          </p>
        </div>
        <div className="space-y-2 text-white">
          <h2 className="text-lg font-bold">Follow us</h2>
          <ul>
            <li>
              <Link
                href="https://x.com/talentra1"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="pajamas:twitter" className="h-4 w-4" />
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/company/talentra1/"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="pajamas:linkedin" className="h-4 w-4" />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/talentra1"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="mdi:instagram" className="h-4 w-4" />
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/people/Talentra/61574976399379/"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="ic:baseline-facebook" className="h-4 w-4" />
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="https://www.tiktok.com/@talentra1"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon icon="ic:baseline-tiktok" className="h-4 w-4" />
                Tiktok
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me/+971507092468"
                target="_blank"
                className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
              >
                <Icon
                  icon="akar-icons:whatsapp-fill"
                  className="text-white-500 h-4 w-4"
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
              href="/cv-services"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              AI CV Builder
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 hover:text-slate-300 hover:underline"
            >
              About Talentra
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
