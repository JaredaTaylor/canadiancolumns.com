"use client";
 
import React from "react";

export function ContactForm() {
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = new URLSearchParams();
    formData.forEach((value, key) => {
        data.append(key, value.toString());
    });

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      // TODO: Success handling (e.g., show confirmation message or reset form)
      console.log("Form submitted successfully");
    } catch (error) {
      // TODO: Error handling
      console.error("Form submission error:", error);
    }
  };
 
  return (
    <form name="contact" onSubmit={handleFormSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <label>Name: <input type="text" name="name" required /></label>
      <label>Email: <input type="email" name="email" required /></label>
      <label>Phone Number: <input type="tel" name="phone" required /></label>
      <label>Message: <textarea name="message" required></textarea></label>
      <button type="submit">Submit</button>
    </form>
  );
}