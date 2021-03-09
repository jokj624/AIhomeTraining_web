import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';

import './calendar.scss';

const MyCal = styled(Responsive)`
  position : relative;
  z-index: bottom;
`;

const Spacer = styled.div`
  height: 4rem;
`;

const Spacer2 = styled.div`
  height: 1rem;
`;

const Calendar = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user
  }));
  //const events = [{ title: "", date: new Date()}];
    return  (
        <>
        <Spacer />
        <MyCal>
            <FullCalendar
            plugins={[ dayGridPlugin, interaction ]}
            initialView = 'dayGridMonth'
            events = {user.exercises}
            dayMaxEvents = {true}
            moreLinkClick = "popover"
            contentHeight = "800px"
            eventDisplay = 'block'
            eventBackgroundColor = "#1864ab"
            />
        </MyCal>
        <Spacer2 />
        </>
    );
};

export default Calendar;