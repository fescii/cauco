export default class ReplyWrapper extends HTMLElement {
  constructor() {
    // We are not even going to touch this.
    super();


    // lets create our shadow root
    this.shadowObj = this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    // console.log("We are inside connectedCallback");
    let response  = this.shadowObj.querySelector('.actions>span.mention');
    response.addEventListener('click', (e) => {
      this.openResponse();
    });
  }

  disconnectedCallback() {
    // console.log("We are inside disconnectedCallback");
    // adding event handler to the button

  }
  openResponse() {
    // updating the state
    let parent  = document.querySelector('main.post > section.post > div.respond-placeholder');
    parent.style.setProperty("display","flex")

    // response.remove()
    parent.innerHTML  = `
      <respond-container
        name="Mentioning Fredrick in a response"
        type="response">
      </respond-container>`;
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
    window.onscroll = function () {};
  }

  getTemplate() {
    // Show HTML Here
    return `
      <span class="pointer"></span>
      <span class="dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
      <div class="head">
        <div class="image">
          <img src="${this.getAttribute("author-profile")}" alt="Profile" srcset="" />
        </div>
        <div class="info">
          <a href="${this.getAttribute("author-url")}" class="name">
            <span class="text">${this.getAttribute("author-name")}</span>
          </a>
          <span class="time">${this.getAttribute("time-lapse")}</span>
        </div>
      </div>
      <div class="content">
        ${this.getContent()}
      </div>
      <div class="actions">
        <span class="mention">
          <i class="bi-chat"></i>
          <span class="no">Mention</span>
        </span>
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
                  <circle id="oval2"fill="#9CD8C3" cx="2" cy="7" r="2"/>
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
                  <circle id="oval2" fill="#F48EA7"cx="2" cy="2" r="2"/>
                </g>
                <g id="grp1" opacity="0" transform="translate(24)">
                  <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                  <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
                </g>
              </g>
            </svg>
            <span class="no">${this.getAttribute("likes")}</span>
          </label>
        </span>
        <span class="mention">
          <span class="no">Edit</span>
        </span>
        <span class="mention">
          <span class="no">Report</span>
        </span>
    ${this.getStyles()}
  `;
  }

  getContent(){
    return this.innerHTML
  }

  getStyles() {
    return `
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          border: none;
          background-color: var(--reply);
          padding: 8px 8px;
          display: flex;
          flex-flow: column;
          gap: 5px;
          position: relative;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        * {
        box-sizing: border-box !important;
          font-family: 'Sen', sans-serif;
        }
        span.pointer{
          background-color: transparent;
          position: absolute;
          left: -20px;
          top: 5px;
          display: inline-block;
          width: 18px;
          height: 20px;
          border-left: var(--border-reply);
          border-bottom: var(--border-reply);
          border-bottom-left-radius: 10px;
        }
        span.dots {
          display: flex;
          flex-flow: column;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          gap: 3px;
          position: absolute;
          top: -10px;
          left: -20px;
        }
        span.dots>span.dot{
          display: inline-block;
          background-color: var(--reply-dot-color);
          width: 2px;
          height: 2px;
          max-width: 2px;
          max-height: 2px;
          border-radius: 3px;
        }
        .head{
          padding: 0;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          gap: 5px;
        }
        .head>.image{
          /*border: 1px solid #08b86f77;*/
          background-color: var(--theme);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 28px;
          height: 28px;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .head>.image>img{
          width: 100%;
          height: 100%;
          /*width: 22px;
          height: 22px;*/
          object-fit: cover;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }
        .head>.info{
          padding: 0;
          display: flex;
          flex-flow: column;
          gap: 0;
          font-size: 0.92rem;
        }
        .head>.info>a{
          text-decoration: none;
          color: var(--text-color);
          /*line-height: 1;*/
        }
        .head>.info>a:hover{
          text-decoration: underline;
        }
        .head>.info>span.time{
          color: var(--gray-color);
          font-size: 0.7rem;
          line-height: 1;
        }

        .content{
          padding: 0;
          /*word-break: break-all;*/
        }
        .content ul,
        .content ol{
          padding-left: 20px;
          margin-bottom: 6px;
          margin-top: 0px;
          color: var(--text-color);
        }

        .content h1,
        .content h2,
        .content h3,
        .content h4,
        .content h5,
        .content h6{
          /*border: 1px solid #784adf;*/
          color: var(--title-color);
          margin: 0 0 0px 0;
          padding: 0;
        }

        .content a{
          text-decoration: none;
          color: var(--link-color);
          padding: 0 3px 0 3px;
        }

        .content p{
          margin: 0 0 6px 0;
          padding: 0;
          line-height: 1.3;
          color: var(--text-color);
          font-size: 0.95rem;
        }


        .actions{
          margin: 0;
          padding: 0px 5px;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: center;
          gap: 20px;
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
          font-size: 0.9rem;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          border-bottom-left-radius: 50px;
          cursor: pointer;
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
          left: -19px;
          top: -4px;
          cursor: pointer;
          overflow: visible;
          width: 25px;
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
          color: var(--red-color);
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

        @media screen and (max-width:500px ){
          :host {
            box-sizing: border-box !important;
            border: none;
            background-color: var(--reply);
          }
          span.pointer{
            border-left: var(--mobile-border-reply);
            border-bottom: var(--mobile-border-reply);
          }
          span.dot{
            background-color: var(--mobile-reply-dot-color);
          }
          .actions>span.like,
          .actions>span.like  svg ,
          .actions>span.like>label>span{
            cursor: default;
          }
          .actions>span.like:hover{
            color: var(--gray-color);
          }
          .actions>span.like:hover *{
            stroke:var(--gray-color);
          }
          .actions>span.replies:hover,
          .actions>span.comment:hover{
            color: var(--gray-color);
            cursor: default;
          }

        }

      </style>
    `;
  }
}
