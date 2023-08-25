import { toast } from 'react-toastify';
import axiosConfig from '../config/axiosConfig';
import { clearEmptyValues } from '../utils';
const url = 'todos/';

export const getAllTodos = (setTodoList, params) => {
  const cleanParams = clearEmptyValues(params);
  axiosConfig
    .get(url, { params: cleanParams })
    .then((res) => {
      if (res.status === 200) {
        setTodoList(res.data);
      }
    })
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data.error || 'Unable to fetch todos');
      }
    });
};

export const addNewTodo = (data) => {
  axiosConfig
    .post('todos/', data)
    .then((res) => {
      if (res.status === 201) {
        toast.success('Todo has been added successfully');
      }
    })
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data.error || 'Something went wrong, cannot add todo.');
      }
    });
};

export const removeTodo = (todoId) => {
  axiosConfig
    .delete(`todos/${todoId}`)
    .then((res) => {
      if (res.status === 200) {
        toast.success('Todo has been deleted successfully');
      }
    })
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data.error || 'Something went wrong, cannot delete todo.');
      }
    });
};

export const editTodo = (todoId, data) => {
  axiosConfig
    .put(`todos/${todoId}`, data)
    .then((res) => {
      if (res.status === 200) {
        toast.success('Todo has been Updated successfully');
      }
    })
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data.error || 'Something went wrong, cannot update todo.');
      }
    });
};
