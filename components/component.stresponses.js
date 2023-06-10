import CommentContainer from './component.comment.js';
export default class StoryResponse extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();

    // lets create our shadow root
    // this.shadowObj = this.attachShadow({mode: 'open'});

    // this._isOpen = false;

    this.registerOtherComponents();
    this.render();
  }
  registerOtherComponents() {
    if (typeof customElements.get('comment-container') === 'undefined') {
      customElements.define('comment-container', CommentContainer);
      // console.log("Component Registered");
    }
  }

  render() {
    this.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    this.disableScroll()
    let closeButton  = this.querySelector('.comments-wrapper>i');
    let response  = this.querySelector('.comments-wrapper>.comments-header .add-comment');

    response.addEventListener('click', (e) => {
      this.openResponse();
    });
    closeButton.addEventListener('click', (e) => {
      this.closeResponses();
    });

  }

  disconnectedCallback() {
    // console.log('We are inside disconnectedCallback');
    // adding event handler to the button
  }

  openResponse() {
    // updating the state
    let parent  = this.querySelector('div#respond-placeholder');
    parent.style.setProperty("display","flex")

    // response.remove()
    parent.innerHTML  = `
      <respond-container
        name="Responding to fredrick's story"
        type="response">
      </respond-container>`;
  }
  closeResponses() {
    // updating the state
    this.enableScroll()
    this.remove()
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
    <div class="comments-container">
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
    <link rel="stylesheet" href="theme.css">
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        .comments-container {
          box-sizing: border-box !important;
          border: var(--border);
          background-color: var(--modal-background);
          padding: 0px;
          justify-self: end;
          display: flex;
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
          background-color: var(--modal);
          padding: 40px 40px 30px 40px;
          display: flex;
          flex-flow: column;
          gap: 0px;
          width: 800px;
          height: 90%;
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
          padding: 10px 25px 5px 0px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
        }

        .comments-wrapper>.comments-header .add-comment{
          color: var(--white);
          background-color: var(--accent-color);
          padding: 3px 15px 3px 10px;
          margin: 0 0 5px 0;
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          gap: 5px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
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
          background-color: var(--theme);
          position: sticky;
          bottom: 0px;
          width: 100%;
          padding: 0 0 0 0;
          display: none;
          flex-flow: column;
          gap: 0px;
        }
        @media screen and ( max-width: 850px ){
          .comments-wrapper {
            background-color: var(--modal);
            padding: 40px 40px 30px 40px;
            display: flex;
            flex-flow: column;
            gap: 0px;
            width: 90%;
            height: 90%;
            position: relative;
            border-radius: 25px;
            -webkit-border-radius: 25px;
            -moz-border-radius: 25px;
            -ms-border-radius: 25px;
            -o-border-radius: 25px;
          }
        }
        @media screen and ( max-width: 600px ){
          .comments-container {
            box-sizing: border-box !important;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: end;
          }
          .comments-wrapper {
            background-color: var(--modal);
            padding: 40px 40px 30px 40px;
            display: flex;
            flex-flow: column;
            gap: 0px;
            width: 100%;
            height: 98%;
            position: relative;
            border-radius: 0px;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
          }

        }
        @media screen and ( max-width:500px ){
          :host {
            box-sizing: border-box !important;
          }

        }
      </style>
    `;
  }
}