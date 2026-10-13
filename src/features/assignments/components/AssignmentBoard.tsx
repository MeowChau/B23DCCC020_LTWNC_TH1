import { Icon } from '../../../shared/components/Icon';
import { Tabs } from '../../../shared/components/Tabs';
import { FILTERS } from '../constants';
import { getDeadlineInfo } from '../deadline';
import { isAssignmentFilter } from '../guards';
import type {
  Assignment,
  AssignmentCounts,
  AssignmentFilter,
  AssignmentQuery,
} from '../types';
import { AssignmentFilters } from './AssignmentFilters';
import { AssignmentList } from './AssignmentList';

interface AssignmentBoardProps {
  items: Assignment[];
  counts: AssignmentCounts;
  filter: AssignmentFilter;
  today: Date;
  busy: boolean;
  error: string | null;
  nextAssignment?: Assignment;
  editingId?: string;
  query: AssignmentQuery;
  courses: string[];
  hasQuery: boolean;
  onQueryChange: <K extends keyof AssignmentQuery>(
    field: K,
    value: AssignmentQuery[K],
  ) => void;
  onResetFilters: () => void;
  onFilterChange: (filter: AssignmentFilter) => void;
  onRetry: () => void;
  onToggle: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
  onDelete: (assignment: Assignment) => void;
}

export function AssignmentBoard({
  items,
  counts,
  filter,
  today,
  busy,
  error,
  nextAssignment,
  editingId,
  query,
  courses,
  hasQuery,
  onQueryChange,
  onResetFilters,
  onFilterChange,
  onRetry,
  onToggle,
  onEdit,
  onDelete,
}: AssignmentBoardProps) {
  const nextDeadline = nextAssignment
    ? getDeadlineInfo(nextAssignment.dueDate, today)
    : null;

  return (
    <section
      className="assignments-section"
      id="assignments"
      aria-labelledby="assignments-heading"
    >
      <div className="section-heading">
        <div>
          <h2 id="assignments-heading">
            Danh sách bài tập <span>{counts.all}</span>
          </h2>
          <p>
            Chọn ô đánh dấu để hoàn thành, hoặc sửa thông tin bất cứ lúc nào.
          </p>
        </div>
        <span className="sort-note">
          <Icon name="clock" />
          Hạn nộp gần nhất
        </span>
      </div>
      <AssignmentFilters
        query={query}
        courses={courses}
        active={hasQuery || filter !== 'all'}
        onChange={onQueryChange}
        onReset={onResetFilters}
      />
      <Tabs.Root
        value={filter}
        onValueChange={(value) => {
          if (isAssignmentFilter(value)) onFilterChange(value);
        }}
      >
        <Tabs.List className="filter-tabs" aria-label="Lọc theo trạng thái">
          {FILTERS.map((option) => (
            <Tabs.Trigger key={option.value} value={option.value}>
              {option.label}
              <span>{counts[option.value]}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {error && (
          <div className="error-banner" role="alert">
            <div>
              <strong>Chưa tải được danh sách</strong>
              <p>{error}</p>
            </div>
            <button
              className="button button-secondary"
              type="button"
              onClick={onRetry}
              disabled={busy}
            >
              Thử lại
            </button>
          </div>
        )}
        <div className="results-summary" aria-live="polite" aria-atomic="true">
          <span>
            Hiển thị <strong>{items.length}</strong> / {counts.all} bài tập
          </span>
          <span>
            {hasQuery
              ? 'Đang áp dụng tìm kiếm / bộ lọc'
              : 'Sắp xếp theo hạn nộp'}
          </span>
        </div>
        {busy && !counts.all ? (
          <div className="loading-state" role="status">
            <span className="spinner" />
            <p>Đang tải bài tập mẫu…</p>
            {[1, 2, 3].map((id) => (
              <div className="skeleton-row" key={id} />
            ))}
          </div>
        ) : (
          FILTERS.map((option) => (
            <Tabs.Panel key={option.value} value={option.value}>
              <AssignmentList
                items={items}
                filter={option.value}
                hasQuery={hasQuery}
                editingId={editingId}
                today={today}
                disabled={busy}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Tabs.Panel>
          ))
        )}
      </Tabs.Root>
      {nextAssignment && nextDeadline && (
        <div className="next-deadline">
          <span className="next-icon">
            <Icon name="flag" />
          </span>
          <div>
            <span>BÀI TẬP CẦN CHÚ Ý</span>
            <p>{nextAssignment.title}</p>
          </div>
          <strong className={nextDeadline.kind}>{nextDeadline.label}</strong>
        </div>
      )}
    </section>
  );
}
