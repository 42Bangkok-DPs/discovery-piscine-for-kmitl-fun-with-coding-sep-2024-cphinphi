const ft_list = document.getElementById("ft_list");
//โหลดรายการtodoที่มี//
let toDos = JSON.parse(getCookie("TD") || "[]");
toDos.forEach(displayToDoItem);

const newBtn = document.getElementById("new-btn");

//ใส่รายการtodoใหม่//
newBtn.addEventListener("click", () => {
    const newToDo = prompt("Enter a new to do item:");
    if (newToDo) {
        const toDoItem = { text: newToDo };
        toDos.unshift(toDoItem);
        setCookie("TD", JSON.stringify(toDos), 365);
        displayToDoItem(toDoItem);
    }
});

//แสดงรายการtodoที่ใส่ไว้//
function displayToDoItem(toDoItem) {
    const div = document.createElement("div");
    div.innerText = toDoItem.text;
    div.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this item?")) {
            toDos.splice(toDos.indexOf(toDoItem), 1);
            setCookie("TD", JSON.stringify(toDos), 365);
            ft_list.removeChild(div);
        }
    });
    ft_list.insertBefore(div, ft_list.firstChild);
}

//ฟังก์ชั้นจัดการคุกกี้//
function getCookie(name) { // ค้นหาคุกกี้ตามชื่อและส่งคืนค่า หากไม่พบคุกกี้ว่าง//
    const cookieValue = `; ${document.cookie}`;
    const cookieParts = cookieValue.split(`; ${name}=`);
    if (cookieParts.length === 2) return cookieParts.pop().split(';').shift();
    else return "";
}

function setCookie(name, value, days) { //ตั้งค่าคุกกี้ วันที่หมดอายุ//
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
