// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Module } from '@nestjs/common';
import { DbModule, MmrService, StoreService } from '@subql/node-core';
import { ConfigureModule } from '../configure/configure.module';
import { ApiService } from '../indexer/api.service';
import { UnfinalizedBlocksService } from '../indexer/unfinalizedBlocks.service';
import { ForceCleanService } from './forceClean.service';
import { ReindexService } from './reindex.service';

@Module({
  providers: [
    StoreService,
    ReindexService,
    MmrService,
    ForceCleanService,
    UnfinalizedBlocksService,
    {
      // Used to work with DI for unfinalizedBlocksService but not used with reindex
      provide: ApiService,
      useFactory: () => undefined,
    },
  ],
  controllers: [],
})
export class ReindexFeatureModule {}

@Module({
  imports: [
    DbModule.forRoot(),
    ConfigureModule.register(),
    ReindexFeatureModule,
  ],
  controllers: [],
})
export class ReindexModule {}
