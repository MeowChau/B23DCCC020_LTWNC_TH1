import { useId } from 'react';
import { Icon } from '../../../shared/components/Icon';
import { PRIORITIES } from '../constants';
import { isPriority } from '../guards';
import type { AssignmentQuery } from '../types';

interface AssignmentFiltersProps {
  query: AssignmentQuery;
  courses: string[];
  active: boolean;
  onChange: <K extends keyof AssignmentQuery>(
    field: K,
    value: AssignmentQuery[K],
  ) => void;
  onReset: () => void;
}

export function AssignmentFilters({
  query,
  courses,
  active,
  onChange,
  onReset,
}: AssignmentFiltersProps) {
  const id = useId();
  return (
    <div
      className="search-toolbar"
      role="search"
      aria-label="Tìm kiếm và lọc bài tập"
    >
      <div className="search-field">
        <Icon name="search" />
        <label className="sr-only" htmlFor={`${id}-search`}>
          Tìm bài tập hoặc môn học
        </label>
        <input
          id={`${id}-search`}
          type="search"
          placeholder="Tìm tên bài tập hoặc môn học…"
          value={query.search}
          onChange={(event) => onChange('search', event.target.value)}
        />
        {query.search && (
          <button
            type="button"
            className="icon-button"
            aria-label="Xoá từ khoá tìm kiếm"
            onClick={() => onChange('search', '')}
          >
            <Icon name="close" />
          </button>
        )}
      </div>
      <div className="filter-controls">
        <div className="select-field">
          <label htmlFor={`${id}-course`}>Môn học</label>
          <div className="select-wrap">
            <select
              id={`${id}-course`}
              value={query.course}
              onChange={(event) => onChange('course', event.target.value)}
            >
              <option value="">Tất cả môn học</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <Icon name="chevron" />
          </div>
        </div>
        <div className="select-field">
          <label htmlFor={`${id}-priority`}>Độ ưu tiên</label>
          <div className="select-wrap">
            <select
              id={`${id}-priority`}
              value={query.priority}
              onChange={(event) => {
                const value = event.target.value;
                if (value === 'all' || isPriority(value))
                  onChange('priority', value);
              }}
            >
              <option value="all">Tất cả ưu tiên</option>
              {PRIORITIES.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
            <Icon name="chevron" />
          </div>
        </div>
        {active && (
          <button className="reset-filters" type="button" onClick={onReset}>
            <Icon name="close" />
            Xoá bộ lọc
          </button>
        )}
      </div>
    </div>
  );
}
