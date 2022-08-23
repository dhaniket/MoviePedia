import React,{useEffect,useState} from 'react'
import "./Home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Link} from "react-router-dom";
import MovieList from '../../components/movieList/movieList';

const Home = () => {

    const [PopularMovies , setPopularMovies] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=b45fdff750d5631d24c5e23db0c5fbd7&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    return (
        <div>
            <div className='poster'>
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                    stopOnHover={true}
                >
                    {
                        PopularMovies.map(movie=>(
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`}>
                                <div className='posterImage'>
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt=""/>
                                </div>
                                <div className='posterImage__overlay'>
                                    <div className='posterImage__title'>{movie? movie.original_title:""}</div>
                                    <div className='posterImage__runtime'>
                                        <span className='posterImage__rating'>
                                            <i className='fas fa-star'/>{" "}
                                            {movie?movie.vote_average:""}
                                        </span>
                                    </div>
                                    <div className='posterImage__description'>{movie?movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList/>
                <MovieList type="top_rated"/>
            </div>
        </div>
    )
}

export default Home