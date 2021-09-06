import { JustificationOption } from "./justification-option";
import { Role } from "./role";
import { StatusOption } from "./status-option";
import { User } from "./user";

export interface RequestTicket {
    ticketId: number;
    appUserId: User;
    businessJustification: JustificationOption;
    statusOption: StatusOption;
    date: Date;
    privileges: Role;
}