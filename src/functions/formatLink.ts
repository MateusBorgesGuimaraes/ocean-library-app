const formatLink = (image: string, path: string): string => {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}/${image}`;
};

export default formatLink;
