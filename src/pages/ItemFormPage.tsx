import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../components/layout/Dashboard/DashboardLayout";
import { createItem, getItem, updateItem, uploadImage } from "../api/items";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type FormValues = {
  title: string;
  description?: string;
  image?: FileList;
};

const ItemFormPage: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>();
  const watchedImage = watch("image");

  // 🔐 AUTH CHECK (SELALU DI ATAS)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login", { replace: true });
      }
      setCheckingAuth(false);
    });
  }, [navigate]);

  // 🖼 Preview image
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [watchedImage]);

  // ✏️ Load data edit
  useEffect(() => {
    if (!isEdit || !id) {
      reset();
      setImagePreview(null);
      return;
    }

    (async () => {
      const data = await getItem(Number(id));
      if (data) {
        setValue("title", data.title);
        setValue("description", data.description ?? "");
        setImagePreview(data.image);
      }
    })();
  }, [id, isEdit, reset, setValue]);

  const onSubmit = async (vals: FormValues) => {
    try {
      let imageUrl = imagePreview;

      if (vals.image && vals.image.length > 0) {
        imageUrl = await uploadImage(vals.image[0]);
      }

      const payload = {
        title: vals.title,
        description: vals.description,
        image: imageUrl,
      };

      if (isEdit && id) {
        await updateItem(Number(id), payload);
        alert("Updated");
      } else {
        await createItem(payload);
        alert("Created");
      }

      navigate("/dashboard-items");
    } catch (err) {
      alert("Error: " + (err as Error).message);
    }
  };

  // ⛔ RENDER TERAKHIR
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">{isEdit ? "Edit Item" : "Create Item"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow max-w-2xl space-y-4">
        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          {imagePreview && <img src={imagePreview} alt="Preview" className="mb-3 w-full h-56 object-contain rounded border" />}
          <input type="file" accept="image/*" {...register("image")} />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input {...register("title", { required: true })} className="w-full border p-2 rounded" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea {...register("description")} rows={6} className="w-full border p-2 rounded" />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
            {isEdit ? "Update" : "Create"}
          </button>

          <button type="button" onClick={() => navigate("/dashboard-items")} className="px-4 py-2 bg-gray-200 rounded cursor-pointer">
            Cancel
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default ItemFormPage;
