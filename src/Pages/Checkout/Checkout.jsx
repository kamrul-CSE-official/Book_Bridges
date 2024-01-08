import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Lottie from "lottie-react";
import congImg from "../../assets/congratulations.json";

export default function Checkout() {
  const { width, height } = useWindowSize();

  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
        <h1 className="text-6xl font-bold text-black">Congratulations 😍</h1>
        <p>আপনি সবলভাবে বই কিনতে পেরেছেন 🤝</p>
        <Lottie className="w-1/5 p-0 m-0" animationData={congImg} />
      </div>
      <Confetti width={width} height={height} />
    </div>
  );
}
