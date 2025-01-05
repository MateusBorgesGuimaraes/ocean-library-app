type GeneralInfosContentItemProps = {
  label: string;
  content: string;
};

export const GeneralInfosContentItem = ({
  label,
  content,
}: GeneralInfosContentItemProps) => {
  return (
    <li>
      <span>{label}:</span>
      <p>{content}</p>
    </li>
  );
};
