import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

const normalize = (text) => text.normalize('NFC').toLowerCase();

const TaskList = ({ tasks, onToggle, onDelete }) => {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('Tất cả');

  const keyword = normalize(search.trim());

  const filteredTasks = tasks.filter((task) => {
    const matchTitle = normalize(task.title).includes(keyword);
    const matchPriority = priority === 'Tất cả' || task.priority === priority;
    return matchTitle && matchPriority;
  });

  return (
    <section>
      <FilterBar
        search={search}
        priority={priority}
        onSearchChange={setSearch}
        onPriorityChange={setPriority}
      />
      <p className="count">{`Tìm thấy ${filteredTasks.length} công việc`}</p>
      <TaskTable tasks={filteredTasks} onToggle={onToggle} onDelete={onDelete} />
    </section>
  );
};

export default TaskList;
