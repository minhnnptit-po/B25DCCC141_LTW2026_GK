import { useNavigate, useParams } from 'react-router-dom';
import WorkTimer from '../components/WorkTimer';

const TaskDetail = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((item) => item.id === Number(id));

  const goBack = () => navigate(-1);

  if (!task) {
    return (
      <section>
        <p>Không tìm thấy công việc</p>
        <button type="button" onClick={goBack}>
          Quay lại
        </button>
      </section>
    );
  }

  const { title, assignee, priority, hours, done } = task;

  return (
    <section className="detail">
      <p>{`Tên công việc: ${title}`}</p>
      <p>{`Người làm: ${assignee}`}</p>
      <p>{`Mức ưu tiên: ${priority}`}</p>
      <p>{`Số giờ: ${hours}`}</p>
      <p>{`Trạng thái: ${done ? 'Đã xong' : 'Đang làm'}`}</p>
      <WorkTimer key={task.id} />
      <button type="button" onClick={goBack}>
        Quay lại
      </button>
    </section>
  );
};

export default TaskDetail;
