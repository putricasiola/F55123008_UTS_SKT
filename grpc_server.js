import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDef = protoLoader.loadSync("geometry.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const geometryPackage = grpcObject.geometry;

function Persegi(call, callback) {
  const sisi = call.request.sisi;
  const hasil = sisi * sisi;
  callback(null, { hasil, bentuk: "persegi" });
}

function PersegiPanjang(call, callback) {
  const { panjang, lebar } = call.request;
  const hasil = panjang * lebar;
  callback(null, { hasil, bentuk: "persegi panjang" });
}

function Segitiga(call, callback) {
  const { alas, ttinggi } = call.request; // sesuai proto (ttinggi)
  const hasil = 0.5 * alas * ttinggi;
  callback(null, { hasil, bentuk: "segitiga" });
}

function Lingkaran(call, callback) {
  const { jariJari } = call.request;
  const hasil = Math.PI * jariJari * jariJari;
  callback(null, { hasil, bentuk: "lingkaran" });
}

function main() {
  const server = new grpc.Server();
  server.addService(geometryPackage.GeometryService.service, {
    Persegi,
    PersegiPanjang,
    Segitiga,
    Lingkaran,
  });
  server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    console.log("🟢 gRPC Geometry Server running at 0.0.0.0:50051");
    server.start();
  });
}

main();
