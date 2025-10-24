import { Module } from '@nestjs/common';
import { IndexNewPathwayACL } from '../../../application/index-new-pathway/Anti-corruption-layer/index-new-pathway.acl';

@Module({
    controllers: [],
    exports: [IndexNewPathwayACL],
    providers: [IndexNewPathwayACL],
})
export class SSPAAddPathwayApplicationModule {}
