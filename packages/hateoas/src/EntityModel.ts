import { RepresentationModel } from './RepresentationModel';

/** A resource that’s backed by a singular object or concept */
export interface EntityModel<T> extends RepresentationModel {
    entity: T;
}

function create<T>(entity: T): EntityModel<T> {
    return {
        _links: {},
        entity,
    };
}

function getEntity<T>(entityModel: EntityModel<T>): T {
    return entityModel.entity;
}

function serialize<T>(entityModel: EntityModel<T>) {
    const { _links, entity } = entityModel;
    return {
        ...entity,
        _links,
    };
}

function deserialize<T>(json: any): EntityModel<T> {
    const { _links, ...rest } = json;
    return {
        _links,
        entity: rest,
    };
}

/* eslint-disable @typescript-eslint/no-redeclare */
export const EntityModel = {
    addLink: RepresentationModel.addLink,
    addLinks: RepresentationModel.addLinks,
    getLink: RepresentationModel.getLink,
    hasLink: RepresentationModel.hasLink,
    create,
    getEntity,
    serialize,
    deserialize,
};