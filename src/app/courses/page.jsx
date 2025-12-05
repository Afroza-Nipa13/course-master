import { Suspense } from "react";
import CoursesClient from "./CoursesClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <CoursesClient />
    </Suspense>
  );
}
