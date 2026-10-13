import { useId } from 'react';
import { Icon } from '../../../shared/components/Icon';
import { useForm } from '../../../shared/hooks/useForm';
import { PRIORITIES } from '../constants';
import type { Assignment, AssignmentFormValues } from '../types';
import { validateAssignment } from '../validation';

const emptyValues: AssignmentFormValues = {
  course: '',
  title: '',
  dueDate: '',
  priority: 'medium',
};

interface AssignmentFormProps {
  assignment: Assignment | null;
  onSave: (input: AssignmentFormValues) => void;
  onCancel: () => void;
  disabled: boolean;
  courses: string[];
}

export function AssignmentForm({
  assignment,
  onSave,
  onCancel,
  disabled,
  courses,
}: AssignmentFormProps) {
  const id = useId();
  const editing = assignment !== null;
  const initialValues: AssignmentFormValues = assignment
    ? {
        course: assignment.course,
        title: assignment.title,
        dueDate: assignment.dueDate,
        priority: assignment.priority,
      }
    : emptyValues;
  const form = useForm<AssignmentFormValues>({
    initialValues,
    validate: validateAssignment,
    onSubmit: onSave,
  });

  return (
    <section
      className={`form-card ${editing ? 'is-editing' : ''}`}
      aria-labelledby={`${id}-heading`}
    >
      {editing && <p className="form-mode-label">ĐANG CHỈNH SỬA</p>}
      <div className="form-heading">
        <span className="form-heading-icon">
          <Icon name={editing ? 'edit' : 'plus'} />
        </span>
        <div>
          <h2 id={`${id}-heading`}>
            {editing ? 'Sửa bài tập' : 'Thêm bài tập'}
          </h2>
          <p>
            {editing
              ? 'Cập nhật thông tin, giữ nguyên trạng thái hoàn thành.'
              : 'Một deadline mới, một bước chủ động hơn.'}
          </p>
        </div>
      </div>
      <form
        aria-label={editing ? 'Sửa bài tập' : 'Thêm bài tập'}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!disabled && form.handleSubmit(event) && !editing) form.reset();
        }}
      >
        <fieldset disabled={disabled}>
          <div className="field">
            <label htmlFor={`${id}-course`}>
              Môn học <span>*</span>
            </label>
            <input
              id={`${id}-course`}
              name="course"
              list={`${id}-courses`}
              placeholder="VD: Lập trình Web nâng cao"
              maxLength={100}
              value={form.values.course}
              onChange={(event) => form.setField('course', event.target.value)}
              aria-invalid={Boolean(form.errors.course)}
              aria-describedby={
                form.errors.course ? `${id}-course-error` : undefined
              }
              required
            />
            <datalist id={`${id}-courses`}>
              {courses.map((course) => (
                <option key={course} value={course} />
              ))}
            </datalist>
            {form.errors.course && (
              <p className="field-error" id={`${id}-course-error`} role="alert">
                {form.errors.course}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor={`${id}-title`}>
              Tên bài tập <span>*</span>
            </label>
            <input
              id={`${id}-title`}
              name="title"
              placeholder="Bạn cần hoàn thành điều gì?"
              maxLength={200}
              value={form.values.title}
              onChange={(event) => form.setField('title', event.target.value)}
              aria-invalid={Boolean(form.errors.title)}
              aria-describedby={
                form.errors.title ? `${id}-title-error` : undefined
              }
              required
            />
            {form.errors.title && (
              <p className="field-error" id={`${id}-title-error`} role="alert">
                {form.errors.title}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor={`${id}-dueDate`}>
              Hạn nộp <span>*</span>
            </label>
            <input
              id={`${id}-dueDate`}
              name="dueDate"
              type="date"
              value={form.values.dueDate}
              onChange={(event) => form.setField('dueDate', event.target.value)}
              aria-invalid={Boolean(form.errors.dueDate)}
              aria-describedby={
                form.errors.dueDate ? `${id}-dueDate-error` : undefined
              }
              required
            />
            {form.errors.dueDate && (
              <p
                className="field-error"
                id={`${id}-dueDate-error`}
                role="alert"
              >
                {form.errors.dueDate}
              </p>
            )}
          </div>
          <fieldset className="priority-field">
            <legend>Độ ưu tiên</legend>
            <div className="priority-choices">
              {PRIORITIES.map((priority) => (
                <label
                  key={priority.value}
                  className={`priority-choice ${priority.value} ${form.values.priority === priority.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`${id}-priority`}
                    value={priority.value}
                    checked={form.values.priority === priority.value}
                    onChange={() => form.setField('priority', priority.value)}
                  />
                  <span className="priority-dot" />
                  {priority.label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="form-actions">
            {editing && (
              <button
                className="button button-secondary"
                type="button"
                onClick={onCancel}
              >
                Huỷ
              </button>
            )}
            <button className="button button-primary form-submit" type="submit">
              <Icon name={editing ? 'check' : 'plus'} />
              {editing ? 'Lưu thay đổi' : 'Thêm bài tập'}
            </button>
          </div>
        </fieldset>
      </form>
      <div className="form-tip">
        <Icon name="clock" />
        <p>
          Hạn nộp được tính theo ngày. Bài đến hạn hôm nay vẫn chưa được tính là
          quá hạn.
        </p>
      </div>
    </section>
  );
}
