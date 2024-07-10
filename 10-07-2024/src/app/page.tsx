import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Form from "@/components/Form/Form";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header title="Titolo della nostra app" subTitle="ciao ciao" />
      <div className={styles.center}>
          <Form />
      </div>
    </main>
  );
}
