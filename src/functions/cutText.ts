const cutText = (text: string, maxLength: number = 108): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text + '...';
};

export default cutText;
