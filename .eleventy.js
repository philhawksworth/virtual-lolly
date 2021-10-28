const sass = require("sass");
const fs = require("fs-extra");

module.exports = function(eleventyConfig) {


    // minify the html output
    eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));

    // compress and combine js files
    eleventyConfig.addFilter("jsmin", function(code) {
        const UglifyJS = require("uglify-es");
        let minified = UglifyJS.minify(code);
        if (minified.error) {
            console.log("UglifyJS error: ", minified.error);
            return code;
        }
        return minified.code;
    });

    // Compile Sass before a build
    eleventyConfig.on("beforeBuild", () => {
        let result = sass.renderSync({
            file: "src/scss/styles.scss",
            sourceMap: false,
            outputStyle: "compressed",
        });
        fs.ensureDirSync('dist/css/');
        fs.writeFile("dist/css/styles.css", result.css, (err) => {
            if (err) throw err;
            console.log("CSS generated");
        });
    });


    return {
        dir: {
            input: "src/site",
            output: "dist",
        },
        templateFormats: ["njk", "md", "11ty.js"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };

};