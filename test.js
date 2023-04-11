var xhr = new XMLHttpRequest();
xhr.open("GET", "./", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var files = xhr.responseText.split("\n");
        var htmlFiles = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i].trim();
            if (file.endsWith(".html")) {
                htmlFiles.push(file);
            }
        }
        // Tüm HTML dosyalarındaki sınıfları toplamak için döngü yapın
        var classes = [];
        for (var i = 0; i < htmlFiles.length; i++) {
            var filename = htmlFiles[i];
            var url = "./" + filename;
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url, false);
            xhr2.send();
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(xhr2.responseText, "text/html");
                var elements = doc.getElementsByTagName("*");
                for (var j = 0; j < elements.length; j++) {
                    var elClasses = elements[j].className.split(" ");
                    for (var k = 0; k < elClasses.length; k++) {
                        var className = elClasses[k].trim();
                        if (className.length > 0) {
                            classes.push(className);
                        }
                    }
                }
            }
        }
        // classes array'i, projenizdeki tüm HTML dosyalarındaki sınıf adlarını içerir
        console.log(classes);
    }
};
xhr.send();