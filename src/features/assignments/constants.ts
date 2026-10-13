import type { AssignmentFilter, Priority } from './types';

export const PRIORITIES: ReadonlyArray<{ value: Priority; label: string }> = [
  { value: 'low', label: 'Thấp' },
  { value: 'medium', label: 'Trung bình' },
  { value: 'high', label: 'Cao' },
];

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Thấp',
  medium: 'Trung bình',
  high: 'Cao',
};

interface FilterOption {
  value: AssignmentFilter;
  label: string;
  summaryLabel: string;
  icon: 'book' | 'clock' | 'flag' | 'check';
  hint: string;
}

export const FILTERS: ReadonlyArray<FilterOption> = [
  {
    value: 'all',
    label: 'Tất cả',
    summaryLabel: 'Tổng bài tập',
    icon: 'book',
    hint: 'Tất cả môn học',
  },
  {
    value: 'pending',
    label: 'Chưa hoàn thành',
    summaryLabel: 'Chưa hoàn thành',
    icon: 'clock',
    hint: 'Đang chờ bạn xử lý',
  },
  {
    value: 'overdue',
    label: 'Quá hạn',
    summaryLabel: 'Quá hạn',
    icon: 'flag',
    hint: 'Cần ưu tiên hoàn thành',
  },
  {
    value: 'completed',
    label: 'Đã hoàn thành',
    summaryLabel: 'Đã hoàn thành',
    icon: 'check',
    hint: 'Một việc bớt phải lo',
  },
];
