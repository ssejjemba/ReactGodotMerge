import * as React from 'react';
import styled from 'styled-components';
import icons from '../../assets/icons/Sprite.svg'

const Service = styled.div`
    background-color: #f9f7f6;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 3.5rem;
    transition: all .3s;

    &:hover{
        margin-top: -2rem;
    }
`

const ServiceImage = styled.img`
    width: 100%;
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    height: 18rem;
    object-fit: cover;
    object-position: center;
`

const ServiceName = styled.h5`
    grid-row: 1 / 2;
    align-self: end;
    grid-column: 1 / -1;
    font-family: "Arial";
    font-size: 1.6rem;
    text-align: center;
    padding: 1.25rem;
    background-color: #101d2c;
    color: #fff;
    font-weight: 400;
    width: 80%;
    justify-self: center;
    transform: translateY(50%);
`

const Ammenity = styled.div`
    font-size: 1.5rem;
    margin-left: 2rem;
    margin-top: 2.5rem;

    display: flex;
    flex-direction: row;
    align-items: center;
`

const AmmenityIcon = styled.svg`
    fill: rgb(41, 88, 23);
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
`

const ContactButton = styled.button`
    background-color: rgb(41, 88, 23);
    color: #fff;
    border: none;
    border-radius: 0;
    font-family: 'Arial';
    font-size: 1.5rem;
    text-transform: uppercase;
    padding: 1.8rem 3rem;
    cursor: pointer;
    grid-column: 1 / -1;
    transition: all .2s;
`

const Icon = props => (
    <Ammenity>
        <AmmenityIcon 
            xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
            >
            <svg viewBox='0 0 32 32'>
                <path d={props.icon}/>
            </svg>
        </AmmenityIcon>
        <p>{props.name}</p>
    </Ammenity>
)

const item = props => (
    <Service>
        <ServiceImage src={props.image}/>
        <ServiceName>{props.name}</ServiceName>
        {props.amenities.map((el, index) => (
            <Icon key={index.toString()} {...el}/>
        ))}
        <ContactButton>Contact Us</ContactButton>
    </Service>
)

const DUMMY = [
    {
        name: 'Transport free',
        icon: 'M32 18l-4-8h-6v-4c0-1.1-0.9-2-2-2h-18c-1.1 0-2 0.9-2 2v16l2 2h2.536c-0.341 0.588-0.536 1.271-0.536 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.536-2h11.073c-0.341 0.588-0.537 1.271-0.537 2 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.729-0.196-1.412-0.537-2h2.537v-6zM22 18v-6h4.146l3 6h-7.146z'
    },
    {
        name: 'Bad weather',
        icon: 'M27.844 11.252c-0.101-4.022-3.389-7.252-7.433-7.252-2.369 0-4.477 1.109-5.839 2.835-0.764-0.987-1.959-1.624-3.303-1.624-2.307 0-4.176 1.871-4.176 4.179 0 0.201 0.015 0.399 0.043 0.592-0.351-0.063-0.711-0.098-1.080-0.098-3.344-0-6.054 2.712-6.054 6.058s2.71 6.058 6.054 6.058h2.868l7.078 7.328 7.078-7.328 3.484-0c3.004-0.006 5.438-2.444 5.438-5.451 0-2.565-1.771-4.716-4.156-5.296zM16 26l-6-6h4v-6h4v6h4l-6 6z'
    },
    {
        name: 'Free lunch',
        icon: 'M7 0c-3.314 0-6 3.134-6 7 0 3.31 1.969 6.083 4.616 6.812l-0.993 16.191c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.993-16.191c2.646-0.729 4.616-3.502 4.616-6.812 0-3.866-2.686-7-6-7zM27.167 0l-1.667 10h-1.25l-0.833-10h-0.833l-0.833 10h-1.25l-1.667-10h-0.833v13c0 0.552 0.448 1 1 1h2.604l-0.982 16.004c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.982-16.004h2.604c0.552 0 1-0.448 1-1v-13h-0.833z'
    },
    {
        name: 'Bye bye gift',
        icon: 'M24.11 10c0.566-0.402 1.11-0.851 1.608-1.348 1.044-1.044 1.742-2.328 1.966-3.616 0.246-1.412-0.115-2.723-0.988-3.597-0.697-0.697-1.641-1.065-2.73-1.065-1.551 0-3.185 0.744-4.483 2.043-2.077 2.077-3.288 4.945-3.94 6.991-0.482-2.056-1.444-4.833-3.313-6.702-1.003-1.003-2.285-1.518-3.495-1.518-0.989 0-1.931 0.344-2.633 1.046-1.562 1.562-1.351 4.306 0.471 6.128 0.65 0.65 1.409 1.189 2.21 1.638h-6.782v8h2v14h24v-14h2v-8h-5.89zM21.073 4.007c0.866-0.866 1.948-1.384 2.892-1.384 0.334 0 0.803 0.070 1.139 0.406 0.813 0.813 0.357 2.697-0.977 4.031-1.373 1.373-3.221 2.318-4.826 2.939h-1.584c0.58-1.798 1.627-4.264 3.356-5.993zM7.31 5.028c-0.022-0.285-0.002-0.82 0.381-1.203 0.32-0.32 0.743-0.387 1.042-0.387v0c0.664 0 1.358 0.313 1.904 0.859 1.059 1.058 1.93 2.743 2.521 4.871 0.016 0.057 0.031 0.115 0.047 0.171-0.057-0.015-0.114-0.031-0.171-0.047-2.128-0.591-3.813-1.462-4.871-2.521-0.495-0.495-0.805-1.13-0.853-1.743zM14 30h-8v-13h8v13zM14 16h-10v-4h10v4zM26 30h-8v-13h8v13zM28 16h-10v-4h10v4z'
    }
]

export default item;