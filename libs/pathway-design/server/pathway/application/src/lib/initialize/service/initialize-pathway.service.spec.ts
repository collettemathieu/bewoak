import { beforeEach, describe, expect, mock, test } from 'bun:test';
import type { PDSPBEPathwayEntity } from '@bewoak/pathway-design-server-pathway-business';
import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { PDSPAInitializePathwayCommand } from '../command/initialize-pathway.command';
import { PDSPAInitializePathwayService } from './initialize-pathway.service';

describe('PDSPAInitializePathwayService', () => {
    let service: PDSPAInitializePathwayService;
    let commandBus: CommandBus;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PDSPAInitializePathwayService,
                {
                    provide: CommandBus,
                    useValue: {
                        execute: mock(() => Promise.resolve({})),
                    },
                },
            ],
        }).compile();

        service = module.get<PDSPAInitializePathwayService>(
            PDSPAInitializePathwayService
        );
        commandBus = module.get<CommandBus>(CommandBus);
    });

    describe('When I initialize a pathway', () => {
        let pathway: PDSPBEPathwayEntity;
        const PDSPAinitPathwayCommand = new PDSPAInitializePathwayCommand(
            'My pathway',
            'Pathway description',
            'biomedicine'
        );
        const result = {} as PDSPBEPathwayEntity;

        beforeEach(async () => {
            pathway = await service.init(PDSPAinitPathwayCommand);
        });

        test('should call commandBus.execute with the correct command', () => {
            expect(commandBus.execute).toHaveBeenCalledWith(
                PDSPAinitPathwayCommand
            );
        });

        test('should return the result from commandBus.execute', () => {
            expect(pathway).toStrictEqual(result);
        });
    });
});
