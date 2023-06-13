import ReplyWrapper from './component.reply.js';
export default class RepliesContainer extends HTMLElement {
  constructor() {
    // We are not even going to touch this.
    super();


    // lets create our shadow root
    this.shadowObj = this.attachShadow({ mode: "open" });

    this.registerOtherComponents();
    this.render();
  }

  registerOtherComponents() {
    if (typeof customElements.get('reply-wrapper') === 'undefined') {
      customElements.define('reply-wrapper', ReplyWrapper);
      // console.log("Component Registered");
    }
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    // console.log("We are inside connectedCallback");
    // this.shadowObj.insertAdjacentHTML('beforeEnd', this.getReplies())
    this.closeReplies()
  }

  closeReplies() {
    // updating the state
    let close  = this.shadowObj.querySelector('.collapse');

    close.addEventListener("click", (e) => {
      e.preventDefault()
      this.remove()
      document.querySelector('comment-container').isOpen  =  false;
      console.log(document.querySelector('comment-container').isOpen)
    },{once:true})
  }

  getTemplate() {
    // Show HTML Here
    return `
    <div class="collapse">
      <span class="replies">
        <span class="no">Hide replies</span>
        <i class="bi-arrow-up-short"></i>
      </span>
    </div>
    ${this.getReplies()}
    ${this.getStyles()}
  `;
  }

  getReplies(){
   return `
    <reply-wrapper
      author-profile="img/profile.jpg"
      author-url="/puri.com"
      author-name="Fredrick Ochieng"
      time-lapse="May 5 at 6:00 PM"
      likes="9.3k">
      <p>
        Travel to the Sahara,<a href="">Mojave</a>, and the allas we seek out the world's most majestic desert landscapes in this fascinating docu-series.
      </p>
    </reply-wrapper>
    <reply-wrapper
      author-profile="img/profile.jpg"
      author-url="/puri.com"
      author-name="Fredrick Ochieng"
      time-lapse="May 5 at 6:00 PM"
      likes="9.3k">
      <p>
        Yeah..
      </p>
    </reply-wrapper>
    <reply-wrapper
      author-profile="img/profile.jpg"
      author-url="/puri.com"
      author-name="Fredrick Ochieng"
      time-lapse="May 5 at 6:00 PM"
      likes="9.3k">
      <p>
        Travel to the Sahara, Mojave, and the Colorado Plateau as we seek out the world's most majestic desert landscapes in this fascinating docu-series.
      </p>
    </reply-wrapper>
    `
    // this.shadowObj.insertAdjacentHTML('beforeEnd', data)
    // this.shadowObj.appendChild(data)
  }

  getStyles() {
    return `
    <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          padding: 10px 15px 25px 20px;
          margin: 0 0 5px 2px;
          display: flex;
          flex-flow: column;
          gap: 25px;
          border-left: none;
          border-bottom: none;
          border-bottom-left-radius: 10px;
          position: relative;
        }
        * {
        box-sizing: border-box !important;
          --font-one: 'Sen', sans-serif;
          --font-two: 'Product Sans', sans-serif;
        }
        .collapse{
          margin: 5px 0;
          position: absolute;
          bottom: -10px;
          right: 0px;
          left: 0px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
          padding: 0;
        }
        .collapse>span.replies{
          color: var(--gray-color);
          padding: 0px 0px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          height: max-content;
          gap: 0px;
          font-size: 0.92rem;
        }
        .collapse>span.replies>i{
          margin-top: 3px;
        }
        .collapse>span{
          text-decoration: none;
          color: var(--main-color);
          font-size: 0.8rem;
          cursor: pointer;
        }

        @media screen and (max-width:500px ){
          :host {
            box-sizing: border-box !important;
            margin: 0 0 5px 2px;
          }
         }

      </style>
    `;
  }
}
