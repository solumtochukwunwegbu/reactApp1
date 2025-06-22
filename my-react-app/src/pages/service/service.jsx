import "./service.css";
import { useState } from "react";

export default function Service() {
  const [formData, setFormData] = useState({
    TerminalID: "",
    MerchantName: "",
    Address: "",
    TerminalKey: "",
    phone: "",
    appName: "",
    appVersion: "",
    ptsp: "",
    serial: "",
    type: "",
    model: "",
    connectivity: "",
    network: "",
    latitude: "",
    longitude: "",
    comment: "",
    commentOther: "",
    receipt: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          alert(`Location captured: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        function (error) {
          alert("Error getting location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/submit-service", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred while submitting.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Terminal ID: <input type="text" name="TerminalID" onChange={handleChange} /></label>
      <label>Merchant Name: <input type="text" name="MerchantName" onChange={handleChange} /></label>
      <label>Address: <textarea name="Address" onChange={handleChange} /></label>
      <label>Terminal Key: <input type="text" name="TerminalKey" onChange={handleChange} /></label>
      <label>Phone: <input type="text" name="phone" onChange={handleChange} /></label>
      <label>Application Name: <input type="text" name="appName" onChange={handleChange} /></label>
      <label>Application Version: <input type="text" name="appVersion" onChange={handleChange} /></label>
      <label>PTSP: <input type="text" name="ptsp" onChange={handleChange} /></label>
      <label>Terminal Serial: <input type="text" name="serial" onChange={handleChange} /></label>
      <label>Terminal Type: <input type="text" name="type" onChange={handleChange} /></label>
      <label>Terminal Model: <input type="text" name="model" onChange={handleChange} /></label>

      <label>Connectivity Type:
        <select name="connectivity" onChange={handleChange}>
          <option value="">--Select--</option>
          <option value="WIFI">WIFI</option>
          <option value="GPRS">GPRS</option>
          <option value="Data">Data</option>
        </select>
      </label>

      <label>Network:
        <select name="network" onChange={handleChange}>
          <option value="">--Select--</option>
          <option value="MTN">MTN</option>
          <option value="AIRTEL">AIRTEL</option>
          <option value="GLO">GLO</option>
          <option value="9MOBILE">9MOBILE</option>
        </select>
      </label>

      <label>Receipt Upload:
        <input type="file" name="receipt" accept="image/*" capture="environment" onChange={handleChange} />
      </label>

      <label>Comment:
        <select name="comment" onChange={handleChange}>
          <option value="">--Select--</option>
          <option value="Damaged battery">Damaged battery</option>
          <option value="Terminal working fine with an approved transaction done">Terminal working fine with an approved transaction done</option>
          <option value="Others">Others</option>
        </select>
      </label>

      <label>Comment (Other):
        <textarea name="commentOther" onChange={handleChange} />
      </label>

      <div className="form-buttons">
        <button type="button" onClick={getLocation}>Capture Location</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
