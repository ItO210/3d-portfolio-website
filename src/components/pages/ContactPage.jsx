import {
  BsLinkedin,
  BsGithub,
  BsTwitterX,
  BsEnvelopeAtFill,
} from "react-icons/bs";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useForm, ValidationError } from "@formspree/react";
import React, { useState, useEffect } from "react";

export default function ContactPage({ setTarget }) {
  const [state, handleSubmit] = useForm("mzzvpzbg");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (state.succeeded) setShowModal(true);
  }, [state.succeeded]);

  return (
    <div className="w-full h-full relative bg-neutral-200">
      <div className="absolute w-full h-full bg-grid"></div>
      <div className="absolute w-full h-full text-2xl p-4 flex flex-col items-center justify-between border  font-mono">
        <div className=" w-full text-center items-center justify-between flex  font-mono ">
          <button onClick={() => setTarget("AboutMe_Red_Text_Target")}>
            <MdKeyboardArrowLeft size={50} />
          </button>
          <h1 className="text-4xl">Contact Me</h1>
          <button onClick={() => setTarget("AboutMe_Red_Text_Target")}>
            <MdKeyboardArrowRight size={50} />
          </button>
        </div>
        <div className="w-full text-center items-center justify-center flex flex-col gap-4">
          <h2 className="w-full text-center text-3xl font-mono">
            You can find me on:
          </h2>
          <div className="w-full flex items-center justify-around">
            <a
              href="https://www.linkedin.com/in/carlositom/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500 hover:scale-105 transition-transform bg-neutral-200 border border-neutral-50"
            >
              <BsLinkedin size={40} />
            </a>
            <a
              href="https://github.com/ItO210"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500 hover:scale-105 transition-transform bg-neutral-200 border border-neutral-50"
            >
              <BsGithub size={40} />
            </a>{" "}
            <a
              href="https://x.com/ItO_210"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono flex gap-4 items-center justify-center p-4 rounded-2xl shadow-md shadow-neutral-500  hover:scale-105 transition-transform bg-neutral-200 border border-neutral-50"
            >
              <BsTwitterX size={40} />
            </a>{" "}
          </div>
        </div>
        {showModal ? (
          <div className="w-full flex flex-col text-2xl items-center justify-center ">
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
            className="w-full flex flex-col text-2xl gap-2"
          >
            <h2 className="text-3xl w-full text-center font-mono">
              Or send me a message:
            </h2>
            <div className="w-full h-full px-4">
              <label htmlFor="name" className="font-mono">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="p-2 rounded-2xl bg-neutral-200 shadow-inner shadow-neutral-500 w-full font-mono border border-neutral-50"
              />
            </div>
            <div className="w-full h-full px-4">
              <label htmlFor="email" className="font-mono">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="p-2 rounded-2xl shadow-inner bg-neutral-200 shadow-neutral-500 w-full font-mono border border-neutral-50"
              />
            </div>
            <div className="w-full h-full px-4">
              <label htmlFor="message" className="font-mono">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="p-2 rounded-2xl shadow-inner bg-neutral-200 shadow-neutral-500 w-full font-mono border border-neutral-50"
              />
            </div>
            <div className="w-full h-full px-4">
              <button
                type="submit"
                className="rounded-2xl shadow-md shadow-neutral-500 p-2 font-mono border border-neutral-50"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
