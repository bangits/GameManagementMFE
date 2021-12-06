import { Game } from '@/domain/entities';
import { PagedResult } from '@atom/common';

export class GetGameResponseModel extends PagedResult<Game> {}
