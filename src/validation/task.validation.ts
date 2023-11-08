import { z } from 'zod';

// Task priority values
const PriorityValues = ['low', 'medium', 'high'] as const;

class TaskValidation {
  // Validation schema for creating a new task
  create = {
    body: z.object({
      user: z.string(),
      title: z.string(),
      description: z.string(),
      due_date: z.string(),
      priority: z.enum(PriorityValues),
    }),
  };

  // Validation schema for updating an existing task
  update = {
    params: z.object({
      id: z.string(),
    }),
    body: z.object({
      user: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      due_date: z.string().optional(),
      priority: z.enum(PriorityValues).optional(),
      completed: z.boolean().optional(),
      deleted: z.boolean().optional(),
    }),
  };

  // Validation schema for deleting a task
  delete = {
    params: z.object({
      id: z.string(),
    }),
  };

  // Validation schema for retrieving tasks with specific criteria
  find = {
    query: z.object({
      _id: z.string().optional(),
      user: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      due_date: z.string().optional(),
      priority: z.enum(PriorityValues).optional(),
      completed: z.string().optional(),
    }),
  };
}

export const taskValidation = new TaskValidation();
