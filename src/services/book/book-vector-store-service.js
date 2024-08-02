import vectorStore from "../../utils/vector-store.js";

export default class BookVectorStoreService {
    static async store(book, docs){
        try {
            for (let doc of docs){
                doc.metadata = book.dataValues;
            }
            await vectorStore.addDocuments(docs);
        } catch (err){
            const error = new Error("Can't store the book in the vector store")
            error.status = 400;
            throw error;
        }
    }
}