import Link from "next/link";
import Button from "./components/ui/Button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div className="flex flex-col items-center">
        <div>
          <h1 className="pt-[100px] text-[50px] font-bold">
            👋Hello there... Lets try to find some offers for you!
          </h1>
        </div>
        <div>
          <Link href="/jobs">
            <Button className="cursor-pointer" variant="secondary">
              Find dream job!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
