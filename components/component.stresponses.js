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
          <comment-container id="1" author-profile="img/profile.jpg" author-url="/puri.com" author-name="Fredrick Ochieng"
            time-lapse="May 5 at 6:00 PM" likes="908">
            <p>
              Travel to the Sahara,<a href="">Mojave</a>, and the allas we seek
              out the world's most majestic desert landscapes in this
              fascinating docu-series.
            </p>
            <p>
              Travel to the Sahara, Mojave, and the allas we seek out the
              world's most majestic desert landscapes in this fascinating
              docu-series.
            </p>
          </comment-container>

          <comment-container id="1" author-profile="img/profile.jpg" author-url="/puri.com" author-name="Fredrick Ochieng"
            time-lapse="May 5 at 6:00 PM" likes="908">
            <p>
              Travel to the Sahara, Mojave, and the allas we seek out the
              world's most majestic desert landscapes in this fascinating
              docu-series.
            </p>
          </comment-container>

          <comment-container id="1" author-profile="img/profile.jpg" author-url="/puri.com" author-name="Fredrick Ochieng"
            time-lapse="May 5 at 6:00 PM" likes="908">
            <p>
              Travel to the Sahara, Mojave, and the allas we seek out the
              world's most majestic desert landscapes in this fascinating
              docu-series.
            </p>
            <ul>
              <li>The yellow Sahara is the postcard image of a desert.</li>
              <li>
                A waving sea of sand. Passing dunes. Date palm oases break up
                the shimmering horizon.
              </li>
              <li>
                Like nowhere else on earth, the Sahara embodies the romantic
                ideal and lost dream of the infinite.
              </li>
            </ul>
          </comment-container>

          <comment-container id="1" author-profile="img/profile.jpg" author-url="/puri.com" author-name="Fredrick Ochieng"
            time-lapse="May 5 at 6:00 PM" likes="908">
            <p>
              Travel to the Sahara, Mojave, and the allas we seek out the
              world's most majestic desert landscapes in this fascinating
              docu-series.
            </p>
          </comment-container>
        </div>

        <div id="respond-placeholder" class="respond-placeholder"></div>
      </div>
    ${this.getStyles()}
  `;
  }

  getContent(){
    return this.innerHTML
  }

  getReplies(){
    return `
    <replies-container
      id="${this.getAttribute("id")}">
    </replies-container>
    `
  }

  getStyles() {
    return `
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          border-bottom: var(--dashed);
          padding: 15px 0 15px 0px;
          display: flex;
          flex-flow: column;
          gap: 0px;
        }
        * {
        box-sizing: border-box !important;
          --font-one: 'Sen', sans-serif;
          --font-two: 'Product Sans', sans-serif;
        }
        .comment{
          padding: 0px 0px;
          display: flex;
          flex-flow: column;
          gap: 5px;
          position: relative;
        }
        .comment>.head{
          padding: 0 10px 0 0;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .comment>.head>.user{
          padding: 0;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          gap: 5px;
        }
        .comment>.head>.user>.image{
          background-color: var(--theme);
          align-self: start;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 29px;
          height: 29px;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .comment>.head>.user>.image>img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .comment>.head>.user>.info{
          padding: 0;
          display: flex;
          flex-flow: column;
          gap: 0;
          font-size: 0.92rem;
        }
        .comment>.head>.user>.info>a{
          text-decoration: none;
          color: var(--text-color);
          /*line-height: 1;*/
        }
        .comment>.head>.user>.info>a:hover{
          text-decoration: underline;
        }
        .comment>.head>.user>.info>span.time{
          color: var(--gray-color);
          font-size: 0.7rem;
          line-height: 1;
        }
        .comment>.head.more{
          /*margin: 0 15px 0 0;*/
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          gap: 15px;
          position: relative;
        }
        .comment>.head>.more > .desktop,
        .comment>.head>.more > .dots {
          text-decoration: none;
          position: relative;
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
        .comment>.head>.more > .dots{
          display: none;
        }
        .comment>.head>.more > .desktop:hover,
        .comment>.head>.more > .dots:hover {
          background-color: var(--back-one-color);
        }
        .comment>.head>.more > .desktop>span.dot,
        .comment>.head>.more > .dots > span.dot {
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
        .comment>.head>.more >.active {
          background-color: var(--back-one-color);
        }
        .comment>.head>.more > .active >span.dot{
          background-color: var(--main-color);
        }
        .comment>.head>.more>.options{
          display: none;
          flex-flow: column;
          gap: 0px;
          border: var(--border);
          background-color: var(--theme);
          border-top-right-radius: 8px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          position: absolute;
          top: 32px;
          right: 0px;
          z-index: 3;
        }
        .comment>.head>.more>.options>span.pointer {
          border: var(--border);
          background-color: var(--theme);
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
        .comment>.head>.more>.options>.option {
          display: flex;
          padding: 7px 15px;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          min-width: max-content;
          width: 100%;
          gap: 15px;
          color: var(--gray-color);
          cursor: pointer;
          font-size: 0.85rem;
        }
        .comment>.head>.more>.options>.option:nth-of-type(2) {
          border-top-right-radius: 8px;
        }
        .comment>.head>.more>.options>.option:last-of-type {
          /* padding: 5px 10px 8px 10px; */
          border-bottom-right-radius: 8px;
          border-bottom-left-radius: 8px;
        }
        .comment>.head>.more>.options>.option>i {
          font-size: 0.9rem;
        }
        .comment>.head>.more>.options>.option:hover {
          background-color: var(--modal-hover-background);
          color: var(--text-color);
          text-decoration: underline;
        }
        .comment>.head>.more>.options>.delete:hover {
          color: var(--red-color);
          text-decoration: underline;
        }
        .comment>.body{
          padding: 0;
          display: flex;
          flex-flow: column;
          gap: 5px;
        }
        .comment>.body>.content{
          padding: 0;
          /*word-break: break-all;*/
        }
        .comment>.body>.content ul,
        .comment>.body>.content ol{
          padding-left: 20px;
          margin-bottom: 6px;
          margin-top: 0px;
          color: var(--text-color);
        }

        .comment>.body>.content h1,
        .comment>.body>.content h2,
        .comment>.body>.content h3,
        .comment>.body>.content h4,
        .comment>.body>.content h5,
        .comment>.body>.content h6{
          /*border: 1px solid #784adf;*/
          color: var(--title-color);
          margin: 0 0 0px 0;
          padding: 0;
        }

        .comment>.body>.content a{
          text-decoration: none;
          color: var(--link-color);
          padding: 0 3px 0 3px;
        }

        .comment>.body>.content p{
          margin: 0 0 6px 0;
          padding: 0;
          line-height: 1.3;
          color: var(--text-color);
          font-size: 0.95rem;
        }
        .comment>.body>.footer{
          margin: 0;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .comment>.body>.footer>.actions{
          width: 100%;
          margin: 0;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          gap: 30px;
          /*justify-content: space-between;*/
        }
        .actions>span{
          color: var(--gray-color);
          padding: 0px 0px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          height: max-content;
          gap: 5px;
          font-size: 1rem;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          border-bottom-left-radius: 50px;
          cursor: pointer;
        }
        .comment>.body>.footer>.actions>span.replies{
          color: var(--main-color);
          padding: 0px 0px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          height: max-content;
          gap: 0px;
        }
        .comment>.body>.footer>.actions>span.replies>i{
          margin-top: 3px;
        }
        .comment>.body>.footer>.actions>span.comment:hover{
          color: var(--accent-color);
        }

        .actions>span.mention>i{
          font-size: 1fr;
          margin-top: 2px;
        }
        .actions>span.mention:hover{
          color: var(--main-color);
        }
        .actions>span.like {
          position: relative;
          padding: 0;
          margin: 0 0 0 15px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .actions>span.like:hover{
          color:var(--red-color);
        }
        .actions>span.like:hover *{
          stroke: var(--red-color);
        }
        .actions>span.like>label>span{
          padding: 0px 5px;
          cursor: pointer;
        }
        .actions>span.like  svg {
          position: absolute;
          left: -21px;
          top: -4px;
          cursor: pointer;
          overflow: visible;
          width: 27px;
          margin: 0px;
          padding: 0px;
          border-radius: 50px;
        }
        .actions>span.like  svg #heart {
          padding: 0px;
          transform-origin: center;
          animation: animateHeartOut .3s linear forwards;
        }
        .actions>span.like  svg #main-circ {
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
          background-color: var(--theme);
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
          align-items: center;
          text-decoration: none;
          gap: 10px;
          color: var(--gray-color);
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
        .options-modal>.more-options>.options-item:first-of-type>i{
          font-size: 1.5rem;
        }
        .options-modal>.more-options>.options-item>.option-details>.detail-title{
          font-size: 1rem;
          color: inherit;
          color: var(--text-color);
        }
        .options-modal>.more-options>.options-item>.option-details>.detail-title::first-letter{
          text-transform: capitalize;
        }
        .options-modal>.more-options>.options-item>.option-details>.detail-text{
          font-size: 0.8rem;
          color: inherit;
        }
        .options-modal>.more-options>.close-modal{
          background-color: var(--modal-hover-background);
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
          :host {
            border-bottom: var(--mobile-dashed);
            padding: 15px 0 12px 0px;
            display: flex;
            flex-flow: column;
            gap: 5px;
          }
          .comment>.head{
            padding: 0 0 0 0;
            display: flex;
            flex-flow: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
          }
          .comment>.body>.footer>.actions{
            margin: 0;
            display: flex;
            flex-flow: row;
            flex-wrap: nowrap;
            align-items: center;
            gap: 40px;
          }
          .comment>.head>.more > .desktop{
            display: none;
          }
          .comment>.head>.more > .dots{
            display: flex;
          }
          .comment>.body>.footer>.actions>span.like,
          .comment>.body>.footer>.actions>span.like  svg ,
          .comment>.body>.footer>.actions>span.like>label>span{
            cursor: default;
          }
          .comment>.body>.footer>.actions>span.like:hover{
            color: var(--gray-color);
          }
          .comment>.body>.footer>.actions>span.like:hover *{
            stroke: var(--gray-color);
          }
          .comment>.head>.more > .desktop,
          .comment>.head>.more > .dots{
            cursor: unset;
          }
          .comment>.body>.footer>.actions>span.replies:hover{
            cursor: default;
          }
          .comment>.body>.footer>.actions>span.comment:hover{
            color: var(--gray-color);
            cursor: default;
          }

        }
      </style>
    `;
  }
}