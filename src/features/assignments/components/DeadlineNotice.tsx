import { Icon } from '../../../shared/components/Icon';
import { DUE_SOON_DAYS } from '../deadline';

export function DeadlineNotice({ count }: { count: number }) {
  if (!count) return null;
  return (
    <div className="deadline-notice" role="status">
      <span className="notice-icon">
        <Icon name="clock" />
      </span>
      <div>
        <strong>{count} bài tập sắp đến hạn</strong>
        <p>
          Hạn nộp trong hôm nay hoặc {DUE_SOON_DAYS} ngày tới. Dành một chút
          thời gian cho chúng nhé.
        </p>
      </div>
      <span className="notice-tag">ĐỪNG BỎ LỠ</span>
    </div>
  );
}
