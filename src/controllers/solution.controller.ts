import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Solution} from '../models';
import {SolutionRepository} from '../repositories';

export class SolutionController {
  constructor(
    @repository(SolutionRepository)
    public solutionRepository: SolutionRepository,
  ) {}

  @authenticate('jwt')
  @post('/solutions')
  @response(200, {
    description: 'Solution model instance',
    content: {'application/json': {schema: getModelSchemaRef(Solution)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solution, {
            title: 'NewSolution',
            exclude: ['id'],
          }),
        },
      },
    })
    solution: Omit<Solution, 'id'>,
  ): Promise<Solution> {
    return this.solutionRepository.create(solution);
  }

  @get('/solutions/count')
  @response(200, {
    description: 'Solution model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Solution) where?: Where<Solution>): Promise<Count> {
    return this.solutionRepository.count(where);
  }

  @get('/solutions')
  @response(200, {
    description: 'Array of Solution model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solution, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solution) filter?: Filter<Solution>,
  ): Promise<Solution[]> {
    return this.solutionRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/solutions')
  @response(200, {
    description: 'Solution PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solution, {partial: true}),
        },
      },
    })
    solution: Solution,
    @param.where(Solution) where?: Where<Solution>,
  ): Promise<Count> {
    return this.solutionRepository.updateAll(solution, where);
  }

  @get('/solutions/{id}')
  @response(200, {
    description: 'Solution model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solution, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Solution, {exclude: 'where'})
    filter?: FilterExcludingWhere<Solution>,
  ): Promise<Solution> {
    return this.solutionRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/solutions/{id}')
  @response(204, {
    description: 'Solution PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solution, {partial: true}),
        },
      },
    })
    solution: Solution,
  ): Promise<void> {
    await this.solutionRepository.updateById(id, solution);
  }

  @authenticate('jwt')
  @put('/solutions/{id}')
  @response(204, {
    description: 'Solution PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solution: Solution,
  ): Promise<void> {
    await this.solutionRepository.replaceById(id, solution);
  }

  @authenticate('jwt')
  @del('/solutions/{id}')
  @response(204, {
    description: 'Solution DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solutionRepository.deleteById(id);
  }
}
