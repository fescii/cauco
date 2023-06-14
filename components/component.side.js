export default class SideContainer extends HTMLElement {
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

  }

  disconnectedCallback() {
    // console.log('We are inside disconnectedCallback');

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
    <div class="head">
      <div class="logo">
        <div class="logo-image">
          <img src="img/favi.png" alt="Logo" srcset="" />
        </div>
      </div>
      <div class="controls">
        <span class="iconlyBulk-Arrow-Left-Circle"><span class="path1"></span><span class="path2"></span></span>
        <span class="iconlyBulk-Arrow-Right-Circle"><span class="path1"></span><span class="path2"></span></span>
      </div>
    </div>
    <div class="menu main-menu">
      <ul class="menu-items">
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Home icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Home</span>
            </div>
          </a>
        </li>
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Edit-Square icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Create</span>
            </div>
          </a>
        </li>
        <li class="item selected">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Discovery icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Discover</span>
            </div>
          </a>
        </li>
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Document icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Stories</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="menu">
      <ul class="menu-items">
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Search icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Search</span>
            </div>
          </a>
        </li>
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-User2 icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">People</span>
            </div>
          </a>
        </li>
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Bookmark icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">My List</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="menu user">
      <div class="title">User</div>
      <ul class="menu-items">
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Profile icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Profile</span>
            </div>
          </a>
        </li>
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Message icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Subscriptions</span>
            </div>
          </a>
        </li>
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link">
            <span class="iconly-Setting icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Settings</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="menu user">
      <ul class="menu-items">
        <li class="item">
          <span class="line"></span>
          <a href="" class="item-link logout">
            <span class="iconly-Logout icli"></span>
            <div class="link-text">
              <span class="arrow"></span>
              <span class="text">Logout</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    ${this.getStyles()}
  `;
  }

  getStyles() {
    return `
    <link rel="stylesheet" href="icon/style.css" />
      <style>
        :host {
          box-sizing: border-box !important;
        }
        * {
        box-sizing: border-box !important;
          --font-one: 'Sen', sans-serif;
          --font-two: 'Product Sans', sans-serif;
        }
        .head {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .head>.logo {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 8px;
        }

        .head>.logo>.logo-image {
          width: 23px;
          height: 23px;
          margin-left: -5px;
        }

        .head>.logo>.logo-image>img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .head>.logo>.app-name {
          color: var(--main-color);
          font-size: 1.3rem;
          font-weight: bold;
          display: none;
        }

        .head>.controls {
          align-self: flex-end;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          display: none;
        }

        .head>.controls>span {
          display: inline-block;
          margin-top: 4px;
          font-size: 1.5rem;
          color: var(--gray-color);
          cursor: pointer;
        }

        .head>.controls>span:hover {
          color: var(--main-color);
        }

        .menu {
          border-top: var(--dashed);
          margin: 0%;
          padding: 15px 0% 10px 0%;
          display: flex;
          flex-flow: column;
          gap: 10px;
        }

        .main-menu {
          border-top: none;
        }

        .menu>.title {
          display: none;
          font-size: 0.8rem;
          font-weight: bold;
          color: var(--text-color);
          text-transform: uppercase;
        }

        .menu>ul.menu-items {
          display: flex;
          flex-flow: column;
          gap: 8px;
          margin: 0%;
          padding: 0%;
          list-style-type: none;
        }

        .menu>ul.menu-items>.item {
          color: var(--gray-color);
          position: relative;
          height: max-content;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3px 8px 4px 8px;
          width: 35px;
          height: max-content;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .menu>ul.menu-items>.selected {
          background-color: var(--nav-item-background);
          color: var(--nav-item-color);
        }

        .menu>ul.menu-items>.selected>.line {
          display: inline-block;
          background-color: var(--nav-item-color);
          left: -11px;
          position: absolute;
          top: 7%;
          height: 65%;
          width: 5px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .menu>ul.menu-items>.item>a.item-link {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0px;
          text-decoration: none;
          color: inherit;
        }

        .menu>ul.menu-items>.item>a.item-link>span.icli {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: inherit;
        }

        .menu>ul.menu-items>.item>a.item-link>.link-text {
          border: var(--border);
          display: none;
          background-color: var(--theme);
          font-size: 1rem;
          padding: 2px 0px;
          width: max-content;
          height: max-content;
          color: inherit;
          position: absolute;
          left: 37px;
          border-radius: 8px;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          -ms-border-radius: 8px;
          -o-border-radius: 8px;
        }

        .menu>ul.menu-items>.selected>a.item-link>.link-text {
          left: 43px;
        }

        .menu>ul.menu-items>.item>a.item-link>.link-text>span.arrow {
          display: inline-block;
          border-left: var(--border);
          border-bottom: var(--border);
          background-color: var(--theme);
          width: 7px;
          height: 7px;
          position: absolute;
          left: -4px;
          top: 7.5px;
          rotate: 45deg;
        }

        .menu>ul.menu-items>.item>a.item-link>.link-text>span.text {
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 0px 10px;
          text-align: center;
        }

        .menu>ul.menu-items>.item>a.item-link:hover {
          color: var(--main-color);
        }

        .menu>ul.menu-items>.item>a.selected {
          color: var(--main-color);
        }

        .menu>ul.menu-items>.item>a.logout:hover {
          color: var(--logout);
        }
        .options-modal>.more-options>.close-modal i{
          margin-top: 2px;
        }
        @media screen and (max-width:500px ){
          :host {
            box-sizing: border-box !important;
          }
         }

      </style>
    `;
  }
}