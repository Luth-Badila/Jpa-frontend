import React, { useState } from "react";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";

const EditPage: React.FC = () => {
  const [headerHtml, setHeaderHtml] = useState("<h1>Welcome to our site</h1>");

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-4">Edit Site Content</h2>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500 mb-2">Header</div>
          <div contentEditable suppressContentEditableWarning onInput={(e) => setHeaderHtml((e.target as HTMLDivElement).innerHTML)} className="border p-4 rounded min-h-[60px]" dangerouslySetInnerHTML={{ __html: headerHtml }} />
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => alert("Simulate save to backend:\n\n" + headerHtml)}>
            Save
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setHeaderHtml("<h1>Welcome to our site</h1>")}>
            Reset
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditPage;
