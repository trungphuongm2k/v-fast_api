import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VfastmongoDataSource} from '../datasources';
import {Policy, PolicyRelations} from '../models';

export class PolicyRepository extends DefaultCrudRepository<
  Policy,
  typeof Policy.prototype.id,
  PolicyRelations
> {
  constructor(
    @inject('datasources.vfastmongo') dataSource: VfastmongoDataSource,
  ) {
    super(Policy, dataSource);
  }
}
