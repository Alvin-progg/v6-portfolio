import SectionBlock from "@/app/components/SectionBlock";
import ListItem from "@/app/components/ListItem";

type Post = {
  title: string;
  summary: string;
  href?: string;
};

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <SectionBlock label="blog" viewAllHref="#">
      {posts.map((post) => (
        <ListItem
          key={post.title}
          title={post.title}
          href={post.href}
          description={post.summary}
        />
      ))}
    </SectionBlock>
  );
}
