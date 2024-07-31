import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export default class PdfReaderService {
    static async read(file){
        try {
            const blob = await new Blob([file.data], { type: file.mimetype });
            const loader = await new PDFLoader(blob, {
                splitPages: false
            })
            const docs = await loader.load();
            return docs
        } catch (err) {

        }
    }
}