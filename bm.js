let totalUsers = [];
$('#create').click(() => {
    let name = $('#name').val();
    let username = $('#username').val();
    let password = $('#password').val();

    if (localStorage.getItem('All Users') !== null) {
        totalUsers = JSON.parse(localStorage.getItem('Total Users'));
    }

    if (name == '' || username == '' || password == '') {
        alert("To register, fill out each part of the form");
        return;
    }

    let totalUserInfo = {
        Name: name,
        Username: username,
        Password: password,
        Site: []
    }

    totalUsers.push(totalUserInfo);
    localStorage.setItem('Total Users', JSON.stringify(totalUsers));
    location.assign('loginbook.html');
})


$('#login').click(() => {
    let Curruser = JSON.parse(localStorage.getItem('Total Users'));

    if (document.getElementById('user').value == '' || document.getElementById('pass').value == '') {
        alert("Enter your username/password");
        return;
    } else {
        for (i in Curruser) {
            if (document.getElementById('user').value === Curruser[i].Username && document.getElementById('pass').value === Curruser[i].Password) {
                localStorage.setItem('User Index', JSON.stringify(i));
                location.assign('bookmarks.html');
                return;
            } else {
                i++
            }
        }
    }
    if (i === Curruser.length) {
        alert("Username/Password are inccorect");
        return;
    }
})


function loading() {
    let welcomename = JSON.parse(localStorage.getItem('Total Users'));
    let index = JSON.parse(localStorage.getItem('User Index'));
    document.getElementById('name').innerHTML = welcomename[index].Name;

    let bmlist = welcomename[index].Site;
    let usediv = ''

    for (index in bmlist) {
        usediv += `<div class = "col-12 page" id = "page${(index * 1) + 1}">
                    <b id = "sn">  ${bmlist[index].Sname}  </b>
                    <button id = "view" type="button" class="btn btn-light">View</button>
                    <button id = "delete" type="button" class="btn btn-danger">Delete</button>
                    <button id = "edi" type="button" class="btn btn-success" data-toggle="modal" data-target="#edmo">Edit Url</button>
                   </div>`
    }

    document.getElementById('dis').innerHTML = usediv;
    $('#pagination-bookmarks').twbsPagination('destroy');

    $('#pagination-bookmarks').twbsPagination({
        totalPages: bmlist.length,
        // the current page that show on start
        startPage: 1,

        // maximum visible pages
        visiblePages: 5,

        // Text labels
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',

        // callback function
        onPageClick: function (event, page) {
            $('.page-active').removeClass('page-active');
            $('#page' + page).addClass('page-active');
        },
    });
}

$('#log').click(() => {
    location.assign('loginbook.html');
})



$('#submit').click(() => {
    let users = JSON.parse(localStorage.getItem('Total Users'));
    let dex = JSON.parse(localStorage.getItem('User Index'));
    let ud = users[dex].Site

    let sitename = $('#sname').val();
    let siteurl = $('#url').val();

    let siteobj = {
        Sname: sitename,
        Surl: siteurl
    }

    if (ud !== null) {
        ud = ud
    } else {
        ud = [];
    }

    if (!document.getElementById('url').checkValidity()) {
        alert("This is not a url");
        return;
    }

    if (document.getElementById('sname').value == '') {
        alert("Enter a site name");
        return;
    }

    ud.push(siteobj);
    localStorage.setItem('Total Users', JSON.stringify(users));
    console.log(siteobj);
    console.log(ud)
    loading();
})


$('#dis').on('click', 'button[id = delete]', function () {
    let tu = JSON.parse(localStorage.getItem('Total Users'));
    let ui = JSON.parse(localStorage.getItem('User Index'));
    let yourlink = tu[ui].Site;
    let d = $(this).parent().index();

    yourlink.splice(d, 1);
    yourlink = tu[ui].Site

    localStorage.setItem('Total Users', JSON.stringify(tu));
    loading()
})


$('#dis').on('click', 'button[id = "edi"]', function () {
    let div2 = $(this).parent('div').index();
    localStorage.setItem('NewIndex', JSON.stringify(div2))
})

$('#sc').click(() => {
    let edin = JSON.parse(localStorage.getItem('NewIndex'));
    let tu2 = JSON.parse(localStorage.getItem('Total Users'));
    let ui2 = JSON.parse(localStorage.getItem('User Index'));
    let nsite = tu2[ui2].Site;
    let nurl = $('#newurl').val();

    if (!document.getElementById('newurl').checkValidity()) {
        alert("This is not a url");
        return;
    }

    if(nurl == ''){
        alert("Enter a Url");
        return;
    }

    nsite[edin].Surl = nurl

    localStorage.setItem('Total Users', JSON.stringify(tu2))
    loading()
})


$('#dis').on('click', 'button[id = "view"]', function () {
    let userarr = JSON.parse(localStorage.getItem('Total Users'));
    let userindex = JSON.parse(localStorage.getItem('User Index'));
    let nuserindex = $(this).parent('div').index();
    let us = userarr[userindex].Site;
    let eus = us[nuserindex].Surl;

    window.open(eus);

})