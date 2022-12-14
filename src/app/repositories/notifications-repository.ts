import { Notification } from "../entities/notifications";

export abstract class NotificationsRepository {
  abstract create(notifications: Notification): Promise<void>;
}
