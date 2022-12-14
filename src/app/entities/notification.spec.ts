import { Content } from "./content";
import { Notification } from "./notifications";

describe("Notification ", () => {
  it("should be able to create a notification", () => {
    const notification = new Notification({
      content: new Content("Nova solcitação de amizade"),
      category: "social",
      recipientId: "example-recipentId",
    });
    expect(notification).toBeTruthy();
  });
});
