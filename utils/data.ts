interface TableData {
  Timestamp: string;
  PurchaseId: string;
  Mail: string;
  Name: string;
  Source: string;
  Status: string;
  Select: string;
  [key: string]: string;
}

export const generateDummyData = (): TableData[] => {
  const dummyData: TableData[] = [];

  for (let i = 1; i <= 20; i++) {
   const now = new Date();
   now.setMinutes(now.getMinutes() - i);
   const timestamp = now.toISOString();

   // Calculate the difference in hours and days
   const diffInMilliseconds = now.getTime() - new Date(timestamp).getTime();
   const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
   const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

   // Format the timestamp based on the difference
   let formattedTimestamp = "";
   if (diffInDays > 0) {
     formattedTimestamp = `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
   } else if (diffInHours > 0) {
     formattedTimestamp = `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
   } else {
     formattedTimestamp = `${diffInMilliseconds / (1000 * 60)} minutes ago`;
   }

    // Generate a random 6-digit number for PurchaseId
    const purchaseId = Math.floor(Math.random() * 900000) + 100000;

    // Generate a random username and combine it with the number and domain
    const username = `user${i}`;
    const mail = `${username}${i}@gmail.com`;

    // Generate a random full name
    const firstName = "Aditya"; // Modify with your desired first name
    const lastName = "Gangare"; // Modify with your desired last name
    const name = `${firstName} ${lastName}`;

    // Generate the status randomly from the options ["Paid", "Failed", "Waiting"]
    const statusOptions = ["Paid", "Failed", "Waiting"];
    const status =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const data: TableData = {
      Timestamp: formattedTimestamp,
      PurchaseId: purchaseId.toString(),
      Mail: mail,
      Name: name,
      Source: `Source ${i}`,
      Status: status,
      Select: "Select",
    };

    dummyData.push(data);
  }

  return dummyData;
};



export const PaginationData = (data: TableData[], currentPage : number, pagination:boolean | undefined) => {

  const entriesPerPage = 8;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  if(pagination){
      const currentEntries = data.slice(
        indexOfFirstEntry,
        indexOfLastEntry
        );
        const totalPages = Math.ceil(data.length / entriesPerPage);
      return {currentEntries, totalPages};
    }

    return {currentEntries:data, totalPages:0};
}