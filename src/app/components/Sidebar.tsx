import type { AssignmentCounts } from '../../features/assignments/types';
import { Icon } from '../../shared/components/Icon';

interface SidebarProps {
  counts: AssignmentCounts;
  courseCount: number;
}

export function Sidebar({ counts, courseCount }: SidebarProps) {
  const completion = counts.all
    ? Math.round((counts.completed / counts.all) * 100)
    : 0;

  return (
    <aside className="sidebar" aria-label="Không gian cá nhân">
      <a className="brand" href="#main-content">
        <span className="brand-symbol">
          <Icon name="calendar" />
        </span>
        <span>
          Deadline<span>Student Tracker</span>
        </span>
      </a>
      <div className="workspace-label">KHÔNG GIAN HỌC TẬP</div>
      <a className="sidebar-link active" href="#assignments">
        <Icon name="grid" />
        Bài tập của tôi<span>{counts.all}</span>
      </a>
      <div className="sidebar-progress">
        <div className="side-progress-heading">
          <span>Tiến độ của bạn</span>
          <strong>{completion}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Tỷ lệ bài tập đã hoàn thành"
          aria-valuenow={completion}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${completion}%` }} />
        </div>
        <p>
          {counts.completed}/{counts.all} bài tập đã hoàn thành
        </p>
      </div>
      <div className="sidebar-user">
        <span className="avatar">SV</span>
        <div>
          <strong>Sinh viên</strong>
          <span>Deadline cá nhân · {courseCount} môn học</span>
        </div>
      </div>
    </aside>
  );
}
