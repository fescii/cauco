export default class SpaceInfo extends HTMLElement {
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
    // console.log('We are inside connectedCallback');

  }


  disconnectedCallback() {
    // console.log('We are inside disconnectedCallback');
    // adding event handler to the button
  }


  getTemplate() {
    // Show HTML Here
    return `
    <div class="header">
      <div class="image">
        <img src="${this.getAttribute("space-profile")}" alt="" srcset="">
      </div>
      <div class="info">
        <a href="${this.getAttribute("space-url")}" class="name">${this.getAttribute("space-name")}</a>
        <div class="actions">
          <span class="followers">
            <span class="no">${this.getAttribute("followers")}</span>
            <span class="text">followers</span>
          </span>
          <span class="dot"></span>
          ${this.getIcon(this.getAttribute("connection"))}
        </div>
      </div>
    </div>
    <div class="footer">
      <span class="description">${this.getAttribute("description")}</span>
    </div>

    ${this.getStyles()}
  `;
  }

  getIcon(conn){
    if (conn == "following") {
      return `
        <span class="following">following</span>
      `
    } else {
      return `
        <span class="follow">follow</span>
      `
    }
  }


  getStyles() {
    return `
      <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          box-sizing: border-box !important;
          border: none;
          background-color: var(--reply);
          padding: 8px 10px 10px 10px;
          margin: 0;
          display: flex;
          flex-flow: column;
          gap: 5px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        * {
          box-sizing: border-box !important;
          font-family: 'Sen', sans-serif;
        }

        .header{
          display: flex;
          flex-flow: row;
          gap: 8px;
        }

        .header > .image {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        .header > .image > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        .header > .info {
          display: flex;
          flex-flow: column;
          font-size: 0.92rem;
          color: var(--text-color);
        }

        .header > .info > a.name {
          overflow: hidden;
          text-decoration: none;
          font-size: 0.95rem;
          color: inherit;
        }

        .header > .info > a.name:hover {
          text-decoration: underline;
        }

        .header > .info > .actions {
          text-decoration: none;
          font-size: 0.8rem;
          color: var(--gray-color);
          display: flex;
          gap: 5px;
          align-items: center;
          flex-wrap: nowrap;
        }
        .header > .info > .actions span.dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          background-color: var(--dot-color);
          border-radius: 5px;
          margin-top: 1px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -ms-border-radius: 5px;
          -o-border-radius: 5px;
        }

        .header > .info > .actions span.followers{
          text-decoration: none;
          font-size: 0.8rem;
          color: var(--gray-color);
          display: flex;
          gap: 3px;
          align-items: center;
          flex-wrap: nowrap;
        }

        .header > .info > .actions span.follow{
          cursor: pointer;
          font-size: 0.8rem;
          color: var(--accent-color);
          text-transform: capitalize;
        }

        .header > .info > .actions span.following{
          cursor: pointer;
          font-size: 0.8rem;
          color: var(--main-color);
          text-transform: capitalize;
        }

        .footer{
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer > span.description {
          text-decoration: none;
          font-size: 0.9rem;
          color: var(--gray-two);
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