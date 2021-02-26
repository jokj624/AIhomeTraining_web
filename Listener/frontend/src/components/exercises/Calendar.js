import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { readExercise } from '../../modules/exercise';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import './calendar.scss';

const MyCal = styled(Responsive)`
  
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Spacer2 = styled.div`
  height: 1rem;
`;



const Calendar = ({state}) => {


  const events = [{ title: "Today", date: new Date()}];
    return  (
        <>
        <Spacer />
        <MyCal>
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            events = {events}
            />
        </MyCal>
        <Spacer2 />
        </>
    );
};

export default Calendar;