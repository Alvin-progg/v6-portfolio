import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/pfp.jpg"
          alt="Alvin Aloya"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <div>
          <h1 className="text-[1.18rem] font-semibold leading-tight text-fg">
            Alvin Aloya
          </h1>
          <p className="text-[0.9rem] text-dim">Lorem ipsum dolor sit amet</p>
        </div>
      </div>
      <a
        href="#"
        className="text-[0.9rem] text-dim transition-colors hover:text-muted"
      >
        resume ↗
      </a>
    </header>
  );
}
