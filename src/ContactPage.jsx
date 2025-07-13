import {
  BsLinkedin,
  BsGithub,
  BsTwitterX,
  BsEnvelopeAtFill,
} from "react-icons/bs";
import { useForm, ValidationError } from "@formspree/react";
import React, { useState, useEffect } from "react";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mzzvpzbg");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (state.succeeded) setShowModal(true);
  }, [state.succeeded]);

  return (
    <div className="w-full h-full text-2xl bg-neutral-200 p-4 flex flex-col items-center justify-center border gap-6">
      <div className="h-2/5 w-full text-center items-center justify-center flex flex-col gap-4">
        <h2 className="w-full text-center text-3xl font-mono">
          You can find me on:
        </h2>
        <a
          href="https://www.linkedin.com/in/carlositom/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500 hover:scale-105 transition-transform"
        >
          <BsLinkedin />
          LinkedIn
        </a>
        <a
          href="https://github.com/ItO210"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500 hover:scale-105 transition-transform"
        >
          <BsGithub />
          Github
        </a>{" "}
        <a
          href="https://x.com/ItO_210"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500  hover:scale-105 transition-transform"
        >
          <BsTwitterX />
          Twitter
        </a>{" "}
      </div>
      {showModal ? (
        <div className="w-full h-3/5 flex flex-col text-2xl items-center justify-center ">
          <h2 className="font-semibold w-fulltext-center">Message Sent!</h2>
          <p className="w-full text-center">
            Thanks for reaching out. I’ll get back to you soon.
          </p>
          <button onClick={() => setShowModal(false)} className="w-full">
            Close
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full h-2/3 flex flex-col text-2xl gap-2"
        >
          <h2 className="text-3xl w-full text-center font-mono">
            Or send me a message:
          </h2>
          <div className="w-full h-full">
            <label htmlFor="name" className="font-mono">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="p-2 rounded-2xl shadow-inner shadow-neutral-500 w-full font-mono"
            />
          </div>
          <div className="w-full h-full">
            <label htmlFor="email" className="font-mono">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="p-2 rounded-2xl shadow-inner shadow-neutral-500 w-full font-mono"
            />
          </div>
          <div className="w-full h-full">
            <label htmlFor="message" className="font-mono">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="p-2 rounded-2xl shadow-inner shadow-neutral-500 w-full font-mono"
            />
          </div>
          <div className="w-full h-full">
            <button
              type="submit"
              className="rounded-2xl shadow-md shadow-neutral-500 p-2 font-mono"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
