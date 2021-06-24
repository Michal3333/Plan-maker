import { timeLog } from "../API/userData";

export const prepareDataForDiagram = (logs: timeLog[], projectId: string = '') => {
   const today = new Date();
   const day = today.getDay();
   let weekStart = new Date(today);
   weekStart.setDate(weekStart.getDate() - day + 1)
   weekStart = getStartDayHours(weekStart)
   let weekEnd = new Date(today)
   weekEnd.setDate(weekEnd.getDate() + (7 - day))
   weekEnd = setEndDayHours(weekEnd)


   const thisWeekLogs = logs.filter(x => {
      return x.date >= weekStart && x.date <= weekEnd;
   })

   console.log(thisWeekLogs)

   const diagramData = thisWeekLogs.reduce((prev, cur) => {
      const curDay = cur.date.getDay();
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
         value: index + 1 >= day ? -1 : 0,
      }
   })
   return digramInit;
}