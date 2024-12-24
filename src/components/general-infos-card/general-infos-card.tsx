import styles from './general-infos-card.module.css'
import { GeneralInfosContent } from './general-infos-content'
import { GeneralInfosFooter } from './general-infos-footer'

type GeneralInfosCardProps = {
  children?: React.ReactNode
}

export const GeneralInfosCard = ({ children }: GeneralInfosCardProps) => {
  return (
    <div className={styles.generalCardContainer}>
      {children}
    </div>
  )
}

GeneralInfosCard.Content = GeneralInfosContent;
GeneralInfosCard.Footer = GeneralInfosFooter;