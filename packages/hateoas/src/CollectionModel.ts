import { EntityModel } from './EntityModel';
import { RepresentationModel } from './RepresentationModel';

/**
 * A collection of EntityModel instances.
 */
export interface CollectionModel<T> extends RepresentationModel {
    collection: Array<EntityModel<T>>;
}

function create<T>(): CollectionModel<T> {
    return {
        collection: [],
        _links: {},
    };
}

function getCollection<T>(
    collectionModel: CollectionModel<T>
): Array<EntityModel<T>> {
    return collectionModel.collection;
}

function addEntityModel<T>(
    collectionModel: CollectionModel<T>,
    entityModel: EntityModel<T>
) {
    collectionModel.collection.push(entityModel);
}

function serialize<T>(
    collectionModel: CollectionModel<T>,
    collectionName: string
) {
    const { _links, collection } = collectionModel;
    const result = {
        _embedded: {} as any,
        _links,
    };

    result._embedded[collectionName] = collection.map((entityModel) =>
        EntityModel.serialize(entityModel)
    );

    return result;
}

function deserialize<T>(json: any, collectionName: string): CollectionModel<T> {
    const { _links, _embedded } = json;
    const embeddedCollection = _embedded[collectionName];
    return {
        _links,
        collection: embeddedCollection.map((entityJson: any) =>
            EntityModel.deserialize(entityJson)
        ),
    };
}

/* eslint-disable @typescript-eslint/no-redeclare */
export const CollectionModel = {
    ...RepresentationModel,
    create,
    getCollection,
    addEntityModel,
    serialize,
    deserialize,
};
