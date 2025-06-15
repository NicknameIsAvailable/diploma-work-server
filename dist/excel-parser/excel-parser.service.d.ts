export declare class ExcelParserService {
    parseExcelToCsv(buffer: Buffer): string;
    parseCsvToExcel(csv: string, sheetName?: string): Buffer;
    private parseCsvLine;
}
