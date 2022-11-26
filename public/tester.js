const chckbxAll= document.querySelector("#chckbxAll")
const chckbxOptions= document.querySelectorAll(".select-options");
const unlockBtn = document.querySelector('.button1')
const blockBtn = document.querySelector('.button2')
const deleteBtn = document.querySelector('.button3')
let checkedUsers = []

const selectAllchckbxes = () => {
    if (chckbxAll.checked){

        chckbxOptions.forEach(chckOption => {
            chckOption.checked = true;
            
        })
    }
    else{
        chckbxOptions.forEach(chckOption => chckOption.checked = false)
    }
}


chckbxAll.addEventListener("click",selectAllchckbxes)

unlockBtn.addEventListener("click", async () => {
    if(chckbxAll.checked){
        chckbxOptions.forEach(chckOption =>{
            chckOption.checked = true;
            checkedUsers.push(chckOption.id)
        });
        console.log(checkedUsers)
       
        const req = await fetch("/unblock", {method: "POST",body: JSON.stringify(checkedUsers)}) ;
        const res = await req.json();
        console.log(res)
        checkedUsers = [];
        chckbxOptions.forEach(ch => ch.checked = false)
      
    }else{
        chckbxOptions.forEach(chckOption => {
            if(chckOption.checked){
              checkedUsers.push(chckOption.id)

            }
        })
        const req = await fetch("/unblock", {
            method:"POST",
            body: JSON.stringify(checkedUsers)
        })

        const res = await req.json();
        console.log(res)
        checkedUsers = [];
        chckbxOptions.forEach(ch => ch.checked = false)
    }
})
blockBtn.addEventListener("click", function() {
    if(chckbxAll.checked){
        location.href = 'index.hbs';
        console.log("okay")

    }
})


