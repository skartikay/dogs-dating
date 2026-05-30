import { useState } from 'react'

const AGES = ['Under 6 months','6 – 12 months','1 year','1.5 years','2 years','2.5 years',
  '3 years','3.5 years','4 years','4.5 years','5 years','5+ years']

export default function Step2({ data, onChange, onBack, onSubmit, loading }) {
  const [errors, setErrors] = useState({})

  const set = (field, val) => {
    onChange({ ...data, [field]: val })
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!data.gender)                                    e.gender = 'Please select gender.'
    if (!data.age)                                       e.age = 'Please select age.'
    if (!data.vaccination)                               e.vaccination = 'Please select vaccination status.'
    if (!data.city.trim())                               e.city = 'Please enter your city.'
    if (!data.pincode || !/^[0-9]{6}$/.test(data.pincode)) e.pincode = 'Please enter a valid 6-digit pincode.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => { if (validate()) onSubmit() }

  return (
    <div className="p-6 sm:p-8 flex flex-col gap-4">

      {/* Gender + Age */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-extrabold text-dark">⚥ Gender <span className="text-coral">*</span></label>
          <select className={`mi ms ${errors.gender ? 'error' : ''}`} value={data.gender} onChange={e => set('gender', e.target.value)}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          {errors.gender && <span className="text-coral text-xs font-bold">{errors.gender}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-extrabold text-dark">🎂 Age <span className="text-coral">*</span></label>
          <select className={`mi ms ${errors.age ? 'error' : ''}`} value={data.age} onChange={e => set('age', e.target.value)}>
            <option value="">Select age</option>
            {AGES.map(a => <option key={a}>{a}</option>)}
          </select>
          {errors.age && <span className="text-coral text-xs font-bold">{errors.age}</span>}
        </div>
      </div>

      {/* Vaccination */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-extrabold text-dark">💉 Vaccination Status <span className="text-coral">*</span></label>
        <div className="flex gap-2 flex-wrap">
          {[['Yes','✅ Fully Vaccinated'],['Partial','🟡 Partial'],['No','❌ Not Yet']].map(([val, label]) => (
            <label key={val} className="radio-opt flex-1 min-w-[90px]">
              <input type="radio" name="vacc" value={val} checked={data.vaccination === val} onChange={() => set('vaccination', val)} />
              {label}
            </label>
          ))}
        </div>
        {errors.vaccination && <span className="text-coral text-xs font-bold">{errors.vaccination}</span>}
      </div>

      {/* City + Pincode */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-extrabold text-dark">🏙️ City <span className="text-coral">*</span></label>
          <input className={`mi ${errors.city ? 'error' : ''}`} type="text"
            placeholder="Mumbai, Delhi…" value={data.city} onChange={e => set('city', e.target.value)} autoComplete="address-level2" />
          {errors.city && <span className="text-coral text-xs font-bold">{errors.city}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-extrabold text-dark">📮 Pincode <span className="text-coral">*</span></label>
          <input className={`mi ${errors.pincode ? 'error' : ''}`} type="text"
            placeholder="400001" maxLength={6} inputMode="numeric" value={data.pincode} onChange={e => set('pincode', e.target.value)} autoComplete="postal-code" />
          {errors.pincode && <span className="text-coral text-xs font-bold">{errors.pincode}</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-1">
        <button onClick={onBack} disabled={loading}
          className="flex-none px-5 py-4 rounded-2xl border-2 border-orange-200 bg-cream text-dark font-extrabold text-sm cursor-pointer hover:border-coral transition-colors">
          ← Back
        </button>
        <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 py-4 text-base">
          {loading ? '🐾 Joining…' : '🐾 Join the Waitlist!'}
        </button>
      </div>
      <p className="text-center text-xs text-grey font-bold">🔒 Your info is safe with us. No spam, ever.</p>
    </div>
  )
}
