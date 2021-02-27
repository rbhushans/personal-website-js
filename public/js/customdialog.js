// class AlertDialog extends HTMLElement {
//     static get observedAttributes() { return ['open']; }
//     constructor() {
//         super();
//         console.log("constructing the alert")
//         this.attachShadow({mode: 'open'});
//         const dialog = document.createElement('dialog');
//         const form = dialog.appendChild(document.createElement('form'))
//         form.setAttribute('method', 'dialog');
//         const msg = this.getAttribute('msg')
//         const alert = form.appendChild(document.createElement('p'));
//         alert.appendChild(document.createTextNode(msg));
//         const menu = form.appendChild(document.createElement('menu'));
//         const ack = menu.appendChild(document.createElement('button'));
//         ack.appendChild(document.createTextNode("Ok"));
//         this.shadowRoot.append(dialog);
//     }

//     attributeChangedCallback(name, oldVal, newVal) {
//         console.log(`The attribute changing is ${name}`);
//         updateStyle(this, oldVal)
//     }
// }

// customElements.define('alert-dialog', AlertDialog);

// function updateStyle(elem, oldVal) {
//     const shadow = elem.shadowRoot;
//     if(oldVal == "false") shadow.querySelector('dialog').showModal();
//     else shadow.querySelector('dialog').close();
// }

import '../DOMPurify-main/dist/purify.min.js';

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("alert-button").addEventListener("click", function() {
        document.getElementById("output-tag").innerHTML = "";
        let dialog = document.getElementById("alert");
        dialog.showModal();
    });

    document.getElementById("confirm-button").addEventListener("click", () => {
        document.getElementById("output-tag").innerHTML = "";
        let dialog = document.getElementById("confirm");
        dialog.showModal();
        let cancel = document.getElementById("confirm-cancel");
        let ok = document.getElementById("confirm-ok");
        cancel.addEventListener('click', function (){
            document.getElementById("output-tag").innerHTML="Confirm Result: false";
        })
        ok.addEventListener('click', function() {
            document.getElementById("output-tag").innerHTML="Confirm Result: true";
        })
    });

    document.getElementById("prompt-button").addEventListener("click", function() {
        document.getElementById("output-tag").innerHTML = "";
        let dialog = document.getElementById("prompt");
        dialog.showModal();
        let cancel = document.getElementById("prompt-cancel");
        let ok = document.getElementById("prompt-ok");
        let msgobj = document.getElementById("prompt-input")
        msgobj.value = "";
        cancel.addEventListener('click', function (){
            document.getElementById("output-tag").innerHTML = "The user did not enter anything";
        })
        ok.addEventListener('click', function() {
            let msg = document.getElementById("prompt-input").value;
            msg = DOMPurify.sanitize(msg);
            console.log(msg);
            let input = `The user entered: "${msg}"`;
            if(msg === "" || msg == null){
                input = "The user did not enter anything";
            }
            
            document.getElementById("output-tag").innerHTML = input;
        })
    });
});