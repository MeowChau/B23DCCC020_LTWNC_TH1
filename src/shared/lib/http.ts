import type { ApiResponse, TypeGuard } from '../types/api';
import { isRecord } from './guards';

function isApiResponse<T>(
  value: unknown,
  isData: TypeGuard<T>,
): value is ApiResponse<T> {
  return (
    isRecord(value) && typeof value.message === 'string' && isData(value.data)
  );
}

export async function requestJson<T>(
  url: string,
  isData: TypeGuard<T>,
  signal?: AbortSignal,
): Promise<ApiResponse<T>> {
  const response = await fetch(url, { signal });
  if (!response.ok)
    throw new Error(
      `Không tải được danh sách bài tập (HTTP ${response.status}).`,
    );
  const payload: unknown = await response.json();
  if (!isApiResponse(payload, isData))
    throw new Error('Dữ liệu API không đúng định dạng.');
  return payload;
}
