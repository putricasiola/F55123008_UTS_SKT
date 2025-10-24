import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { parentPort, workerData } from "worker_threads";

const packageDef = protoLoader.loadSync("geometry.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const geometryPackage = grpcObject.geometry;

const client = new geometryPackage.GeometryService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const { bentuk, param } = workerData;

function hitung(bentuk, param) {
  return new Promise((resolve, reject) => {
    switch (bentuk) {
      case "persegi":
        client.Persegi(param, cb);
        break;
      case "persegi panjang":
        client.PersegiPanjang(param, cb);
        break;
      case "segitiga":
        client.Segitiga(param, cb);
        break;
      case "lingkaran":
        client.Lingkaran(param, cb);
        break;
      default:
        reject("Bentuk tidak dikenal");
    }

    function cb(err, response) {
      if (err) reject(err);
      else resolve(response);
    }
  });
}

hitung(bentuk, param)
  .then((res) => parentPort.postMessage(res))
  .catch((err) => parentPort.postMessage({ error: err.message }));
