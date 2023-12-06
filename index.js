const fs = require("fs");

const getFiles = (dir = "../../Done/libft", files = []) => {
	const fileList = fs.readdirSync(dir)
	for (const file of fileList) {
	  const name = `${dir}/${file}`
	  if (fs.statSync(name).isDirectory()) {
		getFiles(name, files)
	  } else {
		files.push(name)
	  }
	}
	return files
}

const getFileContent = (filePath) => {
	let content = fs.readFileSync(filePath).toString()
	return content;
}

const checkHeader = (content, login = "", logins = []) => {
	const byIndex = content.indexOf("By");
	const createdIndex = content.indexOf("Created");
	const updatedIndex = content.indexOf("Updated");
	logins.push(content.slice(byIndex).split(" ")[1])
	logins.push(content.slice(createdIndex).split(" ")[4])
	logins.push(content.slice(updatedIndex).split(" ")[4])
	
	for (let i = 0; i < logins.length - 1; i++)
	{
		if (!logins[i] || logins[i] != logins[i + 1] || (login && logins[i].toLowerCase() != login))
			return false;
	}
	return true;
}

const checkFiles = (files) => {
	let checkResult = false;
	for (let file of files)
	{
		checkResult = checkHeader(getFileContent(file), process.argv[2]?.toLowerCase());
		if (checkResult)
		console.log("\x1b[32m%s", `${file.slice(2)}: OK`);
	else
	console.log("\x1b[31m%s", `${file.slice(2)}: KO`);
}
}

let files = getFiles().filter(name => name.endsWith(".c") || name.endsWith(".h") || name.endsWith(".cpp"));
checkFiles(files);
