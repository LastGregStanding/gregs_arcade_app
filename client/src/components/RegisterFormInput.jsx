const RegisterFormInput = ({ formData, handleChange, type, name, label }) => {
  return (
    <div className="form-input-container">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default RegisterFormInput;
