import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VfastmongoDataSource} from '../datasources';
import {Solution, SolutionRelations} from '../models';

export class SolutionRepository extends DefaultCrudRepository<
  Solution,
  typeof Solution.prototype.id,
  SolutionRelations
> {
  constructor(
    @inject('datasources.vfastmongo') dataSource: VfastmongoDataSource,
  ) {
    super(Solution, dataSource);
  }
}
