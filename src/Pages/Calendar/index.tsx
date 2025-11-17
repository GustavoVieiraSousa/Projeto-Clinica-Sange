import { useState } from "react";
import { StyledCard, StyledCardContent, StyledCardHeader} from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import * as S from "./styles";


export function Calendar(){

    const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mockAppointments= 2;
  
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getAppointmentsForDate = (day: number) => {
    const date = new Date(year, month, day).toISOString().split('T')[0];
    console.log(date);
    return mockAppointments;
  };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<S.EmptyDay key={`empty-${i}`} />);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const appointmentCount = getAppointmentsForDate(day);
    const isToday = 
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear();

    calendarDays.push(
      <S.CalendarDay key={day} $isToday={isToday}>
        <S.DayNumber>{day}</S.DayNumber>
        {appointmentCount > 0 && (
          <S.AppointmentBadge>
            {appointmentCount} {appointmentCount === 1 ? "consulta" : "consultas"}
          </S.AppointmentBadge>
        )}
      </S.CalendarDay>
    );
  }

    return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <CalendarIcon />
          <S.Title>Calendário de Agendamentos</S.Title>
        </S.HeaderContent>
      </S.Header>

      <StyledCard>
        <StyledCardHeader>
          <S.MonthNavigation>
            <Button onClick={previousMonth} variant="outline" size="icon">
              <ChevronLeft />
            </Button>
            <S.MonthTitle>
              {monthNames[month]} {year}
            </S.MonthTitle>
            <Button onClick={nextMonth} variant="outline" size="icon">
              <ChevronRight />
            </Button>
          </S.MonthNavigation>
        </StyledCardHeader>
        <StyledCardContent>
          <S.CalendarGrid>
            {dayNames.map(day => (
              <S.DayName key={day}>{day}</S.DayName>
            ))}
            {calendarDays}
          </S.CalendarGrid>
        </StyledCardContent>
      </StyledCard>
    </S.Container>
  );
}