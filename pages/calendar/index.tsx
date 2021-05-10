import React from 'react';
import styled from '@emotion/styled';
import { Button, Calendar, Layout, colors, IconButton, TextField, useInput } from 'notion-ui';
import Helmet from '../../components/Helmet';

const CalendarPage: React.FC<{ targetYear?: number }> = ({ targetYear }) => {
  const [year, setYear] = React.useState(targetYear ?? new Date().getFullYear());
  const { value, onChange, setValue } = useInput('CalendarYear');

  React.useEffect(() => {
    setTimeout(() => {
      updateValue(year);
    }, 50)
  }, []);

  const updateValue = (value: number | string) => {
    setYear(Number(value));
    setValue(value.toString());
  }

  return (
    <CalendarLayout>
      <Helmet
        title={`Notion-UI Calendar - ${year}년`}
        description={`Notion-UI Calendar - ${year}년`}
        image='https://res.cloudinary.com/dgggcrkxq/image/upload/v1620659980/test/seoul-soongrae_dyjwin.jpg'
        url='https://notion-tools.tammolo.com/calendar'
        keywords='calendar,2021,today'
      />
      <Head>
        <IconButton icon="chevronLeft" onClick={() => updateValue(year - 1)} />
        <IconButton icon="chevronRight" onClick={() => updateValue(year + 1)} />
        <YearTextField
          id="CalendarYear"
          value={value}
          onChange={onChange}
          onSubmit={() => updateValue(value)}
        />
        <Button onClick={() => updateValue(new Date().getFullYear())}>오늘</Button>
      </Head>
      <YearCalendar>
        {new Array(12).fill(null).map((_, i) => (
          <Calendar.Month
            key={`${year}${i}`}
            year={year}
            month={i + 1} />
        ))}
      </YearCalendar>
    </CalendarLayout>
  )
}

export default CalendarPage;

const CalendarLayout = styled(Layout.Embed)`
  color: ${colors.grey};
`;

const Head = styled.div`
  padding: 16px 0 32px;
`;

const YearCalendar = styled.ol`
  display: grid;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fill, minmax(232px, 1fr));
  max-width: 1660px;
  grid-gap: 32px;
  margin: 0 auto;
`;

const YearTextField = styled(TextField)`
  display: inline-block;
  width: 100px;
  margin: 0 16px;
`;