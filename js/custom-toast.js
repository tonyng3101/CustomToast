class CustomToast {
    constructor(message, type) {
        this.message = message ? message : "Notification";
        this.type = type == "error" ? type : "success";
        this.init();
    }

    init() {
        this.createToast();
        this.initToastEvent();
    }
    
    initToastEvent() {
        let self = this;
        document.addEventListener("click", function(event) {
            let targetElement = event.target;
            if (targetElement.closest(".toast-item")) {
                self.removeToast(targetElement.closest(".toast-item"));
            }
        });
    }
    
    createToast() {
        let self = this;
        let toastElement = document.getElementsByClassName("toast-elem");
        if (!toastElement.length) {
            toastElement = document.createElement("div");
            toastElement.className = "toast-elem";
            document.getElementsByTagName("body")[0].prepend(toastElement);
        } else {
            toastElement = toastElement[0];
        }

        let toastItem = document.createElement("div");
        toastItem.className = "toast-item";
        toastElement.prepend(toastItem);
            
        let toastItemHtml = `<div class="toast-body ${this.type}">${this.message}</div>`;
        toastItem.innerHTML = toastItemHtml;
        
        setTimeout(function () {
            toastItem.classList.add("close")
            setTimeout(function () {
                self.removeToast(toastItem);
            }, 5000);
        }, 10);
    }
    
    removeToast(toastItem) {
        toastItem.classList.add("hide")
        setTimeout(function () { toastItem.remove() }, 200);
    }
}
  