export default class TopicInfo extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();


    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    console.log('We are inside connectedCallback');

  }


  disconnectedCallback() {
    console.log('We are inside disconnectedCallback');
    // adding event handler to the button
  }


  getTemplate() {
    // Show HTML Here
    return `
    <div class="info">
      <h4 class="title">
        <a href="${this.getAttribute("topic-url")}" class="link">${this.getAttribute("topic-name")}</a>
      </h4>
      <div class="details">
        <span class="stories">
          <span class="no">${this.getAttribute("stories")}</span>
          <span class="text">Stories</span>
        </span>
        <span class="dot"></span>
        <span class="writers">
          <span class="no">${this.getAttribute("writers")}</span>
          <span class="text">Writers</span>
        </span>
      </div>
    </div>
    ${this.getSubscribed(this.getAttribute("sub"))}
    ${this.getStyles()}
  `;
  }

  getSubscribed(sub){
    if (sub == "subscribed") {
      return `
      <span class="subscribed">Subscribed</span>
      `
    } else {
      return `
      <span class="subscribe">Subscribe</span>
      `
    }
  }


  getStyles() {
    return `
      <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          border-bottom: var(--border);
          padding: 15px 2px 15px 2px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        * {
          box-sizing: border-box !important;
          font-family: 'Sen', sans-serif;
        }

        .info {
          padding: 0;
          display: flex;
          flex-flow: column;
          gap: 0px;
        }

        .info>h4.title {
          margin: 0;
          font-weight: 500;
        }

        .info>h4.title>a {
          text-decoration: none;
          color: var(--text-color);
        }

        .info>h4.title>a:hover {
          text-decoration: underline;
        }

        .info>.details {
          display: flex;
          flex-flow: row;
          align-items: center;
          margin-top: 2px;
          gap: 5px;
          color: var(--gray-color);
          font-size: 0.92rem;
        }

        .info>.details>span.dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          background-color: var(--dot-color);
          border-radius: 50px;
          margin-top: 1px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        .info>.details>span.writers:hover,
        .info>.details>span.stories:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .subscribe {
          color: var(--main-color);
          cursor: pointer;
          height: max-content;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 15px 4px 15px;
          background: var(--button-background-two);
          color: var(--button-text-one);
          background-color: var(--main-color);
          background-size: 500% 500%;

          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }


        .subscribed {
          cursor: pointer;
          height: max-content;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 15px 4px 15px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;

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

        @media screen and ( max-width:500px ){
          :host {
            box-sizing: border-box !important;
          }


        }
      </style>
    `;
  }
}