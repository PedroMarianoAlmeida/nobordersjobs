"use client";

import Table from "@/components/table/Table";

const UserFeedback = () => {
  return (
    <Table
      columnHeaders={[
        "Answer",
        "It is open? 📋",
        "It is legit? 🔎",
        "It is global? 🌎",
      ]}
      rows={[
        {
          Answer: "Yes",
          "It is open? 📋": (
            <input type="checkbox" className="checkbox checkbox-success" />
          ),
          "It is legit? 🔎": (
            <input type="checkbox" className="checkbox checkbox-success" />
          ),
          "It is global? 🌎": (
            <input type="checkbox" className="checkbox checkbox-success" />
          ),
        },
        {
          Answer: "No",
          "It is open? 📋": (
            <input type="checkbox" className="checkbox  checkbox-error" />
          ),
          "It is legit? 🔎": (
            <input type="checkbox" className="checkbox  checkbox-error" />
          ),
          "It is global? 🌎": (
            <input type="checkbox" className="checkbox  checkbox-error" />
          ),
        },
      ]}
    />
  );
};

export default UserFeedback;
