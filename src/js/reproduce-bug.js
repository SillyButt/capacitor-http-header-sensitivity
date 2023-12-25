import { SplashScreen } from '@capacitor/splash-screen';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
        <style>
            button.valid { border-color: green; }
            button.invalid { border-color: darkred; }
        </style>
        
        <div>
            The bug is in XMLHttpRequest patch that doesn't check the 'Content-Type' header to be in lower case (as "fetch" patch does). <br/>
            This leads to a bug where XMLHttpResponse may not be interpreted as JSON and won't be stringified so the App will parse what had been parsed already.
            <b>Open console.</b>
        </div>
        
        <button id="fetch-camel-case" class="valid">Call fetch with Content-Type header response</button>
        <button id="fetch-lower-case" class="valid">Call fetch with content-type header response</button>
        </br>
        <button id="xmlhttprequest-camel-case" class="valid">Call XMLHttpRequest with Content-Type header response</button>
        <button id="xmlhttprequest-lower-case" class="invalid">Call XMLHttpRequest with content-type header response</button>
      `;
    }

    connectedCallback() {
      const [host, port] = ['192.168.100.3', 8000];
      const self = this;

      async function fetchCamelCase(event) {
        try {
          console.log('Fetch for "Content-Type: application/json"');
          const raw = await fetch(`http://${host}:${port}/content-type-camel-case`);
          console.log('Raw:', raw);
          const parsed = await raw.json();
          console.log('Parsed:', parsed);
        } catch (error) {
          console.error('ERROR:', error);
        }
      }

      async function fetchLowerCase(event) {
        try {
          console.log('Fetch for "content-type: application/json"');
          const raw = await fetch(`http://${host}:${port}/content-type-lower-case`);
          console.log('Raw:', raw);
          const parsed = await raw.json();
          console.log('Parsed:', parsed);
        } catch (error) {
          console.error('ERROR:', error);
        }
      }

      async function xmlHttpRequestCamelCase(event) {
        try {
          console.log('XMLHttpRequest for "Content-Type: application/json"');

          const req = new XMLHttpRequest();
          function responseCallback() {
            const raw = req.responseText;
            console.log('Raw:', raw);

            const parsed = JSON.parse(raw);
            console.log('Parsed:', parsed);
          }

          req.addEventListener("load", responseCallback);
          req.open("GET", `http://${host}:${port}/content-type-camel-case`);
          req.send();
        } catch (error) {
          console.error('ERROR:', error);
        }
      }

      async function xmlHttpRequestLowerCase(event) {
        try {
          console.log('XMLHttpRequest for "content-type: application/json"');

          const req = new XMLHttpRequest();
          function responseCallback() {
            const raw = req.responseText;
            console.log('Raw:', raw);

            const parsed = JSON.parse(raw);
            console.log('Parsed:', parsed);
          }

          req.addEventListener("load", responseCallback);
          req.open("GET", `http://${host}:${port}/content-type-lower-case`);
          req.send();
        } catch (error) {
          console.error('ERROR:', error);
        }
      }

      self.shadowRoot.querySelector('#fetch-camel-case').addEventListener('click', fetchCamelCase);
      self.shadowRoot.querySelector('#fetch-lower-case').addEventListener('click', fetchLowerCase);
      self.shadowRoot.querySelector('#xmlhttprequest-camel-case').addEventListener('click', xmlHttpRequestCamelCase);
      self.shadowRoot.querySelector('#xmlhttprequest-lower-case').addEventListener('click', xmlHttpRequestLowerCase);
    }
  }
);
