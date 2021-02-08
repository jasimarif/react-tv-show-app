import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Details = () => {
    const [show, setShow] = useState(null);
    const { name } = useParams();
    const config = { params: { q: name } }
    let responseData = []
    useEffect(() => {
        axios.get(`http://api.tvmaze.com/singlesearch/shows`, config)
            .then((res) => {
                //console.log("res",res.data.image, res.data.image.medium)
                const { name, summary } = res.data
                const {medium} = res.data.image.medium ? res.data.image : "" 
                let resObj = {
                    name, 
                    summary: summary.replace(/&/g,'&amp;').replace(/<p/g,'').replace(/>/g,'').replace(/<\/p/g,''),
                    imageUrl:medium
                }
                // resObj.image = res.data.image.medium 
                responseData.push(resObj)
                
                setShow(responseData)
                
            })
    }, [])
    console.log(show)
    return (
        <div className="Details">
            <h2> Show Details - {name} </h2>
            <Link to={`/`}><p> Back </p> </Link>

            {show && show.map((show, index) => {
                console.log(show)
                return (
                    <div className="book" key={index}>
                        <h3> {show.name} </h3>
                        <div className="details">
                        <img alt="" src={show.imageUrl} />
                            <p> {show.summary} </p>
                        </div>
                    </div>
                );
            })}

        </div>
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