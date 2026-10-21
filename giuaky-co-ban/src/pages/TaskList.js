import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, onToggle, onDelete }) => (
  <section>
    <TaskTable tasks={tasks} onToggle={onToggle} onDelete={onDelete} />
  </section>
);

export default TaskList;
