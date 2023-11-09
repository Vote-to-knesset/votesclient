import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import BillsFeed from "./components/BillsFeed";
import UserIdentity from "./components/UserIdentity";
import axios from 'axios';

async function getBills() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/data_bills');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];
let billsss = [{"BillID": "2211110", "Name": "הצעת חוק התוכנית לסיוע כלכלי (הוראת שעה – חרבות ברזל), התשפ\"ד-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-11-08T10:55:41.343", "document": "https://fs.knesset.gov.il/25/law/25_ls1_3479300.pdf", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2211293", "Name": "הצעת חוק הביטוח הלאומי (הוראת שעה – חרבות ברזל) (תגמולים למשרתים במילואים), התשפ\"ד-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-11-08T10:50:50.577", "document": "https://fs.knesset.gov.il/25/law/25_ls1_3508896.pdf", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2211218", "Name": "הצעת חוק העברת מידע לצורך זיהוי או אימות זהות של אדם לרבות גופה, ואיתור נעדר או שבוי, הנדרשים בשל פעולות האיבה או פעולות המלחמה (הוראות שעה – חרבות ברזל), התשפ\"ד-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-11-08T10:45:31.683", "document": "https://fs.knesset.gov.il/25/law/25_ls1_3500878.pdf", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2210979", "Name": "הצעת חוק איסור הלבנת הון (תיקון מס' 33), התשפ\"ד-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-11-08T10:43:02.377", "document": "", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2211197", "Name": "הצעת חוק הארכת תקופות ודחיית מועדים (הוראת שעה – חרבות ברזל) (החלטות מינהליות ופעולות כלפי רשות ציבורית, אומנה לילדים, תקופות כהונה תאגידים, בתי דין מינהליים ותכנון ובנייה), התשפ\"ד-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-11-08T10:37:22.01", "document": "https://fs.knesset.gov.il/25/law/25_ls1_3500877.pdf", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2210817", "Name": "הצעת חוק המאבק בטרור (תיקון מס' 9 והוראת שעה) (צריכת פרסומי טרור), התשפ\"ד-2023", "SummaryLaw": "", "LastUpdatedDate": "2023-11-08T07:17:30.657", "document": "https://fs.knesset.gov.il/25/law/25_ls1_3449308.pdf", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2211246", "Name": "הצעת חוק הארכת תקופות ודחיית מועדים (הוראת שעה – חרבות ברזל) (החלטות מינהליות ופעולות כלפי רשות ציבורית, אומנה לילדים, תקופות כהונה תאגידים, בתי דין מינהליים ותכנון ובנייה), התשפ\"ד-2023 - הארכת תקופות ודחיית מועדים לפי חוק אומנה לילדים", "SummaryLaw": "", "LastUpdatedDate": "2023-11-07T23:00:59.51", "document": "", "present": "", "total_vote": 0, "in_favor": 0, "against": 0}, {"BillID": "2210669", "Name": "חוק תגמולים לבני משפחה של חטופים ונעדרים בפעולת איבה, התשפ\"ד–2023", "SummaryLaw": "", "LastUpdatedDate": "2023-11-07T19:31:15.657", "document": "https://fs.knesset.gov.il/25/law/25_lst_3442679.docx", "present": "אייכלר ישראל", "total_vote": 0, "in_favor": 0, "against": 0}]

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const data = await getBills();
      setBills(data);
    };

    fetchBills();
  }, []);
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route path="userIdentity" element={<UserIdentity options={options}/>}></Route>
        <Route path="billsFeed" element={<BillsFeed bills={billsss} />}></Route>

      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
