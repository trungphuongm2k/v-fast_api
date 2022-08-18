import {Entity, model, property} from '@loopback/repository';

@model()
export class Partner extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  img?: string;

  @property({
    type: 'string',
  })
  url?: string;


  constructor(data?: Partial<Partner>) {
    super(data);
  }
}

export interface PartnerRelations {
  // describe navigational properties here
}

export type PartnerWithRelations = Partner & PartnerRelations;
