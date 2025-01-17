import { randomUUID } from 'crypto';
import { ResourceIdValueObject } from '../value-objects/resource-id.value-object';
import type { ResourceUrlValueObject } from '../value-objects/resource-url.value-object';
import type { InitializeResourceParams } from './resource.types';

export class ResourceEntity {
    #id: ResourceIdValueObject | undefined;
    #url: ResourceUrlValueObject | undefined;

    get id() {
        return this.#id?.value ?? '';
    }

    get url() {
        return this.#url?.value ?? '';
    }

    initialize({ url }: InitializeResourceParams) {
        this.#id = new ResourceIdValueObject(randomUUID());
        this.#url = url;
    }
}
