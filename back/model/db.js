const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://Javier89:Javier89@cluster0.efmay.mongodb.net/moviedb?retryWrites=true&w=majority";

ObjectID = require('mongodb').ObjectID;
async function conexion(){
    let client;
    try{
        client = await MongoClient(url,{ useUnifiedTopology: true, useNewUrlParser: true });
        await client
        .connect()
        .then(()=>console.log("Ha funcionado! estamos conectados"))
    }catch(e){
        console.log(e);
    }finally{
        return client; // Objeto de conexion a la BBDD
    }
}  
exports.readMovies  = async () => {
    const client = await conexion();
    let result;
    try {
    result = await client
    .db("moviedb")
    .collection("catalogo")
    .find()
    .toArray()
    } catch (e){
        console.error(e);
    }
    finally {
        await client.close();
        return result;
    }
}
exports.readOneMovie  = async (id) => {
    let id2 = new ObjectID(id);
    const client = await conexion ();
    const result = await client
    .db("moviedb")
    .collection("catalogo")
    .find({ _id: id2})
    .toArray()
    return result;
}
exports.actualizarOneMovies = async (id, actualizador) => {
    let id2 = new ObjectID(id);
    const client = await conexion ();
    const result = await client
    .db("moviedb")
    .collection("catalogo")
    .updateOne({ _id: id2 }, { $set: actualizador });
    return result
}
exports.eliminarMovie = async (id) => {
    let id2 = new ObjectID(id);
    const client = await conexion ();
    const result = await client
    .db("moviedb")
    .collection("catalogo")
    .deleteOne({ _id : id2});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
exports.crearOneMovies = async (creador) => {
    const client = await conexion();
    const result = await client
    .db("moviedb")
    .collection("catalogo")
    .insertOne(creador);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return result.insertedId;
}