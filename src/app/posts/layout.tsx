import { PostsHeader } from "@/components/posts-header";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <PostsHeader />
      {children}
    </div>
  );
}
