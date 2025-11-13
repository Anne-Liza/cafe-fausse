import { useEffect, useState } from "react";
import { getPromo, updatePromo } from "../../services/adminApi";

export default function MarketingManager() {
  const [promo, setPromo] = useState({ headline: "", subtext: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { (async () => setPromo(await getPromo()))(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await updatePromo(promo);
    setPromo(res.promo);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Marketing Manager</h2>
      <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-3">
        <input className="input input-bordered w-full" placeholder="Headline"
               value={promo.headline} onChange={e=>setPromo({...promo,headline:e.target.value})}/>
        <textarea className="textarea textarea-bordered w-full" rows="4" placeholder="Subtext"
               value={promo.subtext} onChange={e=>setPromo({...promo,subtext:e.target.value})}/>
        <button className="btn bg-[#a44b23] text-white" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="bg-base-100 p-4 rounded">
        <div className="text-sm opacity-70">Live preview</div>
        <div className="text-2xl font-bold">{promo.headline}</div>
        <div className="text-gray-600">{promo.subtext}</div>
      </div>
    </div>
  );
}
