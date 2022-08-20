import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
const config = {
  name: 'vfastmongo',
  connector: 'mongodb',
  host: process.env.DB_MONGO_HOST,
  port: parseInt(process.env.DB_MONGO_PORT ?? '27017'),
  user: process.env.DB_MONGO_USER,
  password: process.env.DB_MONGO_PASSWORD,
  database: process.env.DB_MONGO_DATABASE,
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class VfastmongoDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'vfastmongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.vfastmongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
