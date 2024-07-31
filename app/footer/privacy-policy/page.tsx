import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";
import Footer from "@/components/Footer";


const page = async () => {
  
  return <p>Privacy Policy</p>;
  
};

export default page;
