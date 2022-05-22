import React, { FC } from 'react'

interface Props {
    title: string;
    authors: [];
    published: string;
    abstract: string;
}

const Paper: FC<Props> = ({ title, authors, published, abstract }) => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var publishDate = new Date(published)
    return (
        <div style={{marginBottom: `3rem`, padding: `1rem`}}>
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
                    {
                        authors.map((author: any, index: any) => {
                            return (
                                <span key={index}>
                                    {index === 0 ? `by ` : index !== authors.length - 1 ? `, ` : ` and `}
                                    {author.name[0]}
                                </span>
                            )
                        }) 
                    }
                    
                </span>
                <span>
                    {
                        " (Published on " + `${months[publishDate.getMonth()]} ${publishDate.getDate()}, ${publishDate.getFullYear()}` + ")"
                    }
                </span>
            </div>
            <p>{abstract}</p>
        </div>
    )
}

export default Paper