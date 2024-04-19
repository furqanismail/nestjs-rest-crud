import { Injectable } from '@nestjs/common';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoModel: Repository<TodoEntity>,
  ) {}

  async getAll() {
    const getPost = await this.todoModel.find();
    return getPost;
  }

  async getDetail(uuid: string) {
    const getDetailPost = await this.todoModel.findOne({
      where: {
        uuid,
      },
    });
  }
}
