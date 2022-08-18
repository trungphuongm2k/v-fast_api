import {Entity, model, property} from '@loopback/repository';

@model()
export class Policy extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  content?: string;

  constructor(data?: Partial<Policy>) {
    super(data);
  }
}

export interface PolicyRelations {
  // describe navigational properties here
}

export type PolicyWithRelations = Policy & PolicyRelations;
