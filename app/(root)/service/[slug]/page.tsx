import { siteMetadata } from "@/lib/siteMetaData";
import { getServiceBySlug } from "@/actions/get-service-by-slug";
import { Preview } from "@/components/ckeditor/RichTextRenderer";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { notFound } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

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
    <MaxWidthWrapper className="bg-slate-100 p-4 font-sans md:px-0">
      <div className="mx-auto my-9 max-w-3xl rounded-md bg-white  p-2 shadow-lg">
        <div className="my-10  flex flex-col justify-between gap-[10%]   ">
          <div className="mb-2 flex flex-1 basis-[60%] flex-col items-center justify-center text-center">
            <h1 className="border-border-color border-b-2 border-zinc-400 text-3xl font-semibold leading-[2rem] tracking-wide md:mb-0 md:text-4xl">
              {service.title}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[10%] font-sans  md:flex-row">
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
