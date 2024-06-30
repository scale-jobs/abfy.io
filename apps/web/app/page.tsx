import Image from "next/image";
import { Experiment, Variant } from "@repo/abfy";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1>This is a Test</h1>
      <Experiment id="SomeRandomId">
        <Variant></Variant>
        <Variant></Variant>
      </Experiment>
    </main>
  );
}
