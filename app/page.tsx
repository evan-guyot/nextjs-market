import Link from "next/link";
import Marquee from "react-fast-marquee";

const products: {
  name: string;
  emoji: string;
  color: string;
  alt: string;
  description: string;
  link: string;
}[] = [
  {
    name: "Accessories",
    emoji: "👒",
    color: "rgb(16 185 129)",
    alt: "accessories",
    description: "Explore our collection of stylish accessories.",
    link: "#",
  },
  {
    name: "Shirts",
    emoji: "👕",
    color: "rgb(244 63 94)",
    alt: "shirts",
    description: "Discover our trendy and comfortable shirts.",
    link: "#",
  },
  {
    name: "Pants",
    emoji: "👖",
    color: "rgb(234 179 8)",
    alt: "pants",
    description: "Find the perfect pair of pants for any occasion.",
    link: "#",
  },
  {
    name: "Shoes",
    emoji: "👟",
    color: "rgb(249 115 22)",
    alt: "shoes",
    description: "Step into style with our fashionable footwear.",
    link: "#",
  },
];

export default function Page() {
  return (
    <main className="flex flex-col p-2">
      <div className="mt-4 flex grow flex-col">
        <div className="flex flex-col justify-center gap-6 w-full my-12">
          <p className="text-xl text-gray-800 dark:text-gray-200 md:text-3xl font-bold mx-auto">
            Welcome to our Market 😁
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200 md:text-base mx-auto">
            The place where you will find everything you need !
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-md w-11/12 mx-auto my-12">
          <Marquee autoFill={true}>
            {products.map((p) => (
              <div key={p.alt}>
                <div className="flex flex-col items-center gap-2 p-4 md:p-8">
                  <h2 className="text-lg font-bold mt-4 text-gray-800 dark:text-gray-200">
                    {p.name}
                  </h2>
                  <Link
                    href={p.link}
                    className="text-4xl p-4 rounded-md bg-hover"
                    style={{
                      textShadow: "#000 2px 2px 5px",
                      backgroundColor: p.color,
                    }}
                  >
                    {p.emoji}
                  </Link>
                  <p className="text-gray-700 dark:text-gray-300 text-sm ">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </main>
  );
}
