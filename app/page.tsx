import Header from "@/app/components/Header";
import Intro from "@/app/components/Intro";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1011] text-[#F4F2ED]">
      <div className="mx-auto flex max-w-[512px] flex-col gap-10 px-6 py-20">
        <Header />
        <Intro />
      </div>
    </main>
  );
}
