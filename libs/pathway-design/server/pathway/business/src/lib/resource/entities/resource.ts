import { uuidv7 } from 'uuidv7';
import { ResourceIdValueObject } from '../value-objects/resource-id.value-object';
import type { ResourceUrlValueObject } from '../value-objects/resource-url.value-object';
import type { InitializeResourceParams } from './resource.types';

export class ResourceEntity {
    #resourceId: ResourceIdValueObject | undefined;
    #url: ResourceUrlValueObject | undefined;

    get resourceId() {
        return this.#resourceId?.value ?? '';
    }

    get url() {
        return this.#url?.value ?? '';
    }

    initialize({ url }: InitializeResourceParams) {
        this.#resourceId = new ResourceIdValueObject(uuidv7());
        this.#url = url;
    }
}
