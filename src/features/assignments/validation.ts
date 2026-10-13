import { isDateOnly } from '../../shared/lib/date';
import type { FormErrors } from '../../shared/hooks/useForm';
import { isPriority } from './guards';
import type { AssignmentFormValues } from './types';

export function validateAssignment(
  values: AssignmentFormValues,
): FormErrors<AssignmentFormValues> {
  const errors: FormErrors<AssignmentFormValues> = {};
  if (!values.course.trim()) errors.course = 'Nhập tên môn học.';
  else if (values.course.trim().length > 100)
    errors.course = 'Tên môn học tối đa 100 ký tự.';
  if (!values.title.trim()) errors.title = 'Nhập tên bài tập.';
  else if (values.title.trim().length > 200)
    errors.title = 'Tên bài tập tối đa 200 ký tự.';
  if (!isDateOnly(values.dueDate)) errors.dueDate = 'Chọn một ngày nộp hợp lệ.';
  if (!isPriority(values.priority)) errors.priority = 'Chọn độ ưu tiên hợp lệ.';
  return errors;
}
