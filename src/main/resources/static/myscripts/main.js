$('document').ready(function () {
    $.ajax('/users/userAuth', {
        method: 'GET',
        success: function (user) {
            $('#nameTitle').text(user.name);
            user.roles.forEach(function (role) {
                $('#roleTitle').append(`<strong> ${role.simpleName} </strong>`);
            })
        }
    })
    showUsers();
})

//table of users
function showUsers() {
    $('#users').empty();
    $.ajax("/users", {
        dataType: "json",
        method: 'GET',
        success: function (data) {
            let users = JSON.parse(JSON.stringify(data));
            users.forEach(function (user) {
                $("#users").append(`<tr id="tr${user.id}"> 
                    <td  id="userId${user.id}" > ${user.id}</td> 
                    <td  id="userName${user.id}" > ${user.name}</td>
                    <td  id="userRoles${user.id}"></td>
                    <td>
                    <button class="btn btn-info" type="button" data-toggle="modal" data-target="#edit" onclick="openEditModal( ${user.id})">Edit</button>
                    </td>
                    <td>
                    <button class="btn btn-danger" type="button" data-toggle="modal" data-target="#delete" onclick="openDeleteModal(${user.id})">Delete</button>
                    </td>
                    </tr>`);
                user.roles.forEach(function (role) {
                    $(`#userRoles${user.id}`).append('<span>' + role.simpleName + ' </span>');
                })
            })
            $("#users").find(`#tr${id}`).remove();
        }
    })
}

//modal window for delete users
function openDeleteModal(id) {
    let name = $(`#userName${id}`).text()
    let roles = $(`#userRoles${id}`).text().trim().split(" ");
    $('#delete #id').val(id);
    $('#delete #name').val(name);
    $('#delete #roles').empty();
    $.each(roles, function (key, value) {
        $('#delete #roles').append(`<option value='key'>' ${value} </option>`);
    });
}

//button for delete users
$('#deleteUser').on('click', function deleteUser() {
    let id = $('#delete #id').val();
    $.ajax('/users/' + id, {
        method: 'DELETE',
        success: function () {
            $("#users").find(`#tr${id}`).remove();
        }
    })
})

//modal window for edit
function openEditModal(id) {
    let name = $(`#userName${id}`).text()
    $('#idEdit').val(id);
    $('#nameEdit').val(name);
}

//button in modal window
$('.btn-primary').on('click', function (event) {
    event.preventDefault();
    let user = {
        id: $('#idEdit').val(),
        name: $('#nameEdit').val(),
        password: $('#passEdit').val(),
        roles: $('#rolesEdit').val()
    };
    $.ajax('/users/edit', {
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/JSON; charset=utf-8',
        method: 'PUT',
        success: function () {
            showUsers();
        }
    })
})

//add users
$('.btn-success').on('click', function (event) {
    event.preventDefault();
    let user = {
        name: $('#addName').val(),
        password: $('#addPass').val(),
        roles: $('#addRole').val()
    };
    $.ajax('/users/add', {
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/JSON; charset=utf-8',
        method: 'POST',
        success: function () {
            $('#tab1').addClass('active');
            $('#tab-1').addClass('active');
            $('#tab2').removeClass('active');
            $('#tab-2').removeClass('active');
            $('#addName').val('User name');
            $('#addPass').val('Password');
            showUsers();
        }
    })
})
