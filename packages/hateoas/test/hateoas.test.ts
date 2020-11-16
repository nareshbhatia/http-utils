import {
    Order,
    order1,
    order1CollectionModelWireFormat,
    order1EntityModelWireFormat,
} from '../mock-data';
import { CollectionModel, EntityModel } from '../src';

const newEntityModel = () => {
    const entityModel = new EntityModel<Order>(order1);
    entityModel.addLinks({
        self: { href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6' },
        approveOrder: {
            href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
        },
        rejectOrder: {
            href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
        },
        cancelOrder: {
            href: '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6',
        },
    });
    return entityModel;
};

describe('hateoas', () => {
    it('EntityModel can be created from an entity', () => {
        const entityModel = new EntityModel<Order>(order1);
        entityModel.addLink(
            'self',
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        entityModel.addLink(
            'approveOrder',
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        entityModel.addLink(
            'rejectOrder',
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        entityModel.addLink(
            'cancelOrder',
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );

        expect(entityModel.getEntity()).toEqual(order1);
        expect(entityModel.getLink('approveOrder')?.href).toBe(
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        expect(entityModel.hasLink('approveOrder')).toBe(true);
    });

    it('EntityModel can be serialized', () => {
        const entityModel = newEntityModel();
        const result = entityModel.serialize();
        expect(result).toEqual(order1EntityModelWireFormat);
    });

    it('EntityModel can be deserialized', () => {
        const entityModel = EntityModel.deserialize<Order>(
            order1EntityModelWireFormat
        );

        expect(entityModel.getEntity()).toEqual(order1);
        expect(entityModel.getLink('approveOrder')?.href).toBe(
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        expect(entityModel.hasLink('approveOrder')).toBe(true);
    });

    it('CollectionModel can be created from entities', () => {
        const collectionModel = new CollectionModel<Order>();

        // add a link
        collectionModel.addLink('self', '/orders');

        // add an EntityModel
        collectionModel.addEntityModel(newEntityModel());

        // verify entity model inside collection model
        const collection = collectionModel.getCollection();
        expect(collection.length).toBe(1);
        const entityModel = collection[0];
        expect(entityModel.getEntity()).toEqual(order1);
        expect(entityModel.getLink('approveOrder')?.href).toBe(
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        expect(entityModel.hasLink('approveOrder')).toBe(true);

        // verify link inside collection model
        expect(collectionModel.getLink('self')?.href).toBe('/orders');
    });

    it('CollectionModel can be serialized', () => {
        const collectionModel = new CollectionModel<Order>();
        collectionModel.addLink('self', '/orders');
        collectionModel.addEntityModel(newEntityModel());
        const result = collectionModel.serialize('orders');
        expect(result).toEqual(order1CollectionModelWireFormat);
    });

    it('CollectionModel can be deserialized', () => {
        const collectionModel = CollectionModel.deserialize<Order>(
            order1CollectionModelWireFormat,
            'orders'
        );

        // verify entity model inside collection model
        const collection = collectionModel.getCollection();
        expect(collection.length).toBe(1);
        const entityModel = collection[0];
        expect(entityModel.getEntity()).toEqual(order1);
        expect(entityModel.getLink('approveOrder')?.href).toBe(
            '/orders/f95244e6-1a1a-51ea-8c9a-0bca651329c6'
        );
        expect(entityModel.hasLink('approveOrder')).toBe(true);

        // verify link inside collection model
        expect(collectionModel.getLink('self')?.href).toBe('/orders');
    });
});
