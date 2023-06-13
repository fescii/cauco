export default class StoryHeader extends HTMLElement {
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
    let dots  = document.querySelector('main.read>.story>.story-content>.comments-action>.dots');
    let dotsMobile  = document.querySelector('main.read>.story>.story-content>.comments-action>.dots-mobile');
    let share = this.shadowObj.querySelector(".close-modal>div.share")

    itemMobile.addEventListener('click', (e) => {
      this.handleOptionsMobile();
    });

    dotsMobile.addEventListener('click', (e) => {
      this.handleOptionsMobile();
    });

    dots.addEventListener('click', (e) => {
      this.handleOptionsDesktop(dots);
    });

    share.addEventListener('click', (e) => {
      this.handleOptionsShare();
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
    let dotsMobile  = document.querySelector('main.read>.story>.story-content>.comments-action>.dots-mobile');
    let share = this.shadowObj.querySelector(".close-modal>div.share")

    itemMobile.removeEventListener('click',this.handleOptionsMobile());

    dotsMobile.removeEventListener('click', this.handleOptionsMobile());

    share.removeEventListener('click',this.handleOptionsShare());

    window.removeEventListener('scroll',this.updateHeader(),this.updateTab());
  }

  handleOptionsMobile() {
    // updating the state
    let optionsModal  = this.shadowObj.querySelector('.options-modal');
    let modalOverlay = optionsModal.querySelector(".modal-overlay")
    let options  = optionsModal.querySelector('.options');

    let details  = options.querySelector('.more-options');
    let popup  = options.querySelector('.popup');

    let closeModal = options.querySelector(".close-modal>div.close")
    let share = options.querySelector(".close-modal>div.share")

    details.style.display = "flex"
    popup.style.display = "none"

    if (optionsModal.style.display == "flex"){
      // console.log(options)
      // share.classList.remove("return")
      // share.innerHTML = `<i class="bi-send"></i><span class="close-text">Share</span>`
      optionsModal.style.display = "none"
    }
    else {
      // share.classList.remove("return")
      // share.innerHTML = `<i class="bi-send"></i><span class="close-text">Share</span>`
      optionsModal.style.display = "flex"
      this.disableScroll()
    }

    closeModal.addEventListener("click", (e) => {
      e.stopPropagation();
      share.classList.remove("return")
      share.innerHTML = `<i class="bi-cursor"></i><span class="close-text">Share</span>`
      details.style.display = "flex"
      popup.style.display = "none"
      optionsModal.style.setProperty("display","none")
      this.enableScroll()
    })
    modalOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      share.classList.remove("return")
      share.innerHTML = `<i class="bi-cursor"></i><span class="close-text">Share</span>`
      details.style.display = "flex"
      popup.style.display = "none"
      optionsModal.style.setProperty("display","none")
      this.enableScroll()
    })
  }

  handleOptionsDesktop(item) {
    // updating the state
    let optionsModal  = document.querySelector('main.read>.story>.story-content>.comments-action>.options-modal');

    if (optionsModal != null) {
      let top = optionsModal.querySelector("span.options-item:last-of-type")
      let pointer = optionsModal.querySelector("span.pointer")

      top.addEventListener("mouseenter", (e) => {
          pointer.style.backgroundColor = "var(--modal-hover-background)"
      })
      top.addEventListener("mouseleave", (e) => {
          pointer.style.backgroundColor = "var(--theme)"
      })

      if (optionsModal.style.display == "flex"){
        optionsModal.style.display = "none"
        item.classList.remove("dots-active")
      }
      else {
        optionsModal.style.display = "flex"
        item.classList.add("dots-active")

      }
    }
  }

  handleOptionsShare() {
    // updating the state
    let options  = this.shadowObj.querySelector('.options-modal>.options');

    let details  = options.querySelector('.more-options');
    let popup  = options.querySelector('.popup');

    let share = options.querySelector(".close-modal>div.share")

    let field = popup.querySelector(".field"),
    input = field.querySelector("input"),
    copy = field.querySelector("button.copy");


    if (popup.style.display == "flex"){
      // console.log(options)
      details.style.display = "flex"
      popup.style.display = "none"
      share.classList.remove("return")
      share.innerHTML = `<i class="bi-cursor"></i><span class="close-text">Share</span>`
    }
    else {
      details.style.display = "none"
      popup.style.display = "flex"
      share.classList.add("return")
      share.innerHTML = `<i class="bi-chevron-left"></i><span class="close-text">Return</span>`
    }

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
    let tab = document.querySelector("main.read>.story>.story-header");
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
    let info = this.shadowObj.querySelector(".footer");
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
          <div class="title">Story</div>
          <span class="users">
            <span class="by">by</span>
            ${this.getAuthor(this.getAttribute('type'))}
          </span>
        </div>
      </div>
      <div class="options">
        <span class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
        </span>
      </div>
    </div>

    ${this.getProfile(this.getAttribute('type'))}
    <div class="footer">
      <div class="stats">
        <span class="stat followers">
          <span class="text">${this.getAttribute('date')}</span>
        </span>
        <span class="dot"></span>
        <span class="stat members">
          <span class="text">${this.getAttribute('read-time')}</span>
        </span>
      </div>
    </div>


    <div class="options-modal">
      <div class="options">
        <div class="more-options">
          <span class="pointer"></span>
          <span class="options-item">
            <i class="bi-person-plus"></i>
            <span class="option-details">
              <span class="detail-title">Follow</span>
              <span class="detail-text">Get to see ${this.getAttribute('author-name')}'s activity on your feeds</span>
            </span>
          </span>
          <span class="options-item">
            <i class="bi-send-plus"></i>
            <span class="option-details">
              <span class="detail-title">Email</span>
              <span class="detail-text">Inquire about ${this.getAttribute('author-name')}</span>
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
            <i class="bi-flag"></i>
            <div class="option-details">
              <span class="detail-title">Report</span>
              <span class="detail-text">A problem! report this story</span>
            </div>
          </span>
          <span class="options-item">
            <i class="bi-envelope-open-heart"></i>
            <span class="option-details">
              <span class="detail-title">Support author</span>
              <span class="detail-text">Donate to ${this.getAttribute('author-name')}</span>
            </span>
          </span>
        </div>
        <div class="popup">
        <span class="pointer"></span>
          <div class="header">
            <span>Share this story via</span>
          </div>
          <div class="content">
            <a href="https://www.facebook.com/sharer.php?u=https://getopas.pythonanywhere.com/@femar/positive-vibes-1-25?t='Even if you're passionate about your job, get energy
                      from the people you work with, and believe in your company's mission,
                                          you can experience a bad day. Maybe your morning sta…'" rel="noopener"
                    target="_blank">
              <i class="bi-facebook"></i>
              <span class="option-details">
                <span class="detail-title">Facebook</span>
                <span class="detail-text">Share to facebook post, and groups</span>
              </span>
            </a>
            <a href="https://twitter.com/intent/tweet?url=https://getopas.pythonanywhere.com/@femar/positive-vibes-1-25&amp;text=Even if you're passionate about your job, get energy
                                          from the people you work with, and believe in your company's mission, 
                                          you can experience a bad day. Maybe your morning sta…" rel="noopener"
                    target="_blank">
              <i class="bi-twitter"></i>
              <span class="option-details">
                <span class="detail-title">Twitter</span>
                <span class="detail-text">Create tweet, or send as a direct message</span>
              </span>
            </a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://getopas.pythonanywhere.com/@femar/positive-vibes-1-25&title=Positive vibes&summery=Even if you're passionate about your job, get energy
                                          from the people you work with, and believe in your company's mission, 
                                          you can experience a bad day. Maybe your morning sta…" rel="noopener"
                    target="_blank">
              <i class="bi-linkedin"></i>
              <span class="option-details">
                <span class="detail-title">Linkedin</span>
                <span class="detail-text">Share to linkedin posts or groups</span>
              </span>
            </a>
            <a href="https://api.whatsapp.com/send?text=https://getopas.pythonanywhere.com/@femar/positive-vibes-1-25"
                    data-action="share/whatsapp/share" target="_blank">
                <i class="bi-whatsapp"></i>
              <span class="option-details">
                <span class="detail-title">Whatsapp</span>
                <span class="detail-text">Share this story with your friends on whatsapp</span>
              </span>
            </a>
            <a href="https://t.me/share/url?url=https://getopas.pythonanywhere.com/@femar/positive-vibes-1-25&text=Even if you're passionate about your job, get energy
                                      from the people you work with, and believe in your company's mission,
                                      you can experience a bad day. Maybe your morning sta…" rel="noopener"
                    target="_blank">
              <i class="bi-telegram"></i>
              <span class="option-details">
                <span class="detail-title">Telegram</span>
                <span class="detail-text">Share this story with your friends on telegram</span>
              </span>
            </a>
            <p>Or copy link</p>
            <div class="field">
              <i class="bi-link-45deg"></i>
              <input type="text" readonly value="https://getopas.example.com/share-link/on">
              <button class="copy">Copy</button>
            </div>
          </div>
        </div>
        <div class="close-modal">
          <div class="close">
            <i class="bi-x"></i>
            <span class="close-text">Close</span>
          </div>
          <div class="share">
            <i class="bi-cursor"></i>
            <span class="close-text">Share</span>
          </div>
        </div>
      </div>
      <div class="modal-overlay"></div>
    </div>
    ${this.getStyles()}
  `;
  }

  getAuthor(type){
    if (type == "space") {
      return `
      <span class="author">${this.getAttribute('space')}</span>
      `
    } else {
      return `
      <span class="author">${this.getAttribute('author-name')}</span>
      `
    }
  }

  getProfile(type){
    if (type == "space") {
      return `
      <div class="space-info">
        <div class="space">
          <div class="info">
            <a href="${this.getAttribute('space-url')}" class="name">${this.getAttribute('space')}</a>
            <div class="author">
              <span class="by">by</span>
              <a href="" class="name">${this.getAttribute('author-name')}</a>
              <span class="dot"></span>
              <span class="time">${this.getAttribute('author-role')}</span>
            </div>
          </div>
        </div>
        <div class="actions">
          ${this.getSpaceConnection(this.getAttribute('connection'))}
          <span class="support">
            <i class="bi-envelope-paper"></i>
            <span class="text">Support</span>
          </span>
        </div>
      </div>
      `
    } else {
      return `
      <div class="profile">
        <div class="container">
          <div class="image">
            <img src="${this.getAttribute('author-profile')}" alt="Profile" srcset="">
          </div>
          <div class="info">
            <a href="${this.getAttribute('author-url')}" class="name">${this.getAttribute('author-name')}</a>
            <span class="info">${this.getAttribute('author-bio')}</span>
          </div>
        </div>
        <div class="actions">
          ${this.getFollow(this.getAttribute('connection'))}
          <span class="support">
            <i class="bi-envelope-paper"></i>
            <span class="text">Support</span>
          </span>
        </div>
      </div>
      `
    }
  }

  getSpaceConnection(conn){
    if (conn == "following") {
      return `
      <span class="following">
        <!--<i class="bi-dash"></i>-->
        <span class="text">Following</span>
      </span>
      `
    } else {
      return `
      <span class="follow">
        <i class="bi bi-plus"></i>
        <span class="text">Follow</span>
      </span>
      `
    }
  }


  getFollow(conn){
    if (conn == "following") {
      return `
      <span class="following">
        <i class="bi-person-check"></i>
        <span class="text">Following</span>
      </span>
      `
    } else {
      return `
      <span class="follow">
        <i class="bi-person-plus"></i>
        <span class="text">Follow</span>
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
          padding:  35px 3px 0 0;
          display: flex;
          flex-flow: column;
          height: max-content;
          gap: 10px;
        }
        * {
        box-sizing: border-box !important;
          font-family: 'Sen', sans-serif;
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
        .head-nav>.left>.name>span.users>span.by{
          color: var(--text-color);
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

        .space-info{
          display: flex;
          gap: 15px;
          flex-flow: column;
          font-size: 1rem;
        }
        .space{
          display: flex;
          gap: 8px;
          margin: 0 0 0 -1px;
          font-size: 1rem;
        }
        .space>.image{
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
        .space>.image>img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 100%;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          -ms-border-radius: 100%;
          -o-border-radius: 100%;
        }
        .space>.info{
          display: flex;
          flex-flow: column;
          gap: 0;
          justify-content: center;
        }
        .space>.info>a.name{
          text-decoration: none;
          color: var(--text-color);
          font-size: 1.5rem;
        }
        .space>.info>a.name:hover{
          text-decoration: underline;
        }
        .space>.info>.author{
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0 0 0 4px;
          font-size: 0.8rem;
          color: var(--text-color);
        }
        .space>.info>.author>a.name{
          text-decoration: none;
          color: var(--gray-two);
          font-size: 0.8rem;
        }
        .space>.info>.author>a.name:hover{
          text-decoration: underline;
        }
        .space>.info>.author>span.dot{
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
        .space>.info>.author>span.time{
          text-decoration: none;
          color: var(--gray-color);
          font-size: 0.8rem;
        }

        .profile{
          display: flex;
          align-items: start;
          flex-flow: column;
          justify-content: space-between;
          gap: 10px;
        }
        .profile>.container{
          display: flex;
          align-items: center;
          flex-flow: row;
          flex-wrap: nowrap;
          gap: 10px;
        }
        .profile>.container>.image{
          align-self: start;
          width: 38px;
          height: 38px;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .profile>.container>.image>img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .profile>.container>.info{
          align-self: flex-start;
          text-decoration: none;
          display: flex;
          flex-flow: column;
          align-items: flex-start;
          gap: 1px;
          color: var(--text-color);
        }
        .profile>.container>.info>.name{
          font-size: 1.1rem;
          text-decoration: none;
          color: var(--text-color);
          padding: 0%;
          margin: 0%;
        }
        .profile>.container>.info>.name:hover{
          text-decoration: underline;
        }
        .profile>.container>.info>.info{
          font-size: 0.8rem;
          color: var(--gray-color);
          display: flex;
          flex-wrap: nowrap;
          gap: 15px;
          align-items: center;
        }
        .actions {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 25px;
        }
        .actions>.support {
          border: var(--border);
          font-size: 0.9rem;
          color: var(--gray-two);
          text-decoration: none;
          height: max-content;
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          padding: 3px 12px 4px 12px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }

        .actions>.support:hover{
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

        .actions > .follow {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          padding: 4px 15px 4px 12px;
          background: var(--button-background-two);
          color: var(--button-text-one);
          background-color: var(--main-color);
          background-size: 500% 500%;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }

        .actions > .following {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          padding: 3px 12px 4px 12px;
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
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }

        .footer{
          display: flex;
          flex-flow: column;
          gap: 10px;
          margin: 10px 0 0 0;
        }
        .footer>.stats {
          font-size: 0.93rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--gray-two);
        }
        .footer>.stats>.stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .footer>.stats>.stat>span.no {
          font-size: 0.90rem;
        }
        .footer>.stats>span.dot {
          display: inline-block;
          margin-top: 1px;
          width: 5px;
          height: 5px;
          background-color: var(--dot-color);
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
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
        }

        .options-modal>.modal-overlay{
          position: absolute;
          right: 0;
          top: 0;
          left: 0;
          bottom: 0;
          background-color: var(--modal-background);
        }
        .options-modal>.options{
          position: absolute;
          bottom: 0px;
          right: 0px;
          left: 0px;
          top: unset;
          padding: 0 0 70px 0;
          z-index: 12;
          display: flex;
          flex-flow: column;
          align-items: center;
          gap: 0px;
          background-color: var(--modal);
          border-top-right-radius: 15px;
          border-top-left-radius: 15px;
        }
        .options-modal>.options>.popup,
        .options-modal>.options>.more-options{
          display: flex;
          flex-flow: column;
          align-items: center;
          width: 100%;
          min-width: 100%;
        }
        .options-modal>.options>.popup{
          display: none;
        }
        .options-modal>.options>.popup>.content{
          display: flex;
          flex-flow: column;
          width: 90%;
        }
        .options-modal>.options>.popup>span.pointer,
        .options-modal>.options>.more-options>span.pointer{
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
        .options-modal>.options>.popup>.header{
          color: var(--text-color);
          padding: 10px 0;
        }
        .options-modal>.options>.popup>.header>span{
          font-size: 1.2rem;
        }
        .options-modal>.options>.popup>.content>a,
        .options-modal>.options>.more-options>.options-item{
          width: 90%;
          display: flex;
          padding: 15px 5px;
          align-items: center;
          text-decoration: none;
          gap: 15px;
          color: var(--gray-color);
        }
        .options-modal>.options>.more-options>.leave{
          color: var(--expand-color);
        }
        .options-modal>.options>.popup>.content>a:first-of-type,
        .options-modal>.options>.more-options>.options-item:first-of-type{
          padding-top: 7px;
        }
        .options-modal>.options>.popup>.content>a:last-of-type,
        .options-modal>.options>.more-options>.options-item:last-of-type{
          padding-bottom: 15px;
          border-bottom: var(--border);
        }
        .options-modal>.options>.popup>.content>a>.option-details,
        .options-modal>.options>.more-options>.options-item>.option-details{
          display: flex;
          flex-flow: column;
        }
        .options-modal>.options>.popup>.content>a>i,
        .options-modal>.options>.more-options>.options-item>i{
          color: inherit;
          font-size: 1.4rem;
          color: var(--text-color);
          align-self: start;
          margin-top: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .options-modal>.options>.more-options>.leave>i{
          color: var(--expand-color);
          rotate: 90deg;
        }
        .options-modal>.options>.more-options>.options-item:first-of-type>i{
          font-size: 1.5rem;
        }
        .options-modal>.options>.popup>.content>a>.option-details>.detail-title,
        .options-modal>.options>.more-options>.options-item>.option-details>.detail-title{
          font-size: 1rem;
          color: inherit;
          color: var(--text-color);
        }
        .options-modal>.options>.more-options>.leave>.option-details>.detail-title{
          color: var(--expand-color);
        }
        .options-modal>.options>.more-options>.options-item>.option-details>.detail-title::first-letter{
          text-transform: capitalize;
        }
        .options-modal>.options>.popup>.content>a>.option-details>.detail-text,
        .options-modal>.options>.more-options>.options-item>.option-details>.detail-text{
          font-size: 0.8rem;
          color: inherit;
        }
        .options-modal>.options>.popup>.content>p{
          margin: 5px 0 2px 5px;
          color: var(--main-color);
        }
        .popup .content .field {
          margin: 8px 0 10px 0;
          height: max-content;
          border-radius: 50px;
          padding: 2px 5px;
          border: var(--border);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup .field i {
          color: var(--gray-color);
          width: 25px;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup .field.active i {
          color: var(--main-color);
        }
        .popup .field input {
          color: var(--gray-color);
          width: 100%;
          height: max-content;
          border: none;
          outline: none;
          font-size: 1rem;
          padding: 3px 10px 3px 0px;
          background: transparent;
        }
        .popup .field button {
          position: absolute;
          right: 5px;
          top: 3px;
          bottom: 3px;
          color: var(--white);
          border: none;
          font-size: 0.9rem;
          border-radius: 50px;
          display: inline-block;
          margin-right: 5px;
          padding: 2px 10px;
          text-align: center;
          background: var(--main-color);
        }
        .options-modal>.options>.close-modal{
          position: absolute;
          bottom: 15px;
          right: 5%;
          left: 5%;
          top: unset;
          margin: 0;
          width: 90%;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
        }
        .options-modal>.options>.close-modal>div{
          background-color: var(--modal-close);
          color: var(--text-color);
          padding: 7px 10px;
          margin: 0;
          width: 40%;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 1.18rem;
          font-weight: 700;
          border-radius: 50px;
        }
        .options-modal>.options>.close-modal>div.share{
          background-color: var(--accent-color);
          color: var(--white);
          gap: 8px;
        }
        .options-modal>.options>.close-modal>div.return{
          color: var(--text-color);
          background-color: var(--modal-close);
        }
        .options-modal>.options>.close-modal>div>i{
          margin: 3px 0 0 0;
          font-size: 1.2rem;
        }
        .options-modal>.options>.close-modal>div i{
          margin-top: 2px;
        }
        @media screen and ( max-width:500px ){
          :host {
            box-sizing: border-box !important;
            padding:  30px 3px 0 0;
            display: flex;
            flex-flow: column;
            height: max-content;
            gap: 10px;
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
          .actions>.support {
            border: var(--mobile-border);
          }
          .popup .content .field {
            border: var(--mobile-border);
          }
        }
      </style>
    `;
  }
}