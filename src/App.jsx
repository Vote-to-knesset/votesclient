import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import BillsFeed from "./components/BillsFeed";

const billsData = [{"BillID": "2208258", "name": "הצעת חוק להטמעת מורשת יהדות ספרד והמזרח במערכת החינוך וההשכלה הגבוהה, התשפ\"ג-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-07-24T09:07:40.577", "document": "https://fs.knesset.gov.il/25/law/25_lst_2957899.docx", "present": "כהן מאיר", "total_vote": 3, "in_favor": 3, "against": 0}, {"BillID": "2160142", "name": "חוק לתיקון פקודת האגודות השיתופיות (מס' 12), התשפ\"ג–2023", "SummaryLaw": "", "LastUpdatedDate": "2023-07-31T08:34:34.513", "document": "https://fs.knesset.gov.il//24/law/24_lst_604990.docx", "present": "השכל שרן מרים", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2156160", "name": "הצעת חוק הביטוח הלאומי (תיקון מס' 232) (מסלול ברירת מחדל בהפקדות לחיסכון ארוך טווח לילד), התשפ\"ב–2022", "SummaryLaw": "", "LastUpdatedDate": "2023-04-27T10:59:53.107", "document": "https://fs.knesset.gov.il//24/law/24_lst_600590.docx", "present": "אזולאי ינון", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2163229", "name": "הצעת חוק הרשות הלאומית לביטחון קהילתי (תיקון מס' 2), התשפ\"ג-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-10-10T13:25:07.447", "document": "https://fs.knesset.gov.il//24/law/24_ls1_608678.pdf", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2189724", "name": "הצעת חוק התקשורת (בזק ושידורים) (תיקון מס' 76) (הגבלות מוסכמות על שירות תקשורת וציוד תקשורת), התשפ\"ב–2022", "SummaryLaw": "", "LastUpdatedDate": "2023-02-28T07:51:29.113", "document": "https://fs.knesset.gov.il//24/law/24_lst_622199.docx", "present": "אזולאי ינון", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2190321", "name": "הצעת חוק הארכת השעיה של עובד המדינה ופיטורים של עובד הוראה לשם הגנה על קטין או חסר ישע (תיקוני חקיקה), התשפ\"ב–2022\t\t", "SummaryLaw": "", "LastUpdatedDate": "2023-05-02T08:55:44.267", "document": "https://fs.knesset.gov.il//24/law/24_lst_622203.docx", "present": "השכל שרן מרים", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2165539", "name": "הצעת חוק הטיס (תיקון מס' 3), התשפ\"ג-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-10-10T13:25:03.353", "document": "https://fs.knesset.gov.il//24/law/24_ls1_612503.pdf", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}]
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route path="billsFeed" element={<BillsFeed bills={billsData} />}></Route>

      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
