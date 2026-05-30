export function generateRefCode(ownerName, dogName, pincode, email) {
  const o   = (ownerName || '').replace(/[^a-zA-Z]/g, '').slice(0, 3).toLowerCase()
  const d   = (dogName   || '').replace(/[^a-zA-Z]/g, '').slice(0, 2).toLowerCase()
  const p   = (pincode   || '').replace(/\D/g, '')
  const e   = (email     || '').replace(/[^a-zA-Z]/g, '').slice(0, 4).toLowerCase()
  const rnd = Math.random().toString(36).slice(2, 4)
  return o + d + p + e + rnd   // e.g. "aksco342008testK7"
}

export function getInboundRef() {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref') || ''
  if (ref) {
    localStorage.setItem('bm_ref', ref)
    return ref
  }
  return localStorage.getItem('bm_ref') || ''
}
