import { GeneralInfosCard } from '@/components/general-infos-card/general-infos-card'
import styles from './user-request.module.css'
import { TitleHeader } from "@/components/title-header/title-header"
import { Button } from '@/components/button/button'
import Image from 'next/image'
import { icons } from '../../../../../public/assets/assets'

export const UserRequest = () => {
  return (
    <div className={styles.userRequestContainer}>
      <TitleHeader title="Users Requests" />
      <div className={styles.cardContainer}>
        <GeneralInfosCard>
          <GeneralInfosCard.Content> 
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
          </GeneralInfosCard.Content>
          <GeneralInfosCard.Footer>
            <Button fontSize='1rem' background='#055A8C' color='#fff' padding='.25rem 1.125rem'>viewed <Image src={icons.eyeViewIcon} alt="eye view icon" /></Button>
          </GeneralInfosCard.Footer>
        </GeneralInfosCard>

        <GeneralInfosCard>
          <GeneralInfosCard.Content> 
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
          </GeneralInfosCard.Content>
          <GeneralInfosCard.Footer>
            <Button fontSize='1rem' background='#055A8C' color='#fff' padding='.25rem 1.125rem'>viewed <Image src={icons.eyeViewIcon} alt="eye view icon" /></Button>
          </GeneralInfosCard.Footer>
        </GeneralInfosCard>

        <GeneralInfosCard>
          <GeneralInfosCard.Content> 
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
            <GeneralInfosCard.Content.ContentItem label="Name" content="Jhon Doe" />
          </GeneralInfosCard.Content>
          <GeneralInfosCard.Footer>
            <Button fontSize='1rem' background='#055A8C' color='#fff' padding='.25rem 1.125rem'>viewed <Image src={icons.eyeViewIcon} alt="eye view icon" /></Button>
          </GeneralInfosCard.Footer>
        </GeneralInfosCard>
      </div>
    </div>
  )
}