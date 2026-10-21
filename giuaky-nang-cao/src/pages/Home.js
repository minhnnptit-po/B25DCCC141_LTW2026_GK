const Home = ({ tasks }) => {
  const total = tasks.length;
  const doneCount = tasks.reduce((count, { done }) => (done ? count + 1 : count), 0);
  const remainingHours = tasks.reduce(
    (sum, { done, hours }) => (done ? sum : sum + hours),
    0
  );

  return (
    <section>
      <h1>Công việc nhóm</h1>
      <p>Chào mừng bạn đến với ứng dụng theo dõi tiến độ của cả nhóm.</p>
      <ul className="stats">
        <li>{`Tổng số công việc: ${total}`}</li>
        <li>{`Số công việc đã xong: ${doneCount}`}</li>
        <li>{`Tổng số giờ còn lại: ${remainingHours}`}</li>
      </ul>
    </section>
  );
};

export default Home;
