console.log(document);
var mastodon = document.getElementById("mastodon");
console.log("MASTODON:", mastodon);

if (mastodon) { 
    mastodon.addEventListener('load', function () {
      console.log("this page loaded");
      console.log(document);
    });
} else {
    console.log("no mastodon found");
}