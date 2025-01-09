import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell } from "lucide-react";

interface NotificationsProps {
  notifications: Array<{
    title: string;
    description: string;
  }>;
}

export const Notifications = ({ notifications }: NotificationsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Notifiche recenti</CardTitle>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification, index) => (
          <Alert key={index}>
            <AlertTitle>{notification.title}</AlertTitle>
            <AlertDescription>{notification.description}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};