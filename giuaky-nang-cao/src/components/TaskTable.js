import TaskRow from './TaskRow';

const TaskTable = ({ tasks, onToggle, onDelete }) => (
  <>
    <table>
      <thead>
        <tr>
          <th>Công việc</th>
          <th>Người làm</th>
          <th>Ưu tiên</th>
          <th>Số giờ</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
    {tasks.length === 0 && <p className="empty">Không có dữ liệu</p>}
  </>
);

export default TaskTable;
