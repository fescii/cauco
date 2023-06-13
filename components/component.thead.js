export default class TopicHeader extends HTMLElement {
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

    itemMobile.addEventListener('click', (e) => {
      this.handleOptionsMobile();
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

    itemMobile.removeEventListener('click', this.handleOptionsMobile());

    window.removeEventListener('scroll',this.updateHeader(),this.updateTab());
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
    let tab = document.querySelector("main.topics>.contents>ul.tab");
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
    let info = this.shadowObj.querySelector(".text-content>.sub-text ");
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
          <div class="title">${this.getAttribute('topic-name')}</div>
          <span class="users">${this.getAttribute('writers')} writers</span>
        </div>
      </div>
      <div class="options">
        <span class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
      </div>
    </div>
    <div class="text-content">
      <h2 class="tag">
        ${this.getAttribute('topic-name')}
      </h2>
      <div class="sub-text">
        Discover, read, and contribute to  stories about ${this.getAttribute('topic-name')}. Interact with the contributing authors in the topic spaces.
        You can also get the stories periodically via email by subscribing to this topic.
      </div>
      <div class="start-using">
        <a href="" class="${this.getAttribute('connection')}">
          ${this.getIcon(this.getAttribute("connection"))}
        </a>
        <a href="" class="start-link start">
          <span class="text">Start writing</span>
        </a>
      </div>
    </div>


    <div class="options-modal">
      <div class="more-options">
        <span class="pointer"></span>
        <span class="options-item">
          ${this.getSubscribed(this.getAttribute('connection'))}
        </span>
        <span class="options-item">
          <i class="bi-journal-plus"></i>
          <span class="option-details">
            <span class="detail-title">Write</span>
            <span class="detail-text">Create stories about ${this.getAttribute('topic-name')}</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-clipboard"></i>
          <span class="option-details">
            <span class="detail-title">Copy link</span>
            <span class="detail-text">Copy link to ${this.getAttribute('topic-name')}</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-flag"></i>
          <div class="option-details">
            <span class="detail-title">Report</span>
            <span class="detail-text">A problem! report ${this.getAttribute('topic-name')}</span>
          </div>
        </span>
        <span class="options-item">
          <i class="bi-envelope-open-heart"></i>
          <span class="option-details">
            <span class="detail-title">Support creators</span>
            <span class="detail-text">Donate to authors in ${this.getAttribute('topic-name')}</span>
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      <span class="text">Subscribed</span>
      `
    } else {
      return `
      <span class="plus">
        <i class="top"></i>
        <i class="hor"></i>
      </span>
      <span class="text">Subscribe</span>
      `
    }
  }

  getSubscribed(conn){
    if (conn == "following") {
      return `
      <i class="bi-envelope-check"></i>
      <span class="option-details">
        <span class="detail-title">Unsubscribe</span>
        <span class="detail-text">You'll not receive any updates from this topic</span>
      </span>
      `
    } else {
      return `
      <i class="bi-envelope-plus"></i>
      <span class="option-details">
        <span class="detail-title">Subscribe</span>
        <span class="detail-text">You'll receive updates from this topic</span>
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
          margin: 0;
          padding: 30px 0 0 0;
          grid-column: 1/2;
          grid-row: 1;
          height: max-content;
          display: flex;
          flex-flow: column;
          gap: 0;
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

        @keyframes gradient {
          0% {
              background-position: 0% 50%;
          }
          50% {
              background-position: 100% 50%;
          }
          100% {
              background-position: 0% 50%;
          }
        }
        .text-content {
          display: flex;
          flex-flow: column;
          gap: 10px;
          color: var(--text-color);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }
        .text-content>.tag {
          font-size: 1.8rem;
          margin: 0%;
          background: linear-gradient(-45deg, #ee7752, rgb(255, 136, 0), #08b86f, #23d5ab);
          background-clip: text;
          background-size: 250% 250%;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 10s ease infinite;
          -webkit-animation: gradient 10s ease infinite;
          -moz-animation: gradient 10s ease infinite;
          -o-animation: gradient 10s ease infinite;
        }

        .text-content>.start-using {
          display: flex;
          flex-flow: row;
          gap: 50px;
          margin-top: 10px;
        }
        .text-content>.sub-text {
          font-size: 1rem;
          color: var(--text-color);
          line-height: 1.5;
        }
        .text-content>.start-using>a{
          text-decoration: none;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .text-content>.start-using>a.start {
          border: 2px solid  var(--main-color);
          color: var(--text-color);
        }
        .text-content>.start-using>a.follow {
          background: var(--button-background-two);
          color: var(--button-text-one);
          background-color: var(--main-color);
          background-size: 500% 500%;
        }
        .text-content>.start-using>a.following {
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
        .text-content>.start-using>a.following svg{
          width: 16px;
          color: var(--main-color);
        }
        .text-content>.start-using>a.follow>span.plus {
          width: 15px;
          height: 15px;
          position: relative;
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
        }
        .text-content>.start-using>a.follow>span.plus>i {
          background-color: var(--white);
          display: inline-block;
          width: 80%;
          height: 2px;
        }
        .text-content>.start-using>a.follow>span.plus>i.top {
          rotate: 90deg;
        }
        .text-content>.start-using>a.follow>span.plus>i.hor {
          position: absolute;
          left: 10%;
          /* right: 0%; */
          /* top: 50%; */
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
        @media screen and ( max-width:500px ){
          :host{
            padding: 30px 10px 0 10px;
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