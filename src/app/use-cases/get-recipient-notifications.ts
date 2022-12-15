import { Injectable } from "@nestjs/common/decorators";
import { NotificationsRepository } from "../repositories/notifications-repository";
import "reflect-metadata";
import { Notification } from "../entities/notifications";

interface GetRecipientRequest {
  recipientId: string;
}

interface GetRecipientResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: GetRecipientRequest): Promise<GetRecipientResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
