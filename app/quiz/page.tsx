import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Quiz } from "@/components/Quiz";

export default function QuizPage() {
  return (
    <>
      <Header />
      <main className="bg-mesh min-h-[80vh]">
        <Quiz />
      </main>
      <Footer />
    </>
  );
}
