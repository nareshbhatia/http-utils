import { FundId, OrderId, SecId, UserId } from './Identifiers';

export type Side = 'buy' | 'sell';

export type OrderType = 'market' | 'limit';

export type OrderStatus =
    | 'new'
    | 'pendingApproval'
    | 'approved'
    | 'rejected'
    | 'placed'
    | 'executed'
    | 'canceled';

export interface Order {
    id: OrderId;
    side: Side;
    secId: SecId;
    quantity: number;
    executed: number;
    type: OrderType;
    limitPrice?: number;
    status: OrderStatus;
    fundId: FundId;
    managerId: UserId;
    analystId?: UserId;
    traderId?: UserId;
    note: string;
}
