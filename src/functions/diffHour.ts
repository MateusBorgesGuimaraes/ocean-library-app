export const diffHour = (date: string) => {
  const targetDate = new Date(date);
  const currentTime = new Date();
  const diffInMs = targetDate.getTime() - currentTime.getTime();

  if (diffInMs > 0) {
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const remainingMinutes = diffInMinutes % 60;
    const remainingSeconds = diffInSeconds % 60;

    return `${diffInHours}:${remainingMinutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }.`;
  } else {
    return 'Due date expires';
  }
};
