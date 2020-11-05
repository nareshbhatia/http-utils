import { EntityModel } from '../src';
import { Order } from './Order';
import { order1 } from './order1';

export const order1EntityModel: EntityModel<Order> = {
    entity: order1,
    _links: {
        self: { href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6' },
        approveOrder: { href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6' },
        rejectOrder: { href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6' },
        cancelOrder: { href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6' },
    },
};
