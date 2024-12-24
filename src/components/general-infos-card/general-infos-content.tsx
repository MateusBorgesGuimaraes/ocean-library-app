import styles from './general-infos-card.module.css'
import { GeneralInfosContentItem } from './general-infos-content-item'

type GeneralInfosContentProps = {
  children?: React.ReactNode
}

export const GeneralInfosContent = ({ children }: GeneralInfosContentProps) => {
  return (
      <ul className={styles.generalCardContent}>
        {children}
      </ul>
  )
}

GeneralInfosContent.ContentItem = GeneralInfosContentItem;