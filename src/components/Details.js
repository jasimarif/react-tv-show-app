import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
// functional component to show details of individual component
const Details = () => {
    const [show, setShow] = useState(null);
    const { name } = useParams();
    const config = { params: { q: name } }
    let responseData = []
    useEffect(() => {
        axios.get(`http://api.tvmaze.com/singlesearch/shows`, config)
            .then((res) => {
                const { name, summary, type, premiered } = res.data
                const { medium } = res.data.image ? res.data.image : ""
                let resObj = {
                    type: type ? type : "",
                    premiered: premiered ? premiered : "",
                    name,
                    summary: summary ? summary.replace(/&/g, '&amp;').replace(/<p/g, '').replace(/>/g, '').replace(/<\/p/g, '').replace(/<b/g, ' ').replace(/<\/b/g, '') : "Summary Not Available",
                    imageUrl: medium ? medium : "https://images.unsplash.com/photo-1461151304267-38535e780c79?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dHYlMjBzaG93c3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                }
                responseData.push(resObj)
                setShow(responseData)
            })
    }, [])
    console.log(show)

    {/* Display data of individual tv show */ }

    return (

        <section>
            <Link to={`/`}><p> Back </p> </Link>
            { show && show.map((show, index) => {
                return (
                    <section className="container-detail" key={index}>
                        <div><h3> {show.name} </h3>
                            <ul>
                                <li>{show.type}</li>
                                <li>{show.premiered}</li>
                            </ul>
                        </div>

                        <div className="details">
                            <img alt="" src={show.imageUrl} />

                        </div>
                        <div>
                            <p> {show.summary} </p>
                        </div>
                    </section>
                );
            })}
        </section>
    );
}

export default Details


    // const fetchData = async ()=>{
    //     const config = { params: { q: name } }
    //     const response = await axios.get(`http://api.tvmaze.com/singlesearch/shows`, config)
    //     console.log(response.data)
    // }
    // fetchData()

    // <Link to={`/details/${show.name}`}><img alt="" src={show.imageUrl} /> </Link>
    // <div className="hero-text-box"> <h3>Details Page</h3> </div>
    // <Link to={`/`}><p> Back </p> </Link>

    // {show && show.map((show, index) => {
    //     console.log(show)
    //     return (
    //         <div className="show-details" key={index}>
    //             <h3> {show.name} </h3>
    //             <div className="details">
    //             <img alt="" src={show.imageUrl} />
    //                 <p> {show.summary} </p>
    //             </div>
    //         </div>
    //     );
    // })}