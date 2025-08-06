import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
export default function AboutMe({ setTarget }) {
  return (
    <div className="h-full w-full relative bg-neutral-200">
      <div className="absolute w-full h-full bg-grid"></div>
      <div className="absolute w-full h-full text-2xl  p-4 flex flex-col items-center justify-between border gap-2 font-mono">
        <div className=" w-full text-center items-center justify-between flex  font-mono ">
          <button onClick={() => setTarget("Contact_Red_Text_Target")}>
            <MdKeyboardArrowLeft size={50} />
          </button>
          <h1 className="text-4xl">About Me</h1>
          <button onClick={() => setTarget("Contact_Red_Text_Target")}>
            <MdKeyboardArrowRight size={50} />
          </button>
        </div>
        <img
          src="/images/profile.jpeg"
          className="object-cover rounded-4xl shadow-lg shadow-neutral-500 h-1/3  border border-neutral-50"
        />

        <div className="h-full w-full text-center items-center justify-center flex flex-col font-mono gap-4 p-2 mt-2">
          <p className="font-semibold text-3xl">I'm Carlos Ito</p>
          <p className="">
            Passionate about learning new technologies, building things,
            breaking them, and figuring out how to make them better.
          </p>
          <p className="">
            Currently in my final year as a Computer Science and Technology
            student at Tecnológico de Monterrey.
          </p>
        </div>
      </div>
    </div>
  );
}
