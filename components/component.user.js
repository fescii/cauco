export default class UserProfile extends HTMLElement {
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
    <div class="person-info">
      <div class="image">
        <img src="${this.getAttribute("user-profile")}" alt="Profile" srcset="">
      </div>
      <div class="info">
        <div class="name">
          <a href="">${this.getAttribute("user-name")}</a>
          <i class="bi-patch-check-fill"></i>
        </div>
        <span class="info">
          <span class="text">${this.getAttribute("occupation")}</span>
        </span>
      </div>
    </div>
    <div class="actions">
      <span class="item ${this.getAttribute("connection")}">
        ${this.getIcon(this.getAttribute("connection"))}
        <span class="text">${this.getAttribute("connection")}</span>
      </span>
    </div>
    ${this.getStyles()}
  `;
  }

  getIcon(conn){
    if (conn == "follow") {
      return `
        <i class="bi-person-plus-fill"></i>
      `
    } else {
      return `
        <i class="bi-person-check-fill"></i>
      `
    }
  }


  getStyles() {
    return `
      <link rel="stylesheet" href="bootstrap/font/bootstrap-icons.css">
      <style>
        :host {
          border: none;
          background-color: var(--user-background);
          padding: 15px 10px;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin: 0 0 10px 0;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        * {
          box-sizing: border-box !important;
          font-family: 'Sen', sans-serif;
        }

        .person-info {
          display: flex;
          flex-flow: row;
          flex-wrap: nowrap;
          align-items: start;
          gap: 10px;
        }

        .person-info > .image {
          align-self: start;
          margin-top: 2px;
          width: 37px;
          height: 37px;
          min-width: 37px;
          min-height: 37px;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        .person-info > .image > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50px;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          -ms-border-radius: 50px;
          -o-border-radius: 50px;
        }

        .person-info > .info {
          align-self: flex-start;
          text-decoration: none;
          display: flex;
          flex-flow: column;
          gap: 0px;
          color: var(--text-color);
        }

        .person-info > .info > .name {
          display: flex;
          flex-flow: row;
          gap: 5px;
          align-items: center;
        }

        .person-info > .info > .name > a {
          font-size: 1rem;
          text-decoration: none;
          color: var(--text-color);
          padding: 0%;
          margin: 0%;
        }
       .person-info > .info > .name > a:hover {
          text-decoration: underline;
        }

        .person-info > .info > .name > i {
          color: var(--main-color);
          font-size: 0.83rem;
          margin-top: 4px;
        }

        .person-info > .info > .info {
          font-size: 0.8rem;
          color: var(--gray-color);
          display: flex;
          flex-wrap: nowrap;
          gap: 5px;
          align-items: center;
        }

        .actions {
          width: max-content;
          display: flex;
          flex-wrap: nowrap;
          flex-flow: row;
          gap: 10px;
          align-items: center;
        }

        .actions > .item {
          text-decoration: none;
          text-transform: capitalize;
          color: var(--gray-color);
          cursor: pointer;
          height: max-content;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.9rem;
          padding: 5px 15px 5px 12px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom-left-radius: 15px;
        }
        .actions > span.follow {
          background: var(--button-background-two);
          color: var(--button-text-one);
          background-color: var(--main-color);
          background-size: 500% 500%;
        }

        .actions > a.item:hover {
          color: var(--main-color);
        }
        .actions > span.following {
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
            background-color: var(--mobile-user-background);
          }


        }
      </style>
    `;
  }
}