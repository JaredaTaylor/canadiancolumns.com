"use client";
 
import React, { useState } from "react";

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

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
            form.reset();
            console.log("Form submitted successfully");
            setSubmitted(true);

        } catch (error) {
            // TODO: Error handling
            console.error("Form submission error:", error);
        }
    };
 
  return (
    <div className="w-full px-4 sm:px-8 flex justify-center">
        <div className="w-full max-w-2xl flex flex-col items-stretch">
            <form 
                name="contact"
                onSubmit={handleFormSubmit}
                className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md"
            >
                <input type="hidden" name="form-name" value="contact" />
                <div className="mb-4">
                    <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                        How can we help you?
                    </label>
                    <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="from" className="block text-gray-700 font-medium mb-2">
                        How did you hear about Canadian Columns?
                    </label>
                    <select id="from" name="from" required>
                        <option value="">--Please choose an option--</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="web">Web Search</option>
                        <option value="signs">Lawn Sign</option>
                        <option value="word of mouth">Word of Mouth</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="hidden">
                     <label>
                         Dont fill this out if youre human:
                         <input name="bot-field" />
                     </label>
                 </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    submitted ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                {submitted && (
                    <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded shadow mt-4 flex items-center space-x-2">
                        <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Your message has been sent!</span>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}