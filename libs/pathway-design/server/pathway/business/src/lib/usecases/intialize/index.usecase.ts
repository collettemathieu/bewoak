import { pathwayFactory } from '../../factories/pathway';
import type { PathwayDesignServerPathwayBusinessPortsInitPathwayMemory } from '../../ports/initialize/index.memory';

export class PathwayDesignServerPathwayBusinessUsecasesInitPathway {
    execute(
        pathwayDesignServerPathwayBusinessPortsInitPathwayMemory: PathwayDesignServerPathwayBusinessPortsInitPathwayMemory,
        {
            title,
            description,
            researchField,
        }: {
            title: string;
            description: string;
            researchField: string;
        }
    ) {
        const pathway = pathwayFactory({
            title,
            description,
            researchField,
        });

        return pathwayDesignServerPathwayBusinessPortsInitPathwayMemory.save(
            pathway
        );
    }
}
