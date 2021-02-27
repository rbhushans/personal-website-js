import '../DOMPurify-main/dist/purify.min.js';
let store = window.localStorage;
let blogData = store.getItem("blogData")
if(blogData == null){
    blogData = {0: {"title": "First Post!", "date": "2021-02-19", "summary":"This is a cool blog post!"},
                1: {"title": "My Favorite Films", "date": "2021-02-25", "summary":"My favorite films are 12 Angry Men, Arrival, and Get Out."}}
    store.setItem("blogData", JSON.stringify(blogData))
}else{
    blogData = JSON.parse(store.getItem("blogData"))
    if(Object.keys(blogData).length == 0){
        document.getElementById("empty-data").innerHTML = "There are no blog posts to show"
    }
}
let id = Object.keys(blogData).length

const addBlog = (data, init, d_id) => {
    blogData = JSON.parse(store.getItem("blogData"))
    if(Object.keys(blogData).length == 0){
        document.getElementById("empty-data").innerHTML = ""
    }
    let curr_id = d_id

    if(!init){
        curr_id = id
        id++;
        blogData[curr_id]= data;
    }
    let ul = document.getElementById("post-list");
    let postid = "post" + curr_id;
    let li = document.createElement("li");
    li.setAttribute("id", postid);
    let edit = document.createElement("button");
    edit.setAttribute("id", postid+"-edit");
    edit.appendChild(document.createTextNode("Edit"));
    let del = document.createElement("button");
    del.setAttribute("id", postid+"-del");
    del.appendChild(document.createTextNode("Delete"));
    li.appendChild(document.createTextNode( `${data.title} (${data.date}) - ${data.summary}  `));
    li.appendChild(edit);
    li.appendChild(del);
    ul.appendChild(li);

    let editDialog = document.getElementById("edit-template")
    let clon = editDialog.content.cloneNode(true);
    editDialog = clon.querySelector('dialog')
    editDialog.setAttribute("id", postid + "-blog-edit")
    let title = clon.querySelector(".title-edit")
    let date = clon.querySelector('.date-edit')
    let summary = clon.querySelector('.summary-edit')
    let ok = clon.querySelector('.edit-ok')
    title.setAttribute("id",postid + "-title-edit")
    date.setAttribute("id",postid + "-date-edit")
    summary.setAttribute("id",postid + "-summary-edit")
    ok.setAttribute("id", postid + "-edit-ok")
    document.body.appendChild(clon);

    ok.addEventListener('click', function() {
        blogData = JSON.parse(store.getItem("blogData"))
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
        blogData[curr_id] = new_data;
        store.setItem("blogData", JSON.stringify(blogData))
        let update_li = document.getElementById(postid)
        update_li.childNodes[0].nodeValue = `${new_data.title} (${new_data.date}) - ${new_data.summary}  `
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
        blogData = JSON.parse(store.getItem("blogData"))
        delete blogData[curr_id];
        store.setItem("blogData", JSON.stringify(blogData))
        document.getElementById(postid).remove()
        if(Object.keys(blogData).length == 0){
            document.getElementById("empty-data").innerHTML = "There are no blog posts to show"
        }
    })

    document.getElementById(postid+"-edit").addEventListener("click", function(){
        blogData = JSON.parse(store.getItem("blogData"))
        let title = document.getElementById(postid + "-title-edit");
        title.value = blogData[curr_id].title;
        let date = document.getElementById(postid + "-date-edit");
        date.value = blogData[curr_id].date;
        let summary = document.getElementById(postid + "-summary-edit");
        summary.value = blogData[curr_id].summary;
        let dialog = document.getElementById(postid + "-blog-edit");
        dialog.showModal();
    });
    
    document.getElementById(postid+"-del").addEventListener("click", function(){
        let dialog = document.getElementById(postid + "-blog-del");
        dialog.showModal();
    });
    store.setItem("blogData", JSON.stringify(blogData))
}

window.addEventListener("DOMContentLoaded", function(){
    blogData = JSON.parse(store.getItem("blogData"))
    if(blogData == null){
        blogData = {0: {"title": "First Post!", "date": "2021-02-19", "summary":"This is a cool blog post!"},
                1: {"title": "My Favorite Films", "date": "2021-02-25", "summary":"My favorite films are 12 Angry Men, Arrival, and Get Out."}}
        store.setItem("blogData", JSON.stringify(blogData))
    }
    for(const prop in blogData){
        addBlog(blogData[prop], true, prop)
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
    let edit = document.getElementById("edit-ok");
})