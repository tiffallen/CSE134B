/**
 * Created by Momo on 3/16/17.
 */
$(function () {
    var operation = "C";
    var selected_index = -1;
    var tblPersons = localStorage.getItem("tblPersons");
    tblPersons = JSON.parse(tblPersons);
    if (tblPersons === null)
        tblPersons = [];

    function Create() {



        var post = JSON.stringify({
            PostName: $("#pn").val(),
            Character: $("#char").val(),
            Image: $("#iu").val(),
            Video: $("#vu").val(),
            Text: $("#desc").val(),
            Rating: $("#rating").val(),
            Movie: $("#movieName").val()


        });

        tblPersons.push(post);
        localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
        alert("Created Post");
        return true;
    }

    function Update () {
        tblPersons[selected_index] = JSON.stringify({
            PostName: $("#pn").val(),
            Character: $("#char").val(),
            Image: $("#iu").val(),
            Video: $("#vu").val(),
            Text: $("#desc").val(),
            Rating: $("#rating").val(),
            Movie: $("#movieName").val()
        });
        localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
        alert("Edited Post");
        return true;
    }

    function Delete() {
        tblPersons.splice(selected_index, 1);
        localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
        alert("Deleted Post");
    }

    function Read() {
        $("#postList").html("");
        $("#postList").html(
            "<thead>" +
            "<tr>" +
            "<th><h2>Post Name</h2></th>" +
            "<th><h2>Character</h2></th>" +
            "<th><h2>Image</h2></th>" +
            "<th><h2>Video</h2></th>" +
            "<th><h2>Text</h2></th>" +
            "<th><h2>Movie</h2></th>" +
            "<th><h2>Rating</h2></th>" +
            "<th><h2>Actions</h2></th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );
        for (var i in tblPersons) {
            var pos = JSON.parse(tblPersons[i]);
            $("#postList tbody").append("<tr>" +
                "<td><h2>"  + pos.PostName +  "</h2></td>" +
                "<td><h2>"  + pos.Character +  "</h2></td>" +
                "<td><h2>"  + pos.Image +  "</h2></td>" +
                "<td><h2>"   + pos.Video +  "</h2></td>" +
                "<td><h2>"   + pos.Text+  "</h2></td>" +
                "<td><h2>"   + pos.Movie +  "</h2></td>" +
                "<td><h2>"   + pos.Rating +  "</h2></td>" +
                "<td><img src='images/edit.png' alt='Edit" + i + "' width='20' height='20' class='btnEdit'/> <img src='images/delete.png' width='20' height='20' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
            );
        }

    }

    $("#threads").bind("submit", function () {
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
        $("#pn").val(per.PostName);
        $("#char").val(per.Character);
        $("#iu").val(per.Image);
        $("#vu").val(per.Video);
        $("#desc").val(per.Text);
        $("#rating").val(per.Rating);
        $("#movieName").val(per.Movie);
        $("#pn").focus();
    });

    $(".btnDelete").bind("click", function () {
        selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
        Delete();
        Read();
    });
});
