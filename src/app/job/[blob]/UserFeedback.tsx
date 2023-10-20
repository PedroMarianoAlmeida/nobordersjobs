import Table from "@/components/table/Table";
import FeedbackInput from "./FeedbackInput";

const UserFeedback = () => {
  const columnHeaders = [
    "Answer",
    "It is open? 📋",
    "It is legit? 🔎",
    "It is global? 🌎",
  ];

  type Row = {
    [key: string]: string | JSX.Element;
  };
  const rowYes: Row = {};
  const rowNow: Row = {};
  columnHeaders.forEach((column) => {
    if (column === "Answer") {
      rowYes["Answer"] = "Yes";
      rowNow["Answer"] = "No";
    } else {
      rowYes[column] = <FeedbackInput column={column} answer="Yes" />;
      rowNow[column] = <FeedbackInput column={column} answer="No" />;
    }
  });

  return <Table columnHeaders={columnHeaders} rows={[rowYes, rowNow]} />;
};

export default UserFeedback;
