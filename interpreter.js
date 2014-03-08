// JavaScript source code

var _function = function () {
    this.statement = "";
    this.name = "";
    this.parameters = [];
    this.setup = function () {
        this.name = this.statement.split("(")[0];
        this.parameters = this.statement.split("(")[1].split(",");
        var x = this.statement.split("(")[1].split(",");
        //remove the ")" from the last parameter
        x[x.length - 1] = x[x.length - 1].split(")")[0];
        this.parameters = x;
    };
}

var run = function (functions) {
    for (var i = 0; i < functions.length; i++) {
        switch (functions[i].name) {
            case "move":
                moveFunctions(functions[i].parameters);
                break;
            default:
                console.log("run() failed");
                return;
        }
    }
}

moveFunctions = function (params) {
    switch (params[0]) {
        case "left":
            onLeft(params[1]);
            break;
        case "right":
            onRight(params[1]);
            break;
        case "up":
            onUp(params[1]);
            break;
        case "down":
            onDown(params[1]);
            break;
        default:
            console.log("Failed to find matching function");
            return;
    }
}

$(function () {
    $("#console-run").click(function () {

        var code = $("#console-box").val();

        if (code == null || code.length == 0)
            return;

        //remove spaces from code
        code = code.replace(/\s+/g, '');

        //statments
        var statements = code.split(";")
        if (statements.length == 0)
            return;

        //remove the last element, which is an empty statemt
        if (statements[statements.length - 1] == "")
            statements.splice(statements.length - 1, 1);

        var functions = [];
        for (var i = 0; i < statements.length; i++) {
            var f = new _function();
            f.statement = statements[i].toLowerCase();
            f.setup();
            functions.push(f);
        }

        run(functions);
    });
});

//1. replace all spaces --> x = x.replace(/\s+/g, '');
//2. break up with ; --> y = x.split(";")
//3. for each y, we need to check function and arguments
//3.1 split by ( and look at first (this is the function)  
//3.2 split the second by , these are arguments

