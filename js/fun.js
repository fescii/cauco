
//Footer-Tooltip
let footerDots = document.querySelector("footer.mobile>.items>.more");
let footerMore = document.querySelector("footer.mobile>.more");
let footerClose = document.querySelector("footer.mobile>.more>.modal-overlay");
if (footerDots != null && footerMore != null && footerClose != null) {

    footerDots.addEventListener("click", (e) => {
        e.stopPropagation();
        if (footerMore.style.display == "flex") {
            footerMore.style.display = "none"
            footerDots.classList.remove("active")
            enableScroll()
        }
        else {
            footerMore.style.display = "flex"
            footerDots.classList.add("active")
            disableScroll()
        }
    })

    footerClose.addEventListener("click", (e) => {
        e.stopPropagation();
        footerMore.style.setProperty("display", "none")
        footerDots.classList.remove("active")
        enableScroll()
    })

    function disableScroll() {
        // Get the current page scroll position
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        document.body.classList.add("stop-scrolling");
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }
    function enableScroll() {
        document.body.classList.remove("stop-scrolling");
        window.onscroll = function () { };
    }
}



//Header-Tooltip
let headerIcons = document.querySelectorAll(".top-header .header>.icons>.icon>.icon-link")
if (headerIcons != null) {
    headerIcons.forEach(element => {
        // let parentEl = element.parentElement;
        let toolTip = element.querySelector(".tooltip");
        element.addEventListener("mouseenter", (e) => {
            toolTip.style.display = "flex"
        })
        element.addEventListener("mouseleave", (e) => {
            toolTip.style.display = "none"
        })
    });
}

//Side-ar
let itemLinkButtons = document.querySelectorAll(".sidebar>.menu>ul.menu-items>.item>a.item-link>span.icli")
if (itemLinkButtons != null) {
    itemLinkButtons.forEach(element => {
        let parentEl = element.parentElement;
        let toolTip = parentEl.querySelector(".link-text");
        element.addEventListener("mouseenter", (e) => {
            toolTip.style.display = "inline-block"
        })
        element.addEventListener("mouseleave", (e) => {
            toolTip.style.display = "none"
        })
    });
}


//Share-Modal
const viewBtns = document.querySelectorAll(".view-modal"),
    popup = document.querySelectorAll(".popup");
/*   close = popup.querySelector(".close"),
   field = popup.querySelector(".field"),
   input = field.querySelector("input"),
   copy = field.querySelector("button");*/
/*
viewBtn.onclick = () => {
    preventDefault();
    popup.classList.toggle("show");
}*/
viewBtns.forEach((viewBtn, index) => {
    const close = popup[index].querySelector(".close"),
        field = popup[index].querySelector(".field"),
        input = field.querySelector("input"),
        copy = field.querySelector("button");

    viewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        popup[index].style.setProperty('display', 'block')
    })

    close.addEventListener("click", () => {
        popup[index].style.setProperty('display', 'none')
    })

    copy.onclick = () => {
        input.select(); //select input value
        if (document.execCommand("copy")) { //if the selected text copy
            field.classList.add("active");
            copy.innerText = "Copied";
            setTimeout(() => {
                window.getSelection().removeAllRanges(); //remove selection from document
                field.classList.remove("active");
                copy.innerText = "Copy";
            }, 3000);
        }
    }

})

