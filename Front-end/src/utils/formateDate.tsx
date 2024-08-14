
import { useMemo } from 'react';

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // ou qualquer formato que desejar
}