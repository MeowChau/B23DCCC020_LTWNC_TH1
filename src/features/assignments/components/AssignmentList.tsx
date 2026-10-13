import { Icon } from '../../../shared/components/Icon';
import type { Assignment, AssignmentFilter } from '../types';
import { AssignmentCard } from './AssignmentCard';

interface AssignmentListProps {
  items: Assignment[];
  filter: AssignmentFilter;
  hasQuery: boolean;
  editingId?: string;
  today: Date;
  disabled: boolean;
  onToggle: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
  onDelete: (assignment: Assignment) => void;
}

export function AssignmentList({
  items,
  filter,
  hasQuery,
  editingId,
  ...props
}: AssignmentListProps) {
  if (!items.length)
    return (
      <div className="empty-state">
        <span className="empty-icon">
          <Icon
            name={
              hasQuery ? 'search' : filter === 'completed' ? 'check' : 'book'
            }
          />
        </span>
        <h3>
          {hasQuery
            ? 'Không tìm thấy bài tập'
            : filter === 'all'
              ? 'Chưa có bài tập nào'
              : filter === 'overdue'
                ? 'Không có bài tập quá hạn'
                : 'Không có bài tập trong bộ lọc này'}
        </h3>
        <p>
          {hasQuery
            ? 'Thử một từ khoá khác hoặc xoá bộ lọc để xem thêm bài tập.'
            : filter === 'all'
              ? 'Thêm bài tập đầu tiên bằng form bên cạnh.'
              : filter === 'overdue'
                ? 'Bạn đang theo kịp các deadline. Tiếp tục duy trì nhé!'
                : 'Chọn bộ lọc khác để xem các bài tập còn lại.'}
        </p>
      </div>
    );
  return (
    <>
      <div className="list-head" aria-hidden="true">
        <span>BÀI TẬP / MÔN HỌC</span>
        <span>HẠN NỘP</span>
        <span>ƯU TIÊN</span>
        <span />
      </div>
      <ul className="assignment-list">
        {items.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            editing={assignment.id === editingId}
            {...props}
          />
        ))}
      </ul>
      <div className="list-foot">
        <span>{items.length} bài tập</span>
        <span>Ưu tiên bài chưa xong và hạn nộp gần nhất</span>
      </div>
    </>
  );
}