//Read-Headers
let readOut = document.querySelector("main.read>.story>.story-header>#read-action-links")
let readFooterModal = document.querySelector("main.read>.story>.story-content>.comments-action>.options-modal")
let readFooterDots = document.querySelector("main.read>.story>.story-content>.comments-action>.dots")
if (readFooterModal != null && readFooterDots != null) {
    readFooterDots.addEventListener("click", (e) => {
        e.preventDefault()
        if (readFooterModal.style.display == "flex") {
            readFooterDots.classList.remove("dots-active")
            readFooterModal.style.display = "none"
        } else {
            readFooterDots.classList.add("dots-active")
            readFooterModal.style.display = "flex"
        }
    })

    let pointer = readFooterModal.querySelector("span.pointer")
    let top = readFooterModal.querySelector(".options-item:last-of-type")

    top.addEventListener("mouseenter", (e) => {
        pointer.style.backgroundColor = "var(--modal-hover-background);"
    })
    top.addEventListener("mouseleave", (e) => {
        pointer.style.backgroundColor = "var(--theme)"
    })
}
if (readOut != null) {
    let actionModal = readOut.querySelector("#story-action-modal");
    let actionBtn = readOut.querySelector("#story-action-btn");

    let shareModal = readOut.querySelector("#popup-modal");
    let shareBtn = readOut.querySelector("#popup-btn");

    actionBtn.addEventListener("click", (e) => {
        e.preventDefault()
        try {
            shareModal.style.display = "none"
            shareBtn.classList.remove("active")
        }
        finally {
            if (actionModal.style.display == "flex") {
                actionBtn.classList.remove("dots-active")
                actionModal.style.display = "none"
            } else {
                actionBtn.classList.add("dots-active")
                actionModal.style.display = "flex"
            }
        }
    })

    let pointer = actionModal.querySelector("span.pointer")
    let top = actionModal.querySelector(".options-item:first-of-type")

    top.addEventListener("mouseenter", (e) => {
        pointer.style.backgroundColor = "var(--modal-hover-background);"
    })
    top.addEventListener("mouseleave", (e) => {
        pointer.style.backgroundColor = "var(--theme)"
    })

    shareBtn.addEventListener("click", (e) => {
        e.preventDefault()
        try {
            actionBtn.classList.remove("dots-active")
            actionModal.style.display = "none"
        }
        finally {
            if (shareModal.style.display == "flex") {
                shareBtn.classList.remove("active")
                shareModal.style.display = "none"
            } else {
                shareBtn.classList.add("active")
                shareModal.style.display = "flex"

            }
        }
    })

    let close = shareModal.querySelector(".close"),
        field = shareModal.querySelector(".field"),
        input = field.querySelector("input"),
        copy = field.querySelector("button.copy");

    close.addEventListener("click", () => {
        shareModal.style.setProperty('display', 'none')
        shareBtn.classList.remove("active")
    })

    copy.onclick = () => {
        input.select(); //select input value
        if (document.execCommand("copy")) { //if the selected text copy
            field.classList.add("active");
            copy.innerText = "Copied";
            setTimeout(() => {
                window.getSelection().removeAllRanges(); //remove selection from document
                field.classList.remove("active");
                copy.innerText = "Copy";
            }, 3000);
        }
    }


    // element.addEventListener("mouseenter", (e) => {
    //         toolTip.style.display = "inline-block"
    //     })
    // element.addEventListener("mouseleave", (e) => {
    //         toolTip.style.display = "none"
    //     })
}

