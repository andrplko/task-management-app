import { Document, MongoError, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { connection } from './../index';
import Todo from '../models/todo.model';
import { transformSortOption } from '../utils/transformSortOption';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const collection = connection.collections.todo;
    const {
      status = 'All',
      search = '',
      sort = '',
      page = '1',
      limit = '5',
    } = req.query;

    const pipeline: Document[] = [];

    if (search) {
      pipeline.push({
        $search: {
          text: {
            query: search,
            path: ['title', 'description'],
          },
        },
      });
    }

    if (status !== 'All') {
      pipeline.push({ $match: { status } });
    }

    if (sort) {
      const transformedSortOption = transformSortOption(sort);
      if (transformedSortOption) {
        pipeline.push(transformedSortOption);
      }
    }

    pipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          {
            $skip: (Number(page) - 1) * Number(limit),
          },
          {
            $limit: Number(limit),
          },
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              status: 1,
            },
          },
        ],
      },
    });

    const [{ metadata, data }] = await collection.aggregate(pipeline).toArray();
    const countOfTodos = metadata[0]?.total || 0;

    res.status(200).json({
      results: data,
      pagination: {
        count: countOfTodos,
        page: Number(page),
        pages: Math.ceil(countOfTodos / Number(limit)),
      },
    });
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const collection = connection.collections.todo;
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne<Todo>(query);

    if (!result) {
      res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo: Todo = req.body;
    const collection = connection.collections.todo;
    const result = await collection.insertOne(newTodo);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const collection = connection.collections.todo;
    const updatedTodo: Todo = req.body;
    const query = { _id: new ObjectId(req.params.id) };

    const result = await collection.updateOne(query, { $set: updatedTodo });
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const collection = connection.collections.todo;
    const query = { _id: new ObjectId(req.params.id) };

    const result = await collection.deleteOne(query);
    res.status(204).json(result);
  } catch (error) {
    if (error instanceof MongoError) {
      res.status(500).json({ message: error.message });
    }
  }
};
