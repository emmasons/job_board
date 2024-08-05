import { cookies } from "next/dist/client/components/headers";

export const getLocalChatId = () => {
  const visitorId = cookies().get("visitorId")?.value;
  if (!visitorId) {
    const newLocalChartId = crypto.randomUUID();
    cookies().set("visitorId", newLocalChartId, {
      maxAge: 60 * 60 * 24 * 365,
    });
    return newLocalChartId;
  }
  return visitorId;
};
