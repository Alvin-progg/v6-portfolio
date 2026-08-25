import Column from "@/app/components/Column";
import Header from "@/app/components/Header";
import Intro from "@/app/components/Intro";

export default function Home() {
  return (
    <Column>
      <div className="flex flex-col gap-10">
        <Header />
        <Intro />
      </div>
    </Column>
  );
}
