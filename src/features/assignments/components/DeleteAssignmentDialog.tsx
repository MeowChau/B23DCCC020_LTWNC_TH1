import { useEffect, useRef } from 'react';
import { Icon } from '../../../shared/components/Icon';
import type { Assignment } from '../types';

interface DeleteAssignmentDialogProps {
  assignment: Assignment;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteAssignmentDialog({
  assignment,
  onCancel,
  onConfirm,
}: DeleteAssignmentDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="delete-dialog"
      aria-labelledby="delete-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
    >
      <span className="dialog-icon">
        <Icon name="trash" />
      </span>
      <h2 id="delete-dialog-title">Xoá bài tập này?</h2>
      <p>“{assignment.title}” sẽ được xoá khỏi danh sách của bạn.</p>
      <div className="dialog-actions">
        <button
          className="button button-secondary"
          type="button"
          autoFocus
          onClick={onCancel}
        >
          Giữ lại
        </button>
        <button
          className="button button-danger"
          type="button"
          onClick={onConfirm}
        >
          Xoá bài tập
        </button>
      </div>
    </dialog>
  );
}
