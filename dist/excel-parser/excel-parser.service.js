"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelParserService = void 0;
const XLSX = require("xlsx");
const common_1 = require("@nestjs/common");
let ExcelParserService = class ExcelParserService {
    parseExcelToCsv(buffer) {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        const rows = [];
        for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
            const row = [];
            for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
                const cell = worksheet[cellAddress];
                let cellValue = '';
                if (cell && cell.v !== undefined && cell.v !== null) {
                    let rawValue = cell.v;
                    if (typeof rawValue === 'string') {
                        rawValue = rawValue.trim();
                        const needsQuoting = rawValue.includes(',') ||
                            rawValue.includes('"') ||
                            rawValue.includes('\n') ||
                            rawValue.includes('\r');
                        if (needsQuoting) {
                            cellValue = `"${rawValue.replace(/"/g, '""')}"`;
                        }
                        else {
                            cellValue = rawValue;
                        }
                    }
                    else {
                        cellValue = String(rawValue);
                    }
                }
                row.push(cellValue);
            }
            rows.push(row.join(','));
        }
        return rows.join('\n');
    }
    parseCsvToExcel(csv, sheetName) {
        const lines = csv.split('\n');
        const data = [];
        for (const line of lines) {
            if (line.trim() === '')
                continue;
            const row = this.parseCsvLine(line);
            data.push(row);
        }
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName ?? 'Sheet1');
        return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    }
    parseCsvLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        let i = 0;
        while (i < line.length) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i += 2;
                }
                else {
                    inQuotes = !inQuotes;
                    i++;
                }
            }
            else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
                i++;
            }
            else {
                current += char;
                i++;
            }
        }
        result.push(current);
        return result;
    }
};
exports.ExcelParserService = ExcelParserService;
exports.ExcelParserService = ExcelParserService = __decorate([
    (0, common_1.Injectable)()
], ExcelParserService);
//# sourceMappingURL=excel-parser.service.js.map