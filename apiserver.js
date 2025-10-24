import express from "express";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync("geometry.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const geometryPackage = grpcObject.geometry;

const client = new geometryPackage.GeometryService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const app = express();
app.use(express.json());

app.post("/geometry", (req, res) => {
  const { bentuk, param } = req.body;

  switch (bentuk.toLowerCase()) {
    case "persegi":
      client.Persegi({ sisi: param.sisi }, callback);
      break;
    case "persegi panjang":
      client.PersegiPanjang(param, callback);
      break;
    case "segitiga":
      client.Segitiga(param, callback); // param tetap {alas, ttinggi}
      break;
    case "lingkaran":
      client.Lingkaran(param, callback);
      break;
    default:
      return res.status(400).json({ error: "Bentuk tidak dikenal" });
  }

  function callback(err, response) {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  }
});

app.listen(3000, () => console.log("Express API running on port 3000"));
