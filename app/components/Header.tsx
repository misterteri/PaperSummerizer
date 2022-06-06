import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  var pages:{[key: string]: string} = {
    'Machine Learning': '/',
    'Deep Learning': '/deeplearning',
    'Reinforcement Learning': '/reinforcementlearning',
  }
  return (
    <ul className={styles.ul}>
      {Object.keys(pages).map((page: any, index: any) => (
        <li className={styles.li} key={index}>
          <Link href={pages[page]}>
            <a className={styles.a}>{page}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
