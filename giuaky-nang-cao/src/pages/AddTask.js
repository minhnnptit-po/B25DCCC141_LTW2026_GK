import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIORITIES } from '../data';

const AddTask = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Trung bình');
  const [hours, setHours] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanAssignee = assignee.trim();
    const cleanHours = String(hours).trim();

    if (!cleanTitle || !cleanAssignee || cleanHours === '') {
      setMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const hoursNumber = Number(cleanHours);

    if (!Number.isInteger(hoursNumber) || hoursNumber < 1 || hoursNumber > 40) {
      setMessage('Số giờ phải từ 1 đến 40');
      return;
    }

    onAdd({ title: cleanTitle, assignee: cleanAssignee, priority, hours: hoursNumber });
    navigate('/tasks', { replace: true });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="title">Tên công việc</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="assignee">Người làm</label>
          <input
            id="assignee"
            type="text"
            value={assignee}
            onChange={({ target }) => setAssignee(target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="priority">Mức ưu tiên</label>
          <select
            id="priority"
            value={priority}
            onChange={({ target }) => setPriority(target.value)}
          >
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="hours">Số giờ ước tính</label>
          <input
            id="hours"
            type="number"
            value={hours}
            onChange={({ target }) => setHours(target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
      {message && <p className="error">{message}</p>}
    </section>
  );
};

export default AddTask;
