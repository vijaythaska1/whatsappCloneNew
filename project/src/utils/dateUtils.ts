import { format, formatDistanceToNow as formatDistance } from 'date-fns';

export const formatDistanceToNow = (date: Date) => {
  return formatDistance(date, new Date(), { addSuffix: true });
};

export { format };