import type { Metadata } from "next";
import InfoPage from "@/components/info/InfoPage";
import { INFO } from "@/data/info";
const d = INFO["terms"];
export const metadata: Metadata = { title: d.title, description: d.intro, alternates: { canonical: "/terms" } };
export default function Page() { return <InfoPage {...d} />; }
