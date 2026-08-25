import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/pfp.jpg"
          alt="Alvin Aloya"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-[1.18rem] font-semibold leading-tight text-[#F4F2ED]">
            Alvin Aloya
          </h1>
          <p className="text-[0.9rem] text-[#716F6A]">
            Lorem ipsum dolor sit amet
          </p>
        </div>
      </div>
      <a
        href="#"
        className="text-[0.9rem] text-[#716F6A] transition-colors hover:text-[#AAA7A1]"
      >
        resume ↗
      </a>
    </header>
  );
}
