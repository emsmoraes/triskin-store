import { toast } from "sonner";

interface ErrorMessageProps {
  message: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function ErrorMessage({
  message,
  description,
  actionLabel,
  onActionClick,
}: ErrorMessageProps) {
  return toast.error(message, {
    description,
    action: actionLabel
      ? {
          label: actionLabel,
          onClick: onActionClick ?? (() => {}),
        }
      : undefined,
  });
}
