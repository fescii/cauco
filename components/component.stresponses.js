import RepliesContainer from './component.replies.js';
export default class CommentsContainer extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});

    // this._isOpen = false;

    this.registerOtherComponents();
    this.render();
  }
  registerOtherComponents() {
    if (typeof customElements.get('replies-container') === 'undefined') {
      customElements.define('replies-container', RepliesContainer);
      // console.log("Component Registered");
    }
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    let desktopDots  = this.shadowObj.querySelector('.comment>.head>.more > .desktop');
    let dotsMobile  = this.shadowObj.querySelector('.comment>.head>.more > .dots');

    let repliesButton = this.shadowObj.querySelector(".comment>.body>.footer>.actions>span.replies");

    let response  = this.shadowObj.querySelector('.comment>.body>.footer>.actions>span.comment');

    repliesButton.addEventListener('click', (e) => {
      this.handleReplies();
    });


    desktopDots.addEventListener('click', (e) => {
      this.handleOptions(desktopDots);
    });

    dotsMobile.addEventListener('click', (e) => {
      this.handleOptionsMobile(dotsMobile);
    });

    response.addEventListener('click', (e) => {
      this.openResponse();
    });

  }

  disconnectedCallback() {
    // console.log('We are inside disconnectedCallback');
    // adding event handler to the button
  }

  openResponse() {
    // updating the state
    let parent  = document.querySelector('main.post > section.post > div.respond-placeholder');
    parent.style.setProperty("display","flex")

    // response.remove()
    parent.innerHTML  = `
      <respond-container
        name="Replying to fredrick's response"
        type="response">
      </respond-container>`;
  }

  handleOptions(item) {
    // updating the state
    let parent  = item.parentElement;
    let options  = parent.querySelector('.options');
    let pointer = options.querySelector("span.pointer")
    let top = options.querySelector("span.option")

    top.addEventListener("mouseenter", (e) => {
        pointer.style.backgroundColor = "var(--modal-hover-background)"
    })
    top.addEventListener("mouseleave", (e) => {
        pointer.style.backgroundColor = "var(--theme)"
    })
    if (options.style.display == "flex"){
      // console.log(options)
      item.classList.remove("active")
      options.style.display = "none"
    }
    else {
      item.classList.add("active")
      options.style.display = "flex"
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
      let parent  = document.querySelector('main.post > section.post > div.respond-placeholder');
      parent.innerHTML = ''
      optionsModal.style.display = "flex"
      this.disableScroll()
    }

    closeModal.addEventListener("click", (e) => {
      e.stopPropagation();
      optionsModal.style.setProperty("display","none")
      this.enableScroll()
    },{once:true})
    modalOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      optionsModal.style.setProperty("display","none")
      this.enableScroll()
    },{once:true})
  }

  handleReplies() {
    // updating the state
    let item  = this.shadowObj.querySelector('replies-container');
    if (item){
      try {
        item.remove()
        // this._isOpen = false;
      } catch (error) {
        return;
      }
    }
    else {
      this.shadowObj.querySelector('.replies-node').innerHTML = this.getReplies();
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

  getTemplate() {
    // Show HTML Here
    return `
    <div class="comments-wrapper">
        <i class="bi-x-circle-fill"></i>
        <div class="comments-header">
          <div class="controls">
            <select name="sort" id="sort">
              <option value="most">All Comments</option>
              <option value="most">Most Relevant</option>
            </select>
          </div>
          <div class="add-comment">
            <i class="bi-plus"></i>
            <span class="tet">Respond</span>
          </div>
        </div>

        <div class="comments">
          ${this.getResponses()}
        </div>

        <div id="respond-placeholder" class="respond-placeholder"></div>
      </div>
    ${this.getStyles()}
  `;
  }

  getResponses(){
    return `
    <comment-container id="1" author-profile="img/profile.jpg" author-url="/puri.com" author-name="Fredrick Ochieng"
      time-lapse="May 5 at 6:00 PM" likes="908">
      <p>Travel to the Sahara,<a href="">Mojave</a>, and the allas we seek
        out the world's most majestic desert landscapes in this
        fascinating docu-series.
      </p>
      <p>Travel to the Sahara, Mojave, and the allas we seek out the
        world's most majestic desert landscapes in this fascinating
        docu-series.
      </p>
    </comment-container>

    <comment-container id="1" author-profile="img/profile.jpg" author-url="/puri.com" author-name="Fredrick Ochieng"
      time-lapse="May 5 at 6:00 PM" likes="908">
      <p>Travel to the Sahara, Mojave, and the allas we seek out the
        world's most majestic desert landscapes in this fascinating
        docu-series.
      </p>
    </comment-container>

    <comment-container id="1" author-profile="img/profile.jpg" author-url="/puri.com" author-name="Fredrick Ochieng"
      time-lapse="May 5 at 6:00 PM" likes="908">
      <p>Travel to the Sahara, Mojave, and the allas we seek out the
        world's most majestic desert landscapes in this fascinating
        docu-series.
      </p>
      <ul>
        <li>The yellow Sahara is the postcard image of a desert.</li>
        <li>A waving sea of sand. Passing dunes. Date palm oases break up
          the shimmering horizon.
        </li>
        <li>Like nowhere else on earth, the Sahara embodies the romantic
          ideal and lost dream of the infinite.
        </li>
      </ul>
    </comment-container>

    <comment-container id="1" author-profile="img/profile.jpg" author-url="/puri.com" author-name="Fredrick Ochieng"
      time-lapse="May 5 at 6:00 PM" likes="908">
      <p>Travel to the Sahara, Mojave, and the allas we seek out the
        world's most majestic desert landscapes in this fascinating
        docu-series.
      </p>
    </comment-container>
    `
  }

  getStyles() {
    return `
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          border: var(--border);
          background-color: var(--modal-background);
          padding: 0px;
          justify-self: end;
          display: flex;
          /* display: none; */
          flex-flow: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          z-index: 10;
          position: fixed;
          right: 0px;
          top: 0;
          bottom: 0;
          left: 0;
        }
        * {
        box-sizing: border-box !important;
          --font-one: 'Sen', sans-serif;
          --font-two: 'Product Sans', sans-serif;
        }

        .comments-wrapper {
          background-color: var(--theme);
          padding: 10px 40px 30px 40px;
          display: flex;
          flex-flow: column;
          gap: 0px;
          width: 55%;
          height: 80%;
          position: relative;
          border-radius: 25px;
          -webkit-border-radius: 25px;
          -moz-border-radius: 25px;
          -ms-border-radius: 25px;
          -o-border-radius: 25px;
        }
        .comments-wrapper>i{
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 1.2rem;
          color: var(--gray-color);
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }
        .comments-wrapper>i:hover{
          color: var(--expand-color);
          transform: scale(1.12);
          -webkit-transform: scale(1.12);
          -moz-transform: scale(1.12);
          -ms-transform: scale(1.12);
          -o-transform: scale(1.12);
        }

        .comments-wrapper>.comments-header {
          border-bottom:  var(--border);
          padding: 10px 25px 8px 0px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
        }

        .comments-wrapper>.comments-header .add-comment{
          color: var(--white);
          background-color: var(--main-color);
          padding: 4px 15px;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          gap: 5px;
          align-items: center;
          justify-content: center;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          border-bottom-left-radius: 50px;
        }
        .comments-wrapper>.comments-header .add-comment>i{
          font-size: 1.2rem;
        }

        .comments-wrapper>.comments-header .controls {
          padding: 0;
          display: flex;
          flex-flow: row;
          color: var(--gray-color);
          gap: 10px;
          align-items: center;
          justify-content: center;
        }

        .comments-wrapper>.comments-header .controls>select {
          margin: 0;
          border: none;
          background-color: transparent;
          padding: 4px 2px 4px 2px;
          color: var(--gray-color);
          font-size: 1rem;
        }

        .comments-wrapper>.comments-header .controls>select:hover {
          cursor: pointer;
          color: var(--gray-color);
          color: var(--main-color);
        }

        .comments-wrapper>.comments-header .controls>select>option {
          border:  var(--border);
          background-color: transparent;
          color: var(--text-color);
        }
        .comments-wrapper>.comments{
          display: flex;
          flex-flow: column;
          overflow-x: none;
          overflow-y: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .comments-wrapper>.comments::-webkit-scrollbar {
          display: none !important;
          visibility: hidden;
        }

        .comments-wrapper>div.respond-placeholder {
          border:  var(--border);
          height: 30px;
          background-color: var(--theme);
          position: sticky;
          bottom: 0;
          width: 100%;
          padding: 0 0 0 0;
          display: flex;
          flex-flow: column;
          gap: 0px;
        }
        @media screen and ( max-width:500px ){
          :host {
            /*border-bottom: var(--mobile-dashed);*/
          }

        }
      </style>
    `;
  }
}