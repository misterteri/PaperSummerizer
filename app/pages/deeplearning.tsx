import type { NextPage } from 'next'
import Header from '../components/Header'
import Paper from '../components/Paper'
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const dev = process.env.NODE_ENV !== 'production';
const API_URI = dev ? publicRuntimeConfig.URI : serverRuntimeConfig.URI;

const Deeplearning: NextPage = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <h1 style={{ fontSize: `3rem`, fontWeight: `bold` }}>Deep Learning</h1>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          {data.map((item: any, index: any) => (
            <Paper
              key={index}
              title={item.title}
              authors={item.authors}
              published={item.published}
              abstract={item.abstract}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URI}/deeplearning`)
  const xml2js = require('xml2js')
  var parser = new xml2js.Parser()

  // create an array that will contain data from the json file
  var data: any = []

  parser.parseString(await res.text(), function (err:any, result: any) {
    for (var i = 0; i < result.feed.entry.length; i++) {
      // remove all the new lines
      var title = result.feed.entry[i].title[0].replace(/\n/g, '')

      // remove unnecessary whitespaces
      var title = title.replace(/\s\s+/g, ' ')
      var authors = result.feed.entry[i].author
      var published = result.feed.entry[i].published[0]
      var abstract = result.feed.entry[i].summary[0].replace(/\s+/g, ' ')
      var link = result.feed.entry[i].link[0].$.href
      data.push({
        title: title,
        authors: authors,
        published: published,
        abstract: abstract,
        link: link,
      })
    }
  })

  return {
    props: { data },
  }
}

export default Deeplearning
