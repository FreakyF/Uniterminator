import {CreateParallelizeOperationDto} from './create-parallelize-operation-dto';
import {CreateEliminateOperationDto} from './create-eliminate-operation-dto';

export interface CreateSnapshotDto {
  snapshotName: string;
  parallelizeOperation?: CreateParallelizeOperationDto;
  eliminateOperation?: CreateEliminateOperationDto;
}
