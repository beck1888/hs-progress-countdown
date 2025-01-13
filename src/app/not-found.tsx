import Link from "next/link";
import Image from "next/image";
import detectiveSvg from "@/public/icons/detective.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
      <h1 className="text-9xl font-bold mb-4 neon-blue">404</h1>
      <div className="flex items-center">
        <div className="mr-8">
          <Image src={detectiveSvg} alt="Detective" width={200} height={200} />
        </div>
        <div>
          <h2 className="text-6xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl mb-4">But rest assured we have our best detectives on the case.</p>
          <Link href="/" legacyBehavior>
            <a className="px-6 py-3 bg-dark-brown text-white rounded-md hover:bg-brown-700 transition-colors">
              Go Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
