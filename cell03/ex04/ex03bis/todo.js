$(document).ready(function() {
    // ดึงข้อมูลจาก Cookies
    let toDos = JSON.parse(getCookie("TD") || "[]");
    toDos.forEach(displayToDoItem); // แสดงรายการที่บันทึกไว้

    // คลิกปุ่มเพื่อเพิ่มรายการใหม่
    $("#new-btn").click(function() {
        const newToDo = prompt("Enter a new to do item:");
        if (newToDo) {
            const toDoItem = { text: newToDo };
            toDos.unshift(toDoItem); // เพิ่มรายการใหม่ในตำแหน่งแรก
            setCookie("TD", JSON.stringify(toDos), 365); // อัปเดตคุกกี้
            displayToDoItem(toDoItem); // แสดงรายการบนหน้าเว็บ
        }
    });

    // ฟังก์ชันแสดงรายการ To-Do
    function displayToDoItem(toDoItem) {
        const $div = $("<div>").text(toDoItem.text);
        
        // เพิ่มเหตุการณ์คลิกเพื่อลบรายการ
        $div.click(function() {
            if (confirm("Are you sure you want to delete this item?")) {
                toDos.splice(toDos.indexOf(toDoItem), 1); // ลบจาก array
                setCookie("TD", JSON.stringify(toDos), 365); // อัปเดตคุกกี้
                $div.remove(); // ลบออกจาก DOM
            }
        });
        $("#ft_list").prepend($div); // เพิ่ม div ไปที่ตำแหน่งแรกใน #ft_list
    }

    // ฟังก์ชันดึงข้อมูลจากคุกกี้
    function getCookie(name) {
        const cookieValue = `; ${document.cookie}`;
        const cookieParts = cookieValue.split(`; ${name}=`);
        if (cookieParts.length === 2) return cookieParts.pop().split(';').shift();
        else return "";
    }

    // ฟังก์ชันตั้งค่าคุกกี้
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }
});
