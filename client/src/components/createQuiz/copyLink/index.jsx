import React from 'react'
import { copyLink, getLink } from '../../../utils/CopyLink'
import styles from './styles.module.css'
import { useModal } from '../../../hooks/useModalContext'

const CopyLink = ({type,id}) => {
  const {closeModal}=useModal()
  return (
    <div className={styles.results}>
    <h1>
      Congrats your {type === 'quiz' ? 'quiz' : 'poll'} is published.
    </h1>
    <p>{getLink(id, type)}</p>

    <button className={styles.shareBtn}
      onClick={() => {
        copyLink(id, type) 
        closeModal()
      }}
    >
      Share quiz
    </button>
  </div>
  )
}

export default CopyLink