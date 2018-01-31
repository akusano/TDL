"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var ErroHandler = /** @class */ (function () {
    function ErroHandler() {
    }
    ErroHandler.handleError = function (error) {
        var errorMessage;
        if (error instanceof http_1.Response) {
            errorMessage = "Erro " + error.status + " ao acessar a URL " + error.url + " - " + error.statusText;
        }
        else {
            errorMessage = error.toString();
        }
        console.log(errorMessage);
        return Observable_1.Observable.throw(errorMessage);
    };
    return ErroHandler;
}());
exports.ErroHandler = ErroHandler;
//# sourceMappingURL=app.error-handler.js.map