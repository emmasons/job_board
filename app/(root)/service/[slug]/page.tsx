import { siteMetadata } from "@/lib/siteMetaData";
import { getServiceBySlug } from "@/actions/get-service-by-slug";
import { Preview } from "@/components/ckeditor/RichTextRenderer";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { notFound } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Services",
};

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return;
  }


  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      url: siteMetadata.siteUrl + service.slug,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
  };
}

const Service = async ({ params }: Props) => {
  const { slug } = params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return notFound();
  }

  const imageMetadata = await getLatestFileMetaData(service.id);

  return (
    <MaxWidthWrapper className="p-4 md:px-0 font-sans bg-slate-100">
        <div className="max-w-3xl my-9 mx-auto bg-white p-2  shadow-lg rounded-md">
      <div className="my-10  flex flex-col justify-between gap-[10%]   ">
        <div className="flex flex-1 flex-col justify-center items-center text-center basis-[60%] mb-2">
          <h1 className="border-border-color border-b-2 border-zinc-400 text-3xl font-semibold leading-[2rem] tracking-wide md:text-4xl md:mb-0">
            {service.title}
          </h1>
        </div>


      </div>
      <div className="font-sans flex justify-center items-center flex-col gap-[10%]  md:flex-row">

        <div className="basis-[80%]">

          <div className="mb-4 font-mono">
            <Preview value={service.description || ""} />
          </div>


        </div>
      </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Service;
