export default class StoryWrapper extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets get the url from attribute
    this.url = this.getAttribute('url');


    // lets create our shadow root
    this.shadowObj = this.attachShadow({ mode: 'open' });

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    let options = this.shadowObj.querySelector('.footer>.actions>.more>span.dots')
    let optionsMobile = this.shadowObj.querySelector('.footer>.actions>.more>span.dots-mobile');

    options.addEventListener('click', (e) => {
      this.handleOptions(options);
    });

    optionsMobile.addEventListener('click', (e) => {
      this.handleOptionsMobile();
    });

  }

  disconnectedCallback() {
    console.log('We are inside disconnectedCallback');
    // adding event handler to the button
    let options = this.shadowObj.querySelector('.footer>.actions>.more>span.dots')
    let optionsMobile = this.shadowObj.querySelector('.footer>.actions>.more>span.dots-mobile');

    optionsMobile.removeEventListener('click',this.handleOptionsMobile());

    options.removeEventListener('click',this.handleOptions(options));
  }

  handleOptions(option) {
    // updating the state
    let optionsModal = this.shadowObj.querySelector('.footer>.actions>.more>.options')
    let pointer = optionsModal.querySelector("span.pointer")
    let top = optionsModal.querySelector("span.option")

    top.addEventListener("mouseenter", (e) => {
      pointer.style.backgroundColor = "var(--modal-hover-background)"
    })
    top.addEventListener("mouseleave", (e) => {
      pointer.style.backgroundColor = "var(--theme)"
    })
    if (optionsModal.style.display == "flex") {
      option.classList.remove("active")
      optionsModal.style.display = "none"
    }
    else {
      option.classList.add("active")
      optionsModal.style.display = "flex"
    }
  }

  handleOptionsMobile() {
    // updating the state
    let optionsModal = this.shadowObj.querySelector('.options-modal');
    let options = optionsModal.querySelector('.more-options');
    let closeModal = options.querySelector(".close-modal")
    let modalOverlay = optionsModal.querySelector(".modal-overlay")

    if (optionsModal.style.display == "flex") {
      // console.log(options)
      optionsModal.style.display = "none"
    }
    else {
      optionsModal.style.display = "flex"
      this.disableScroll()
    }

    closeModal.addEventListener("click", (e) => {
      e.stopPropagation();
      optionsModal.style.setProperty("display", "none")
      this.enableScroll()
    })
    modalOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      optionsModal.style.setProperty("display", "none")
      this.enableScroll()
    })
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
    ${this.getStoryHeader()}
    <h4 class="story-title">
      <a href="${this.getAttribute('url')}">${this.getAttribute('story-title')}</a>
    </h4>
    <div class="none-info">
      <div class="summery">
        <p class="summery">
          ${this.getAttribute('summery')}
        </p>
      </div>
      <div class="image">
        <img src="${this.getAttribute('cover')}" alt="image">
      </div>
    </div>
    <div class="footer">
      <div class="actions">
        <span class="edit views">
          <span class="no">${this.getAttribute('views')}</span>
          <span class="text">views</span>
        </span>
        <span class="dot"></span>
        <span class="edit views">
          <span class="no">${this.getAttribute('duration')}</span>
        </span>
        <!--<span class="dot"></span>
        <a href="${this.getAttribute('author-url')}" class="edit">Author</a>-->
        <div class="more">
          <span class="dots">
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
          <span class="dots-mobile">
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
          <div class="options">
            <span class="option">
              <i class="bi-link-45deg"></i>
              <span class="text">Copy link</span>
            </span>
            <span class="option">
              <i class="bi-bookmark-plus"></i>
              <span class="text">Add to list</span>
            </span>
            <span class="option">
              <i class="bi-chat-square"></i>
              <span class="text">Comments</span>
            </span>
            <span class="option delete">
              <i class="bi-trash2"></i>
              <span class="text">Report</span>
            </span>
            <span class="pointer"></span>
          </div>
        </div>
      </div>
    </div>


    <div class="options-modal">
      <div class="more-options">
        <span class="pointer"></span>
        <span class="options-item">
          <i class="bi-person-plus"></i>
          <span class="option-details">
            <span class="detail-title">Follow</span>
            <span class="detail-text">Follow the author of this story</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-clipboard"></i>
          <span class="option-details">
            <span class="detail-title">Copy link</span>
            <span class="detail-text">Copy link to this story</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-bookmark"></i>
          <span class="option-details">
            <span class="detail-title">Add to list</span>
            <span class="detail-text">Add this story to your lists</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-view-list"></i>
          <span class="option-details">
            <span class="detail-title">view story</span>
            <span class="detail-text">See comments, likes, and author info</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-flag"></i>
          <div class="option-details">
            <span class="detail-title">Report</span>
            <span class="detail-text">A problem! report this story</span>
          </div>
        </span>
        <div class="close-modal">
          <i class="bi-x"></i>
          <span class="close-text">Close</span>
        </div>
      </div>
      <div class="modal-overlay"></div>
    </div>
    ${this.getStyles()}
  `;
  }

  getStoryHeader(){
    if (this.getAttribute('type') == 'space') {
      return `
      <div class="space head-options">
        <div class="left">
          <div class="image">
            <img src="${this.getAttribute('profile-src')}" alt="Image" srcset="">
          </div>
          <div class="info">
            <a href="" class="name">${this.getAttribute('space-name')}</a>
            <div class="author">
              <span class="by">by</span>
              <a href="" class="name">${this.getAttribute('name')}</a>
              <span class="dot"></span>
              <span class="time">${this.getAttribute('time-lapse')}</span>
            </div>
          </div>
        </div>
      </div>`
    } else {
      return `
      <div class="head head-options">
        <div class="user">
          <div class="profile">
            <img src="${this.getAttribute('profile-src')}" alt="profile" srcset="">
          </div>
          <div class="info">
            <div class="name-container">
              <p class="name">
                <a href="${this.getAttribute('profile-url')}" class="user-link">${this.getAttribute('name')}</a>
                <i class="bi-patch-check-fill"></i>
              </p>
            </div>
            <div class="other">
              <span class="time">${this.getAttribute('time-lapse')}</span>
            </div>
          </div>
        </div>
      </div>
    `
    }

  }

  getStyles() {
    return `
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          border-bottom: var(--border);
          padding: 15px 3px 15px 3px;
          display: flex;
          flex-flow: column;
          gap: 0px;
        }
        * {
        box-sizing: border-box !important;
          --font-one: 'Sen', sans-serif;
          --font-two: 'Product Sans', sans-serif;
        }
        .space{
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap;
          gap: 10px;
        }
        .space>.left{
          display: flex;
          gap: 8px;
          margin: 0 0 0 -1px;
          font-size: 1rem;
        }
        .space>.left>.image{
          display: none;
          width: 38px;
          height: 38px;
          overflow: hidden;
          border-radius: 100%;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          -ms-border-radius: 100%;
          -o-border-radius: 100%;
        }
        .space>.left>.image>img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 100%;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          -ms-border-radius: 100%;
          -o-border-radius: 100%;
        }
        .space>.left>.info{
          display: flex;
          flex-flow: column;
          gap: 0;
          justify-content: center;
        }
        .space>.left>.info>a.name{
          text-decoration: none;
          color: var(--text-color);
          font-size: 1.15rem;
        }
        .space>.left>.info>a.name:hover{
          text-decoration: underline;
        }
        .space>.left>.info>.author{
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0 0 0 4px;
          font-size: 0.8rem;
          color: var(--text-color);
        }
        .space>.left>.info>.author>a.name{
          text-decoration: none;
          color: var(--gray-color);
          font-size: 0.8rem;
        }
        .space>.left>.info>.author>a.name:hover{
          text-decoration: underline;
        }
        .space>.left>.info>.author>span.dot{
          display: inline-block;
          width: 4px;
          height: 4px;
          background-color: var(--dot-color);
          border-radius: 5px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -ms-border-radius: 5px;
          -o-border-radius: 5px;
        }
        .space>.left>.info>.author>span.time{
          text-decoration: none;
          color: var(--gray-color);
          font-size: 0.8rem;
        }
        .head{
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap;
          gap: 20px;
        }
        .head>.user{
          display: flex;
          flex-flow: row;
          align-items: center;
          flex-wrap: nowrap;
          gap: 10px;
        }
        .head>.user>.profile{
          width: 38px;
          height: 38px;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .head>.user>.profile>img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .head>.user>.info{
          margin-top: 1px;
          display: flex;
          flex-flow: column;
          gap: 2px;
        }
        .head>.user>.info>.name-container{
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          line-height: 0;
          gap: 8px;
        }
        .head>.user>.info>.name-container>p.name{
          margin: 0;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 1rem;
          line-height: 0;
          color: var(--text-color);
        }
        .head>.user>.info>.name-container>p.name>a{
          text-decoration: none;
          color: inherit;
        }
        .head>.user>.info>.name-container>p.name>a:hover{
            text-decoration: underline;
        }
        .head>.user>.info>.name-container>p.name>i{
          font-size: 0.85rem;
          margin-top: 2px;
          color: var(--main-color);
        }
        .head>.user>.info>.other{
          display: flex;
          flex-flow: row;
          align-items: center;
          gap: 0px;
          color: var(--gray-color);
        }
        .head>.user>.info>.other>.time{
          font-size: 0.8rem;
        }
        h4.story-title {
          margin: 10px 0 3px 0;
          color: var(--text-color);
          font-size: 1rem;
          font-weight: 700;
        }
        h4.story-title>a {
          text-decoration: none;
          color: inherit;
        }
        h4.story-title>a:hover {
          text-decoration: underline;
          color: inherit;
        }
        .none-info {
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          gap: 15px;
        }

        .none-info>.image{
          margin-top: 4px;
          min-width: 50px;
          min-height: 35px;
          width: 50px;
          height: 35px;
        }

        .none-info>.image>img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .none-info>.summery {
          display: flex;
          flex-flow: column;
          gap: 2px;
        }

        .none-info>.summery>h4.story-title {
          display: none;
          margin: 0;
          color: var(--title-color);
          font-size: 1.1rem;
          font-weight: 700;
        }

        .none-info>.summery>h4.story-title>a {
          text-decoration: none;
          color: inherit;
        }

        .none-info>.summery>h4.story-title>a:hover {
          text-decoration: underline;
          color: inherit;
        }

        .none-info>.summery>p.summery {
          margin: 0;
          color: var(--text-color);
          line-height: 1.4;
          font-size: 0.9rem;
        }

        .footer {
          margin: 10px 0 0 0;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .footer>.actions {
          display: flex;
          flex-flow: row;
          align-items: center;
          gap: 10px;
        }

        .footer>.actions>.edit {
          padding: 3px 0;
          text-decoration: none;
          color: var(--gray-color);
          font-size: 0.9rem;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .footer>.actions>a.edit:hover {
          background-color: var(--back-one-color);
          color: var(--text-color);
        }
        .footer>.actions>span.dot {
          display: inline-block;
          margin-top: 1px;
          width: 4px;
          height: 4px;
          background-color: var(--dot-color);
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .footer>.actions>a.edit:hover span.dot{
          background-color: var(--main-color);
        }

        .footer>.actions>.more {
          position: relative;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          margin-top: 3px;
        }
        .footer>.actions>.more>span.dots-mobile,
        .footer>.actions>.more>span.dots{
          text-decoration: none;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          height: 20px;
          width: 28px;
          gap: 3px;
          cursor: pointer;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          border-bottom-left-radius: 50px;
        }
        .footer>.actions>.more>span.dots-mobile{
          display: none;
        }
        .footer>.actions>.more>span.dots-mobile>span.dot,
        .footer>.actions>.more>span.dots>span.dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background-color: var(--dot-color);
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        .footer>.actions>.more>span.dots:hover {
          background-color: var(--back-one-color);
        }
        .footer>.actions>.more>span.active{
          background-color: var(--back-one-color);
          color: var(--main-color);
        }
        .footer>.actions>.more>.active:hover {
          background-color: var(--back-one-color);
        }

        .footer>.actions>.more>span.dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background-color: var(--dot-color);
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .footer>.actions>.more>span.active>span.dot {
          background-color:  var(--main-color);
        }

        .footer>.actions>.more>.options {
          position: absolute;
          left: -58px;
          top: 30px;
          background-color: var(--theme);
          border: var(--border);
          box-shadow: var(--box-shadow);
          padding: 0;
          display: none;
          flex-flow: column;
          gap: 0px;
          z-index: 2;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .footer>.actions>.more>.options>span.pointer {
          border: var(--border);
          border-bottom: none;
          border-right: none;
          background-color: var(--theme);
          display: inline-block;
          width: 8px;
          height: 8px;
          position: absolute;
          left: 67px;
          top: -5px;
          rotate: 45deg;
        }

        .footer>.actions>.more>.options>.option {
          display: flex;
          padding: 8px 20px 8px 15px;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          min-width: max-content;
          width: 100%;
          gap: 8px;
          color: var(--gray-color);
          cursor: pointer;
          font-size: 0.85rem;
        }

        .footer>.actions>.more>.options>.option:first-of-type {
          border-top-right-radius: 10px;
        }

        .footer>.actions>.more>.options>.delete {
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .footer>.actions>.more>.options>.option>i {
          font-size: 0.9rem;
        }

        .footer>.actions>.more>.options>.option:hover {
          background-color: var(--modal-hover-background);
          color: var(--text-color);
          text-decoration: underline;
        }

        .footer>.actions>.more>.options>.delete:hover {
          color: var(--red-color);
          text-decoration: underline;
        }


        .options-modal{
          position: fixed;
          right: 0;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 10;
          border: none;
          border-radius: 0;
          padding: 0;
          display: none;
          align-items: center;
        }
        .options-modal>.modal-overlay{
          position: absolute;
          right: 0;
          top: 0;
          left: 0;
          bottom: 0;
          background-color: var(--modal-background);
        }
        .options-modal>.more-options{
          display: flex;
          position: absolute;
          bottom: 0px;
          right: 0px;
          left: 0px;
          top: unset;
          z-index: 12;
          width: 100%;
          flex-flow: column;
          align-items: center;
          gap: 0px;
          background-color: var(--modal);
          z-index: 1;
          border-top-right-radius: 15px;
          border-top-left-radius: 15px;
        }
        .options-modal>.more-options>span.pointer{
          border: none;
          background-color:  var( --pointer-mobile);
          display: inline-block;
          margin: 12px 0 10px 0;
          align-self: center;
          width: 50px;
          height: 7px;
          border-radius: 10px;
          position: unset;
          rotate: unset;
        }
        .options-modal>.more-options>.options-item{
          width: 90%;
          display: flex;
          padding: 15px 5px;
          /*align-self: start;*/
          align-items: center;
          text-decoration: none;
          gap: 15px;
          color: var(--gray-color);
        }
        .options-modal>.more-options>.leave{
          color: var(--expand-color);
        }
        .options-modal>.more-options>.options-item:first-of-type{
            padding-top: 7px;
        }
        .options-modal>.more-options>.options-item:last-of-type{
          padding-bottom: 15px;
          border-bottom: var(--border);
        }
        .options-modal>.more-options>.options-item>.option-details{
          display: flex;
          flex-flow: column;
        }
        .options-modal>.more-options>.options-item>i{
          color: inherit;
          font-size: 1.4rem;
          color: var(--text-color);
          align-self: start;
          margin-top: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .options-modal>.more-options>.leave>i{
          color: var(--expand-color);
          rotate: 90deg;
        }
        .options-modal>.more-options>.options-item:first-of-type>i{
          font-size: 1.5rem;
        }
        .options-modal>.more-options>.options-item>.option-details>.detail-title{
          font-size: 1rem;
          color: inherit;
          color: var(--text-color);
        }
        .options-modal>.more-options>.leave>.option-details>.detail-title{
          color: var(--expand-color);
        }
        .options-modal>.more-options>.options-item>.option-details>.detail-title::first-letter{
          text-transform: capitalize;
        }
        .options-modal>.more-options>.options-item>.option-details>.detail-text{
          font-size: 0.8rem;
          color: inherit;
        }
        .options-modal>.more-options>.close-modal{
          background-color: var(--modal-close);
          color: var(--text-color);
          padding: 10px 10px;
          margin: 15px 0 25px 0;
          width: 90%;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 1.18rem;
          font-weight: 700;
          border-radius: 50px;
        }
        .options-modal>.more-options>.close-modal i{
          margin-top: 2px;
        }
        @media screen and (max-width:500px ){
          :host {
            box-sizing: border-box !important;
            border-bottom: var(--mobile-border);
          }
          .space>.left>.info>a.name,
          .space>.left>.info>.author>a.name,
          h4.story-title>a {
            cursor: default;
          }
          .story-info>.summery>h4.story-title>a {
            cursor: unset;
          }
          .space>.left>.info>.author{
            padding: 0 0 0 1px;
          }
          .footer>.actions>.more>span.dots{
            display: none;
          }
          .footer>.actions>.more>span.dots-mobile{
            display: flex;
            cursor: default;
          }
         }

      </style>
    `;
  }
}