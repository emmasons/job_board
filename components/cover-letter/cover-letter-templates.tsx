export interface TemplateContent {
  name: string;
  jobTitle: string;
  address: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  companyName: string;
  hiringManager: string;
  date?: string;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  content: (data: TemplateContent) => React.ReactNode;
}

export const templates: Template[] = [
  {
    id: "construction-template",
    name: "Construction Manager",
    preview: "/templates/construction.png",
    content: (data: TemplateContent) => (
      <div className="p-8">
        <div className="space-y-8">
          <div className="space-y-2 text-left">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-gray-600 uppercase text-sm">{data.jobTitle}</p>
          </div>

          <div className="space-y-1 text-left">
            <p>To: {data.hiringManager}</p>
            <p className="text-sm">{data.companyName}</p>
            <p>{data.date || new Date().toLocaleDateString()}</p>
          </div>

          <div className="flex gap-8">
            <div className="space-y-4 text-[0.95rem] basis-2/3 text-left">
              <p>Dear {data.hiringManager},</p>
              <div dangerouslySetInnerHTML={{ __html: data.coverLetter }} />
              <div className="mt-8 space-y-1">
                <p>Sincerely,</p>
                <p>{data.name}</p>
              </div>
            </div>

            <div className="text-left text-sm mb-6 basis-1/3">
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Address</p>
                  <p>{data.address}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Email</p>
                  <p>{data.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Phone Number</p>
                  <p>{data.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "manager-template",
    name: "IT Manager",
    preview: "/templates/modern.png",
    content: (data: TemplateContent) => (
      <div className="p-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-gray-600 uppercase text-sm">{data.jobTitle}</p>
          </div>

          <div className="flex justify-between text-sm gap-8 text-gray-600 border-b pb-4">
            <div className="space-y-1 flex basis-1/2 justify-between">
              <p className="font-bold">Address</p>
              <div className="text-left">
                <p>{data.address}</p>
              </div>
            </div>
            <div className="space-y-1 basis-1/2 text-left">
              <div className="flex gap-4 justify-between">
                <span className="font-bold">Phone: </span>
                <span>{data.phoneNumber}</span>
              </div>
              <div className="gap-4 flex justify-between">
                <span className="font-bold">Email: </span>
                <span>{data.email}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-left flex basis-1/3 gap-12">
            <div className="space-y-1 text-sm">
              <p>TO</p>
              <p className="font-bold">{data.hiringManager}</p>
              <p>{data.companyName}</p>
            </div>

            <div className="space-y-4 text-[0.9rem] basis-2/3">
              <p>Dear {data.hiringManager},</p>
              <div dangerouslySetInnerHTML={{ __html: data.coverLetter }} />
              <div className="mt-8 space-y-1">
                <p>Sincerely,</p>
                <p>{data.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "driver-template",
    name: "Driver",
    preview: "/templates/driver.png",
    content: (data: TemplateContent) => (
      <div className="p-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-gray-600 uppercase text-sm">{data.jobTitle}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 justify-between w-full">
              <span>{data.email}</span>
              <span>•</span>
              <span>{data.address}</span>
              <span>•</span>
              <span>{data.phoneNumber}</span>
            </div>
          </div>

          <div className="space-y-6 text-left text-[0.9rem]">
            <div className="space-y-1">
              <p>To: {data.hiringManager}</p>
              <p>{data.companyName}</p>
            </div>

            <div className="space-y-4">
              <p>Dear {data.hiringManager},</p>
              <div dangerouslySetInnerHTML={{ __html: data.coverLetter }} />
              <div className="mt-8">
                <p>Best regards,</p>
                <p>{data.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "nursing-template",
    name: "Professional Nurse",
    preview: "/templates/nurse.png",
    content: (data: TemplateContent) => (
      <div className="overflow-auto mx-auto p-8">
        <div className="space-y-6 flex gap-4">
          <div className="basis-1/3 space-y-4 border-r-2 pr-4 border-slate-600">
            <div className="font-bold text-2xl tracking-wider uppercase flex flex-col items-end">
              <p>{data.name.split(" ")[0]}</p>
              <p>{data.name.split(" ")[1]}</p>
              <p className="text-sm font-normal uppercase mt-2">
                {data.jobTitle}
              </p>
            </div>
            <div className="text-sm flex flex-col items-end">
              <div>To</div>
              <div>{data.hiringManager}</div>
              <div>{data.companyName}</div>
            </div>

            <div className="text-sm flex flex-col items-end">
              <div>From</div>
              <div>{data.name}</div>
              <div>{data.jobTitle}</div>
              <div>{data.email}</div>
            </div>
          </div>
          <div className="basis-2/3 text-left space-y-4 text-[0.9rem]">
            <p>Dear {data.hiringManager},</p>
            <div dangerouslySetInnerHTML={{ __html: data.coverLetter }} />
            <div className="mt-8">
              <div>Yours sincerely,</div>
              <div>{data.name}</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "teacher-template",
    name: "Science Teacher",
    preview: "/templates/science-teacher.png",
    content: (data: TemplateContent) => (
      <div className="p-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-gray-600">{data.jobTitle}</p>
          </div>

          <div className="flex gap-12 justify-between text-sm text-gray-600 border-b pb-4">
            <div className="flex justify-between basis-1/2">
              <p className="font-bold">ADDRESS</p>
              <div className="text-left">
                <p>{data.address}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between basis-1/2">
              <div className="flex gap-4 justify-between">
                <p className="font-bold">PHONE</p>
                <p>{data.phoneNumber}</p>
              </div>
              <div className="flex gap-4 justify-between">
                <p className="font-bold">EMAIL</p>
                <p>{data.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex gap-4 text-left">
            <div className="space-y-1 text-sm basis-1/3">
              <p>TO</p>
              <p>{data.hiringManager}</p>
              <p>{data.companyName}</p>
            </div>

            <div className="space-y-4 text-[0.9rem] basis-2/3">
              <p className="mb-4">Dear {data.hiringManager},</p>
              <div dangerouslySetInnerHTML={{ __html: data.coverLetter }} />
              <div className="mt-8 space-y-1">
                <p>Yours sincerely,</p>
                <p>{data.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}

export function renderTemplate(templateId: string, data: TemplateContent) {
  const template = getTemplateById(templateId);
  if (!template) return null;
  return template.content(data);
}
