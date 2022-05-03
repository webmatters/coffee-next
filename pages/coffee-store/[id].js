import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import cls from 'classnames'

import coffeeStoresData from 'data/coffee-stores.json'
import styles from 'styles/CoffeeStore.module.css'

export function getStaticProps({ params }) {
  const coffeeStore = coffeeStoresData.find(
    store => store.id.toString() === params.id
  )
  return {
    props: {
      coffeeStore,
    },
  }
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map(storeData => {
    return {
      params: { id: storeData.id.toString() },
    }
  })
  return {
    paths,
    fallback: true,
  }
}

export default function CoffeeStore({
  coffeeStore: { address, name, neighbourhood, imgUrl },
}) {
  const router = useRouter()

  const handleUpvoteButton = () => {
    console.log('handle upvote')
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            alt={name}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="navigation icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt="navigation icon"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="navigation icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Upvote
          </button>
        </div>
      </div>
    </div>
  )
}
