import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VfastmongoDataSource} from '../datasources';
import {Service, ServiceRelations} from '../models';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.id,
  ServiceRelations
> {
  constructor(
    @inject('datasources.vfastmongo') dataSource: VfastmongoDataSource,
  ) {
    super(Service, dataSource);
  }
}
