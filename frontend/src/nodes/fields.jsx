// fields.js
// Small reusable form-field building blocks shared by all node bodies.
// Keeping these separate from BaseNode means each node only writes
// `<LabeledInput label="Name" value={x} onChange={...} />` instead of
// re-implementing label + input markup every time.

export const Field = ({ label, children }) => (
  <div className="pf-field">
    {label && <span className="pf-field-label">{label}</span>}
    {children}
  </div>
);

export const LabeledInput = ({ label, className = 'nodrag', ...props }) => (
  <Field label={label}>
    <input className={`pf-input ${className}`} {...props} />
  </Field>
);

export const LabeledSelect = ({ label, options, className = 'nodrag', ...props }) => (
  <Field label={label}>
    <select className={`pf-select ${className}`} {...props}>
      {options.map((opt) => (
        <option key={opt.value ?? opt} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </option>
      ))}
    </select>
  </Field>
);

export const LabeledTextarea = ({ label, className = 'nodrag', ...props }) => (
  <Field label={label}>
    <textarea className={`pf-textarea ${className}`} {...props} />
  </Field>
);
