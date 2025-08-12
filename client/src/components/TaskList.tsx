import React, { useState, useEffect } from 'react';
import { Task } from '../types/types';
import { TaskService } from '../services/PublicApi';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await TaskService.getAll();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TaskService.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleFormSubmit = async () => {
    setEditingTask(null);
    await fetchTasks();
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="task-list">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>

      {editingTask ? (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <button
          onClick={() => setEditingTask({} as Task)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Task
        </button>
      )}

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;