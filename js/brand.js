console.log("Brand file is enqueue");
const  onSaveBrand = async (event) => {
    event.preventDefault();
    if(event.target[1].files[0].type == "image/png" || event.target[1].files[0].type == "image/jpg" ||event.target[1].files[0].type == "image/jpeg" ) {
        console.log(" corrent image type")
        console.log("++++++++++++++++++++++++++++++++++++");
        console.log(" File Name is ",event.target[1].files[0].name);
        console.log(" File Type is ",event.target[1].files[0].type);
        console.log(" File Size is ",event.target[1].files[0].size);
        console.log("+++++++++++++++++++++++++++++++++++++");

        const brand = {
            name: event.target[0].value,
            photo: event.target[1].value
         }
         console.table(brand);

    } else {
        console.log(" INCORRECT image type")
    }
}