//Comments-Container
let commentsContainer = document.querySelector("main.read>.comments-container")
let comments = document.querySelectorAll("main.read>.comments-container>.comments-wrapper>.comments-body>.select-comment")
if (comments != null && commentsContainer != null) {
    let openedModal = null,
        openedReplyModal = null;
    comments.forEach(comment => {
        let optionsBtn = comment.querySelector(".head>.more")
        let commentOptions = comment.querySelector(".head>.more-options")

        let replies = comment.querySelectorAll(".replies-container>.reply")

        optionsBtn.addEventListener("click", (e) => {
            e.preventDefault()
            if (commentOptions.style.display == "flex") {
                optionsBtn.classList.toggle("more-active")
                commentOptions.style.display = "none"
            }
            else {
                try {
                    closeModal(openedModal)
                }
                catch {
                    console.log("not-assign")
                }
                finally {
                    optionsBtn.classList.toggle("more-active")
                    commentOptions.style.display = "flex"
                    openedModal = commentOptions
                }
            }
        })

        let pointer = commentOptions.querySelector("span.pointer")
        let top = commentOptions.querySelector(".top")

        top.addEventListener("mouseenter", (e) => {
            pointer.style.backgroundColor = "#f1f1f1"
        })
        top.addEventListener("mouseleave", (e) => {
            pointer.style.backgroundColor = "var(--theme)"
        })

        function closeModal(modal) {
            let parent = modal.parentElement;
            let modalBtn = parent.querySelector(".head>.more")
            modalBtn.classList.remove("more-active")
            modal.style.display = "none"
        }

        //Open-reply-Modal
        let replyBtn = comment.querySelector(".footer>.actions>a.reply")
        let replyModal = comment.querySelector(".replies-container");
        // openedReplyModal = null;

        replyBtn.addEventListener("click", (e) => {
            e.preventDefault()
            if (replyModal.style.display == "flex") {
                replyBtn.classList.toggle("reply-active")
                replyModal.style.display = "none"
            }
            else {
                try {
                    closeReplyModal(openedReplyModal)
                }
                catch {
                    console.log("not-assign")
                }
                finally {
                    replyBtn.classList.toggle("reply-active")
                    replyModal.style.display = "flex"
                    openedReplyModal = replyModal
                }
            }
        })

        function closeReplyModal(modal) {
            let parent = modal.parentElement;
            let modalBtn = parent.querySelector(".footer>.actions>a.reply")
            modalBtn.classList.remove("reply-active")
            modal.style.display = "none"
        }


        //Replies
        let replyOpenedModal = null;
        replies.forEach(reply => {
            let replyOptionsBtn = reply.querySelector(".head>.more")
            let replyCommentOptions = reply.querySelector(".head>.more-options")

            replyOptionsBtn.addEventListener("click", (e) => {
                e.preventDefault()
                if (replyCommentOptions.style.display == "flex") {
                    replyOptionsBtn.classList.toggle("more-active")
                    replyCommentOptions.style.display = "none"
                }
                else {
                    try {
                        closeModal(replyOpenedModal)
                    }
                    catch {
                        console.log("not-assign")
                    }
                    finally {
                        replyOptionsBtn.classList.toggle("more-active")
                        replyCommentOptions.style.display = "flex"
                        replyOpenedModal = replyCommentOptions
                    }
                }
            })


            let pointer = replyCommentOptions.querySelector("span.pointer")
            let top = replyCommentOptions.querySelector(".top")

            top.addEventListener("mouseenter", (e) => {
                pointer.style.backgroundColor = "#f1f1f1"
            })
            top.addEventListener("mouseleave", (e) => {
                pointer.style.backgroundColor = "var(--theme)"
            })
        })

    });

}


//Header-items-scroll
let headerScrollBtn = document.querySelector("main.main>.content>.header>.rel-items>li#header-item-scroll")
if (headerScrollBtn != null) {
    let itemsContainer = headerScrollBtn.parentElement;
    let icon = headerScrollBtn.querySelector("span");
    let width = 150,
        pointer = true,
        h = 100;
    let total = itemsContainer.scrollWidth
    icon.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(total)
        if (pointer) {
            if ((itemsContainer.scrollWidth) >= (width + 150)) {
                itemsContainer.scrollBy({
                    left: h,
                    behavior: "smooth"
                })
                console.log(width)
                width = width + 150
            } else {
                width += 150
                itemsContainer.scrollBy({
                    left: h,
                    behavior: "smooth"
                })
                h = 0
                pointer = false
                icon.classList.remove("iconly-Arrow-Left-Circle")
                icon.classList.add("iconly-Arrow-Right-Circle")
            }
        } else {
            width -= 100
            if (width > 0) {
                h = -150
                itemsContainer.scrollBy({
                    left: h,
                    behavior: "smooth"
                })
                width -= 150
            } else {
                itemsContainer.scrollBy({
                    left: h,
                    behavior: "smooth"
                })
                h = 150
                pointer = true
                icon.classList.remove("iconly-Arrow-Right-Circle")
                icon.classList.add("iconly-Arrow-Left-Circle")
                width = 150;
            }
        }
    })
}