import { CollectionModel } from '../src';
import { Order } from './Order';
import { order1EntityModel } from './orderEntityModel';

export const order1CollectionModel: CollectionModel<Order> = {
    collection: [order1EntityModel],
    _links: {
        self: { href: '/orders' },
    },
};
