import { formatDistanceToNow, parseISO } from "date-fns";

const formatPublishDate = (dateString: string): string => {
  const date = parseISO(dateString);
  const distance = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: false,
  });

  return distance;
};

// React component
const TimeDisplay: React.FC<{ publishDate: string }> = ({ publishDate }) => {
  return (
    <time dateTime={new Date(publishDate).toISOString()}>
      Released: {formatPublishDate(publishDate)}
    </time>
  );
};

export { formatPublishDate, TimeDisplay };
