(function () {
    var defaults = {
        outputNormal: "#output-normal",
        outputSorted: "#output-sorted"
    }

    $(document).ready(function () {
        init();
    });

    var init = function () {
        var modelNormal = getModel();
        var modelSorted = getModel();

        var listToUp = getListToUp();

        modelSorted.list = linQHelper.filterAndSort(modelSorted.list, listToUp);

        var htmlResultNormal = handlebarsHelper.getHtml(modelNormal);
        var htmlResultSorted = handlebarsHelper.getHtml(modelSorted);

        $(defaults.outputNormal).html(htmlResultNormal);
        $(defaults.outputSorted).html(htmlResultSorted);
    }

    var getModel = function () {
        var model = {};
        model.list =
            [
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5}
            ];
        return model;
    }

    var getListToUp = function () {
        return [5, 3, 5];
    }

}());