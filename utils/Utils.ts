import { timeLog } from "../API/userData";

export const prepareDataForDiagram = (logs: timeLog[], projectId: string = '') => {
   const today = new Date();
   let day = today.getDay();
   if(day === 0) day = 7
   let weekStart = new Date(today);
   weekStart.setDate(weekStart.getDate() + 1 - day)
   let weekEnd = new Date(today);
   weekEnd.setDate(weekEnd.getDate() + (7 - day))

   const thisWeekLogs = logs.filter(x => {
      return x.date.getDate() >= weekStart.getDate() && x.date.getDate() <= weekEnd.getDate();
   })
   const diagramData = thisWeekLogs.reduce((prev, cur) => {
      const tempday = cur.date.getDay()
      const curDay = tempday === 0 ? 7 : tempday;
      prev[curDay - 1].value += cur.time
      return prev;
   }, prepareDiagramArray(day))
   return diagramData;
}

const getStartDayHours = (date: Date) => {
   date.setHours(0, 0, 0, 0)
   return date;
}

const setEndDayHours = (date: Date) => {
   date.setHours(23, 59, 59, 999)
   return date;
}

const prepareDiagramArray = (day: number) => {
   const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

   const digramInit = weekDays.map((x, index) => {
      return {
         title: x,
         value: index >= day ? -1 : 0,
      }
   })
   return digramInit;
}