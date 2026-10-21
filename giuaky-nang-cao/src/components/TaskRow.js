import { Link } from 'react-router-dom';

const TaskRow = ({ task, onToggle, onDelete }) => {
  const { id, title, assignee, priority, hours, done } = task;

  return (
    <tr>
      <td>
        <Link to={`/tasks/${id}`} className={`task-link${done ? ' done' : ''}`}>
          {title}
        </Link>
      </td>
      <td>{assignee}</td>
      <td>{priority}</td>
      <td>{hours}</td>
      <td>{done ? 'Đã xong' : 'Đang làm'}</td>
      <td className="actions">
        <button type="button" onClick={() => onToggle(id)}>
          {done ? 'Làm lại' : 'Hoàn thành'}
        </button>
        <button type="button" className="danger" onClick={() => onDelete(id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
