import { makeNotification } from "../../../test/factories/notification-factory";
import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entities/content";
import { Notification } from "../entities/notifications";
import { GetRecipientNotification } from "./get-recipient-notifications";

describe("Get recipients notifications ", () => {
  it("should be able to get recipient notifications", async () => {
    const notificationsRepository = new inMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: "recipient-1",
    });
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: "recipient-1" }),
        expect.objectContaining({ recipientId: "recipient-1" }),
      ])
    );
  });
});
