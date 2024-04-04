//! NOTE: ONLY WORKS FOR SCHEMAS OF DEPTH 2: CURRENTLY APPLYS TO ALL

let lines: Array<Line> = [];

export interface Line {
    name: string,
    prettyName: string,
    type: string,
    enums?: Array<string>,
    format?: string
    nested?: any
}

export function schemaToJson(obj: any) {
    if (typeof obj != "object") {
        return {}
    }

    let blankJson: any = {}

    Object.keys(obj).forEach(key => {
        if (obj[key].type == "array") {
            blankJson[key] = [];
        }
        else {
            blankJson[key] = null;
        }
    });

    return blankJson;
}

export function schemaToLines(obj: any) {
    lines = [];

    let keys = Object.keys(obj);
    keys.forEach(key => {
        let newLine: Line = {
            name: key,
            prettyName: obj[key].title,
            type: obj[key].type,
        };
        if (!obj[key].title) {
            newLine.prettyName = key;
        }

        if (obj[key].format) {
            newLine.format = obj[key].format
        }
        if (obj[key].enum) {
            newLine.type = "enum"
            newLine.enums = obj[key].enum;
        }

        if (newLine.type == "array") {
            if (obj[key].items.type == "object") {
                newLine.type = "multi-list"
                newLine.nested = obj[key].items.properties;
            }
            else {
                newLine.type = "single-list"
                newLine.nested = {
                    name: newLine.name + " item",
                    prettyName: "",
                    type: obj[key].items.type
                }
            }
        }

        lines.push(newLine);
    });

    return lines;
}