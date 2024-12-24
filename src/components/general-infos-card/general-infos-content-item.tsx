import Image from 'next/image'
import { icons } from '../../../public/assets/assets'
import { Button } from '../button/button'
import styles from './general-infos-card.module.css'

type GeneralInfosContentItemProps = {
  label: string;
  content: string;
}

export const GeneralInfosContentItem = ({label, content} : GeneralInfosContentItemProps) => {
  return (
        <li><span>{label}:</span><p>{content}</p></li> 
  )
}