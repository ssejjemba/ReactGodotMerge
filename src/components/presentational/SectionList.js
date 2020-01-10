import * as React from 'react';
import styled from 'styled-components';
import Item from './SectionItem';

const Features = styled.section`
    grid-column: center-start / center-end;
    margin: 5rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 7rem;
`

const list = props => (
    <Features>
        {props.sections.map(el => (
            <Item {...el} key={el.id}/>
        ))}
    </Features>
)

export default list;