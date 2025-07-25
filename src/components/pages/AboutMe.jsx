export default function AboutMe() {
  return (
    <div className="w-full h-full text-2xl bg-neutral-200 p-4 flex flex-col items-center justify-center border gap-4 font-mono">
      <img
        src="/images/profile.jpeg"
        className="object-cover rounded-4xl shadow-xl shadow-neutral-500 h-1/3 mt-6"
      />

      <div className="h-full w-full text-center items-center justify-center flex flex-col font-mono gap-4 p-2">
        <p className="font-semibold text-3xl">I'm Carlos Ito</p>
        <p className="">
          Passionate about learning new technologies, building things, breaking
          them, and figuring out how to make them better.
        </p>
        <p className="">
          Currently in my final year as a Computer Science and Technology
          student at Tecnológico de Monterrey.
        </p>
      </div>
    </div>
  );
}
