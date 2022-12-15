import { Module } from "@nestjs/common";
import { CancelNotification } from "src/app/use-cases/cancel-notification";
import { CountRecipientNotification } from "src/app/use-cases/count-recipient-notification";
import { GetRecipientNotification } from "src/app/use-cases/get-recipient-notifications";
import { ReadNotification } from "src/app/use-cases/read-notifications";
import { SendNotification } from "src/app/use-cases/send-notification";
import { UnreadNotification } from "src/app/use-cases/unread-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    UnreadNotification,
    ReadNotification,
    GetRecipientNotification,
    CountRecipientNotification,
    CancelNotification,
  ],
})
export class HttpModule {}
