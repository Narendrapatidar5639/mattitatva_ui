import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, Save, Trash2, Upload } from "lucide-react";
import { FONT_LABEL, G, PRIMARY, PRIMARY_LIGHT } from "../constants/theme";
import { uploadProductApi } from "./services/productsApi";
import { ADMIN_CATEGORIES, adminFieldClass, AdminCard, AdminPageHeader, CLAY_MATERIALS } from "./components/ui";
import type { AdminProductDraft } from "./types";

const EMPTY_DRAFT: AdminProductDraft = {
  name: "",
  description: "",
  price: 0,
  originalPrice: 0,
  stock: 0,
  category: ADMIN_CATEGORIES[0].id,
  brand: "Maati Tatva",
  clayType: CLAY_MATERIALS[0],
  materialSpec: "",
  weightKg: 1,
  organicCertified: true,
  inStock: true,
};

export function ProductUpload() {
  const [draft, setDraft] = useState<AdminProductDraft>(EMPTY_DRAFT);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof AdminProductDraft, string>>>({});
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof AdminProductDraft>(key: K, value: AdminProductDraft[K]) => {
    setDraft(prev => ({ ...prev, [key]: value }));
    setSaved(false);
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    setImageFiles(prev => [...prev, ...files]);
    setSubmitError(null);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof AdminProductDraft, string>> = {};
    if (!draft.name.trim()) next.name = "Product name is required.";
    if (!draft.description.trim()) next.description = "Description is required.";
    if (draft.price <= 0) next.price = "Enter a valid price.";
    if (draft.stock < 0) next.stock = "Stock cannot be negative.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  if (imageFiles.length === 0) {
    setSubmitError("At least one product image is required.");
    return;
  }

  setSubmitting(true);
  setSubmitError(null);
  try {
    await uploadProductApi(
      {
        ...draft,
        name: draft.name.trim(),
        description: draft.description.trim(),
      },
      imageFiles
    );
    setSaved(true);
    resetForm();
  } catch (err) {
    setSaved(false);
    setSubmitError(err instanceof Error ? err.message : "Upload failed.");
  } finally {
    setSubmitting(false);
  }
};

  const resetForm = () => {
    setDraft(EMPTY_DRAFT);
    setImageFiles([]);
    setPreviews([]);
    setErrors({});
    setSubmitError(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Product Upload"
        subtitle="Add or edit Maati Tatva products with clay and material specifications."
        action={
          saved ? (
            <span className="px-3 py-1.5 rounded-full text-xs font-bold text-green-700" style={{ background: PRIMARY_LIGHT }}>
              Saved successfully
            </span>
          ) : null
        }
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <AdminCard className="p-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide" style={{ fontFamily: FONT_LABEL }}>Basic Details</h2>

            <div>
              <label htmlFor="product-name" className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name</label>
              <input
                id="product-name"
                value={draft.name}
                onChange={e => update("name", e.target.value)}
                className={adminFieldClass(!!errors.name)}
                placeholder="e.g. Organic Vermicompost 25kg"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="product-desc" className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea
                id="product-desc"
                rows={4}
                value={draft.description}
                onChange={e => update("description", e.target.value)}
                className={`${adminFieldClass(!!errors.description)} resize-none`}
                placeholder="Describe benefits, usage, and organic certification details…"
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product-price" className="block text-xs font-semibold text-gray-700 mb-1.5">Price (₹)</label>
                <input
                  id="product-price"
                  type="number"
                  min={0}
                  value={draft.price || ""}
                  onChange={e => update("price", Number(e.target.value))}
                  className={adminFieldClass(!!errors.price)}
                  placeholder="799"
                />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>
              <div>
                <label htmlFor="product-mrp" className="block text-xs font-semibold text-gray-700 mb-1.5">Original Price (₹)</label>
                <input
                  id="product-mrp"
                  type="number"
                  min={0}
                  value={draft.originalPrice || ""}
                  onChange={e => update("originalPrice", Number(e.target.value))}
                  className={adminFieldClass()}
                  placeholder="999"
                />
              </div>
              <div>
                <label htmlFor="product-stock" className="block text-xs font-semibold text-gray-700 mb-1.5">Stock Quantity</label>
                <input
                  id="product-stock"
                  type="number"
                  min={0}
                  value={draft.stock || ""}
                  onChange={e => update("stock", Number(e.target.value))}
                  className={adminFieldClass(!!errors.stock)}
                  placeholder="120"
                />
                {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
              </div>
              <div>
                <label htmlFor="product-weight" className="block text-xs font-semibold text-gray-700 mb-1.5">Weight (kg)</label>
                <input
                  id="product-weight"
                  type="number"
                  min={0}
                  step={0.1}
                  value={draft.weightKg || ""}
                  onChange={e => update("weightKg", Number(e.target.value))}
                  className={adminFieldClass()}
                  placeholder="25"
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard className="p-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide" style={{ fontFamily: FONT_LABEL }}>Clay & Material Specs</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product-category" className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                <select
                  id="product-category"
                  value={draft.category}
                  onChange={e => update("category", e.target.value)}
                  className={adminFieldClass()}
                >
                  {ADMIN_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="product-clay" className="block text-xs font-semibold text-gray-700 mb-1.5">Clay / Material Type</label>
                <select
                  id="product-clay"
                  value={draft.clayType}
                  onChange={e => update("clayType", e.target.value)}
                  className={adminFieldClass()}
                >
                  {CLAY_MATERIALS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="product-spec" className="block text-xs font-semibold text-gray-700 mb-1.5">Material Specification</label>
              <textarea
                id="product-spec"
                rows={3}
                value={draft.materialSpec}
                onChange={e => update("materialSpec", e.target.value)}
                className={`${adminFieldClass()} resize-none`}
                placeholder="NPK ratio, moisture content, clay composition, shelf life…"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.organicCertified}
                  onChange={e => update("organicCertified", e.target.checked)}
                  className="rounded border-gray-300 text-green-700 focus:ring-green-600"
                />
                Organic Certified
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.inStock}
                  onChange={e => update("inStock", e.target.checked)}
                  className="rounded border-gray-300 text-green-700 focus:ring-green-600"
                />
                In Stock
              </label>
            </div>
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard className="p-5">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4" style={{ fontFamily: FONT_LABEL }}>Product Images</h2>

            <label
              htmlFor="product-image"
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-colors hover:border-green-400 min-h-[160px] p-4 mb-4"
              style={{ borderColor: G[200], background: G[50] }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: PRIMARY_LIGHT }}>
                <ImagePlus size={20} style={{ color: PRIMARY }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">Click to upload multiple images</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
              <input id="product-image" type="file" accept="image/*" multiple className="hidden" onChange={handleImage} />
            </label>

            {/* Images Grid Map view with Individual Remove Action */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto p-1">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border">
                    <img src={src} alt={`Preview ${idx}`} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </AdminCard>

          <AdminCard className="p-5 space-y-3">
            {submitError && (
              <p className="text-xs text-red-600 font-medium text-center">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-95 disabled:opacity-60"
              style={{ background: PRIMARY, boxShadow: "0 4px 14px rgba(36,104,65,0.35)" }}
            >
              <Save size={16} /> {submitting ? "Saving…" : "Save Product"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-gray-600 border hover:bg-gray-50"
              style={{ borderColor: G[200] }}
            >
              <Upload size={16} /> Reset Form
            </button>
          </AdminCard>
        </div>
      </form>
    </div>
  );
}

export default ProductUpload;