export default class PostPhotos extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    this.switchPhotos();
    let closeButton = this.shadowObj.querySelector(".photos-container >i"),
    modalOverlay = this.shadowObj.querySelector(".modal-overlay");

    closeButton.addEventListener("click", (e) => {
        this.closePhotos();
      },{ once: true }
    );


    modalOverlay.addEventListener("click", (e) => {
        this.closePhotos();
      },{ once: true }
    );

    this.disableScroll();
  }

  disconnectedCallback() {
    // console.log('We are inside disconnectedCallback');
    // adding event handler to the button
  }

  closePhotos() {
    // updating the state
    this.enableScroll();
    this.remove();
  }

  switchPhotos(){
    let right = this.shadowObj.querySelector(".body>.right");
    let left = this.shadowObj.querySelector(".body>.left");
    let scrollContainer = this.shadowObj.querySelector(".body>.photos");

    let footerImages = this.shadowObj.querySelectorAll(".footer>.thumbnails>.thumbnail");
    let scrollWidth = this.shadowObj.querySelector(".body>.photos>div.photo").clientWidth;

    // const totalMain = scrollContainer.scrollWidth;
    let total = scrollWidth * 3;
    let current = footerImages[0];
    let scrolled = 0,
      count = 0;

    right.addEventListener("click", (e) => {
      e.preventDefault();
      if (scrolled < total) {
        scrollContainer.scrollBy({
          left: scrollWidth + 5,
          behavior: "smooth",
        });
        count += 1;
        scrolled += scrollWidth;
        left.classList.remove("stop");
        updateCurrent(current, count);
      } else {
        scrolled = total;
        right.classList.add("stop");
      }
    });

    left.addEventListener("click", (e) => {
      e.preventDefault();
      if (scrolled >= scrollWidth) {
        scrollContainer.scrollBy({
          left: -scrollWidth - 5,
          behavior: "smooth",
        });
        count -= 1;
        scrolled -= scrollWidth;
        right.classList.remove("stop");
        updateCurrent(current, count);
      } else {
        scrolled = 0;
        left.classList.add("stop");
      }
    });

    footerImages.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        if (index == 0) {
          scrollContainer.scroll({
            left: 0,
            behavior: "smooth",
          });
          count = index;
          scrolled = 0;
          updateCurrent(current, index);
          left.classList.add("stop");
          right.classList.remove("stop");
        } else if (index == footerImages.length - 1) {
          let space = 5 * index,
            width = scrollWidth * (index + 1) - scrollWidth;
          scrollContainer.scroll({
            left: width + space,
            behavior: "smooth",
          });
          count = index;
          scrolled = width + space;
          updateCurrent(current, index);
          right.classList.add("stop");
          left.classList.remove("stop");
        } else {
          let space = 5 * index,
            width = scrollWidth * (index + 1) - scrollWidth;
          scrollContainer.scroll({
            left: width + space,
            behavior: "smooth",
          });
          count = index;
          scrolled = width + space;
          updateCurrent(current, index);
          right.classList.remove("stop");
          left.classList.remove("stop");
        }
      });
    });

    let updateCurrent = (oldCurrent, no) => {
      try {
        oldCurrent.classList.remove("current");
      } finally {
        current = footerImages[no];
        footerImages[no].classList.add("current");
      }
    };
  }

  disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.body.classList.add("stop-scrolling");

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  enableScroll() {
    document.body.classList.remove("stop-scrolling");
    window.onscroll = function () { };
  }

  getTemplate() {
    // Show HTML Here
    return `
    <div class="modal-overlay"></div>
      <div class="photos-container">
        <i class="bi-x-circle-fill"></i>
        <div class="head">
          <span class="control">
            <i class="bi-chevron-left"></i>
            <span class="text">Back</span>
          </span>
        </div>
        <div class="body">
          <span class="arrow left">
            <i class="bi-chevron-left"></i>
          </span>
          <span class="arrow right">
            <i class="bi-chevron-right"></i>
          </span>
          <div class="photos">
            ${this.getImages()}
          </div>
        </div>
        <div class="footer">
          <div class="thumbnails">
            ${this.getThumbnails()}
          </div>
        </div>
      </div>
      ${this.getStyles()}`;
  }

  getImages() {
    return `
      <div class="photo">
        <img src="img/ground.jpg" alt="Photo">
      </div>
      <div class="photo">
        <img src="img/ground1.jpg" alt="Photo">
      </div>
      <div class="photo">
        <img src="new/one.jpg" alt="Photo">
      </div>
      <div class="photo">
        <img src="new/two.jpg" alt="Photo">
      </div>
    `;
  }

  getThumbnails() {
    return `
      <div class="thumbnail current">
        <img src="img/ground.jpg" alt="Thumbnail">
      </div>
      <div class="thumbnail">
        <img src="img/ground1.jpg" alt="Thumbnail">
      </div>
      <div class="thumbnail">
        <img src="new/one.jpg" alt="Thumbnail">
      </div>
      <div class="thumbnail">
        <img src="new/two.jpg" alt="Thumbnail">
      </div>
    `;
  }

  getStyles() {
    return `
    <link rel="stylesheet" href="theme.css">
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        * {
          box-sizing: border-box !important;
        }
        :host{
          border: none;
          background-color: var(--modal-background);
          padding: 0px;
          justify-self: end;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          z-index: 20;
          position: fixed;
          right: 0px;
          top: 0;
          bottom: 0;
          left: 0;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }

        .modal-overlay{
          position: absolute;
          z-index: 20;
          right: 0px;
          top: 0;
          bottom: 0;
          left: 0;
        }

        .photos-container {
          z-index: 21;
          background-color: var(--photos-background);
          padding: 40px 0 30px 0;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          gap: 0px;
          width: 700px;
          height: 90%;
          max-height: 550px;
          position: relative;
          border-radius: 25px;
          -webkit-border-radius: 25px;
          -moz-border-radius: 25px;
          -ms-border-radius: 25px;
          -o-border-radius: 25px;
        }
        .photos-container >i{
          position: absolute;
          right: 20px;
          top: 15px;
          font-size: 1.5rem;
          font-size: 1.2rem;
          color: var(--gray-color);
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .photos-container >i:hover{
          color: var(--expand-color);
          transform: scale(1.12);
          -webkit-transform: scale(1.12);
          -moz-transform: scale(1.12);
          -ms-transform: scale(1.12);
          -o-transform: scale(1.12);
        }

        .photos-container .head{
          /* border: var(--border); */
          margin: 0 20px;
          padding: 5px 0 5px 0;
          display: none;
        }

        .photos-container .head>.control{
          /* border: var(--border); */
          width: max-content;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: var(--gray-color);
          cursor: pointer;
        }
        .photos-container .head>.control>i{
          font-size: 1.2rem;
        }
        .photos-container .head>.control>span.text{
          font-size: 1.2rem;
          font-weight: bold;
        }
        .photos-container .body{
          margin: 0 20px;
          height: 80%;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .photos-container .body>.arrow{
          color: var(--gray-color);
          color: var(--accent-color);
          width: 7%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: end;
          position: absolute;
          top: calc(50% - 25px);
          cursor: pointer;
        }
        .photos-container .body>.arrow:hover{
          color: var(--accent-color);
        }
        .photos-container .body>.arrow>i{
          font-size: 1.8rem;
        }
        .photos-container .body>.arrow.left{
          left: 0;
          justify-content: start;
        }
        .photos-container .body>.arrow.right{
          right: 0;
        }
        .photos-container .body>.arrow.stop{
          color: var(--gray-color);
          pointer-events: none;
          opacity: 0.5;
        }
        .photos-container .body>.photos{
          /* border: var(--border); */
          width: 86%;
          height: 100%;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          gap: 5px;
          overflow-x: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .photos-container .body>.photos::-webkit-scrollbar {
          display: none !important;
          visibility: hidden;
        }
        .photos-container .body>.photos>.photo{
          /* border: 1px solid var(--main-color); */
          max-width: 100%;
          min-width: 100%;
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
        }
        .photos-container .body>.photos>.photo>img{
          max-width: 100%;
          width: auto;
          max-height: 100%;
          height: auto;
          object-fit: cover;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          border-bottom-left-radius: 20px;
        }

        .photos-container .footer{
          margin: 0 20px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .photos-container .footer>.thumbnails{
          border-top: var(--border);
          padding: 15px 0 0 0;
          width: 90%;
          height: 100%;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          gap: 20px;
          overflow-x: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .photos-container .footer>.thumbnails::-webkit-scrollbar {
          display: none !important;
          visibility: hidden;
        }
        .photos-container .footer>.thumbnails>.thumbnail{
          border: var(--border);
          min-width: 60px;
          min-height: 48px;
          width: 60px;
          height: 48px;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          border-bottom-left-radius: 20px;
        }
        .photos-container .footer>.thumbnails>.thumbnail.current{
          border: var(--thumbnail);
        }
        .photos-container .footer>.thumbnails>.thumbnail>img {
          /* border: var(--border); */
          overflow: hidden;
          min-width: 50px;
          min-height: 38px;
          width: 50px;
          height: 38px;
          object-fit: cover;
          border-top-right-radius: 18px;
          border-bottom-right-radius: 18px;
          border-bottom-left-radius: 18px;
        }

        @media screen and ( max-width: 750px ){
          .photos-container {
            gap: 0px;
            width: 90%;
            height: 90%;
            max-height: 550px;
          }
        }
        @media screen and ( max-width: 550px ){
          :host{
            border: none;
            background-color: var(--modal-background);
            padding: 0;
            justify-self: end;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: end;
            gap: 10px;
            z-index: 10;
            position: fixed;
            right: 0px;
            top: 0;
            bottom: 0;
            left: 0;
          }
          .photos-container {
            padding: 25px 0 10px 0;
            gap: 0px;
            width: 100%;
            max-height: 80%;
            height: max-content;
            border-radius: 0px;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
          }
          .photos-container >i{
            display: none;
            position: absolute;
            right: 12px;
            top: 12px;
            font-size: 1.5rem;
            color: var(--gray-color);
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }
          .photos-container .body{
            margin: 0 20px;
            height: max-content;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .photos-container .body>.arrow{
            display: none;
          }
          .photos-container .body>.photos{
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: row;
            flex-wrap: nowrap;
            gap: 5px;
            overflow-x: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .photos-container .body>.photos>.photo{
            max-width: 100%;
            min-width: 100%;
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: row;
            flex-wrap: nowrap;
            align-items: end;
            justify-content: center;
          }
          .photos-container .body>.photos>.photo>img{
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: cover;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            border-bottom-left-radius: 20px;
          }
          .photos-container .footer{
            padding: 20px 0 5px 0;
            height: 100%;
            margin: 0 10px;
            height: max-content;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .photos-container .footer>.thumbnails{
            border-top: var(--mobile-border);
            padding: 20px 0 5px 5px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: start;
            gap: 15px;
            overflow-x: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .photos-container .footer>.thumbnails::-webkit-scrollbar {
            display: none !important;
            visibility: hidden;
          }
          .photos-container .footer>.thumbnails>.thumbnail{
            border: var(--border);
            min-width: 60px;
            min-height: 48px;
            width: 60px;
            height: 48px;
            cursor: pointer;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            border-bottom-left-radius: 20px;
          }
          .photos-container .footer>.thumbnails>.thumbnail.current{
            border: var(--thumbnail);
          }
          .photos-container .footer>.thumbnails>.thumbnail>img {
            /* border: var(--border); */
            overflow: hidden;
            min-width: 50px;
            min-height: 38px;
            width: 50px;
            height: 38px;
            object-fit: cover;
            border-top-right-radius: 18px;
            border-bottom-right-radius: 18px;
            border-bottom-left-radius: 18px;
          }

        }
    `;
  }
}
