import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VfastmongoDataSource} from '../datasources';
import {Partner, PartnerRelations} from '../models';

export class PartnerRepository extends DefaultCrudRepository<
  Partner,
  typeof Partner.prototype.id,
  PartnerRelations
> {
  constructor(
    @inject('datasources.vfastmongo') dataSource: VfastmongoDataSource,
  ) {
    super(Partner, dataSource);
  }
}
