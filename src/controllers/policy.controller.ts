import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Policy} from '../models';
import {PolicyRepository} from '../repositories';

export class PolicyController {
  constructor(
    @repository(PolicyRepository)
    public policyRepository : PolicyRepository,
  ) {}

  @post('/policies')
  @response(200, {
    description: 'Policy model instance',
    content: {'application/json': {schema: getModelSchemaRef(Policy)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Policy, {
            title: 'NewPolicy',
            exclude: ['id'],
          }),
        },
      },
    })
    policy: Omit<Policy, 'id'>,
  ): Promise<Policy> {
    return this.policyRepository.create(policy);
  }

  @get('/policies/count')
  @response(200, {
    description: 'Policy model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Policy) where?: Where<Policy>,
  ): Promise<Count> {
    return this.policyRepository.count(where);
  }

  @get('/policies')
  @response(200, {
    description: 'Array of Policy model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Policy, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Policy) filter?: Filter<Policy>,
  ): Promise<Policy[]> {
    return this.policyRepository.find(filter);
  }

  @patch('/policies')
  @response(200, {
    description: 'Policy PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Policy, {partial: true}),
        },
      },
    })
    policy: Policy,
    @param.where(Policy) where?: Where<Policy>,
  ): Promise<Count> {
    return this.policyRepository.updateAll(policy, where);
  }

  @get('/policies/{id}')
  @response(200, {
    description: 'Policy model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Policy, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Policy, {exclude: 'where'}) filter?: FilterExcludingWhere<Policy>
  ): Promise<Policy> {
    return this.policyRepository.findById(id, filter);
  }

  @patch('/policies/{id}')
  @response(204, {
    description: 'Policy PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Policy, {partial: true}),
        },
      },
    })
    policy: Policy,
  ): Promise<void> {
    await this.policyRepository.updateById(id, policy);
  }

  @put('/policies/{id}')
  @response(204, {
    description: 'Policy PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() policy: Policy,
  ): Promise<void> {
    await this.policyRepository.replaceById(id, policy);
  }

  @del('/policies/{id}')
  @response(204, {
    description: 'Policy DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.policyRepository.deleteById(id);
  }
}
