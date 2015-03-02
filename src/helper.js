var helper = {
    inList: function (id, list) {
        var result = Enumerable.From(list).Any(function (item) {
            return id == item.id
        });
        return result;
    }
}

var linQHelper = {
    filterAndSort: function (allList, listToUp) {
        var newListToUp = [];
        var newListToDown = [];

        for (var j = 0; j < listToUp.length; j++) {
            var firstOrDefault = Enumerable.From(allList).Where(function (obj) {
                return obj.id == listToUp[j]
                    && !helper.inList(obj.id, newListToUp)
            }).Select(function (i) {
                return i
            }).FirstOrDefault();

            if (firstOrDefault != undefined) {
                newListToUp[newListToUp.length] = firstOrDefault;
            }
        }

        newListToDown = jQuery.grep(allList, function (b) {
            var result = helper.inList(b.id, newListToUp);
            return !result;
        });

        return $.merge(newListToUp, newListToDown);
    }
}

var handlebarsHelper = {
    getHtml: function (model) {
        return SortHandlebars.templates.listtemplate(model);
    }
}