import { Body, Controller, Post } from "@nestjs/common";
import { Get, Param, Patch } from "@nestjs/common/decorators";
import { CancelNotification } from "src/app/use-cases/cancel-notification";
import { CountRecipientNotification } from "src/app/use-cases/count-recipient-notification";
import { GetRecipientNotification } from "src/app/use-cases/get-recipient-notifications";
import { ReadNotification } from "src/app/use-cases/read-notifications";
import { SendNotification } from "src/app/use-cases/send-notification";
import { UnreadNotification } from "src/app/use-cases/unread-notification";
import { CreateNotificationBody } from "../dtos/create.notification.body";
import { NotificationViewModel } from "../view-models/notification-view-models";

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
    private unreadNotification: UnreadNotification
  ) {}

  @Patch(":id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get("count/from/:recipientId")
  async countFromRecipient(
    @Param("recipientId") recipientId: string
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get("from/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }
  @Patch(":id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(":id/unread")
  async unread(@Param("id") id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
