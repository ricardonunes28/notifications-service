import { makeNotification } from "../../../test/factories/notification-factory";
import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entities/content";
import { Notification } from "../entities/notifications";
import { CountRecipientNotification } from "./count-recipient-notification";

describe("Count notification ", () => {
  it("should be able to count recipient notification", async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepository
    );

    await notificationsRepository.create(
      new Notification({
        category: "social",
        content: new Content("Nova Solicitação de amizade"),
        recipientId: "example-recipient-id",
      })
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-1" })
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-1" })
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: "recipient-2" })
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });
    expect(count).toEqual(2);
  });
});
