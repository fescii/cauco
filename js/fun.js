
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
