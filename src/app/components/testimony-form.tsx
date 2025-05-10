import { useState, useEffect } from "react";

export function TestimonyPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = new URLSearchParams();
      formData.forEach((value, key) => {
        data.append(key, value.toString());
      });
  
      await fetch("/__testimony-form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
  
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        form.reset();
      }, 2000);
    };

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      
        return () => {
          document.body.style.overflow = "";
        };
      }, [isOpen]);
  
    return (
      <div>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          onClick={() => setIsOpen(true)}
        >
          Leave a Testimony
        </button>
  
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 m-2 w-full max-w-lg relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
              >
                ×
              </button>
  
              {!submitted ? (
                <form name="testimony" method="POST" onSubmit={handleSubmit}>
                  <input type="hidden" name="form-name" value="testimony" />
  
                  <input name="name" type="text" required placeholder="Name" className="block w-full mb-3 border p-2 rounded" />
                  <input name="email" type="email" required placeholder="Email" className="block w-full mb-3 border p-2 rounded" />
                  <input name="phone" type="tel" required placeholder="Phone" className="block w-full mb-3 border p-2 rounded" />
                  <label className="block mb-1">Job date:</label>
                  <input name="date" type="datetime-local" className="block w-full mb-3 border p-2 rounded" />
  
                  <label className="block mb-1">How was your experience?</label>
                  <textarea name="message" required rows={5} className="block w-full mb-3 border p-2 rounded"></textarea>
  
                  <label className="block mb-1">How did you hear about us?</label>
                  <select name="from" required className="block w-full mb-4 border p-2 rounded">
                    <option value="">--Please choose an option--</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="web">Web Search</option>
                    <option value="signs">Lawn Sign</option>
                    <option value="word of mouth">Word of Mouth</option>
                    <option value="other">Other</option>
                  </select>
  
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center text-green-600 text-xl font-semibold">
                  Thank you! Your testimony has been submitted.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
};