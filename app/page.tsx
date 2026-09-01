import Column from "@/app/components/Column";
import PlaygroundPanel from "@/app/components/playground/PlaygroundPanel";
import GithubWidget from "@/app/components/playground/GithubWidget";
import FloatingDock from "@/app/components/FloatingDock";
import Header from "@/app/components/Header";
import Intro from "@/app/components/Intro";
import Blog from "@/app/components/sections/Blog";
import Projects from "@/app/components/sections/Projects";
import Experience from "@/app/components/sections/Experience";
import Testimonials from "@/app/components/sections/Testimonials";
import Hackathons from "@/app/components/sections/Hackathons";
import Misc from "@/app/components/sections/Misc";
import Contact from "@/app/components/sections/Contact";
import blog from "@/app/data/blog.json";
import projects from "@/app/data/projects.json";
import experience from "@/app/data/experience.json";
import testimonials from "@/app/data/testimonials.json";
import hackathons from "@/app/data/hackathons.json";
import misc from "@/app/data/misc.json";
import contact from "@/app/data/contact.json";

export default function Home() {
  return (
    <>
      <PlaygroundPanel githubWidget={<GithubWidget />} />
      <Column>
        <div className="flex flex-col gap-10">
          <Header />
          <Intro />
          <Blog posts={blog} />
          <Projects projects={projects} />
          <Experience roles={experience} />
          <Testimonials quotes={testimonials} />
          <Hackathons events={hackathons} />
          <Misc items={misc} />
          <Contact {...contact} />
        </div>
      </Column>
      <FloatingDock />
    </>
  );
}
