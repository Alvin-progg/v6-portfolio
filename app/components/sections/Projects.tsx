import SectionBlock from "@/app/components/SectionBlock";
import ListItem from "@/app/components/ListItem";

type Project = {
  title: string;
  description: string;
  href?: string;
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <SectionBlock label="projects" viewAllHref="#">
      {projects.map((project) => (
        <ListItem
          key={project.title}
          title={project.title}
          href={project.href}
          description={project.description}
        />
      ))}
    </SectionBlock>
  );
}
