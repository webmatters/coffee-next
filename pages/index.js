import Head from 'next/head'
import Image from 'next/image'

import styles from 'styles/Home.module.css'
import coffeeStoresData from 'data/coffee-stores.json'

import Banner from 'components/Banner'
import Card from 'components/Card'

export async function getStaticProps(context) {
  return {
    props: { coffeeStores: coffeeStoresData },
  }
}

export default function Home(props) {
  const handleOnBannerBtnClick = event => {
    console.log('banner button clicked')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Next</title>
        <meta name="description" content="Find coffee shops in your area!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="Woman drinking coffee on a chair"
            width={700}
            height={300}
          />
        </div>

        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map(store => (
                <Card
                  name={store.name}
                  imgUrl={store.imgUrl}
                  href={`/coffee-store/${store.id}`}
                  className={styles.card}
                  key={store.id}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
