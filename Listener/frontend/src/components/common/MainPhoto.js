import React from 'react';
import styled from 'styled-components';
import exercise2 from '../../img/exercise19.jpg'
import exercise3 from '../../img/exercise18.jpg'
import exercise4 from '../../img/exercise20.jpg'
import exercise5 from '../../img/exercise15.jpg'
import Slider from 'react-slick';
import Fade from 'react-reveal';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MainPhoto.css';

const Wrap = styled.div`
    position: relative;
`;

const Text = styled.div`
    position: absolute;
    left : 50%;
    transform:translateX(-50%);
    margin-left : 15px;
    top: 80%;
    border 4px solid white;
    @media (max-width: 768px) {
        border 3.5px solid white;
        margin-left : 0px;
    }
`;
const H = styled.div`
    font-size: 2em;
    font-weight: bold;
    color: white;
    text-align:center;
    @media (max-width: 768px) {
        font-size: 1.5em;
    }

`
const LinkTo = styled(Link)`
    color: white;
    &:hover{
        text-decoration: none;
        color: white;
    }
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
        <>
        <div> 
            <Fade cascade>
            <Slider {...settings}>
            <Wrap>
                <img src = {exercise2} width='100%' height='600px'></img>
                <Text>
                    <H><LinkTo to="/todaytr">start now!</LinkTo></H>
                </Text>
            </Wrap>
            <Wrap>
                <img src = {exercise3} width='100%' height='600px'></img>
                <Text>
                    <H><LinkTo to="/todaytr">start now!</LinkTo></H>
                </Text>
            </Wrap>
            <Wrap>
                <img src = {exercise4} width='100%' height='600px'></img>
                <Text>
                    <H><LinkTo to="/todaytr">start now!</LinkTo></H>
                </Text>
            </Wrap>
            <Wrap>
                <img src = {exercise5} width='100%' height='600px'></img>
                <Text>
                    <H><LinkTo to="/todaytr">start now!</LinkTo></H>
                </Text>
            </Wrap>
            </Slider>
            </Fade>
        </div>
        </>
    );
};
};

export default MainPhoto;