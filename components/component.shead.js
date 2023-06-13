export default class SpaceHeader extends HTMLElement {
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
    let options  = this.shadowObj.querySelector('.header>.info>.footer>.actions>.more>span.dots');
    let optionsMobile  = this.shadowObj.querySelector('.header>.info>.footer>.actions>.more>span.dots-mobile');

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
    let options  = this.shadowObj.querySelector('.header>.info>.footer>.actions>.more>span.dots');
    let optionsMobile  = this.shadowObj.querySelector('.header>.info>.footer>.actions>.more>span.dots-mobile');

    optionsMobile.removeEventListener('click',this.handleTopOptionsMobile());

    itemMobile.removeEventListener('click', this.handleOptionsMobile());

    options.removeEventListener('click',this.handleOptions(options));

    window.removeEventListener('scroll',this.updateHeader(),this.updateTab());
  }

  handleOptions(item) {
    // updating the state
    let optionsModal  = this.shadowObj.querySelector('.header>.info>.footer>.actions>.more>.more-options');
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
    let tab = document.querySelector("main.space>.contents>ul.tab");
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
    // else if (currentScroll > this.tabLastScroll && !tab.classList.contains('hide')) {
    //   if (this.tabLastScroll > 400) {
    //     tab.classList.add('hide')
    //   }
    // }
    else if (currentScroll < this.tabLastScroll && tab.classList.contains("mobile-tab")) {
      // up
      // tab.classList.remove('hide')
      if (res < 22) {
        tab.classList.remove('mobile-tab');
      }
    }
    // else if (currentScroll < this.tabLastScroll && tab.classList.contains('hide')) {
    //   if (this.tabLastScroll > 400) {
    //     tab.classList.remove('hide')
    //   }
    // }
    this.tabLastScroll = currentScroll;
  }

  updateHeader() {
    let info = this.shadowObj.querySelector(".header>.info");
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
          <div class="title">${this.getAttribute('space-name')}</div>
          <span class="users">${this.getAttribute('members')} members</span>
        </div>
      </div>
      <div class="options">
        <span class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
      </div>
    </div>
    <div class="header">
      <div class="cover-image">
        <img src="${this.getAttribute('background')}" srcset="">
      </div>
      <div class="info">
        <div class="cover">
          <div class="image">
            <img src="${this.getAttribute('cover')}" alt="Space-Image" srcset="">
          </div>
        </div>
        <div class="name">
          <h2 class="name">${this.getAttribute('space-name')}</h2>
          <i class="bi-patch-check-fill"></i>
        </div>
        <div class="footer">
          <div class="stats">
            <span class="stat followers">
              <span class="no">${this.getAttribute('followers')}</span>
              <span class="text">followers</span>
            </span>
            <span class="dot"></span>
            <span class="stat members">
              <span class="no">${this.getAttribute('members')}</span>
              <span class="text">members</span>
            </span>
          </div>
          <div class="actions">
            <span class="action ${this.getAttribute('connection')}">
            ${this.getIcon(this.getAttribute('connection'))}
            </span>
            <span class="action message">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
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
                <span class="item mute">Mute Jane</span>
                <span class="item block">Block</span>
                <span class="item report">Report</span>
              </div>
            </span>
          </div>
        </div>
        <p class="about">
          ${this.getAttribute('bio')}
        </p>
      </div>
    </div>
    <div class="options-modal">
      <div class="more-options">
        <span class="pointer"></span>
        <span class="options-item">
          ${this.getFollow(this.getAttribute('connection'))}
        </span>
        <span class="options-item">
          <i class="bi-journal-plus"></i>
          <span class="option-details">
            <span class="detail-title">Add to profile</span>
            <span class="detail-text">Pin this space to your profile</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-clipboard"></i>
          <span class="option-details">
            <span class="detail-title">Copy link</span>
            <span class="detail-text">Copy link to this space</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-flag"></i>
          <div class="option-details">
            <span class="detail-title">Report</span>
            <span class="detail-text">A problem! report this space</span>
          </div>
        </span>
        <span class="options-item ${this.getAttribute('conn')}">
          ${this.getJoin(this.getAttribute('conn'))}
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
        <i class="bi-dash-circle"></i>
        <span class="text">Following</span>
      `
    } else {
      return `
        <i class="bi bi-plus"></i>
        <span class="text">Follow</span>
      `
    }
  }

  getFollow(conn){
    if (conn == "following") {
      return `
      <i class="bi-dash-circle"></i>
      <span class="option-details">
        <span class="detail-title">Unfollow</span>
        <span class="detail-text">Stop seeing the space activity</span>
      </span>
      `
    } else {
      return `
      <i class="bi bi-plus-circle"></i>
      <span class="option-details">
        <span class="detail-title">Follow</span>
        <span class="detail-text">You'll receive the space activity</span>
      </span>
      `
    }
  }

  getJoin(conn){
    if (conn == "leave") {
      return `
      <i class="bi-escape"></i>
      <span class="option-details">
        <span class="detail-title">Leave space</span>
        <span class="detail-text">You'll not be able to perform any action in this space</span>
      </span>
      `
    }
    else if (conn == "join")  {
      return `
      <i class="bi bi-plus-circle"></i>
      <span class="option-details">
        <span class="detail-title">Request join</span>
        <span class="detail-text">You'll be able to create content in this space</span>
      </span>
      `
    }
    else if (conn == "pending")  {
      return `
      <i class="bi-dash-circle"></i>
      <span class="option-details">
        <span class="detail-title">Cancel request</span>
        <span class="detail-text">Your request to join is pending</span>
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
          grid-column: 1/2;
          grid-row: 1;
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
        .header{
          padding: 35px 0 0 0;
          height: max-content;
          display: flex;
          flex-flow: column;
          gap: 0;
        }
        .header>.cover-image{
          height: 120px;
          width: 100%;
          border-radius: 15px;
          /* border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px; */
        }
        .header>.cover-image>img{
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 15px;
        }
        .header>.info{
          position: relative;
          padding: 0px;
          display: flex;
          flex-flow: column;
          align-items: center;
          gap: 5px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .header>.info>.cover{
          background-color: transparent;
          position: absolute;
          top: -40px;
          left: 0;
          width: 100%;
          min-width: 75px;
          display: flex;
          align-items: center;
          justify-content: center;display: flex;
          align-items: center;
          justify-content: center;
          /* border-radius: 15px; */
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .header>.info>.cover>.image{
          background-color: var(--theme);
          height: 80px;
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          -ms-border-radius: 100%;
          -o-border-radius: 100%;
        }
        .header>.info>.cover>.image>img{
          height: 90%;
          width: 90%;
          object-fit: cover;
          border-radius: 100%;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          -ms-border-radius: 100%;
          -o-border-radius: 100%;
        }
        .header>.info>.name{
          width: 100%;
          margin: 0;
          margin-top: 45px;
          display: flex;
          align-items: center;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .header>.info>.name>h2.name{
          margin: 0;
          color: var(--text-color);
        }
        .header>.info>.name>i{
          margin-top: 3px;
          color: var(--expand-color);
        }
        .header>.info>p.about{
          margin: 0;
          color: var(--text-color);
          line-height: 1.4;
          text-align: center;
        }
        .header>.info>.footer{
          width: 100%;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 15px;
        }
        .header>.info>.footer>.stats {
          font-size: 0.93rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray-color);
        }
        .header>.info>.footer>.stats>.stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
        }
        .header>.info>.footer>.stats>.stat:hover {
          text-decoration: underline;
        }
        .header>.info>.footer>.stats>.stat>span.no {
          font-size: 0.90rem;
        }
        .header>.info>.footer>.stats>span.dot {
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
        .header>.info>.footer>.actions {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 20px;
        }
        .header>.info>.footer>.actions>.action {
          border: 1px solid var(--main-color);
          color: var(--text-color);
          text-decoration: none;
          height: max-content;
          width: max-content;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          padding: 4px 15px 5px 15px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .header>.info>.footer>.actions>.message{
          padding: 3px 15px 4px 15px;
        }
        .header>.info>.footer>.actions>.message svg{
          color: inherit;
          width: 16px;
        }
        .header>.info>.footer>.actions>.message:hover {
          color: var(--main-color);
        }

        .header>.info>.footer>.actions>.follow {
          padding: 5px 15px 5px 15px;
          border: none;
          background: var(--button-background-two);
          color: var(--button-text-one);
          background-color: var(--main-color);
          background-size: 500% 500%;
        }
        .header>.info>.footer>.actions>.following {
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
        .header>.info>.footer>.actions>.follow>i{
          color: inherit;
          font-size: 1rem;
        }
        .header>.info>.footer>.actions>.more {
          position: relative;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .header>.info>.footer>.actions>.more>span.dots-mobile,
        .header>.info>.footer>.actions>.more>span.dots{
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
        .header>.info>.footer>.actions>.more>span.dots-mobile{
          display: none;
        }
        .header>.info>.footer>.actions>.more>span.dots-mobile>span.dot,
        .header>.info>.footer>.actions>.more>span.dots>span.dot {
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
        .header>.info>.footer>.actions>.more>.more-options {
          border: var(--border);
          position: absolute;
          background-color: var(--theme);
          top: 28px;
          left: -45px;
          min-width: 120px;
          display: none;
          z-index: 7;
          flex-flow: column;
          gap: 0;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .header>.info>.footer>.actions>.more>.more-options>span.item {
          padding: 5px 10px;
          color: var(--gray-color);
          font-size: 0.9rem;
        }
        .header>.info>.footer>.actions>.more>.more-options>span.report {
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          padding: 5px 10px 7px 10px;
        }
        .header>.info>.footer>.actions>.more>.more-options>span.mute {
          border-top-right-radius: 10px;
        }
        .header>.info>.footer>.actions>.more>.more-options>span.item:hover {
          background-color: var(--modal-hover-background);
          color: var(--text-color);
          text-decoration: underline;
        }
        .header>.info>.footer>.actions>.more>.more-options>span.pointer {
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
          background-color:  var(--pointer-mobile);
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
        @media screen and ( max-width:500px ){
         .header{
            padding: 0;
          }
         .header>.cover-image{
            height: 150px;
            width: 100%;
            border-radius: 0px;
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
            -ms-border-radius: 0px;
            -o-border-radius: 0px;
          }
         .header>.cover-image>img{
            border-radius: 0px;
            -webkit-border-radius: 0px;
            -moz-border-radius: 0px;
            -ms-border-radius: 0px;
            -o-border-radius: 0px;
          }
         .header>.info{
            padding: 0 10px;
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
          .header>.info>.footer>.actions>.more{
            cursor: unset;
          }
          .header>.info>.footer>.actions>.more>span.dots{
            display: none;
          }
          .header>.info>.footer>.actions>.more>span.dots-mobile{
            display: flex;
            cursor: unset;
          }
        }
      </style>
    `;
  }
}