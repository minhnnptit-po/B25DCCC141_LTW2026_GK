import { PRIORITIES } from '../data';

const FilterBar = ({ search, priority, onSearchChange, onPriorityChange }) => (
  <div className="filter-bar">
    <div className="field">
      <label htmlFor="search">Tìm kiếm</label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={({ target }) => onSearchChange(target.value)}
      />
    </div>
    <div className="field">
      <label htmlFor="filter-priority">Mức ưu tiên</label>
      <select
        id="filter-priority"
        value={priority}
        onChange={({ target }) => onPriorityChange(target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {PRIORITIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default FilterBar;
