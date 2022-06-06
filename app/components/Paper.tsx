import React, { FC } from 'react'

interface Props {
  title: string
  authors: []
  published: string
  abstract: string
  link: string
}

const Paper: FC<Props> = ({ title, authors, published, abstract, link }) => {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var publishDate = new Date(published)
  return (
    <div
      style={{
        marginBottom: `2rem`,
        padding: `1rem`,
        border: `1px solid #ccc`,
        borderRadius: `0.5rem`,
        backgroundColor: `#fff`,
        boxShadow: `0 0 0.5rem 0.5rem rgba(0,0,0,0.1)`,
        maxWidth: `768px`,
      }}
    >
      <h1 style={{ fontSize: `2rem`, fontWeight: `bold` }}>{title}</h1>
      <div
        style={{
          // italic
          fontSize: `0.75rem`,
          fontStyle: `italic`,
          marginBottom: `0.25rem`,
        }}
      >
        <span>
          {authors.map((author: any, index: any) => {
            return (
              <span key={index}>
                {index === 0
                  ? `by `
                  : index !== authors.length - 1
                  ? `, `
                  : ` and `}
                {author.name[0]}
              </span>
            )
          })}
        </span>
        <span>
          {' (Published on ' +
            `${
              months[publishDate.getMonth()]
            } ${publishDate.getDate()}, ${publishDate.getFullYear()}` +
            ')'}
        </span>
      </div>
      <p>{abstract}</p>
      <div
        style={{
          fontSize: `0.9rem`,
          color: `blue`,
          textDecoration: `underline`,
        }}
      >
        <a href={link} target="_blank">
          Source
        </a>
      </div>
    </div>
  )
}

export default Paper
