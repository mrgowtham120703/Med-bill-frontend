import React, { useState } from 'react';
import api from '../api/api';
import ClaimPreview from '../components/ClaimPreview';


export default function ClaimForm() {
  const [form, setForm] = useState({ procedures: [{ code: '', description: '', qty: 1, unitCost: 0 }], medications: [], bedDays: 0, ambulanceUsed: false, ambulanceCharge: 0 });
  const [preview, setPreview] = useState(null);
  const [saved, setSaved] = useState(null);

  function updateProcedure(i, key, val) {
    const copy = { ...form };
    copy.procedures[i][key] = val;
    setForm(copy);
  }
  function addProcedure() {
    setForm({ ...form, procedures: [...form.procedures, { code: '', description: '', qty: 1, unitCost: 0 }] });
  }

  function computePreview() {
    // quick client-side compute  (same rules as backend simple)
    let billed = 0;
    form.procedures.forEach(p => billed += (Number(p.uniCost) || 0) * (Number(p.qty) || 1));
    form.medications.forEach(m => billed += (Number(m.uniCost) || 0) * (Number(m.qty) || 1));
    billed += (Number(form.bedDays) || 0) * 500;
    if (form.ambulanceUsed) billed += Number(form.ambulanceCharge) || 0;
    const allowed = billed * 0.8;
    setPreview({ billed, allowed });
  }

  async function submit() {
    // minimal: providerId and patientID should be selected in real app
    const body = { ...form, providerId: null, patientId: null, status: 'submitted' };
    const res = await api.post('/claims', body);
    setSaved(res.data);
  }

  return (
    <div>
      <h2>New Claim</h2>
      <div>
        <h3>Procedured</h3>
        {form.procedures.map((p, i) => (
          <div key={i} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
            <input placeholder='Code' value={p.code} onChange={e => updateProcedure(i, 'code', e.target.value)} />
            <input placeholder='Desc' value={p.description} onChange={e => updateProcedure(i, 'description', e.target.value)} />
            <input placeholder='qty' type='number' value={p.qty} onChange={e => updateProcedure(i, 'qty', e.target.value)} />
            <input placeholder='uniCost' type='number' value={p.uniCost} onChange={e => updateProcedure(i, 'unitCost', e.target.value)} />
          </div>
        ))}
        <button onClick={addProcedure}>Add Procedure</button>
      </div>

      <div>
        <label>Bed days <input type='number' value={form.bedDays} onChange={e => setForm({ ...form, bedDays: e.target.value })} /></label>
        <label>Ambulance <input type='checkbox' checked={form.ambulanceUsed} onChange={e => setForm({ ...form, ambulanceUsed: e.target.checked })} /></label>
        {form.ambulanceUsed && <input placeholder='ambulance charge' value={form.ambulanceCharge} onChange={e => setForm({ ...form, ambulanceCharge: e.target.value })} />}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={computePreview}>Preview</button>
        <button onClick={submit}>Submit Claim</button>
      </div>

      {preview && <ClaimPreview data={preview} />}
      {saved && <pre>{JSON.stringify(saved, null, 2)}</pre>}
    </div>
  )
}