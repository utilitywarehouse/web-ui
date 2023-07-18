import { useId } from 'react';
import { uwWebUiPrefix } from '../utils';

interface UseIdsProps {
  providedId?: string;
  providedLabelId?: string;
  providedHelperTextId?: string;
  providedErrorMessageId?: string;
  componentPrefix?: string;
}

export const useIds = ({
  providedId,
  providedLabelId,
  providedHelperTextId,
  providedErrorMessageId,
  componentPrefix,
}: UseIdsProps) => {
  const generatedId = useId();
  const prefix = componentPrefix ? `${uwWebUiPrefix}-${componentPrefix}` : uwWebUiPrefix;
  const defaultId = `${prefix}-${generatedId}`;
  const id = providedId || defaultId;
  const labelId = providedLabelId || `${defaultId}-label`;
  const helperTextId = providedHelperTextId || `${defaultId}-helper-text`;
  const errorMessageId = providedErrorMessageId || `${defaultId}-error-message`;
  return { id, labelId, helperTextId, errorMessageId };
};
