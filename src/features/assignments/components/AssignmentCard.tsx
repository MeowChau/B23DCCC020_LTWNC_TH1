import { Icon } from '../../../shared/components/Icon';
import { formatDueDate } from '../../../shared/lib/date';
import { PRIORITY_LABELS } from '../constants';
import { getDeadlineInfo, isDueSoon } from '../deadline';
import type { Assignment } from '../types';

interface AssignmentCardProps {
  assignment: Assignment;
  today: Date;
  disabled: boolean;
  editing: boolean;
  onToggle: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
  onDelete: (assignment: Assignment) => void;
}

export function AssignmentCard({
  assignment,
  today,
  disabled,
  editing,
  onToggle,
  onEdit,
  onDelete,
}: AssignmentCardProps) {
  const deadline = getDeadlineInfo(assignment.dueDate, today);
  const dueSoon = isDueSoon(assignment, today);
  const overdue = !assignment.completed && deadline.kind === 'overdue';
  return (
    <li
      className={`assignment-row ${assignment.completed ? 'is-completed' : ''} ${dueSoon ? 'is-due-soon' : ''} ${overdue ? 'is-overdue' : ''} ${editing ? 'is-editing' : ''}`}
    >
      <div className="assignment-main">
        <label className="completion-check">
          <input
            type="checkbox"
            checked={assignment.completed}
            disabled={disabled}
            onChange={() => onToggle(assignment.id)}
            aria-label={`${assignment.completed ? 'Bỏ đánh dấu hoàn thành' : 'Đánh dấu hoàn thành'}: ${assignment.title}`}
          />
          <span className="check-box">
            <Icon name="check" />
          </span>
        </label>
        <div className="assignment-copy">
          <h3>{assignment.title}</h3>
          <p className="course-name">
            <Icon name="book" />
            {assignment.course}
          </p>
          <div className="assignment-status">
            <span
              className={`completion-label ${assignment.completed ? 'done' : ''}`}
            >
              {assignment.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </span>
            {dueSoon && (
              <span className="due-soon-badge">
                <Icon name="clock" />
                Sắp đến hạn
              </span>
            )}
            {editing && <span className="editing-badge">Đang sửa</span>}
          </div>
        </div>
      </div>
      <div className="assignment-due">
        <span className="due-date">
          <Icon name="calendar" />
          {formatDueDate(assignment.dueDate)}
        </span>
        <span
          className={`deadline-label ${assignment.completed ? 'completed' : deadline.kind}`}
        >
          {deadline.label}
        </span>
      </div>
      <div className="assignment-priority">
        <span className={`priority-badge ${assignment.priority}`}>
          <span className="priority-dot" />
          {PRIORITY_LABELS[assignment.priority]}
        </span>
      </div>
      <div className="assignment-actions">
        <button
          className="edit-button"
          type="button"
          disabled={disabled}
          aria-label={`Sửa bài tập: ${assignment.title}`}
          title="Sửa bài tập"
          onClick={() => onEdit(assignment)}
        >
          <Icon name="edit" />
        </button>
        <button
          className="delete-button"
          type="button"
          disabled={disabled}
          aria-label={`Xoá bài tập: ${assignment.title}`}
          title="Xoá bài tập"
          onClick={() => onDelete(assignment)}
        >
          <Icon name="trash" />
        </button>
      </div>
    </li>
  );
}
