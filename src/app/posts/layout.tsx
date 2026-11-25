import { PostsHeader } from "@/components/posts-header";
import { PersonJsonLd } from "@/components/person-json-ld";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <PersonJsonLd />
      <PostsHeader />
      {children}
    </div>
  );
}
