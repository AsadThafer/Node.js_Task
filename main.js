const csv = require("csv-parser");
const fs = require("fs");

function readCSV() {
  let Users = [];
  return new Promise((resolve) => {
    fs.createReadStream("input.csv")
      .pipe(csv())
      .on("data", (data) => Users.push(data))
      .on("end", () => {
        resolve(Users);
      });
  });
}

async function GetUsers() {
  const UsersList = await readCSV();
  console.log(UsersList);
  console.log("\nThe CSV file was read successfully !");
  return UsersList;
}

const createCSV = require("csv-writer").createObjectCsvWriter;

const csvw = createCSV({
  path: "output.csv",
  header: [
    { id: "UserName", title: "UserName" },
    { id: "BirthDate", title: "BirthDate" },
    { id: "Address", title: "Address" },
    { id: "MobileNumber", title: "MobileNumber" },
    { id: "Gender", title: "Gender" },
  ],
});

async function saveToFile() {
  const data = await GetUsers();
  csvw.writeRecords(data).then(() => {
    console.log("\nThe CSV file was Saved successfully to output.csv !");
  });
}


async function readJsonFile(){
    let OutputUsers = [];
  return new Promise((resolve) => {
    fs.createReadStream("output.csv")
      .pipe(csv())
      .on("data", (data) => OutputUsers.push(data))
      .on("end", () => {
        resolve(OutputUsers);
      });
  });
}

async function main(){
    await saveToFile();  
    const newUsersList = await readJsonFile();
    console.log('\nThe Read of the previous file is :');
    await console.log(newUsersList);
    
}

main();