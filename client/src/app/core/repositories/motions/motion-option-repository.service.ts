import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DataSendService } from 'app/core/core-services/data-send.service';
import { RelationManagerService } from 'app/core/core-services/relation-manager.service';
import { ViewModelStoreService } from 'app/core/core-services/view-model-store.service';
import { RelationDefinition } from 'app/core/definitions/relations';
import { MotionOption } from 'app/shared/models/motions/motion-option';
import { ViewMotionOption } from 'app/site/motions/models/view-motion-option';
import { ViewMotionPoll } from 'app/site/motions/models/view-motion-poll';
import { ViewMotionVote } from 'app/site/motions/models/view-motion-vote';
import { BaseRepository } from '../base-repository';
import { CollectionStringMapperService } from '../../core-services/collection-string-mapper.service';
import { DataStoreService } from '../../core-services/data-store.service';

const MotionOptionRelations: RelationDefinition[] = [
    {
        type: 'O2M',
        foreignIdKey: 'option_id',
        ownKey: 'votes',
        foreignViewModel: ViewMotionVote
    },
    {
        type: 'M2O',
        ownIdKey: 'poll_id',
        ownKey: 'poll',
        foreignViewModel: ViewMotionPoll
    }
];

/**
 * Repository Service for Options.
 *
 * Documentation partially provided in {@link BaseRepository}
 */
@Injectable({
    providedIn: 'root'
})
export class MotionOptionRepositoryService extends BaseRepository<ViewMotionOption, MotionOption, object> {
    public constructor(
        DS: DataStoreService,
        dataSend: DataSendService,
        mapperService: CollectionStringMapperService,
        viewModelStoreService: ViewModelStoreService,
        translate: TranslateService,
        relationManager: RelationManagerService
    ) {
        super(
            DS,
            dataSend,
            mapperService,
            viewModelStoreService,
            translate,
            relationManager,
            MotionOption,
            MotionOptionRelations
        );
    }

    public getTitle = (titleInformation: object) => {
        return 'Option';
    };

    public getVerboseName = (plural: boolean = false) => {
        return this.translate.instant(plural ? 'Options' : 'Option');
    };
}
