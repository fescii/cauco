import PostPhotos from './component.photos.js';
export default class PostWrapper extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets get the url from attribute
    this.url = this.getAttribute('url');

    // default for longer posts
    this.expand = true;

    // checks if the post is longer
    this.expands = this.getAttribute('expands');

    // checks if user likes the post
    this.action = this.getAttribute('action');

    //For-Images
    this.totalImages = parseInt(this.getAttribute('image-count'))
    this.images = this.getAttribute('images')


    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});

    this.registerOtherComponents();
    this.render();
  }
  registerOtherComponents() {
    if (typeof customElements.get('photos-container') === 'undefined') {
      customElements.define('photos-container', PostPhotos);
      // console.log("Component Registered");
    }
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    let item  = this.shadowObj.querySelector('.head-options>.more>.desktop');
    let itemMobile  = this.shadowObj.querySelector('.head-options>.more>.mobile');
    let expandButton = this.shadowObj.querySelector(".content>.footer>span.expand");

    //Share
    let share  = this.shadowObj.querySelector('.content>.footer>.actions>.actions-info>.actions-container>span.add');
    share.querySelector('span.desktop').addEventListener('click', (e) => {
      this.handleShare(share,'none');
      // console.log(item)
    });
    share.querySelector('span.mobile').addEventListener('click', (e) => {
      this.handleShare(share,'mobile');
      // console.log(item)
    });

    if (this.expands == 'true'){
      expandButton.addEventListener('click', (e) => {
        this.handleExpand(expandButton);
      });
    }

    item.addEventListener('click', (e) => {
      this.handleOptions(item);
      // console.log(item)
    });

    itemMobile.addEventListener('click', (e) => {
      this.handleOptionsMobile();
      // console.log(item)
    })

    if (this.getAttribute('full') == 'true') {
      this.shadowObj.querySelector('.actions-container>span.comment')
      .addEventListener('click', (e) => {
        this.openResponse();
      });
    }

    //Images
    let images = this.shadowObj.querySelectorAll(".content>.footer>.images>.image");
    images.forEach(image => {
      image.addEventListener('click', (e) => {
        this.openPhotos();
      });
    });

    let more = this.shadowObj.querySelector(".content>.footer>.images>.more");
    // console.log(more)
    if (more != null) {
      more.addEventListener('click', (e) => {this.openPhotos() });
    }

  }

  disconnectedCallback() {
    console.log('We are inside disconnectedCallback');
    // adding event handler to the button
    let item  = this.shadowObj.querySelector('.head-options>.more>.desktop');
    let itemMobile  = this.shadowObj.querySelector('.head-options>.more>.mobile');
    let expandButton = this.shadowObj.querySelector(".content>.footer>span.expand");

    if (this.expands == 'true'){
      expandButton.removeEventListener('click',this.handleExpand(expandButton));
    }

    item.removeEventListener('click',this.handleOptions(item));

    itemMobile.removeEventListener('click',this.handleOptionsMobile());

    //Images
    let images = this.shadowObj.querySelectorAll(".content>.footer>.images>.image");
    images.forEach(image => {
      image.removeEventListener('click', (e) => {this.openPhotos() });
    });

    let more = this.shadowObj.querySelector(".content>.footer>.images>.more");
    // console.log(more)
    if (more != null) {
      more.removeEventListener('click', (e) => {this.openPhotos() });
    }
  }

  handleOptions(item) {
    // updating the state
    let parent  = this.shadowObj.querySelector('.head-options>.more');
    let optionsModal  = parent.querySelector('.options-cover');
    let options  = optionsModal.querySelector('.options');
    let pointer = options.querySelector("span.pointer")
    let top = options.querySelector("span.option")

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
      if (this.getAttribute("full") == "true") {
        let parent  = document.querySelector('main.post > section.post > div.respond-placeholder');
        parent.textContent = ''
        parent.style.setProperty("display","none")
      }
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

  handleShare(share,type) {
    // updating the state
    let optionsModal  = share.querySelector('.popup');
    const close = optionsModal.querySelector(".popup-content .close");
    const closeModal = optionsModal.querySelector(".popup-content>.close-modal");
    const overlay = optionsModal.querySelector(".modal-overlay");

    let field = optionsModal.querySelector(".field"),
    input = field.querySelector("input"),
    copy = field.querySelector("button.copy");

    if (optionsModal.style.display == "flex"){
      // console.log(options)
      share.classList.remove("active")
      optionsModal.style.display = "none"
    }
    else {
      share.classList.add("active")
      if (this.getAttribute("full") == "true") {
        let parent  = document.querySelector('main.post > section.post > div.respond-placeholder');
        parent.textContent = ''
        parent.style.setProperty("display","none")
      }
      optionsModal.style.display = "flex"
      if (type == "mobile") {
        this.disableScroll()
      }
    }

    copy.addEventListener('click', (e) => {
      e.stopPropagation()
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
    });

    close.addEventListener("click", () => {
      optionsModal.style.setProperty('display', 'none')
      share.classList.remove("active")
    },{once:true})

    closeModal.addEventListener("click", () => {
      optionsModal.style.setProperty('display', 'none')
      share.classList.remove("active")
        this.enableScroll()
    },{once:true})

    overlay.addEventListener("click", () => {
      optionsModal.style.setProperty('display', 'none')
      share.classList.remove("active")
      this.enableScroll()
    },{once:true})

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

  openResponse() {
    // updating the state
    let parent  = document.querySelector('main.post > section.post > div.respond-placeholder');
    parent.style.setProperty("display","flex")

    // response.remove()
    parent.innerHTML  = `
      <respond-container
        name="Responding to fredrick's post"
        type="response">
      </respond-container>`;
  }

  openPhotos() {
    // updating the state
    // let parent  = this.shadowObj.querySelector('div#post-photos');
    let parent  = document.querySelector('body');
    let html  = '<photos-container id="40"></photos-container>'


    // response.remove()
    // parent.appendChild(`<post-photos id="40"></post-photos>`)
    parent.insertAdjacentHTML('beforeEnd', html);
    // parent.innerHTML = `<post-photos id="40"></post-photos>`
  }

  handleExpand(expandButton) {
    // updating the state
    let contentContainer  = this.shadowObj.querySelector('.content>.text');
    let arrow = expandButton.querySelector("i")
    let expandText = expandButton.querySelector("span.text")

    if (this.expand){
      // Expanding the text container to show all contents
      contentContainer.style.setProperty("max-height","max-content")

      // updating the position of the Button
      expandButton.style.setProperty("position","static")
      expandButton.style.setProperty("height","max-content")
      expandButton.style.setProperty("align-items","center")
      expandButton.style.setProperty("padding","0 0 5px 0")

      // updating the Button text
      expandText.textContent = "See less"

      // updating the Button arrow pointer
      arrow.classList.remove("bi-arrow-down-short")
      arrow.classList.add("bi-arrow-up-short")

      // updating the Expand variable
      this.expand = false;
      // console.log(this.expand)
    }
    else {
      // Minimizing the text container to hide some contents
      contentContainer.style.setProperty("max-height","150px")

      // updating the position of the Button
      expandButton.style.setProperty("position","absolute")
      expandButton.style.setProperty("height","45px")
      expandButton.style.setProperty("align-items","end")
      expandButton.style.setProperty("padding","10px 0 2px 0")

      // updating the Button text
      expandText.textContent = "See more"

      arrow.classList.remove("bi-arrow-up-short")
      arrow.classList.add("bi-arrow-down-short")

      // updating the Expand variable
      this.expand = true;
      // console.log(this.expand)
    }
  }

  getTemplate() {
    // Show HTML Here
    return `
    ${this.getPostHeader()}
    <div class="content">
      <div class="text ${this.getAttribute('expands')}">
        ${this.getContent()}
      </div>
      <div class="footer">
        ${this.getExpand()}
        ${this.getImages()}
        <div class="actions">
          <div class="actions-info">
            <div class="actions-container">
             ${this.getComment()}
              <span class="like">
              <input type="checkbox" class="checkbox" id="checkbox" />
                  <label for="checkbox">
                    <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                      <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
                        <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" stroke="#808080" stroke-width="2.5" fill="none"/>
                        <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>
                        <g id="grp7" opacity="0" transform="translate(7 6)">
                          <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
                          <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
                        </g>
                        <g id="grp6" opacity="0" transform="translate(0 28)">
                          <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
                          <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
                        </g>
                        <g id="grp3" opacity="0" transform="translate(52 28)">
                          <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
                          <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
                        </g>
                        <g id="grp2" opacity="0" transform="translate(44 6)">
                          <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
                          <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
                        </g>
                        <g id="grp5" opacity="0" transform="translate(14 50)">
                          <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
                          <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
                        </g>
                        <g id="grp4" opacity="0" transform="translate(35 50)">
                          <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
                          <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
                        </g>
                        <g id="grp1" opacity="0" transform="translate(24)">
                          <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                          <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
                        </g>
                      </g>
                    </svg>
                    <span class="no">${this.getAttribute('post-likes')}</span>
                  </label>
              </span>
              <span class="add">
                <span class="desktop">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="var(--gray-color)" class="w-5 h-5">
                    <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                </span>
                <span class="mobile">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="var(--gray-color)" class="w-5 h-5">
                    <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                </span>
                ${this.getShare()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="options-modal">
      <div class="more-options">
        <span class="pointer"></span>
        <span class="options-item">
          <i class="bi-person-plus-fill-fill-fill-fill"></i>
          <span class="option-details">
            <span class="detail-title">Follow</span>
            <span class="detail-text">Follow the author of this post</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-clipboard"></i>
          <span class="option-details">
            <span class="detail-title">Copy link</span>
            <span class="detail-text">Copy link to this post</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-bookmark"></i>
          <span class="option-details">
            <span class="detail-title">Add to list</span>
            <span class="detail-text">Add this post to your lists</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-view-list"></i>
          <span class="option-details">
            <span class="detail-title">view post</span>
            <span class="detail-text">See comments, likes, and author info</span>
          </span>
        </span>
        <span class="options-item">
          <i class="bi-flag"></i>
          <div class="option-details">
            <span class="detail-title">Report</span>
            <span class="detail-text">A problem! report this post</span>
          </div>
        </span>
        <div class="close-modal">
          <i class="bi-x"></i>
          <span class="close-text">Close</span>
        </div>
      </div>
      <div class="modal-overlay"></div>
    </div>
    <div id="post-photos"></div>
    ${this.getStyles()}
  `;
  }

  getContent(){
    return this.innerHTML
  }

  getExpand(){
    if (this.expands == 'true') {
      return `
        <span class="expand">
          <span class="text">See more</span>
          <i class="bi-arrow-down-short"></i>
        </span>
      `
    } else {
      return ` `
    }
  }

  getComment(){
    if (this.getAttribute('full') == 'true') {
      return `
      <span class="comment">
        <i class="bi-chat"></i>
        <span class="no">Add Response</span>
      </span>
      `
    } else {
      return `
      <a href="" class="comment">
        <i class="bi-chat"></i>
        <span class="no">${this.getAttribute('post-comments')}</span>
      </a>
      `
    }
  }

  getLikeIcon(){
    if (this.getAttribute('action') == 'liked') {
      return `<i class="bi-heart-fill"></i>`
    } else {
      return `<i class="bi-heart"></i> `
    }

  }

  getShare(){
    return `
    <div class="popup">
      <div class="popup-content">
        <span class="pointer"></span>
        <div class="header">
          <span>Share this post via</span>
          <div class="close"><i class="bi-x"></i></div>
        </div>
        <div class="content">
          <ul class="icons">
            <a href="https://getopas.example.com/${this.getAttribute('url')}?t='Even if you're passionate about your job, get energy
                                          from the people you work with, and believe in your company's mission,
                                          you can experience a bad day. Maybe your morning sta…'" rel="noopener"
                    target="_blank">
              <i class="bi-facebook"></i>
              <span class="option-details">
                <span class="detail-title">Facebook</span>
                <span class="detail-text">Share to facebook post, and groups</span>
              </span>
            </a>
            <a href="https://getopas.example.com/${this.getAttribute('url')}&amp;text=Even if you're passionate about your job, get energy
                                          from the people you work with, and believe in your company's mission, 
                                          you can experience a bad day. Maybe your morning sta…" rel="noopener"
                    target="_blank">
              <i class="bi-twitter"></i>
              <span class="option-details">
                <span class="detail-title">Twitter</span>
                <span class="detail-text">Create tweet, or send as message</span>
              </span>
            </a>
            <a href="https://getopas.example.com/${this.getAttribute('url')}&title=Positive vibes&summery=Even if you're passionate about your job, get energy
                                          from the people you work with, and believe in your company's mission, 
                                          you can experience a bad day. Maybe your morning sta…" rel="noopener"
                    target="_blank">
              <i class="bi-linkedin"></i>
              <span class="option-details">
                <span class="detail-title">Linkedin</span>
                <span class="detail-text">Share to linkedin posts or groups</span>
              </span>
            </a>
            <a href="https://api.whatsapp.com/send?text=${this.getAttribute('url')}"
                      data-action="share/whatsapp/share" target="_blank">
              <i class="bi-whatsapp"></i>
              <span class="option-details">
                <span class="detail-title">Whatsapp</span>
                <span class="detail-text">Share with your friends on whatsapp</span>
              </span>
            </a>
            <a href="https://getopas.example.com/${this.getAttribute('url')}&text=Even if you're passionate about your job, get energy
                                      from the people you work with, and believe in your company's mission,
                                      you can experience a bad day. Maybe your morning sta…" rel="noopener"
                    target="_blank">
              <i class="bi-telegram"></i>
              <span class="option-details">
                <span class="detail-title">Telegram</span>
                <span class="detail-text">Share with your friends on telegram</span>
              </span>
            </a>
          </ul>
          <p>Or copy link</p>
          <div class="field">
            <i class="bi-link-45deg"></i>
            <input type="text" readonly value="https://getopas.example.com/${this.getAttribute('url')}">
            <button class="copy">Copy</button>
          </div>
        </div>
        <div class="close-modal">
          <i class="bi-x"></i>
          <span class="close-text">Close</span>
        </div>
      </div>
      <div class="modal-overlay"></div>
    </div>
    `
  }

  getPostHeader(){
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
        <div class="more">
          <div class="desktop dots">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="mobile dots">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="options-cover">
            <div class="options">
              <span class="pointer"></span>
              <span class="option">
                <i class="bi-person-plus-fill-fill-fill-fill"></i>
                <span class="text">Follow</span>
              </span>
              <span class="option">
                <i class="bi-bookmark-plus"></i>
                <span class="text">Add to list</span>
              </span>
              <span class="option">
                <i class="bi-flag"></i>
                <span class="text">Report post</span>
              </span>
              <span class="option delete">
                <i class="bi-trash2"></i>
                <span class="text">Delete post</span>
              </span>
            </div>
          </div>
        </div>
      </div>`
    }
    else {
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
        <div class="more">
          <div class="desktop dots">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="mobile dots">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="options-cover">
            <div class="options">
              <span class="pointer"></span>
              <p class="actions">Post actions</p>
              <span class="option">
                <i class="bi-person-plus-fill-fill-fill-fill"></i>
                <span class="text">Follow</span>
              </span>
              <span class="option">
                <i class="bi-bookmark-plus"></i>
                <span class="text">Add to list</span>
              </span>
              <span class="option">
                <i class="bi-flag"></i>
                <span class="text">Report post</span>
              </span>
              <span class="option delete">
                <i class="bi-trash2"></i>
                <span class="text">Delete story</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `
    }

  }

  getImages(){
    if (this.totalImages > 0  && this.totalImages <= 3) {
      let postImages = this.images.split(",")
      let html = ""
      for (let i = 0; i < postImages.length; i++) {
        html +=`
        <div class="image">
          <img src="${postImages[i]}" alt="Post-Image" srcset="">
        </div>
        `
      }
      return `
      <div class="images">
        ${html}
      </div>
      `
    }
    else if(this.totalImages > 3){
      let postImages = this.images.split(",");

      return `
      <div class="images">
        <div class="image">
          <img src="${postImages[0]}" alt="Post-Image" srcset="">
        </div>
        <div class="image">
          <img src="${postImages[1]}" alt="Post-Image" srcset="">
        </div>
        <div class="image">
          <img src="${postImages[2]}" alt="Post-Image" srcset="">
        </div>
        <div class="more">
          +${postImages.length - 3} more
        </div>
      </div>
    `
    }
    else {
      return ` `
    }

  }

  getStyles() {
    return `
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          border-bottom: var( --border);
          padding: 15px 2px 0px 2px;
          display: flex;
          flex-flow: column;
          gap: 5px;
        }
        * {
        box-sizing: border-box !important;
          font-family: 'Sen', sans-serif;
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
          color:  var(--title-color);
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
          color: var( --text-color);
        }
        .space>.left>.info>.author>a.name{
          text-decoration: none;
          color: var( --gray-color);
          font-size: 0.8rem;
        }
        .space>.left>.info>.author>a.name:hover{
          text-decoration: underline;
        }
        .space>.left>.info>.author>span.dot{
          display: inline-block;
          margin-top: 2px;
          width: 4px;
          height: 4px;
          background-color: var( --dot-color);
          border-radius: 5px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -ms-border-radius: 5px;
          -o-border-radius: 5px;
        }
        .space>.left>.info>.author>span.time{
          text-decoration: none;
          color: var( --gray-color);
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
          color:  var(--title-color);
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
          color:  var(--main-color);
        }
        .head>.user>.info>.other{
          display: flex;
          flex-flow: row;
          align-items: center;
          gap: 0px;
          color: var( --gray-color);
        }
        .head>.user>.info>.other>.time{
          font-size: 0.8rem;
        }
        .space>.more,
        .head>.more {
          position: relative;
          margin: 0;
          padding: 0;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
        }
        .space>.more>.dots,
        .head>.more>.dots {
          text-decoration: none;
          cursor: pointer;
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
        .space>.more>.mobile,
        .head>.more>.mobile{
          display: none;
        }
        .space>.more>.dots:hover,
        .head>.more>.dots:hover {
          background-color: var(--back-one-color);
        }
        .space>.more>.active,
        .head>.more>.active{
          background-color: var(--back-one-color);
          color: var( --main-color);
        }
        .space>.more>.active:hover,
        .head>.more>.active:hover {
          background-color: var(--back-one-color);
        }
        .space>.more>.dots>span.dot,
        .head>.more>.dots>span.dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          background-color: var( --dot-color);
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .space>.more>.active>span.dot,
        .head>.more>.active>span.dot {
          background-color:  var( --main-color);
        }
        .space>.more>.options-cover,
        .head>.more>.options-cover{
          position: absolute;
          background-color: var( --theme);
          border: var(  --border);
          box-shadow: var(  --box-shadow);
          right: -10px;
          top: 28px;
          left: unset;
          bottom: unset;
          padding: 0;
          display: none;
          z-index: 3;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .space>.more>.options-cover>.options,
        .head>.more>.options-cover>.options {
          display: flex;
          flex-flow: column;
          gap: 0px;
        }
        .space>.more>.options-cover>.options>span.pointer,
        .head>.more>.options-cover>.options>span.pointer {
          border: var( --border);
          background-color: var( --theme);
          display: inline-block;
          width: 8px;
          height: 8px;
          position: absolute;
          top: -5px;
          right: 18px;
          rotate: 45deg;
          border-bottom: none;
          border-right: none;
        }
        .space>.more>.options-cover>.options>p.actions,
        .head>.more>.options-cover>.options>p.actions{
          color: var( --text-color);
          text-align: center;
          width: 100%;
          margin: 0;
          padding: 5px 0;
          display: none;
        }
        .space>.more>.options-cover>.options>.option,
        .head>.more>.options-cover>.options>.option {
          display: flex;
          padding: 8px 12px;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          min-width: max-content;
          width: 100%;
          gap: 8px;
          color: var( --gray-color);
          cursor: pointer;
          font-size: 0.85rem;
        }
        .space>.more>.options-cover>.options>.option>i,
        .head>.more>.options-cover>.options>.option>i {
          font-size: 0.9rem;
        }
        .space>.more>.options-cover>.options>.option:hover,
        .head>.more>.options-cover>.options>.option:hover {
          background-color: var(--modal-hover-background);
          color: var( --text-color);
          text-decoration: underline;
        }
        .space>.more>.options-cover>.options>.delete:hover,
        .head>.more>.options-cover>.options>.delete:hover {
          color: var(--red-color);
          text-decoration: underline;
        }
        .space>.more>.options-cover>.options>span.option:nth-of-type(2),
        .head>.more>.options-cover>.options>span.option:nth-of-type(2) {
            /*border-top-left-radius: 10px;*/
            border-top-right-radius: 10px;
        }
        .space>.more>.options-cover>.options .option:last-child,
        .head>.more>.options-cover>.options .option:last-child {
          padding: 5px 10px 8px 10px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .content{
          display: flex;
          flex-flow: column;
          gap: 0px;
        }
        .content>.false{
          display: flex;
          flex-flow: column;
          gap: 3px;
          height: max-content;
          padding-bottom: 5px;
          max-height: max-content;
        }
        .content>.true{
          display: flex;
          flex-flow: column;
          gap: 3px;
          max-height: 150px;
          min-height: max-content;
          overflow: hidden;
        }
        .content>.text *{
          line-height: 1.4;
          font-size: 1rem;
        }
        .content>.text h1,
        .content>.text h2,
        .content>.text h3,
        .content>.text h4,
        .content>.text h5,
        .content>.text h6{
          color: var(--title-color);
          margin: 0 0 0px 0;
          padding: 0;
        }
        .content>.text ul,
        .content>.text ol{
          padding-left: 20px;
          margin-bottom: 6px;
          margin-top: 0px;
          color: var(--text-color);
        }

        .content>.text a{
          text-decoration: none;
          color: var(--link-color);
          padding: 0 3px 0 3px;
        }

        .content>.text p{
          margin: 0 0 6px 0;
          padding: 0;
          line-height: 1.3;
          color: var(--text-color);
          font-size: 0.95rem;
        }

        .content>.footer{
            /*background: var(--post-linear-gradient);*/
            background: var(--theme);
            position: relative;
            padding: 0px;
            display: flex;
            flex-flow: column;
            height: max-content;
            gap: 0px;
        }
        .content>.footer>span.expand{
            background: var(--post-linear-gradient);
            padding: 15px 0px 8px 0px;
            display: flex;
            align-items: end;
            justify-content: center;
            gap: 0px;
            font-size: 0.95rem;
            /*font-weight:501;*/
            color: var(--expand-color);
            position: absolute;
            left: 0;
            right: 0;
            top: -45px;
            height: 45px;
            cursor: pointer;
        }
        .content>.footer>span.expand>i{
          display: inline-block;
          display: flex;
          /* font-size: 0.75rem;*/
          margin: 0;
        }
        .content>.footer>span.expand>i.bi-arrow-up-short{
          display: flex;
          margin-top: 3px;
        }
        .content>.footer>.images{
            padding: 10px 0 5px 0;
            background-color: transparent;
            margin: 0;
            display: flex;
            flex-flow: row;
            align-items: center;
            gap: 15px;
        }
        .content>.footer>.images>.image{
            min-width: 48px;
            min-height: 38px;
            width: 48px;
            height: 38px;
            cursor: pointer;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
        }
        .content>.footer>.images>.more{
            border: var( --dashed);
            color: var( --gray-color);
            width: max-content;
            padding: 0 10px;
            height: 28px;
            display: flex;
            /* flex-flow: column; */
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
        }
        .content>.footer>.images>.more:hover{
            color: var( --main-color);
        }
        .content>.footer>.images>.image>img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
        }
        .content>.footer>.actions{
            /*border-top: var( --dashed);*/
            padding: 0px 0 12px 0;
            display: flex;
            flex-flow: column;
            gap: 5px;
        }
        .content>.footer>.actions>span.likes{
            color: var( --gray-color);
            font-size: 0.9rem;
            display: none;
        }
        .content>.footer>.actions>.actions-info{
            /* border: 1px solid #284adf; */
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: space-between;
            gap: 3px;
        }
        .content>.footer>.actions>.actions-info{
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
        .content>.footer>.actions>.actions-info>.actions-container{
          padding: 5px 0 2px 0;
          display: flex;
          flex-flow: row;
          align-items: center;
          gap: 35px;
          color: var( --gray-color);
        }
        .actions-container>a,
        .actions-container>span{
          padding: 5px 10px 5px 5px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          height: 33px;
          gap: 7px;
          font-size: 1rem;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          border-bottom-left-radius: 50px;
          cursor: pointer;
        }
        .actions-container>a>i{
          font-size: 1rem;
        }
        .actions-container>a.comment{
          text-decoration:none;
          color: var(--gray-color);
        }
        .actions-container>a.comment:hover,
        .actions-container>span.comment:hover{
          color: var( --accent-color);
        }
        .actions-container>span.like {
          position: relative;
          padding: 5px 10px;
          margin: 0 0 0 15px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .actions-container>span.like:hover{
          color:var(--red-color);
        }
        .actions-container>span.like:hover *{
          stroke: var(--red-color);
        }
        .actions-container>span.like>label>span{
          padding: 0px 5px;
          cursor: pointer;
        }
        .actions-container>span.like  svg {
          position: absolute;
          left: -19px;
          top: 3px;
          cursor: pointer;
          overflow: visible;
          width: 27px;
          margin: 0px;
          padding: 0px;
          border-radius: 50px;
        }
        .actions-container>span.like  svg #heart {
          padding: 0px;
          transform-origin: center;
          animation: animateHeartOut .3s linear forwards;
        }
        .actions-container>span.like  svg #main-circ {
          transform-origin: 29.5px 29.5px;
        }
        .checkbox {
          display: none;
          flex-flow: row;
          align-items: center;
          gap: 3px;
        }
        .checkbox:checked+label>span{
          color:var(--red-color);
        }
        .checkbox:checked+label svg #heart{
          transform: scale(0.2);
          fill: var(--red-color);
          width: 30px;
          stroke: none;
          animation: animateHeart .3s linear forwards .25s;
        }

        .checkbox:checked+label svg #main-circ {
          transition: all 2s;
          animation: animateCircle .3s linear forwards;
          opacity: 1;
          stroke: none;
        }
        .checkbox:checked+label svg #grp1 {
          opacity: 1;
          transition: .1s all .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp1 #oval1 {
          transform: scale(0) translate(0, -30px);
          transform-origin: 0 0 0;
          transition: .5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp1 #oval2 {
          transform: scale(0) translate(10px, -50px);
          transform-origin: 0 0 0;
          transition: 1.5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp2 {
          opacity: 1;
          transition: .1s all .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp2 #oval1 {
          transform: scale(0) translate(30px, -15px);
          transform-origin: 0 0 0;
          transition: .5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp2 #oval2 {
          transform: scale(0) translate(60px, -15px);
          transform-origin: 0 0 0;
          transition: 1.5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp3 {
          opacity: 1;
          transition: .1s all .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp3 #oval1 {
          transform: scale(0) translate(30px, 0px);
          transform-origin: 0 0 0;
          transition: .5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp3 #oval2 {
          transform: scale(0) translate(60px, 10px);
          transform-origin: 0 0 0;
          transition: 1.5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp4 {
          opacity: 1;
          transition: .1s all .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp4 #oval1 {
          transform: scale(0) translate(30px, 15px);
          transform-origin: 0 0 0;
          transition: .5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp4 #oval2 {
          transform: scale(0) translate(40px, 50px);
          transform-origin: 0 0 0;
          transition: 1.5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp5 {
          opacity: 1;
          transition: .1s all .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp5 #oval1 {
          transform: scale(0) translate(-10px, 20px);
          transform-origin: 0 0 0;
          transition: .5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp5 #oval2 {
          transform: scale(0) translate(-60px, 30px);
          transform-origin: 0 0 0;
          transition: 1.5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp6 {
          opacity: 1;
          transition: .1s all .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp6 #oval1 {
          transform: scale(0) translate(-30px, 0px);
          transform-origin: 0 0 0;
          transition: .5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp6 #oval2 {
          transform: scale(0) translate(-60px, -5px);
          transform-origin: 0 0 0;
          transition: 1.5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp7 {
          opacity: 1;
          transition: .1s all .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp7 #oval1 {
          transform: scale(0) translate(-30px, -15px);
          transform-origin: 0 0 0;
          transition: .5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp7 #oval2 {
          transform: scale(0) translate(-55px, -30px);
          transform-origin: 0 0 0;
          transition: 1.5s transform .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp2 {
          opacity: 1;
          transition: .1s opacity .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp3 {
          opacity: 1;
          transition: .1s opacity .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp4 {
          opacity: 1;
          transition: .1s opacity .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp5 {
          opacity: 1;
          transition: .1s opacity .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp6 {
          opacity: 1;
          transition: .1s opacity .3s;
          stroke: none;
        }
        .checkbox:checked+label svg #grp7 {
          opacity: 1;
          transition: .1s opacity .3s;
          stroke: none;
        }
        @keyframes animateCircle {
          40% {
            transform: scale(10);
            opacity: 1;
            fill: #DD4688;
          }
          55% {
            transform: scale(11);
            opacity: 1;
            fill: #D46ABF;
          }
          65% {
            transform: scale(12);
            opacity: 1;
            fill: #CC8EF5;
          }
          75% {
            transform: scale(13);
            opacity: 1;
            fill: transparent;
            stroke: #CC8EF5;
            stroke-width: .5;
          }
          85% {
            transform: scale(17);
            opacity: 1;
            fill: transparent;
            stroke: #CC8EF5;
            stroke-width: .2;
          }
          95% {
            transform: scale(18);
            opacity: 1;
            fill: transparent;
            stroke: #CC8EF5;
            stroke-width: .1;
          }
          100% {
            transform: scale(19);
            opacity: 1;
            fill: transparent;
            stroke: #CC8EF5;
            stroke-width: 0;
          }
        }

        @keyframes animateHeart {
          0% {
            transform: scale(0.2);
          }
          40% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes animateHeartOut {
          0% {
            transform: scale(0.8);
          }
          100% {
            transform: scale(1);
          }
        }
        .content>.footer>.actions>.actions-info>.actions-container>span.liked{
          color:var(--red-color);
        }
        .content>.footer>.actions>.actions-info>.actions-container>span.like{
          padding: 5px 2px;
        }
        .content>.footer>.actions>.actions-info>.actions-container>span>i{
          font-size: 1.2rem;
        }
        .content>.footer>.actions>.actions-info>.actions-container>span.add>span>svg{
          width: 16px;
          /*font-size: 0.98rem;*/
          /*color:var(--red-color);*/
        }
        .content>.footer>.actions>.actions-info>.actions-container>span.add>span{
          display: inline-block;
          margin-top: 1px;
        }
        .content>.footer>.actions>.actions-info>.actions-container>span.add{
          position: relative;
        }
        .content>.footer>.actions>.actions-info>.actions-container>span.add>span.mobile{
          display: none;
        }
        .content>.footer>.actions>.actions-info>.actions-container>span.active svg{
          fill: var( --accent-color);
        }


        span.add>.popup {
          display: none;
          flex-flow: column;
          position: absolute;
          bottom: 38px;
          right: -90px;
          color: var(--text-color);
          padding: 0;
          border: var(--border);
          width: max-content;
          box-shadow: var(--box-shadow);
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
          z-index: 2;
          cursor: default;
        }
        span.add>.popup>.popup-content{
          background-color: var(--modal);
          display: flex;
          flex-flow: column;
          padding: 8px 8px 10px 8px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .popup-content>.close-modal,
        span.add>.popup>.popup-content>.close,
        span.add>.popup .modal-overlay{
          display: none;
        }
        span.add>.popup>.popup-content>span.pointer {
          border: var(--border);
          border-top: none;
          border-left: none;
          background-color: var(--modal);
          display: inline-block;
          width: 10px;
          height: 10px;
          position: absolute;
          right: 102px;
          bottom: -6px;
          rotate: 45deg;
        }
        span.add>.popup>.popup-content .header{
          /*display: none;*/
          color: var( --text-color);
          padding: 0;
        }

        .popup-content :is(.header, .icons, .field) {
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .popup-content > .header {
          position: absolute;
          /* padding-bottom: 5px;
          margin-bottom: 15px; */
          right: 8px;
          top: 8px;
        }
        .popup-content > .header span {
          display: none;
          font-size: 1.3rem;
          color: var( --text-color);
        }
        .popup-content > .header .close,
        .icons a {
          display: flex;
          align-items: center;
          border-radius: 50px;
          justify-content: center;
          transition: all 0.3s ease-in-out;
        }
        .popup-content> .header .close {
          color: var(--white);
          font-size: 1rem;
          background: var(--close-background);
          height: 20px;
          width: 20px;
          cursor: pointer;
        }
        .popup-content > .header .close:hover {
          background: red;
        }
        .popup-content .content {
          margin: 0px 0;
        }
        .popup-content .content p {
          display: none;
          color: var( --gray-color);
          padding: 0%;
          margin: 0%;
          margin-bottom: 15px;
          margin-left: 2px;
          font-size: 1.1rem;
        }
        .popup-content .content .icons {
          justify-content: start;
          gap: 15px;
          padding: 0%;
          margin: 0%;
          margin-right: 50px;
          margin-bottom: 10px;
        }
        .popup-content .content .icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 25px;
          width: 25px;
          font-size: 1rem;
          text-decoration: none;
          border: 1px solid transparent;
        }
        .popup-content .icons a i {
          font-size: 0.8rem;
          transition: transform 0.4s ease-in-out;
          -webkit-transition: transform 0.4s ease-in-out;
          -moz-transition: transform 0.4s ease-in-out;
          -ms-transition: transform 0.4s ease-in-out;
          -o-transition: transform 0.4s ease-in-out;
        }
        .popup-content .icons a:nth-child(1) {
          color: #1877f2;
          border-color: #b7d4fb;
        }
        .popup-content .icons a:nth-child(1):hover {
          background: #1877f2;
        }
        .popup-content .icons a:nth-child(2) {
          color: #46c1f6;
          border-color: #b6e7fc;
        }
        .popup-content .icons a:nth-child(2):hover {
          background: #46c1f6;
        }
        .popup-content .icons a:nth-child(3) {
          color: #30cce1;
          border-color: #30cce1;
        }
        .popup-content .icons a:nth-child(3):hover {
          background: #30cce1;
        }
        .popup-content .icons a:nth-child(4) {
          color: #25d366;
          border-color: #bef4d2;
        }
        .popup-content .icons a:nth-child(4):hover {
          background: #25d366;
        }
        .popup-content .icons a:nth-child(5) {
          color: #0088cc;
          border-color: #b3e6ff;
        }
        .popup-content .icons a:nth-child(5):hover {
          background: #0088cc;
        }
        .popup-content .icons a:hover {
          color: #fff;
          border-color: transparent;
        }
        .popup-content .icons a:hover i {
          transform: scale(1.12);
          -webkit-transform: scale(1.12);
          -moz-transform: scale(1.12);
          -ms-transform: scale(1.12);
          -o-transform: scale(1.12);
        }
        .popup-content>.content>ul.icons>a>.option-details{
          display: none;
        }
        .popup-content .content .field {
          /*margin: 12px 0 -5px 0;*/
          height: max-content;
          border-radius: 50px;
          padding: 2px 5px;
          border: var(--border);
          position: relative;
        }
        .popup-content .field i {
          color: var( --gray-color);
          width: 25px;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup-content .field.active i {
          color: var( --accent-color);
        }
        .popup-content .field input {
          color: var( --gray-color);
          width: 100%;
          height: max-content;
          border: none;
          outline: none;
          font-size: 0.8rem;
          padding: 2px 10px 2px 0px;
          background: transparent;
        }
        .popup-content .field button {
          position: absolute;
          right: 3px;
          top: 3px;
          bottom: 3px;
          color: var(--white);
          border: none;
          font-size: 0.7rem;
          border-radius: 50px;
          display: inline-block;
          margin-right: 5px;
          padding: 1px 10px 3px 10px;
          text-align: center;
          background: var( --accent-color);
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
          background-color: var( --theme);
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
          align-items: center;
          text-decoration: none;
          gap: 10px;
          color: var( --gray-color);
        }
        .options-modal>.more-options>.options-item:first-of-type{
            padding-top: 7px;
        }
        .options-modal>.more-options>.options-item:last-of-type{
          padding-bottom: 15px;
          border-bottom: var( --border)
        }
        .options-modal>.more-options>.options-item>.option-details{
          display: flex;
          flex-flow: column;
        }
        .options-modal>.more-options>.options-item>i{
          color: inherit;
          font-size: 1.4rem;
          color: var( --text-color);
          align-self: start;
          margin-top: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .options-modal>.more-options>.options-item:first-of-type>i{
          font-size: 1.5rem;
        }
        .options-modal>.more-options>.options-item>.option-details>.detail-title{
          font-size: 1rem;
          color: inherit;
          color: var( --text-color);
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
          color: var( --text-color);
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
          :host {
            box-sizing: border-box !important;
            border-bottom: var(--mobile-border);
            padding: 15px 2px 0px 2px;
            display: flex;
            flex-flow: column;
            gap: 5px;
          }
          .content>.footer>.images>.more{
            border: var( --mobile-dashed);
          }
          .head>.more {
            cursor: initial;
          }
          .space>.more>.desktop,
          .head>.more>.desktop{
            display: none;
          }
          .space>.more>.mobile,
          .head>.more>.mobile{
            display: flex;
            cursor: unset;
          }
          .space>.left>.info>a.name,
          .space>.left>.info>.author>a.name,
          .head>.user>.info>.name-container>p.name>a,
          .content>.footer>span.expand{
            cursor: default;
          }
          .head>.user>.info>.name-container>p.name>a{
            cursor: unset;
          }
          .head>.user>.info{
            margin-top: 1px;
            display: flex;
            flex-flow: column;
            gap: 2px;
          }
          .space>.left>.info>.author>span.time,
          .head>.user>.info>.other>.time{
            font-size: 0.7rem;
          }

          .actions-container>span.comment:hover{
            color: var( --gray-color);
          }

          .actions-container>span.like  svg {
            position: absolute;
            left: -19px;
            top: 3px;
            cursor: pointer;
            overflow: visible;
            width: 27px;
            margin: 0px;
            padding: 0px;
            border-radius: 50px;
          }
          .actions-container>a:hover,
          .actions-container>span.like:hover{
            color: var( --gray-color);
            cursor: default;
          }
          .actions-container>a>i{
            font-size: 1.09rem;
          }
          .actions-container>span.like:hover *{
            stroke: var( --gray-color);
          }
          .actions-container>span.like>label>span{
            cursor: default;
          }
          .content>.footer>.actions>.actions-info>.actions-container>span.add>i{
            margin-top: 3px;
            font-size: 1rem;
          }

          .content>.footer>.actions>.actions-info>.actions-container>span{
            cursor: default;
          }

          .content>.footer>.actions>.actions-info>.actions-container>span.add>span.desktop{
            display: none;
          }
          .content>.footer>.actions>.actions-info>.actions-container>span.add>span.mobile{
            display: flex;
          }

          span.add>.popup{
            box-shadow: unset;
            position: fixed;
            right: 0;
            left: 0;
            top: 0;
            bottom: -4px;
            z-index: 10;
            width: 100%;
            min-width: 100%;
            display: none;
            flex-flow: column;
            align-items: center;
          }
          span.add>.popup>.popup-content{
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: var( --theme);
            display: flex;
            flex-flow: column;
            align-items: center;
            width: 100%;
            min-width: 100%;
            gap: 5px;
            z-index: 11;
            border-radius: 0;
            border-top-right-radius: 15px;
            border-top-left-radius: 15px;
          }
          span.add>.popup .modal-overlay{
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 0;
            background-color: var(--modal-background);
          }
          span.add>.popup>.popup-content>span.pointer{
            border: none;
            background-color:  var(--pointer-mobile);
            display: inline-block;
            margin: 12px 0 5px 0;
            align-self: center;
            width: 50px;
            height: 7px;
            border-radius: 10px;
            position: unset;
            rotate: unset;
          }
          span.add>.popup>.popup-content>.header{
            color: var( --text-color);
            padding: 0px 0;
            position: unset;
          }
          .popup>.popup-content> .header .close{
            display: none;
          }
          .popup>.popup-content > .header span {
            display: flex;
            color: var( --text-color);
            font-size: 1.2rem;
          }
          .popup>.popup-content > .content{
            border-bottom: var(--mobile-border);
            width: 90%;
            display: flex;
            flex-flow: column;
            align-items: center;
          }
          .popup>.popup-content>.content .icons {
            gap: 0;
            padding: 0%;
            margin: 0%;
            width: 100%;
            height: max-content;
            display: flex;
            flex-flow: column;
            align-items: center;
          }
          .popup>.popup-content>.content .icons>a{
            border: none;
            width: 100%;
            height: max-content;
            display: flex;
            padding: 12px 5px;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: start;
            text-decoration: none;
            gap: 15px;
            color: var( --gray-color);
            border-radius: 0px;

          }
          .popup>.popup-content>.content .icons>a:hover {
            background: transparent;
          }

          .popup>.popup-content>.content .icons a:hover i {
            transform: unset;
            -webkit-transform: unset;
            -moz-transform: unset;
            -ms-transform: unset;
            -o-transform: unset;
          }

          .popup>.popup-content>.content .icons a:first-of-type{
            padding-top: 7px;
          }
          .popup>.popup-content>.content .icons a:last-of-type{
            padding-bottom: 15px;
          }
          .popup>.popup-content>.content>ul.icons>a>.option-details{
            /*border: 1px solid var( --gray-color);*/
            display: flex;
            flex-flow: column;
          }
          .popup-content>.content .icons>a>i{
            color: inherit;
            font-size: 1.4rem;
            color: var( --text-color);
            align-self: start;
            margin-top: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .popup-content>.content>ul.icons>a>.option-details>.detail-title{
            font-size: 1rem;
            color: inherit;
            color: var( --text-color);
          }
          .popup-content>.content>ul.icons>a>.option-details>.detail-text{
            font-size: 0.8rem;
            color: inherit;
          }
          .popup-content>.content>p{
            align-self: start;
            display: flex;
            margin: 5px 0 0 5px;
            color: var( --text-color);
            font-size: 0.9rem;
          }
          .popup-content .content .field {
            margin: 5px 0 15px 0;
            height: max-content;
            width: 100%;
            border-radius: 50px;
            padding: 2px 5px;
            border: var(--mobile-border);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .popup-content .field i {
            color: var( --gray-color);
            width: 25px;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .popup-content .field.active i {
            color: var( --accent-color);
          }
          .popup-content .field input {
            color: var( --gray-color);
            width: 100%;
            height: max-content;
            border: none;
            outline: none;
            font-size: 0.9rem;
            padding: 2px 10px 2px 0px;
          }
          .popup-content .field button {
            position: absolute;
            right: 5px;
            top: 3px;
            bottom: 3px;
            color: var(--white);
            border: none;
            font-size: 0.8rem;
            border-radius: 50px;
            display: inline-block;
            margin-right: 5px;
            padding: 1px 10px 2px 10px;
            text-align: center;
            background: var( --accent-color);
          }
          .popup-content>.close-modal{
            margin: 12px 0 12px 0;
            width: 90%;
            background-color: var(--modal-close);
            color: var( --text-color);
            padding: 7px 10px;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 1.18rem;
            font-weight: 700;
            border-radius: 50px;
          }
          .popup-content>.close-modal>i{
            margin: 3px 0 0 0;
            font-size: 1.18rem;
          }

        }
      </style>
    `;
  }
}