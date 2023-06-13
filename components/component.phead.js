export default class ProfileHeader extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets get the url from attribute
    this.url = this.getAttribute('url');

    this.lastScroll  = 0;
    this.tabLastScroll  = 0;


    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }


  connectedCallback() {
    let itemMobile  = this.shadowObj.querySelector('.head-nav>.options>.dots');
    let options  = this.shadowObj.querySelector('.actions>.more>span.dots');
    let optionsMobile  = this.shadowObj.querySelector('.actions>.more>span.dots-mobile');

    itemMobile.addEventListener('click', (e) => {
      this.handleOptionsMobile();
    });

    options.addEventListener('click', (e) => {
      this.handleOptions(options);
      // console.log(options)
    });

    optionsMobile.addEventListener('click', (e) => {
      this.handleTopOptionsMobile();
    });

    window.addEventListener("scroll", () => {
      this.updateHeader()
      this.updateTab()
    });
  }

  disconnectedCallback() {
    console.log('We are inside disconnectedCallback');
    // adding event handler to the button
    let itemMobile  = this.shadowObj.querySelector('.head-nav>.options>.dots');
    let options  = this.shadowObj.querySelector('.actions>.more>span.dots');
    let optionsMobile  = this.shadowObj.querySelector('.actions>.more>span.dots-mobile');

    optionsMobile.removeEventListener('click',this.handleTopOptionsMobile());

    itemMobile.removeEventListener('click', this.handleOptionsMobile());

    options.removeEventListener('click',this.handleOptions(options));

    window.removeEventListener('scroll',this.updateHeader(),this.updateTab());
  }

  handleOptions(item) {
    // updating the state
    let optionsModal  = this.shadowObj.querySelector('.actions>.more>.more-options');
    let pointer = optionsModal.querySelector("span.pointer")
    let top = optionsModal.querySelector("span.item")

    top.addEventListener("mouseenter", (e) => {
        pointer.style.backgroundColor = "var(--modal-hover-background)"
    })
    top.addEventListener("mouseleave", (e) => {
        pointer.style.backgroundColor = "var(--theme)"
    })
    if (optionsModal.style.display == "flex"){
      // console.log(options)
      item.classList.remove("active")
      optionsModal.style.display = "none"
    }
    else {
      item.classList.add("active")
      optionsModal.style.display = "flex"
    }
  }

  handleTopOptionsMobile() {
    // updating the state
    let optionsModal  = this.shadowObj.querySelector('.options-modal');
    let options  = optionsModal.querySelector('.more-options');
    let closeModal = options.querySelector(".close-modal")
    let modalOverlay = optionsModal.querySelector(".modal-overlay")

    if (optionsModal.style.display == "flex"){
      // console.log(options)
      optionsModal.style.display = "none"
    }
    else {
      optionsModal.style.display = "flex"
      this.disableScroll()
    }

    closeModal.addEventListener("click", (e) => {
      e.stopPropagation();
      optionsModal.style.setProperty("display","none")
      this.enableScroll()
    })
    modalOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      optionsModal.style.setProperty("display","none")
      this.enableScroll()
    })
  }

  handleOptionsMobile() {
    // updating the state
    let optionsModal  = this.shadowObj.querySelector('.options-modal');
    let options  = optionsModal.querySelector('.more-options');
    let closeModal = options.querySelector(".close-modal")
    let modalOverlay = optionsModal.querySelector(".modal-overlay")

    if (optionsModal.style.display == "flex"){
      // console.log(options)
      optionsModal.style.display = "none"
    }
    else {
      optionsModal.style.display = "flex"
      this.disableScroll()
    }

    closeModal.addEventListener("click", (e) => {
      e.stopPropagation();
      optionsModal.style.setProperty("display","none")
      this.enableScroll()
    })
    modalOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      optionsModal.style.setProperty("display","none")
      this.enableScroll()
    })
  }

  disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.body.classList.add("stop-scrolling");

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  enableScroll() {
    document.body.classList.remove("stop-scrolling");
    window.onscroll = function() {};
  }

  updateTab() {
    let tab = document.querySelector("main.profile>.main-info>ul.tab");
    // console.log(tab)
    let movEl = tab.offsetTop;
    let res = movEl - document.documentElement.scrollTop;
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      // tab.classList.remove('hide')
      tab.classList.remove('mobile-tab');
      return;
    }

    if (currentScroll > this.tabLastScroll && !tab.classList.contains("mobile-tab")) {
      // down
      if (res <= 22) {
        tab.classList.add('mobile-tab');
        // tab.classList.add('hide')
      }
    }
    else if (currentScroll < this.tabLastScroll && tab.classList.contains("mobile-tab")) {
      // up
      // tab.classList.remove('hide')
      if (res < 22) {
        tab.classList.remove('mobile-tab');
      }
    }
    this.tabLastScroll = currentScroll;
  }

  updateHeader() {
    let info = this.shadowObj.querySelector(".actions");
    // console.log(info);
    let head = this.shadowObj.querySelector(".head-nav");
    let movEl = info.offsetTop;
    let res = movEl - document.documentElement.scrollTop;
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      head.classList.remove('show');
      head.classList.add('hide');
      return;
    }

    if (currentScroll > this.lastScroll && !head.classList.contains("show")) {
      // down
      if (res <= 22) {
        head.classList.remove('hide')
        head.classList.add('show');
      }
    }
    else if (currentScroll < this.lastScroll && head.classList.contains("show")) {
     // up
     if (res > 22) {
        head.classList.remove('show');
        head.classList.add('hide');
      }
    }
    this.lastScroll = currentScroll;
  }

  getTemplate() {
    // Show HTML Here
    return `
    <div class="head-nav">
      <div class="left">
        <div class="arrow">
          <!-- <i class="bi bi-chevron-left"></i> -->
          <i class="bi bi-arrow-left-short"></i>
        </div>
        <div class="name">
          <div class="title">${this.getAttribute('user-name')}</div>
          <span class="users">${this.getAttribute('followers')} followers</span>
        </div>
      </div>
      <div class="options">
        <span class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
      </div>
    </div>
    <div class="top">
      <div class="image">
        <img src="${this.getAttribute('user-picture')}" alt="" srcset="">
      </div>
      <div class="details">
        <div class="head">
          <div class="name">
            <h3 class="name">${this.getAttribute('user-name')}</h3>
            <i class="bi-patch-check-fill"></i>
          </div>
        </div>
        <p class="bio">${this.getAttribute('user-bio')}</p>
        <div class="follow-stats">
          <div class="stat followers">
            <span class="no">${this.getAttribute('followers')}</span>
            <span class="text">followers</span>
          </div>
          <span class="dot"></span>
          <div class="stat following">
            <span class="no">${this.getAttribute('following')} </span>
            <span class="text">following</span>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <span  class="action ${this.getAttribute('connection')}">
        ${this.getIcon(this.getAttribute('connection'))}
      </span>
      <span class="action message">
        <i class="bi-envelope"></i>
        <span class="text">Message</span>
      </span>
      <span class="more">
        <span class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
        <span class="dots-mobile">
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
        <div class="more-options">
          <span class="pointer"></span>
          <span class="item mute">Mute User</span>
          <span class="item block">Block</span>
          <span class="item report">Report</span>
        </div>
      </span>
    </div>
    <section class="about">
      <p class="text">
        ${this.getAttribute('user-about')}
      </p>
    </section>


    <div class="options-modal">
      <div class="more-options">
        <span class="pointer"></span>
        <span class="options-item">
          ${this.getFollow(this.getAttribute('connection'))}
        </span>
        <span class="options-item">
          <i class="bi-send-plus"></i>
          <span class="option-details">
            <span class="detail-title">Email</span>
            <span class="detail-text">Inquire about ${this.getAttribute('user-name')}</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-clipboard"></i>
          <span class="option-details">
            <span class="detail-title">Copy link</span>
            <span class="detail-text">Copy ${this.getAttribute('user-name')}'s profile link</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-flag"></i>
          <div class="option-details">
            <span class="detail-title">Report</span>
            <span class="detail-text">A problem! report ${this.getAttribute('user-name')}</span>
          </div>
        </span>
        <span class="options-item">
          <i class="bi-envelope-open-heart"></i>
          <span class="option-details">
            <span class="detail-title">Support</span>
            <span class="detail-text">Donate to ${this.getAttribute('user-name')}</span>
          </span>
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

  getIcon(conn){
    if (conn == "following") {
      return `
      <i class="bi-person-check"></i>
      <span class="text">Following</span>
      `
    } else {
      return `
      <i class="bi-person-plus"></i>
      <span class="text">Follow</span>
      `
    }
  }

  getFollow(conn){
    if (conn == "following") {
      return `
        <i class="bi-person-dash"></i>
        <span class="option-details">
          <span class="detail-title">Unfollow</span>
          <span class="detail-text">Stop seeing ${this.getAttribute('user-name')}'s activity</span>
        </span>
      `
    } else {
      return `
        <i class="bi-person-plus"></i>
        <span class="option-details">
          <span class="detail-title">Follow</span>
          <span class="detail-text">Get to see ${this.getAttribute('user-name')}'s activity</span>
        </span>
      `
    }
  }

  getStyles() {
    return `
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          display: flex;
          flex-flow: column;
          gap: 10px;
          padding: 35px 0 0 0;
        }
        * {
        box-sizing: border-box !important;
          --font-one: 'Sen', sans-serif;
          --font-two: 'Product Sans', sans-serif;
        }
        .head-nav{
          display: none;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          z-index: 7;
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          height: 50px;
          padding: 0 12px 0 5px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          background-color: var(--mobile-header);
        }
        .head-nav>.left{
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 10px;
        }
        .head-nav>.left>.arrow{
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 3px;
          height: max-content;
        }
        .head-nav>.left>.arrow>i{
          font-size: 2rem;
          color: var(--text-color);
        }
        .head-nav>.left>.name{
          display: flex;
          flex-flow: column;
          gap: 0px;
        }
        .head-nav>.left>.name>.title{
          margin: 0;
          color: var(--text-color);
          font-weight: 700;
          font-size: 1.2rem;
        }
        .head-nav>.left>.name>span.users{
          margin: 0;
          color: var(--gray-color);
          font-size: 0.8rem;
          padding:  0 0 0 2px;
        }
        .head-nav>.options{
          justify-self: end;
          margin: 0;
          padding: 0;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
        }
        .head-nav>.options>.dots {
          text-decoration: none;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          border-bottom-left-radius: 50px;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          height: 20px;
          width: 28px;
          gap: 3px;
        }
        .head-nav>.options>.dots>span.dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: var(--gray-color);
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }


        .top {
          width: 100%;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          gap: 15px;
        }
        .top>.image {
          width: 100px;
          min-width: 100px;
          height: 100px;
          min-height: 100px;
          border-radius: 100%;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          -ms-border-radius: 100%;
          -o-border-radius: 100%;
        }
        .top>.image>img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 100%;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          -ms-border-radius: 100%;
          -o-border-radius: 100%;
        }
        .top>.details {
          display: flex;
          flex-flow: column;
          gap: 5px;
        }
        .top>.details>.head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3px;
        }
        .top>.details>.head>.name {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .top>.details>.head>.name>h3 {
          margin: 0;
          font-size: 1.3rem;
          color: var(--text-color);
        }
        .top>.details>.head>.name>i {
          margin-top: 3px;
          font-size: 1rem;
          color: var(--main-color);
        }
        .top>.details>.bio {
          margin: 0;
          color: var(--text-color);
          line-height: 1.2;
          font-size: 0.95rem;
        }
        .top>.details>.follow-stats {
          font-size: 0.93rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray-color);
        }
        .top>.details>.follow-stats>.stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
        }
        .top>.details>.follow-stats>.stat:hover {
          text-decoration: underline;
        }
        .top>.details>.follow-stats>.stat>span.no {
          font-size: 0.90rem;
        }
        .top>.details>.follow-stats>span.dot {
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
        .actions {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 25px;
          margin: 15px 0 0 0;
        }
        .actions>.action {
          border: var(--border);
          color: var(--gray-color);
          text-decoration: none;
          height: max-content;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 5px 15px 5px 15px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .actions>.message:hover {
          color: var(--main-color);
        }
        .actions>.message{
          border: 1px solid var(--main-color);
          color: var(--text-color);
        }

        .actions>.follow {
          border: none;
          background: var(--button-background-two);
          color: var(--button-text-one);
          background-color: var(--main-color);
          background-size: 500% 500%;
        }
        .actions>.following {
          border: var(--button-border);
          border-left: var(--button-border-left);
          border-bottom: var(--button-border-left);
          color: transparent;
          background: var(--button-background);
          background-color: var(--main-color);
          background-size: 400% 400%;
          background-clip: text;
          -moz-background-clip: text;
          -webkit-background-clip: text;
        }
        .actions>.more {
          position: relative;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
        }
        .actions>.more>span.dots-mobile,
        .actions>.more>span.dots{
          text-decoration: none;
          border: var(--border);
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
        .actions>.more>span.dots-mobile{
          display: none;
        }
        .actions>.more>span.dots-mobile>span.dot,
        .actions>.more>span.dots>span.dot {
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
        .actions>.more>.more-options {
          border: var(--border);
          position: absolute;
          background-color: var(--theme);
          top: 28px;
          left: -45px;
          min-width: 120px;
          /* display: flex; */
          display: none;
          z-index: 7;
          flex-flow: column;
          gap: 0;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .actions>.more>.more-options>span.item {
          padding: 5px 10px;
          color: var(--gray-color);
          font-size: 0.9rem;
        }
        .actions>.more>.more-options>span.report {
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          padding: 5px 10px 7px 10px;
        }
        .actions>.more>.more-options>span.mute {
          border-top-right-radius: 10px;
        }
        .actions>.more>.more-options>span.item:hover {
          background-color: var(--modal-hover-background);
          color: var(--text-color);
          text-decoration: underline;
          cursor: pointer;
        }
        .actions>.more>.more-options>span.pointer {
          border: var(--border);
          border-bottom: none;
          border-right: none;
          background-color: var(--theme);
          display: inline-block;
          width: 8px;
          height: 8px;
          position: absolute;
          right: unset;
          left: 53px;
          top: -5px;
          rotate: 45deg;
        }
        section.about {
          padding-top: 10px;
          color: var(--text-color);
        }
        section.about>p.text {
          margin: 0;
          line-height: 1.4;
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
        @media screen and ( max-width:500px ){
          :host{
            /*border: var(--mobile-border);*/
            padding: 20px 0px 0 0px;
          }
          .top>.image {
            width: 80px;
            min-width: 80px;
            height: 80px;
            min-height: 80px;
            border-radius: 100%;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            -ms-border-radius: 100%;
            -o-border-radius: 100%;
          }
          .top>.details>.bio {
            margin: 0;
            color: var(--text-color);
            line-height: 1.2;
            font-size: 0.85rem;
          }
         .show{
            display: flex;
          }
         .hide{
            display: none;
          }
          header.mobile{
            display: none;
          }
          .actions>.action {
            cursor: unset;
          }
          .header>.info>.footer>.actions>.more{
            cursor: unset;
          }
          .actions>.more>span.dots{
            display: none;
          }
          .actions>.more>span.dots-mobile{
            display: flex;
            cursor: unset;
          }
        }
      </style>
    `;
  }
}