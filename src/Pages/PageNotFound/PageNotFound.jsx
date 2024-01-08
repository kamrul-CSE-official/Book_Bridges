import Lottie from 'lottie-react';
import pageNotFound from '../../assets/pageNotFound.json';
import { Link } from 'react-router-dom';


export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <Lottie animationData={pageNotFound} className="w-1/2" />
      <Link to="/">
        <button className="text-2xl font-bold p-2 btn btn-accent">Go Home</button>
      </Link>
    </div>
  )
}
