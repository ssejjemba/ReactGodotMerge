import * as React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components'

const Header = styled.header`
    grid-column: sidebar-start / full-end 6;
    position: relative;
    height: 100%;
    background: linear-gradient(rgba(41, 88, 23, 0.7), rgba(41, 88, 23, 0.8)),
        url('https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    clip-path: polygon(
        0 0,
        100% 0,
        100% calc(100% - 5vw),
        0 100%
    );
`

const Heading = styled.h1`
    margin: 0;
    padding: 10rem 0 2rem 0;
    font: 5rem "Arial";
    text-align: center;
    color: white;
    letter-spacing: 1rem;
`

const Slogan = styled.p`
    margin: 0;
    padding: 1rem 0;
    font-family: 'Ma Shan Zheng', cursive;
    font-size: 3rem;
    text-align: center;
    color: white;
    letter-spacing: .5rem;
`

const header = props => (
    <Header>
        <Heading>{props.name}</Heading>
        <Slogan><span>&ldquo;</span>{props.slogan}<span>&rdquo;</span></Slogan>
    </Header>
)

header.propType = {
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string,
}

export default header;