$('document').ready(function () {
    $.ajax('/users/userAuth', {
        success: function (user) {
            $('#nameTitle').text(user.name);
            $('#id').text(user.id);
            $('#name').text(user.name);
            $('#pass').text(user.password);
            user.roles.forEach(function (role) {
                $('#roleTitle').append('<strong>' + role.simpleName + ' </strong>');
                $('#role').append('<span>' + role.simpleName + ' </span>');
                if (role.simpleName === 'ADMIN') {
                    $('#nav').prepend('<li class="nav-item"><a class="nav-link border rounded" href="/admin">Admin</a></li>');
                }
            })
        }
    })
})