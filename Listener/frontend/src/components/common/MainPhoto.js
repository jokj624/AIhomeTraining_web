import React from 'react';
import styled from 'styled-components';
import exercise2 from '../../img/exercise16.jpg'
import exercise3 from '../../img/exercise12.jpg'
import exercise4 from '../../img/exercise13.jpg'
import exercise5 from '../../img/exercise15.jpg'
import Responsive from './Responsive';
import Slider from 'react-slick';
import Fade from 'react-reveal';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MainPhoto.css'

const Wrapper = styled(Responsive)`
    display: flex;
    width:100%;
    padding-left: 0;
    padding-right: 0;
`;


class MainPhoto extends React.Component {
    render() {
        const settings = {
            dots: false,
            arrows:false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade:true,
            centerPadding: '100px',
            autoplay: true,
            autoplaySpeed: 3500,
            useCss : true
        };
    return (
        <Fade cascade>
            <Slider {...settings}>
            <img src = {exercise2}></img>
            <img src = {exercise3}></img>
            <img src = {exercise4}></img>
            <img src = {exercise5}></img>
            </Slider>
        </Fade>
    );
};
};

export default MainPhoto;