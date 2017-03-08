$(function () {
    var operation = "C";
    var selected_index = -1;
    var tblPersons = localStorage.getItem("tblPersons");
    tblPersons = JSON.parse(tblPersons);
    if (tblPersons === null)
        tblPersons = [];

    function Create() {
        var person = JSON.stringify({
            ID: $("#id").val(),
            Name: $("#name").val(),
            Phone: $("#char").val(),
            Email: $("#email").val()
        });

        tblPersons.push(person);
        localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
        alert("Created User");
        return true;
    }

    function Update () {
        tblPersons[selected_index] = JSON.stringify({
            ID: $("#id").val(),
            Name: $("#name").val(),
            Phone: $("#char").val(),
            Email: $("#email").val()
        });
        localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
        alert("Edited Data");
        return true;
    }

    function Delete() {
        tblPersons.splice(selected_index, 1);
        localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
        alert("Deleted User");
    }

    function Read() {
        $("#userList").html("");
        $("#userList").html(
            "<thead>" +
            "<tr>" +
            "<th><h2>ID</h2></th>" +
            "<th><h2>Name</h2></th>" +
            "<th><h2>Character</h2></th>" +
            "<th><h2>Email</h2></th>" +
            "<th><h2>Actions</h2></th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );
        for (var i in tblPersons) {
            var per = JSON.parse(tblPersons[i]);
            $("#userList tbody").append("<tr>" +
                "<td><h2>"  + per.ID +  "</h2></td>" +
                "<td><h2>"  + per.Name +  "</h2></td>" +
                "<td><h2>"  + per.Phone +  "</h2></td>" +
                "<td><h2>"   + per.Email +  "</h2></td>" +
                "<td><img src='images/edit.png' alt='Edit" + i + "' width='20' height='20' class='btnEdit'/> <img src='images/delete.png' width='20' height='20' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
            );
        }
    }

    $("#users").bind("submit", function () {
        if (operation === "C")
            return Create();
        else
            return Update();
    });
    Read();
    $(".btnEdit").bind("click", function () {
        operation = "E";

        selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
        var per = JSON.parse(tblPersons[selected_index]);
        $("#id").val(per.ID);
        $("#name").val(per.Name);
        $("#char").val(per.Phone);
        $("#email").val(per.Email);
        $("#id").attr("readonly", "readonly");
        $("#name").focus();
    });

    $(".btnDelete").bind("click", function () {
        selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
        Delete();
        Read();
    });
});
