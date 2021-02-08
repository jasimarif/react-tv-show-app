import React, { useState } from 'react'
const axios = require('axios')

const ShowList = (props) => {
    const [shows, setShows] = useState([
        {title:"Friends",body:"My Fav TV Show", id:1},
        {title:"BBT",body:"My Fav TV Show", id:2},
        {title:"Suits",body:"My Fav TV Show", id:3},
    ])
    console.log(props)
    return (
        <div className="blog-list">
            {shows.map( (show)=>(
                <div className="shows-preview" key={show.id}>
                    <h2> {show.title} </h2>
                    <h3> Description</h3>
                    <p> {show.body} </p>

                </div>
            ) )}
        </div>
    )
}

export default ShowList