import { useState } from 'react'
import { BREEDS } from '../../data/breeds'

export default function Step1({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({})

  const set = (field, val) => {
    onChange({ ...data, [field]: val })
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!data.ownerName.trim())                                      e.ownerName = 'Please enter your name.'
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email.'
    if (!data.dogName.trim())                                        e.dogName = 'Please enter your dog\'s name.'
    if (!data.breed)                                                  e.breed = 'Please select a breed.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) onNext() }

  return (
    <div className="p-6 sm:p-8 flex flex-col gap-4">

      {/* Owner Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-extrabold text-dark">👤 Your Name <span className="text-coral">*</span></label>
        <input className={`mi ${errors.ownerName ? 'error' : ''}`} type="text"
          placeholder="e.g. Akshay, Priya…" value={data.ownerName} onChange={e => set('ownerName', e.target.value)} autoComplete="given-name" />
        {errors.ownerName && <span className="text-coral text-xs font-bold">{errors.ownerName}</span>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-extrabold text-dark">📧 Your Email <span className="text-coral">*</span></label>
        <input className={`mi ${errors.email ? 'error' : ''}`} type="email"
          placeholder="you@example.com" value={data.email} onChange={e => set('email', e.target.value)} autoComplete="email" inputMode="email" />
        {errors.email && <span className="text-coral text-xs font-bold">{errors.email}</span>}
      </div>

      {/* Phone (optional) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-extrabold text-dark">📱 Phone Number <span className="text-grey text-xs font-semibold">(optional)</span></label>
        <input className="mi" type="tel"
          placeholder="+91 98765 43210" value={data.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" inputMode="tel" />
      </div>

      {/* Dog Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-extrabold text-dark">🐶 Dog's Name <span className="text-coral">*</span></label>
        <input className={`mi ${errors.dogName ? 'error' : ''}`} type="text"
          placeholder="e.g. Bella, Bruno, Coco…" value={data.dogName} onChange={e => set('dogName', e.target.value)} autoComplete="off" />
        {errors.dogName && <span className="text-coral text-xs font-bold">{errors.dogName}</span>}
      </div>

      {/* Breed */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-extrabold text-dark">🧬 Breed <span className="text-coral">*</span></label>
        <select className={`mi ms ${errors.breed ? 'error' : ''}`} value={data.breed} onChange={e => set('breed', e.target.value)}>
          <option value="">Select your dog's breed</option>
          {BREEDS.map(g => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map(o => <option key={o}>{o}</option>)}
            </optgroup>
          ))}
        </select>
        {errors.breed && <span className="text-coral text-xs font-bold">{errors.breed}</span>}
      </div>

      <button onClick={handleNext} className="btn-primary py-4 text-base mt-1">
        Continue →
      </button>
      <p className="text-center text-xs text-grey font-bold">🔒 No spam, ever. We respect your privacy.</p>
    </div>
  )
}
