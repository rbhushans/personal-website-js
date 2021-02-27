import '../DOMPurify-main/dist/purify.min.js';
let store = window.localStorage;
let blogDataStyle = store.getItem("blogDataStyle")
if(blogDataStyle == null){
    blogDataStyle = {0: {"title": "First Post!", "date": "2021-02-19", "summary":"This is a cool blog post!"},
                1: {"title": "My Favorite Films", "date": "2021-02-25", "summary":"My favorite films are 12 Angry Men, Arrival, and Get Out."}}
    store.setItem("blogDataStyle", JSON.stringify(blogDataStyle))
}else{
    blogDataStyle = JSON.parse(store.getItem("blogDataStyle"))
    if(Object.keys(blogDataStyle).length == 0){
        document.getElementById("empty-data").innerHTML = "There are no blog posts to show"
    }
}
let id = Object.keys(blogDataStyle).length

const addBlog = (data, init, d_id) => {
    blogDataStyle = JSON.parse(store.getItem("blogDataStyle"))
    if(Object.keys(blogDataStyle).length == 0){
        document.getElementById("empty-data").innerHTML = ""
    }
    let curr_id = d_id

    if(!init){
        curr_id = id
        id++;
        blogDataStyle[curr_id]= data;
    }
    let ul = document.getElementById("post-list");
    let postid = "post" + curr_id;
    let li = document.createElement("li");
    li.setAttribute("id", postid);
    let blogPost = document.getElementById("post-template");
    let clon = blogPost.content.cloneNode(true)
    blogPost = clon.querySelector('.blogPost')
    clon.querySelector('.blog-title').appendChild(document.createTextNode(data.title))
    clon.querySelector('.blog-date').appendChild(document.createTextNode(data.date))
    clon.querySelector('.blog-summary').appendChild(document.createTextNode(data.summary))
    let edit = clon.querySelector('.blog-edit')
    let del = clon.querySelector('.blog-del')
    edit.setAttribute('id', postid+"-edit")
    del.setAttribute('id', postid+"-del")
    li.appendChild(clon)
    ul.appendChild(li);

    let editDialog = document.getElementById("edit-template")
    clon = editDialog.content.cloneNode(true);
    editDialog = clon.querySelector('dialog')
    editDialog.setAttribute("id", postid + "-blog-edit")
    let title = clon.querySelector(".title-edit")
    let date = clon.querySelector('.date-edit')
    let summary = clon.querySelector('.summary-edit')
    let ok = clon.querySelector('.edit-ok')
    let cancel = clon.querySelector('.edit-cancel')
    title.setAttribute("id",postid + "-title-edit")
    date.setAttribute("id",postid + "-date-edit")
    summary.setAttribute("id",postid + "-summary-edit")
    ok.setAttribute("id", postid + "-edit-ok")
    document.body.appendChild(clon);

    ok.addEventListener('click', function() {
        blogDataStyle = JSON.parse(store.getItem("blogDataStyle"))
        let title = document.getElementById(postid + "-title-edit").value;
        let date = document.getElementById(postid + "-date-edit").value;
        let summary = document.getElementById(postid + "-summary-edit").value;
        if(title == "" || date == "" || summary == ""){
            let dialog = document.getElementById("alert");
            dialog.showModal();
            return;
        }
        title = DOMPurify.sanitize(title);
        date = DOMPurify.sanitize(date);
        summary = DOMPurify.sanitize(summary);     
        let new_data = {"title": title, "date":date, "summary": summary};
        blogDataStyle[curr_id] = new_data;
        store.setItem("blogDataStyle", JSON.stringify(blogDataStyle))
        let update_li = document.getElementById(postid)
        update_li.querySelector('.blog-title').childNodes[0].nodeValue = new_data.title
        update_li.querySelector('.blog-date').childNodes[0].nodeValue = new_data.date
        update_li.querySelector('.blog-summary').childNodes[0].nodeValue = new_data.summary
        let dialog = document.getElementById(postid + "-blog-edit");
        dialog.close();
    })

    cancel.addEventListener('click', function(){
        let dialog = document.getElementById(postid + "-blog-edit");
        dialog.close();
    })

    let delDialog = document.getElementById("del-template");
    clon = delDialog.content.cloneNode(true);
    delDialog = clon.querySelector('dialog');
    delDialog.setAttribute('id', postid + "-blog-del")
    let okD = clon.querySelector('.del-ok');
    okD.setAttribute('id', postid + "-del-ok")
    document.body.appendChild(clon);

    okD.addEventListener('click', function() {
        blogDataStyle = JSON.parse(store.getItem("blogDataStyle"))
        delete blogDataStyle[curr_id];
        store.setItem("blogDataStyle", JSON.stringify(blogDataStyle))
        document.getElementById(postid).remove()
        if(Object.keys(blogDataStyle).length == 0){
            document.getElementById("empty-data").innerHTML = "There are no blog posts to show"
        }
    })

    document.getElementById(postid+"-edit").addEventListener("click", function(){
        blogDataStyle = JSON.parse(store.getItem("blogDataStyle"))
        data = blogDataStyle[curr_id]
        let title = document.getElementById(postid + "-title-edit");
        title.value = data.title;
        let date = document.getElementById(postid + "-date-edit");
        date.value = data.date;
        let summary = document.getElementById(postid + "-summary-edit");
        summary.value = data.summary;
        let dialog = document.getElementById(postid + "-blog-edit");
        dialog.showModal();
    });
    
    document.getElementById(postid+"-del").addEventListener("click", function(){
        let dialog = document.getElementById(postid + "-blog-del");
        dialog.showModal();
    });
    store.setItem("blogDataStyle", JSON.stringify(blogDataStyle))
}

window.addEventListener("DOMContentLoaded", function(){
    blogDataStyle = JSON.parse(store.getItem("blogDataStyle"))
    if(blogDataStyle == null){
        blogDataStyle = {0: {"title": "First Post!", "date": "2021-02-19", "summary":"This is a cool blog post!"},
                1: {"title": "My Favorite Films", "date": "2021-02-25", "summary":"My favorite films are 12 Angry Men, Arrival, and Get Out."}}
        store.setItem("blogDataStyle", JSON.stringify(blogDataStyle))
    }
    for(const prop in blogDataStyle){
        addBlog(blogDataStyle[prop], true, prop)
    }
    document.getElementById("add-post").addEventListener("click", function(){
        let dialog = document.getElementById("blog-prompt");
        dialog.showModal();
        let title = document.getElementById("title-input");
        title.value = "";
        let date = document.getElementById("date-input");
        date.value = "";
        let summary = document.getElementById("summary-input");
        summary.value = "";
    })
    let ok = document.getElementById("blog-ok");
    ok.addEventListener('click', function() {
        let title = document.getElementById("title-input").value;
        let date = document.getElementById("date-input").value;
        let summary = document.getElementById("summary-input").value;
        if(title == "" || date == "" || summary == ""){
            let dialog = document.getElementById("alert");
            dialog.showModal();
            return;
        }
        title = DOMPurify.sanitize(title);
        date = DOMPurify.sanitize(date);
        summary = DOMPurify.sanitize(summary);            
        let data = {"title": title, "date":date, "summary": summary};
        addBlog(data, false, -1);
        let dialog = document.getElementById("blog-prompt");
        dialog.close();
    })
    document.getElementById("blog-cancel").addEventListener('click', function(){
        let dialog = document.getElementById("blog-prompt");
        dialog.close();
    })
})



