import Image from "next/image";

const logos = [
  {
    src: "/index/partners/1.gif",
    alt: "1",
    location: "Abu Dhabi: UAE",
  },
  {
    src: "/index/partners/2.gif",
    alt: "2",
    location: "sharjah: Dubai",
  },
  {
    src: "/index/partners/3.gif",
    alt: "3",
    location: "Doha: Qatar",
  },
  {
    src: "/index/partners/4.gif",
    alt: "4",
    location: "Middle East: Saudi Arabia",
  },
  {
    src: "/index/partners/5.gif",
    alt: "5",
    location: "Dubai: United Arab Emirates",
  },
  {
    src: "/index/partners/6.png",
    alt: "6",
    location: "Al Khobar, Saudi Arabia",
  },
  {
    src: "/index/partners/7.gif",
    alt: "7",
    location: "Dubai: United Arab Emirates",
  },
  {
    src: "/index/partners/8.gif",
    alt: "8",
    location: "Dubai: United Arab Emirates",
  },
  {
    src: "/index/partners/9.gif",
    alt: "9",
    location: "Abu Dhabi: United Arab Emirates",
  },
];
const Partners = () => {
  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-16">
      <h1 className="mb-4 mt-12 text-3xl font-semibold text-gray-900">
        Join Top Employers
      </h1>
      <p className="mb-6 text-gray-700">
        Some of the companies we have helped recruit excellent applicants over
        the years.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {logos.map((logo) => (
          <div
            key={logo.src}
            className="flex h-36 flex-col items-center justify-center rounded-lg border bg-white p-4 shadow-lg"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={70}
              height={80}
              className="mb-4 h-[60px] w-auto object-contain"
            />
            <p className="text-center text-gray-800">{logo.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
