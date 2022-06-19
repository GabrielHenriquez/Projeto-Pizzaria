import Link from 'next/link'
import { useContext } from 'react'
import styles from './styles.module.scss'

import {FiLogOut} from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header(){

    const {user, signOut} = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src='/logo.svg' width={290} height={70} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/category'>
                        <a>Categoria</a>
                    </Link>

                    <Link href='/products'>
                        <a>Cardápio</a>
                    </Link>

                    <button  onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}