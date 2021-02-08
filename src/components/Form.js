import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'

function Form() {
    const [shows, setBooks] = useState(null);
    const searchQuery = React.useRef(null);

    const fetchData = async (e) => {
        e.preventDefault();
        console.log(searchQuery.current.value)
        const searchTerm = searchQuery.current.value
        const config = { params: { q: searchTerm } }
        const response = await axios.get(`http://api.tvmaze.com/search/shows`, config)
        let resObj = {}
        let arr = []
        response.data.map((result) => {
            console.log(result)
            let { medium } = result.show.image ? result.show.image : ""
            let { name, summary, url, genres, language, } = result.show
            let { score } = result
            let { imdb } = result.show.externals ? result.show.externals : ""
            resObj = {
                score: parseFloat(score).toFixed(2),
                language,
                genres,
                url,
                id: imdb,
                name,
                summary,
                imageUrl: medium
            }
            arr.push(resObj)
        })
        console.log(arr)
        setBooks(arr);
    };

    return (
        <section className="section-form">
            <div className="row">
                <form className="contact-form hero-text-box" onSubmit={fetchData}>
                    <div className="row">
                        <h2>Search Away Your Favourite Show</h2>
                        <div className="col span-2-of-3">
                            <input type="text" placeholder="Search for artist" ref={searchQuery} />

                            <button className="col span-2-of-3 btn btn-full" >
                                Fetch Data
                            </button>
                        </div>
                    </div>

                </form>

                {/* Fetch data from API */}


                {/* Display data from API */}
                <section className="section-plans">
                    <div className="row">
                        {shows &&
                            shows.map((show, index) => {
                                return (
                                    <div className="col span-1-of-3">
                                        <div className="plan-box">
                                            <div>
                                                <h3>{show.name}</h3>
                                                <Link to={`/details/${show.name}`}><img alt="" src={show.imageUrl} /> </Link>
                                                <p className="plan-price-meal"> Description  </p>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li><i class="ion-ios-checkmark-empty icon-small"></i><a href={show.url}>Show Url</a></li>
                                                    <li><i class="ion-ios-checkmark-empty icon-small"></i>{show.genres}</li>
                                                    <li><i class="ion-ios-checkmark-empty icon-small"></i>{show.language}</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div>
                                                    <a href={`/details/${show.name}`} class="btn-small">View Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </section >
            </div>


        </section>
    )
}

export default Form


// { Object.keys(book.show.image).map( (key)=> {
//     return (
//         <p> {key} </p>
//         )
// }) }

{/* <form id="searchForm" onSubmit={fetchData}>
<input type="text" placeholder="Search for artist" ref={searchQuery} />
<div>
    <button className="fetch-button btn btn-full" >
        Fetch Data
</button>
    <br />
</div>
</form> */}