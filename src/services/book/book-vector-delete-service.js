import { Document } from "@langchain/core/documents";
import vectorStore from "../../utils/vector-store.js";

export default class BookVectorDeleteService {
    static async delete(book){
        try {
            //await vectorStore.ensureCollection();
            await vectorStore.delete({filter: { "isbn": book.dataValues.isbn }})
        } catch (err){
            console.log(err)
            const error = new Error("Can't delete the book from the vector store")
            error.status = 500;
            throw error;
        }
    }
}