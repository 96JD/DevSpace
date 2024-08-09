const axios = require("axios");
const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");

const edmTypeToTsTypeMap = {
	"Edm.Boolean": "boolean",
	"Edm.Byte": "number",
	"Edm.Date": "string",
	"Edm.DateTimeOffset": "string",
	"Edm.Decimal": "number",
	"Edm.Double": "number",
	"Edm.Duration": "string",
	"Edm.Guid": "string",
	"Edm.Int16": "number",
	"Edm.Int32": "number",
	"Edm.Int64": "number",
	"Edm.SByte": "number",
	"Edm.Single": "number",
	"Edm.String": "string",
	"Edm.TimeOfDay": "string"
};

async function generateInterfacesFromODataMetadata(metadataUrl, outputFilePath) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	const response = await axios.get(metadataUrl);
	const metadataXml = response.data;

	const metadata = await new Promise((resolve, reject) => {
		xml2js.parseString(metadataXml, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});

	const entityTypes = metadata["edmx:Edmx"]["edmx:DataServices"][0]["Schema"][0]["EntityType"];
	let output = "";
	for (const entityType of entityTypes) {
		const interfaceName = entityType["$"]["Name"];
		output += `export interface ${interfaceName} {\n`;
		const properties = entityType["Property"];
		for (const property of properties) {
			const propertyName = property["$"]["Name"];
			const propertyType = property["$"]["Type"];
			const isNullable = property["$"]["Nullable"] !== "false";
			const tsType = edmTypeToTsTypeMap[propertyType] || "any";
			output += `  ${propertyName}${isNullable ? "?" : ""}: ${tsType};\n`;
		}
		output += "}\n\n";
	}

	const directoryPath = path.dirname(outputFilePath);
	if (!fs.existsSync(directoryPath)) {
		fs.mkdirSync(directoryPath, { recursive: true });
	}

	fs.writeFileSync(outputFilePath, output, { flag: "w" });
}

generateInterfacesFromODataMetadata("https://localhost:7177/odata/$metadata", "src/app/shared/odata-models.ts");
