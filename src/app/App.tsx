import { useEffect, useRef, useState } from 'react';
import { AssignmentBoard } from '../features/assignments/components/AssignmentBoard';
import { AssignmentForm } from '../features/assignments/components/AssignmentForm';
import { AssignmentStats } from '../features/assignments/components/AssignmentStats';
import { DeleteAssignmentDialog } from '../features/assignments/components/DeleteAssignmentDialog';
import { DeadlineNotice } from '../features/assignments/components/DeadlineNotice';
import { useAssignments } from '../features/assignments/hooks/useAssignments';
import type {
  Assignment,
  AssignmentFormValues,
} from '../features/assignments/types';
import { Icon } from '../shared/components/Icon';
import { ThemeToggle } from '../shared/components/ThemeToggle';
import { Sidebar } from './components/Sidebar';

export function App() {
  const tracker = useAssignments();
  const [pendingDelete, setPendingDelete] = useState<Assignment | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(
    null,
  );
  const [notice, setNotice] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  const todayLabel = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(tracker.today);

  function focusForm() {
    // Wait for React to mount the form for the selected assignment before focusing it.
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'center',
      });
      formRef.current?.querySelector('input')?.focus({ preventScroll: true });
    });
  }

  function startEdit(assignment: Assignment) {
    setEditingAssignment(assignment);
    focusForm();
  }

  function saveAssignment(values: AssignmentFormValues) {
    if (editingAssignment) {
      tracker.update(editingAssignment.id, values);
      setEditingAssignment(null);
      setNotice(`Đã cập nhật “${values.title.trim()}”.`);
    } else {
      tracker.add(values);
      setNotice(`Đã thêm “${values.title.trim()}”.`);
    }
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    tracker.remove(pendingDelete.id);
    if (editingAssignment?.id === pendingDelete.id) setEditingAssignment(null);
    setNotice(`Đã xoá “${pendingDelete.title}”.`);
    setPendingDelete(null);
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <Sidebar counts={tracker.counts} courseCount={tracker.courses.length} />
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            Không gian cá nhân<span>/</span>
            <strong>Bài tập</strong>
          </div>
          <div className="topbar-actions">
            <span className="local-indicator">
              <i />
              Lưu trên trình duyệt
            </span>
            <ThemeToggle />
          </div>
        </header>
        <main id="main-content" className="main-content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">SẮP XẾP HÔM NAY, CHỦ ĐỘNG NGÀY MAI</p>
              <h1>
                Deadline của bạn<span>.</span>
              </h1>
              <p className="page-subtitle">
                Theo dõi bài tập, giữ nhịp học tập của riêng mình.
              </p>
            </div>
            <button
              className="button button-primary"
              type="button"
              onClick={() => {
                setEditingAssignment(null);
                focusForm();
              }}
            >
              <Icon name="plus" />
              Thêm bài tập
            </button>
          </section>
          <div className="today-line">
            <Icon name="calendar" />
            <time>{todayLabel}</time>
            <span className="today-divider" />
            {tracker.busy
              ? 'Đang tải danh sách…'
              : `${tracker.counts.pending} bài tập đang chờ hoàn thành`}
          </div>
          <AssignmentStats
            counts={tracker.counts}
            filter={tracker.filter}
            onFilterChange={tracker.setFilter}
          />
          <DeadlineNotice count={tracker.dueSoonCount} />
          <div className="content-grid">
            <AssignmentBoard
              items={tracker.visibleItems}
              counts={tracker.counts}
              filter={tracker.filter}
              today={tracker.today}
              busy={tracker.busy}
              error={tracker.error}
              nextAssignment={tracker.nextAssignment}
              editingId={editingAssignment?.id}
              query={tracker.query}
              courses={tracker.filterCourses}
              hasQuery={tracker.hasQuery}
              onQueryChange={tracker.changeQuery}
              onResetFilters={tracker.resetFilters}
              onFilterChange={tracker.setFilter}
              onRetry={tracker.retry}
              onToggle={tracker.toggle}
              onEdit={startEdit}
              onDelete={setPendingDelete}
            />
            <div className="form-column" ref={formRef}>
              <AssignmentForm
                key={editingAssignment?.id ?? 'create'}
                assignment={editingAssignment}
                onSave={saveAssignment}
                onCancel={() => setEditingAssignment(null)}
                disabled={tracker.busy}
                courses={tracker.courses}
              />
              <p className="required-note">* Các thông tin bắt buộc</p>
            </div>
          </div>
          <footer className="app-footer">
            <span>Student Deadline Tracker</span>
            <span>LTWNC · Bài thực hành 01 · RIPT1411-20261-01</span>
          </footer>
        </main>
      </div>
      {pendingDelete && (
        <DeleteAssignmentDialog
          assignment={pendingDelete}
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
      <div className="toast-region" aria-live="polite" aria-atomic="true">
        {notice && (
          <div className="toast">
            <span className="toast-icon">
              <Icon name="check" />
            </span>
            <p>{notice}</p>
            <button
              type="button"
              className="icon-button"
              aria-label="Đóng thông báo"
              onClick={() => setNotice('')}
            >
              <Icon name="close" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
