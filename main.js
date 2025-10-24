import { Worker } from "worker_threads";

const tasks = [
  { bentuk: "persegi", param: { sisi: 5 } },
  { bentuk: "persegi panjang", param: { panjang: 4, lebar: 6 } },
  { bentuk: "segitiga", param: { alas: 3, ttinggi: 8 } },
  { bentuk: "lingkaran", param: { jariJari: 7 } },
];

tasks.forEach((task, i) => {
  const worker = new Worker("./worker.js", { workerData: task });
  worker.on("message", (msg) => {
    console.log(`Worker ${i + 1} hasil:`, msg);
  });
});
