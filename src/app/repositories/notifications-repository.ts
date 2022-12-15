import { Notification } from "../entities/notifications";

export abstract class NotificationsRepository {
  abstract create(notifications: Notification): Promise<void>;
  abstract findbyId(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}
