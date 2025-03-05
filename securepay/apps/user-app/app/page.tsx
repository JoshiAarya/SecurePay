import { PrismaClient } from "@repo/db/client";
import { Appbar } from "../components/AppBar";

const client = new PrismaClient()

export default function Home() {
  return (
    <div>
      <Appbar/>
    </div>
  );
}
