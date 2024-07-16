import { beforeEach, describe, expect, mock, test } from 'bun:test';
import type { PathwayDesignServerPathwayBusinessEntitiesPathway } from '@bewoak/pathway-design-server-pathway-business';
import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { InitPathwayCommand } from '../commands/index.command';
import { InitPathwayService } from './index.service';

describe('InitPathwayService', () => {
    let service: InitPathwayService;
    let commandBus: CommandBus;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                InitPathwayService,
                {
                    provide: CommandBus,
                    useValue: {
                        execute: mock(() => Promise.resolve({})),
                    },
                },
            ],
        }).compile();

        service = module.get<InitPathwayService>(InitPathwayService);
        commandBus = module.get<CommandBus>(CommandBus);
    });

    describe('When I initialize a pathway', () => {
        let pathway: PathwayDesignServerPathwayBusinessEntitiesPathway;
        const initPathwayCommand = new InitPathwayCommand(
            'My pathway',
            'Pathway description',
            'biomedicine'
        );
        const result = {} as PathwayDesignServerPathwayBusinessEntitiesPathway;

        beforeEach(async () => {
            pathway = await service.init(initPathwayCommand);
        });

        test('should call commandBus.execute with the correct command', () => {
            expect(commandBus.execute).toHaveBeenCalledWith(initPathwayCommand);
        });

        test('should return the result from commandBus.execute', () => {
            expect(pathway).toStrictEqual(result);
        });
    });
});
