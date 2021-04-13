import "whatwg-fetch";

type ResolveFunction = (data: any) => void;
type RejectFunction = (error: any) => boolean | void;
type ShowErrorFunction = (title: string, message: string, details: string, retryFunc: Function) => Promise<void>;

class http {
    // Set this to display http request errors in a dialog component.
    showError: ShowErrorFunction = (title, message, details) =>
        new Promise<void>(resolve => {
            console.error(title, message, details);
            resolve();
        });

    // Use debounce so that multiple request failures is handled only once.
    debounceTimeoutId: any;
    debounceTimeout: number = 500;

    baseUrl: string = "";

    get DefaultHeaders(): Headers {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    async get(url: string, resolve: ResolveFunction, reject?: RejectFunction) {
        const retryFunc = () => this.get(url, resolve, reject);
        url = this.baseUrl.replace(/\/$/, "") + url;
        try {
            const response = await fetch(url, { headers: this.DefaultHeaders });
            return this.handleResponse(url, response, retryFunc, resolve, reject);
        } catch (error) {
            return this.debounce(() => this.handleError(url, error, retryFunc).catch(() => reject && reject(error)), this.debounceTimeout);
        }
    }

    async post(url: string, content: any, resolve?: ResolveFunction, reject?: RejectFunction) {
        const retryFunc = () => this.post(url, content, resolve, reject);
        url = this.baseUrl.replace(/\/$/, "") + url;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: this.DefaultHeaders,
                body: content
            });
            this.handleResponse(url, response, retryFunc, resolve, reject);
        } catch (error) {
            return this.debounce(() => this.handleError(url, error, retryFunc).catch(() => reject && reject(error)), this.debounceTimeout);
        }
    }

    postAction(url: string, action: string, content: any, resolve?: ResolveFunction, reject?: RejectFunction) {
        return this.post(url, JSON.stringify({ [action]: content }), resolve, reject);
    }

    private debounce(fn: Function, duration: number) {
        clearTimeout(this.debounceTimeoutId);
        this.debounceTimeoutId = setTimeout(() => fn.apply(this), duration);
    }

    private formatResponse(response: Response): Promise<any> {
        const contentType = response.headers.get("Content-Type") || "";
        if (contentType.startsWith("application/json")) return response.json();
        else if (contentType.indexOf("application/pdf") >= 0) return response.arrayBuffer();
        else return response.text();
    }

    private handleResponse(url: string, response: Response, retry: Function, resolve?: ResolveFunction, reject?: RejectFunction) {
        if (response.ok) resolve && this.formatResponse(response).then(data => resolve(data));
        else if (!reject || reject(response) === false) this.handleError(url, response, retry).catch(_ => { });
        return response;
    }

    private handleError(url: string, error: any, retryFunc: Function): Promise<void> {
        const date = new Date().toUTCString();
        if (error && error.headers.get("Content-Type")) {
            return new Promise((resolve, reject) => {
                this.formatResponse(error).then((content: { message: any }) => {
                    const title = `Application Error`;
                    const message = `${error.status} - ${content.message || error.statusText}`;
                    const details = `<b>Request URL:</b> ${url}<br/><b>Date:</b> ${date}<br/><b>Response:</b> ${JSON.stringify(content)}`;
                    this.showError(title, message, details, retryFunc)
                        .then(_ => resolve())
                        .catch(_ => reject());
                });
            });
        } else {
            const title = `Application Unavailable`;
            const message = "The application is unable to connect to the server. Please try again later.";
            const details = `<b>Request URL:</b> ${url}<br/><b>Date:</b> ${date}<br/><b>Response:</b> ${error.status} (${error.statusText})`;
            return this.showError(title, message, details, retryFunc);
        }
    }
}

export default new http();