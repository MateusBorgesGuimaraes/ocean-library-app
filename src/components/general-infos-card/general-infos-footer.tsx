import styles from './general-infos-card.module.css'

type GeneralInfosFooterProps = {
  children?: React.ReactNode
}

export const GeneralInfosFooter = ({ children }: GeneralInfosFooterProps) => {
  return (
      <div className={styles.generalCardFooter}>
        {children}
      </div>
  )
}