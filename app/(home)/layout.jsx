import PageTransitionEffect from "../_pageTransitionEffect";

export default function HomeLayout({children}) {
  return (
    <div>
      <PageTransitionEffect>{children}</PageTransitionEffect>
    </div>
  );
}