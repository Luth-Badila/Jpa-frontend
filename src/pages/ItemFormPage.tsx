import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
import { createItem, getItem, updateItem } from "../api/items";
import { useNavigate, useParams } from "react-router-dom";

type FormValues = {
  title: string;
  description?: string;
};

const ItemFormPage: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>();

  useEffect(() => {
    if (isEdit && id) {
      (async () => {
        const data = await getItem(Number(id));
        if (data) {
          setValue("title", data.title);
          setValue("description", data.description ?? "");
        }
      })();
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (vals: FormValues) => {
    try {
      if (isEdit && id) {
        await updateItem(Number(id), vals);
        alert("Updated");
      } else {
        await createItem(vals);
        alert("Created");
      }
      navigate("/items");
    } catch (err) {
      alert("Error: " + (err as Error).message);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">{isEdit ? "Edit Item" : "Create Item"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow max-w-2xl">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input {...register("title", { required: true })} className="w-full border p-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea {...register("description")} className="w-full border p-2 rounded" rows={6} />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded
           cursor-pointer"
          >
            {isEdit ? "Update" : "Create"}
          </button>
          <button type="button" onClick={() => navigate("/items")} className="px-4 py-2 bg-gray-200 rounded cursor-pointer">
            Cancel
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ItemFormPage;
