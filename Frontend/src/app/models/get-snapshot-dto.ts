import {CreateSnapshotDto} from './create-snapshot-dto';
import {GetParallelizeOperationDto} from './get-parallelize-operation-dto';
import {GetEliminateOperationDto} from './get-eliminate-operation-dto';

export interface GetSnapshotDto extends Omit<CreateSnapshotDto, 'parallelizeOperation' | 'eliminateOperation'> {
  id: string;
  parallelizeOperation?: GetParallelizeOperationDto;
  eliminateOperation?: GetEliminateOperationDto;
}
