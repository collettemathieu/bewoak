import {
    PATHWAY_DESIGN_SERVER_PATHWAY_BUSINESS_PORTS_INIT_PATHWAY_MEMORY,
    PathwayDesignServerPathwayBusinessEntitiesPathway,
    type PathwayDesignServerPathwayBusinessPortsInitPathwayMemory,
} from '@bewoak/pathway-design-server-pathway-business';

import { type Mock, beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { Test } from '@nestjs/testing';

import { PathwayDesignServerPathwayBusinessUsecasesInitPathway } from '@bewoak/pathway-design-server-pathway-business';
import { type Observable, firstValueFrom, of } from 'rxjs';
import { InitPathwayCommand } from './index.command';
import { InitPathwayCommandHandler } from './index.command-handler';

class InitPathwayMemory
    implements PathwayDesignServerPathwayBusinessPortsInitPathwayMemory
{
    save(
        pathwayDesignServerPathwayBusinessEntitiesPathway: PathwayDesignServerPathwayBusinessEntitiesPathway
    ): Observable<PathwayDesignServerPathwayBusinessEntitiesPathway> {
        return of(pathwayDesignServerPathwayBusinessEntitiesPathway);
    }
}

describe('InitPathwayCommandHandler', () => {
    let initPathwayCommandHandler: InitPathwayCommandHandler;
    let pathwayDesignServerPathwayBusinessUsecasesInitPathway: PathwayDesignServerPathwayBusinessUsecasesInitPathway;
    let initPathwayMemory: PathwayDesignServerPathwayBusinessPortsInitPathwayMemory;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                InitPathwayMemory,
                InitPathwayCommandHandler,
                {
                    provide:
                        PATHWAY_DESIGN_SERVER_PATHWAY_BUSINESS_PORTS_INIT_PATHWAY_MEMORY,
                    useExisting: InitPathwayMemory,
                },
                PathwayDesignServerPathwayBusinessUsecasesInitPathway,
            ],
        }).compile();

        initPathwayCommandHandler = module.get<InitPathwayCommandHandler>(
            InitPathwayCommandHandler
        );
        pathwayDesignServerPathwayBusinessUsecasesInitPathway =
            module.get<PathwayDesignServerPathwayBusinessUsecasesInitPathway>(
                PathwayDesignServerPathwayBusinessUsecasesInitPathway
            );
        initPathwayMemory =
            module.get<PathwayDesignServerPathwayBusinessPortsInitPathwayMemory>(
                PATHWAY_DESIGN_SERVER_PATHWAY_BUSINESS_PORTS_INIT_PATHWAY_MEMORY
            );
    });

    test('should be defined', () => {
        expect(initPathwayCommandHandler).toBeDefined();
    });

    describe('I want to initialize a pathway from a command', () => {
        const command = new InitPathwayCommand(
            'pathway description',
            'research field',
            'pathway title'
        );
        let pathway: PathwayDesignServerPathwayBusinessEntitiesPathway;
        let pathwayDesignServerPathwayBusinessUsecasesInitPathwayExecuteSpy: Mock<
            (
                initPathwayMemory: PathwayDesignServerPathwayBusinessPortsInitPathwayMemory,
                {
                    title,
                    description,
                    researchField,
                }: {
                    title: string;
                    description: string;
                    researchField: string;
                }
            ) => Observable<PathwayDesignServerPathwayBusinessEntitiesPathway>
        >;

        beforeEach(async () => {
            pathwayDesignServerPathwayBusinessUsecasesInitPathwayExecuteSpy =
                spyOn(
                    pathwayDesignServerPathwayBusinessUsecasesInitPathway,
                    'execute'
                );
            pathway = await firstValueFrom(
                initPathwayCommandHandler.execute(command)
            );
        });

        test('should call the usecase in order to initiate the pathway', async () => {
            expect(
                pathwayDesignServerPathwayBusinessUsecasesInitPathwayExecuteSpy
            ).toHaveBeenCalledTimes(1);
            expect(
                pathwayDesignServerPathwayBusinessUsecasesInitPathwayExecuteSpy
            ).toHaveBeenCalledWith(initPathwayMemory, {
                title: command.title,
                description: command.description,
                researchField: command.researchField,
            });
        });

        test('should return a pathway', async () => {
            expect(pathway).toBeDefined();
            expect(pathway).toBeInstanceOf(
                PathwayDesignServerPathwayBusinessEntitiesPathway
            );
        });

        test('should return a pathway with the correct data', async () => {
            expect(pathway.title?.value).toBe(command.title);
            expect(pathway.description?.value).toBe(command.description);
            expect(pathway.researchField?.value).toBe(command.researchField);
        });
    });

    describe('I want to initialize a pathway from another command', () => {
        const command = new InitPathwayCommand(
            'My pathway description',
            'pharmacology',
            'My pathway'
        );
        let pathway: PathwayDesignServerPathwayBusinessEntitiesPathway;

        beforeEach(async () => {
            pathway = await firstValueFrom(
                initPathwayCommandHandler.execute(command)
            );
        });

        test('should return a pathway with the correct data', async () => {
            expect(pathway.title?.value).toBe(command.title);
            expect(pathway.description?.value).toBe(command.description);
            expect(pathway.researchField?.value).toBe(command.researchField);
        });
    });
});
