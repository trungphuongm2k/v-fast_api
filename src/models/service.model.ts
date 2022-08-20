import {Entity, model, property} from '@loopback/repository';

@model()
export class Service extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  img?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<Service>) {
    super(data);
  }
}

export interface ServiceRelations {
  // describe navigational properties here
}

export type ServiceWithRelations = Service & ServiceRelations;
