import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TokenTextSplitter } from "@langchain/textsplitters";

export default class PdfReaderService {
    static async read(file){
        const blob = new Blob([file.data], { type: file.mimetype });
        const loader = new PDFLoader(blob, {
            splitPages: false
        })
        const docs = await loader.load();

        const splitter = new TokenTextSplitter({
            chunkSize: 750,
            chunkOverlap: 150,
        });
        return await splitter.splitDocuments(docs);
    }
}