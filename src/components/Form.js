import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
// functional component to display search box and each search results
function Form() {
    const [shows, setBooks] = useState(null);
    const searchQuery = React.useRef(null);
    // Fetch data from API and destructure it.
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
                        <h2>Search TV show!! </h2>
                        <div className="search-area">
                            <input type="text" id="inputField" placeholder="Search for tv show" ref={searchQuery} />

                            <button className="mktoButtonRow" >
                                Search
                            </button>
                        </div>
                    </div>

                </form>

                {/* Display data from API */}
                <section className="section-plans">
                    <div className="row">
                        {shows &&
                            shows.map((show, index) => {
                                return (
                                    <div className="col span-1-of-3">
                                        <div className="plan-box" key={index}>
                                            <div>
                                                <Link to={`/details/${show.name}`}><img alt="" src={show.imageUrl} /> </Link>
                                                <p className="plan-price-meal"> {show.name}  </p>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li><i className="ion-android-star icon-small"></i><a href={show.url}>{show.url}</a></li>
                                                    <li><i className="ion-android-star icon-small"></i>{show.genres}</li>
                                                    <li><i className="ion-android-star icon-small"></i>{show.language}</li>
                                                    <li><i className="ion-eye icon-small"></i><a href={`/details/${show.name}`} className="btn btn-full">Details</a></li>

                                                </ul>
                                            </div>
                                            <div>

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
    <button classNameName="fetch-button btn btn-full" >
        Fetch Data
</button>
    <br />
</div>
</form> */}