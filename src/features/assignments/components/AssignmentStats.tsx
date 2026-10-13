import { Icon } from '../../../shared/components/Icon';
import { FILTERS } from '../constants';
import type { AssignmentCounts, AssignmentFilter } from '../types';

interface AssignmentStatsProps {
  counts: AssignmentCounts;
  filter: AssignmentFilter;
  onFilterChange: (value: AssignmentFilter) => void;
}

export function AssignmentStats({
  counts,
  filter,
  onFilterChange,
}: AssignmentStatsProps) {
  return (
    <section className="stats-grid" aria-label="Thống kê bài tập">
      {FILTERS.map((option) => (
        <button
          key={option.value}
          className={`stat-card ${option.value} ${filter === option.value ? 'selected' : ''}`}
          onClick={() => onFilterChange(option.value)}
          type="button"
          aria-label={`${option.summaryLabel}: ${counts[option.value]}`}
          aria-pressed={filter === option.value}
        >
          <span className="stat-label">
            {option.summaryLabel}
            <span className="stat-icon">
              <Icon name={option.icon} />
            </span>
          </span>
          <strong>{String(counts[option.value]).padStart(2, '0')}</strong>
          <span className="stat-hint">{option.hint}</span>
        </button>
      ))}
    </section>
  );
}
