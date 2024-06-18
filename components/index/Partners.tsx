import Image from "next/image";

const logos = [
  {
    src:"/index/partners/1.gif",
    alt:"1"
  },
  {
    src:"/index/partners/2.gif",
    alt:"2"
  },
  {
    src:"/index/partners/3.gif",
    alt:"3"
  },
  {
    src:"/index/partners/4.gif",
    alt:"4"
  },
  {
    src:"/index/partners/5.gif",
    alt:"5"
  },
  {
    src:"/index/partners/6.png",
    alt:"6"
  },
  {
    src:"/index/partners/7.gif",
    alt:"7"
  },
  {
    src:"/index/partners/8.gif",
    alt:"8"
  },
  {
    src:"/index/partners/9.gif",
    alt:"9"
  },
]

const Partners = () => {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-semibold mt-12 mb-4 text-gray-900">Join Top Employers</h1>
        <p>Some of the companies we have helped recruit excellent applicants over the years.</p>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-2'>
          {logos.map((logo) => (
            <div key={logo.src} className="flex items-center p-2 justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={60}
                height={60}
                className="h-[60px] w-auto object-contain"
              />
            </div>
          ))}
        </div>
    </div>
  )
}

export default Partners