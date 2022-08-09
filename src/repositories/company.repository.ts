import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VfastmongoDataSource} from '../datasources';
import {Company, CompanyRelations} from '../models';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {
  constructor(
    @inject('datasources.vfastmongo') dataSource: VfastmongoDataSource,
  ) {
    super(Company, dataSource);
  }
}
