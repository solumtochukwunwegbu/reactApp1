import "./settings.css";
import React, { useEffect, useState } from "react";

function TerminalSettingsForm() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(function () {
    fetch("/api/terminal-settings")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setForm(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Failed to load terminal settings:", error);
        setLoading(false);
      });
  }, []);

  function handleChange(event) {
    var field = event.target.name;
    var value = event.target.value;

    setForm(function (prevForm) {
      return Object.assign({}, prevForm, { [field]: value });
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("/api/terminal-settings", {
      method: "PUT", // or POST if it's a new record
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to save terminal settings");
        }
        return response.json();
      })
      .then(function (updated) {
        setMessage("Settings updated successfully.");
      })
      .catch(function (error) {
        console.error(error);
        setMessage("Error updating settings.");
      });
  }

  if (loading) {
    return <div className="p-4">Loading settings...</div>;
  }

  if (!form) {
    return <div className="p-4 text-red-600">No data received from server.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Terminal Configuration</h2>
      {message && <p className="mb-2 text-green-700">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Terminal ID" name="terminalId" value={form.terminalId} onChange={handleChange} />
        <FormField label="Merchant Name" name="merchantName" value={form.merchantName} onChange={handleChange} />
        <FormTextArea label="Address" name="address" value={form.address} onChange={handleChange} />
        <FormField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <FormField label="Application Name" name="applicationName" value={form.applicationName} onChange={handleChange} />
        <FormField label="Application Version" name="applicationVersion" value={form.applicationVersion} onChange={handleChange} />
        <FormField label="PTSP" name="ptsp" value={form.ptsp} onChange={handleChange} />
        <FormField label="Terminal Serial" name="terminalSerial" value={form.terminalSerial} onChange={handleChange} />
        <FormField label="Terminal Type" name="terminalType" value={form.terminalType} onChange={handleChange} />
        <FormField label="Terminal Model" name="terminalModel" value={form.terminalModel} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </form>
    </div>
  );
}

function FormField(props) {
  return (
    <div>
      <label className="block font-medium mb-1">{props.label}</label>
      <input
        type="text"
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        className="w-full border p-2"
      />
    </div>
  );
}

function FormTextArea(props) {
  return (
    <div>
      <label className="block font-medium mb-1">{props.label}</label>
      <textarea
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        rows="3"
        className="w-full border p-2"
      />
    </div>
  );
}

export default TerminalSettingsForm;
