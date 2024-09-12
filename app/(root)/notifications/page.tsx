"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { cn, fetcher } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NotificationList from "@/components/notifications/NotificationList";
import { redirect } from "next/navigation";
import { Ghost, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notification, NOTIFICATION_TYPES } from "@prisma/client";
import { getNotificationHeading } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const NotificationsPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
  const url = `/api/notifications/recipient/${session?.user.id}/all/`;
  const { data, isLoading, error } = useSWR(url, fetcher);
  const notifications = data as Notification[] | null;
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[] | null
  >(null);
  const [activeTab, setActiveTab] = useState<
    NOTIFICATION_TYPES | string | null | undefined
  >("");

  const filterNotificationsByType = (type?: NOTIFICATION_TYPES) => {
    setActiveTab(type);

    console.log(activeTab);
    if (!type) {
      setActiveTab("");
      setFilteredNotifications(notifications || []);
    } else {
      setFilteredNotifications(
        (notifications || []).filter(
          (notification) => notification.type === type,
        ),
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <Loader2 className="h-4 w-4 animate-spin" />;
      </div>
    );
  }
  if (notifications && notifications.length <= 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <Ghost className="size-8 text-gray-500" />
        <p className="text-[0.8rem] text-gray-500">
          You do not have any notifications at the moment.
        </p>
      </div>
    );
  }
  if (notifications && notifications.length > 0) {
    return (
      <MaxWidthWrapper className="py-4">
        <div className="py-4">
          <h1 className="text-2xl font-bold text-primary">
            Notifications ({notifications.length})
          </h1>
        </div>
        <div className="space-y-4 bg-slate-100 p-8">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="default"
              className="cursor-pointer text-orange-100"
              onClick={() => filterNotificationsByType(undefined)}
            >
              <span className="text-sm text-slate-900">All</span>
            </Badge>
            {Object.values(NOTIFICATION_TYPES).map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className={cn(
                  "cursor-pointer text-orange-100",
                  activeTab?.toString() === type.toString() && "bg-orange-900",
                )}
                onClick={() =>
                  filterNotificationsByType(type as NOTIFICATION_TYPES)
                }
              >
                <span
                  className={cn(
                    "text-sm text-amber-900",
                    activeTab?.toString() === type.toString() &&
                      "font-bold text-amber-500 hover:text-amber-700",
                  )}
                >
                  {getNotificationHeading(type)}
                </span>
              </Badge>
            ))}
          </div>
          <div>
            {filteredNotifications ? (
              <NotificationList
                allNotifications={filteredNotifications}
                userId={session?.user?.id}
              />
            ) : (
              <NotificationList
                allNotifications={notifications}
                userId={session?.user?.id}
              />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }
};

export default NotificationsPage;
